import { db } from '$lib/server/db';
import { sessions } from '$lib/server/db/schema';
import { lt, eq } from 'drizzle-orm';

export async function deleteExpiredSessions() {
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}

export async function deleteUserSessions(userId: number) {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}
