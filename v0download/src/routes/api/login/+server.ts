import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password
  ) {
    return new Response(
      JSON.stringify({ message: 'Invalid email or password' }),
      { status: 400 }
    );
  }

  try {
    const key = await auth.useKey('email', email, password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {}
    });
    locals.auth.setSession(session);
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Invalid email or password' }),
      { status: 400 }
    );
  }

  return new Response(JSON.stringify({ message: 'Login successful' }));
};

