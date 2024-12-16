import { auth } from '$lib/server/lucia';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		return new Response(JSON.stringify({ message: 'Not logged in' }), { status: 401 });
	}
	await auth.invalidateSession(session.sessionId);
	locals.auth.setSession(null);
	return new Response(JSON.stringify({ message: 'Logged out successfully' }));
};
