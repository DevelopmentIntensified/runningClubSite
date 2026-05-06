import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db/';
import { sql } from 'drizzle-orm';
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

    // Check if user already exists
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
          stateOfOrigin: stateOfOrigin || null,
          createdAt: now,
          lastLogin: now
        })
        .returning({ id: users.id });
      userId = ids[0].id;
    } else {
      const updated = await db
        .update(users)
        .set({ firstName, lastName, stateOfOrigin: stateOfOrigin || null, lastLogin: now })
        .where(eq(users.email, email))
        .returning({ id: users.id });
      userId = updated[0].id;
    }

    const session = await lucia.createSession(ids[0].id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const clearPending = 'pendingSignupEmail=; Path=/; Max-Age=0';

    const headers = new Headers();
    headers.append('Set-Cookie', sessionCookie.serialize());
    headers.append('Set-Cookie', 'pendingSignupEmail=; Path=/; Max-Age=0');

    return new Response(JSON.stringify({ success: true, redirectTo: '/groupme' }), {
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
