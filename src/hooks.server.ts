import { error, redirect, type Handle } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import { canAccessFeature } from '$lib/actions/featureAccess';

// Map protected path prefixes to their feature keys.
const PROTECTED_FEATURES: { prefix: string; key: string }[] = [
  { prefix: '/admin', key: 'admin' },
  { prefix: '/groupme', key: 'groupme' },
  { prefix: '/trainingplan', key: 'trainingplan' },
  { prefix: '/season-photos', key: 'season-photos' },
  { prefix: '/forms', key: 'forms' }
];

function pathFeatureKey(pathname: string): string | null {
  for (const entry of PROTECTED_FEATURES) {
    if (pathname.startsWith(entry.prefix) || pathname === entry.prefix) {
      return entry.key;
    }
  }
  return null;
}

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  // Resolve the session (or null if none/invalid) while allowing the request to proceed.
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
  } else {
    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
    }
    event.locals.user = user;
    event.locals.session = session;

    // If the user has been banned, invalidate the session and log them out.
    if (session && user?.banned) {
      await lucia.invalidateSession(session.id);
      const sessionCookie = lucia.createBlankSessionCookie();
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
      event.locals.user = null;
      event.locals.session = null;
      throw redirect(302, '/login?banned=1');
    }
  }

  // Enforce feature access on protected paths.
  const featureKey = pathFeatureKey(event.url.pathname);
  if (featureKey) {
    const allowed = await canAccessFeature(featureKey, event.locals.user);
    if (!allowed) {
      if (!event.locals.user) {
        // Not signed in -> send to login with a return URL.
        const redirectUrl = event.url.pathname + event.url.search;
        throw redirect(302, `/login?redirectUrl=${encodeURIComponent(redirectUrl)}`);
      }
      // Signed in but not allowed -> 403.
      return error(403, 'You do not have access to this feature.');
    }
  }

  return resolve(event);
};
