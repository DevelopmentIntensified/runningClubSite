import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db/';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = await request.json();
  const { firstName, lastName, stateOfOrigin } = body;

  if (!firstName || !lastName) {
    return new Response(
      JSON.stringify({ success: false, error: 'First name and last name are required' }),
      { status: 400 }
    );
  }

  const email = cookies.get('pendingSignupEmail');
  if (!email) {
    return new Response(
      JSON.stringify({ success: false, error: 'No pending signup found. Please start over.' }),
      { status: 400 }
    );
  }

  try {
    const now = new Date();
    const ids = await db
      .insert(users)
      .values({
        email,
        isAdmin: false,
        firstName,
        lastName,
        stateOfOrigin: stateOfOrigin || null,
        createdAt: now,
        lastLogin: now
      })
      .returning({ id: users.id });

    const session = await lucia.createSession(ids[0].id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies.delete('pendingSignupEmail', { path: '/' });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Set-Cookie': sessionCookie.serialize()
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error, please try again' }),
      { status: 500 }
    );
  }
};
