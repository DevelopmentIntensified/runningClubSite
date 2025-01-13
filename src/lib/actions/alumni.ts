import { db } from '$lib/server/db';
import { alumni, type Alumni } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getAlumni() {
  return await db.select().from(alumni).orderBy(alumni.graduationYear);
}

export async function getAlumnus(id: number) {
  const [alumnus] = await db.select().from(alumni).where(eq(alumni.id, id));
  return alumnus;
}

export async function createAlumnus(data: Omit<Alumni, 'id'>) {
  const [createdAlumnus] = await db.insert(alumni).values(data).returning();
  return createdAlumnus;
}

export async function updateAlumnus(id: number, data: Partial<Omit<Alumni, 'id'>>) {
  const [updatedAlumnus] = await db.update(alumni).set(data).where(eq(alumni.id, id)).returning();
  return updatedAlumnus;
}

export async function deleteAlumnus(id: number) {
  await db.delete(alumni).where(eq(alumni.id, id));
}
