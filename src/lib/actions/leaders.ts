import { db } from '$lib/server/db';
import { leaders, type Leader } from '$lib/server/db/schema';
import { count, eq } from 'drizzle-orm';

export async function getLeadersCount() {
  return await db.select({ count: count() }).from(leaders)
}

export async function getLeaders() {
  return await db.select().from(leaders).orderBy(leaders.order);
}

export async function getLeader(id: number) {
  const [leader] = await db.select().from(leaders).where(eq(leaders.id, id));
  return leader;
}

export async function createLeader(data: Omit<Leader, 'id' | 'created_at'>) {
  const [createdLeader] = await db.insert(leaders).values(data).returning();
  return createdLeader;
}

export async function updateLeader(id: number, data: Partial<Omit<Leader, 'id' | 'created_at'>>) {
  const [updatedLeader] = await db.update(leaders).set(data).where(eq(leaders.id, id)).returning();
  return updatedLeader;
}

export async function deleteLeader(id: number) {
  await db.delete(leaders).where(eq(leaders.id, id));
}
