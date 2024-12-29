import { auth } from '$lib/server/lucia';
import type { RequestHandler } from './$types';
import { LuciaError } from 'lucia';

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
    if (
      e instanceof LuciaError &&
      (e.message === 'AUTH_INVALID_KEY_ID' ||
        e.message === 'AUTH_INVALID_PASSWORD')
    ) {
      return new Response(
        JSON.stringify({ message: 'Incorrect email or password' }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({ message: 'An unknown error occurred' }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ message: 'Login successful' }));
};

