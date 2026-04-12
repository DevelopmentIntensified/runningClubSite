import { db } from '$lib/server/db';
import { records } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';

type Records = InferInsertModel<typeof records>;

export async function getRecords() {
  return await db.select().from(records).orderBy(records.type, records.event);
}

export async function getRecord(id: number) {
  const [record] = await db.select().from(records).where(eq(records.id, id));
  return record;
}

export async function createRecord(data: Omit<Records, 'id' | 'created_at'>) {
  const [createdRecord] = await db.insert(records).values(data as Partial<Records>).returning();
  return createdRecord;
}

export async function updateRecord(id: number, data: Partial<Omit<Records, 'id' | 'created_at'>>) {
  const [updatedRecord] = await db.update(records).set(data).where(eq(records.id, id)).returning();
  return updatedRecord;
}

export async function deleteRecord(id: number) {
  await db.delete(records).where(eq(records.id, id));
}
