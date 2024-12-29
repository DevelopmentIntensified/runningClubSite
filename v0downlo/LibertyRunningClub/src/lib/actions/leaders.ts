import { db } from '$lib/db';
import { leaders } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { Leader } from '$lib/types';

export async function getLeaders() {
  return await db.select().from(leaders);
}

export async function getLeader(id: number) {
  const [leader] = await db.select().from(leaders).where(eq(leaders.id, id));
  return leader;
}

export async function createLeader(data: Omit<Leader, 'id'>) {
  const [createdLeader] = await db.insert(leaders).values(data).returning();
  return createdLeader;
}

export async function updateLeader(id: number, data: Partial<Omit<Leader, 'id'>>) {
  const [updatedLeader] = await db.update(leaders)
    .set(data)
    .where(eq(leaders.id, id))
    .returning();
  return updatedLeader;
}

export async function deleteLeader(id: number) {
  await db.delete(leaders).where(eq(leaders.id, id));
}

