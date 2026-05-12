import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db/';
import { sql } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = await request.json();
  const { firstName, lastName, stateOfOrigin, password, redirectUrl } = body;

  if (!firstName || !lastName || !stateOfOrigin || !password) {
    return new Response(
      JSON.stringify({ success: false, error: 'All fields are required' }),
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return new Response(
      JSON.stringify({ success: false, error: 'Password must be at least 8 characters' }),
      { status: 400 }
    );
  }

  try {
    const now = new Date();
    const hashedPassword = await hash(password);
    const sessionId = cookies.get(lucia.sessionCookieName);
    const headers = new Headers();

    if (sessionId) {
      const { session, user } = await lucia.validateSession(sessionId);
      if (session && user) {
        await db
          .update(users)
          .set({ firstName, lastName, stateOfOrigin, hashedPassword, lastLogin: now })
          .where(eq(users.id, parseInt(user.id)));

        return new Response(JSON.stringify({ success: true, redirectTo: redirectUrl || '/groupme' }), {
          headers,
          status: 200
        });
      }
    }

    const email = cookies.get('pendingSignupEmail');
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'No pending signup found. Please start over.' }),
        { status: 400 }
      );
    }

    const existing = await db.execute(sql`SELECT id FROM "user" WHERE email = ${email}`);

    let userId: number;
    if (existing.length === 0) {
      const ids = await db
        .insert(users)
        .values({
          email,
          isAdmin: false,
          firstName,
          lastName,
          stateOfOrigin,
          hashedPassword,
          createdAt: now,
          lastLogin: now
        })
        .returning({ id: users.id });
      userId = ids[0].id;
    } else {
      const updated = await db
        .update(users)
        .set({ firstName, lastName, stateOfOrigin, hashedPassword, lastLogin: now })
        .where(eq(users.email, email))
        .returning({ id: users.id });
      userId = updated[0].id;
    }

    const session = await lucia.createSession(userId.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const clearPending = 'pendingSignupEmail=; Path=/; Max-Age=0';

    headers.append('Set-Cookie', sessionCookie.serialize());
    headers.append('Set-Cookie', clearPending);

    return new Response(JSON.stringify({ success: true, redirectTo: redirectUrl || '/groupme' }), {
      headers,
      status: 200
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error, please try again' }),
      { status: 500 }
    );
  }
};
