// import { auth } from '$lib/server/lucia';
// import type { RequestHandler } from './$types';
// import { LuciaError } from 'lucia';
//
// export const POST: RequestHandler = async ({ request, locals }) => {
// 	const form = await request.formData();
// 	const email = form.get('email');
// 	const password = form.get('password');
//
// 	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
// 		return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 400 });
// 	}
//
// 	try {
// 		const user = await auth.createUser({
// 			key: {
// 				providerId: 'email',
// 				providerUserId: email,
// 				password
// 			},
// 			attributes: {
// 				email,
// 				isAdmin: false
// 			}
// 		});
// 		const session = await auth.createSession({
// 			userId: user.userId,
// 			attributes: {}
// 		});
// 		locals.auth.setSession(session);
// 	} catch (e) {
// 		if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
// 			return new Response(JSON.stringify({ message: 'Email already in use' }), { status: 400 });
// 		}
// 		return new Response(JSON.stringify({ message: 'An unknown error occurred' }), { status: 500 });
// 	}
//
// 	return new Response(JSON.stringify({ message: 'User created successfully' }));
// };
