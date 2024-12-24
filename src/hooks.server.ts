import { error, type Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		if (event.url.pathname.includes('/admin')) {
			return error(403, "Unauthorized");
		}
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	console.log('test')
	if (event.url.pathname.includes('/admin')) {
		if (!session || !user.isAdmin) {
			return error(403, "Unauthorized");
		}
	}
	return resolve(event);
};

export const handle: Handle = handleAuth;
