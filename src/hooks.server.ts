import { error, redirect, type Handle } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    if (event.url.pathname.includes('/admin') || event.url.pathname.includes('/groupme') || event.url.pathname.includes('/trainingplan')) {
      throw redirect(302, '/login');
      // return error(403, 'Unauthorized');
    }
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    // sveltekit types deviates from the de-facto standard
    // you can use 'as any' too
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
  console.log(user);
  if (event.url.pathname.includes('/admin')) {
    if (!session || !user.isAdmin) {
      return error(403, 'Unauthorized');
    }
  }
  return resolve(event);
};
