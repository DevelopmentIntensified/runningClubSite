import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = await request.json();
  const { email, password, redirectUrl } = body;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid email or password' }),
      { status: 400 }
    );
  }

  const emailRegex = /^[a-zA-Z\d]+@liberty\.edu$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid email' }),
      { status: 400 }
    );
  }

  try {
    const result = (await db.execute(sql`
      SELECT id, email, first_name, hashed_password FROM "user" WHERE email = ${email}
    `)) as any[];

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email or password' }),
        { status: 400 }
      );
    }

    const user = result[0];

    if (!user.hashed_password) {
      return new Response(
        JSON.stringify({ success: false, error: 'No password set. Please sign in with a code, then set a password in settings.' }),
        { status: 400 }
      );
    }

    const validPassword = await verify(user.hashed_password as string, password);
    if (!validPassword) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email or password' }),
        { status: 400 }
      );
    }

    const headers = new Headers();

    if (!user.first_name) {
      cookies.set('pendingSignupEmail', email, { path: '/', maxAge: 900 });
      const setupUrl = `/login/setup?redirectUrl=${encodeURIComponent(redirectUrl || '/groupme')}`;
      return new Response(JSON.stringify({ success: true, redirectTo: setupUrl }), {
        headers,
        status: 200
      });
    }

    await db.execute(sql`UPDATE "user" SET last_login = NOW() WHERE id = ${user.id}`);

    const session = await lucia.createSession(user.id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    headers.append('Set-Cookie', sessionCookie.serialize());
    headers.append('Set-Cookie', 'redirectUrl=; Path=/; Max-Age=0');

    return new Response(JSON.stringify({ success: true, redirectTo: redirectUrl || '/groupme' }), {
      headers,
      status: 200
    });
  } catch (error) {
    console.error('Password login error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error, please try again' }),
      { status: 500 }
    );
  }
};
