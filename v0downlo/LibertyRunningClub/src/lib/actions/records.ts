import { db } from '$lib/db';
import { records } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { Record } from '$lib/types';

export async function getRecords() {
  return await db.select().from(records).orderBy(records.type, records.event);
}

export async function getRecord(id: number) {
  const [record] = await db.select().from(records).where(eq(records.id, id));
  return record;
}

export async function createRecord(data: Omit<Record, 'id'>) {
  const [createdRecord] = await db.insert(records).values(data).returning();
  return createdRecord;
}

export async function updateRecord(id: number, data: Partial<Omit<Record, 'id'>>) {
  const [updatedRecord] = await db.update(records)
    .set(data)
    .where(eq(records.id, id))
    .returning();
  return updatedRecord;
}

export async function deleteRecord(id: number) {
  await db.delete(records).where(eq(records.id, id));
}

