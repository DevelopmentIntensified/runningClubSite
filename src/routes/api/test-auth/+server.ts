import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const TEST_SECRET = 'playwright-test-secret-do-not-use-in-prod';
const ALLOWED_ORIGIN = 'https://test.libertyrunningclub.com';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const origin = request.headers.get('origin');
  
  if (origin !== ALLOWED_ORIGIN && origin !== 'http://localhost:5173') {
    throw error(403, 'Forbidden');
  }
  
  const { secret, email } = await request.json();
  
  if (secret !== TEST_SECRET) {
    throw error(401, 'Invalid secret');
  }
  
  const { lucia } = await import('$lib/server/auth');
  const { users } = await import('$lib/server/db/schema');
  const { db } = await import('$lib/server/db/');
  const { eq } = await import('drizzle-orm');
  
  let userAccount = await db.select().from(users).where(eq(users.email, email));
  
  if (userAccount.length === 0) {
    const newUsers = await db
      .insert(users)
      .values({
        email,
        isAdmin: true
      })
      .returning({ id: users.id });
    userAccount = [{ id: newUsers[0].id, email, isAdmin: true, createdAt: new Date(), lastLogin: null }];
  }
  
  const session = await lucia.createSession(userAccount[0].id.toString(), {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  
  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes
  });
  
  return new Response(JSON.stringify({ 
    success: true, 
    sessionId: session.id,
    userId: userAccount[0].id 
  }));
};