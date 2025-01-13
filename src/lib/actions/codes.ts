import { db } from '$lib/server/db';
import {codes, type Code } from '$lib/server/db/schema';
import { eq, lt } from 'drizzle-orm';

export async function getAlumni() {
  return await db.select().from(codes)
}

export async function getCode(code:string) {
  const [alumnus] = await db.select().from(codes).where(eq(codes.code, code));
  return alumnus;
}

export async function createCode(data: Omit<Code, 'id'>) {
  const [createdCode] = await db.insert(codes).values(data).returning();
  return createdCode;
}

export async function deleteCode(code: string) {
  await db.delete(codes).where(eq(codes.code, code));
}

export async function deleteDeadCodes() {
  await db.delete(codes).where(lt(codes.expiresAt, new Date()));
}
