import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sessions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
  const session = locals.session;
  if (!session) {
    return redirect(302, '/');
  }
  await db.delete(sessions).where(eq(sessions.id, session.id));
  await lucia.invalidateSession(session.id);
  locals.session = null;
  locals.user = null;
  return redirect(302, '/');
};
