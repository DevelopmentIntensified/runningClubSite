import { db } from '$lib/server/db';
import { forms } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';

type Form = InferInsertModel<typeof forms>;

export async function getForms() {
  return await db.select().from(forms).orderBy(forms.createdAt);
}

export async function getFormsActive() {
  return await db.select().from(forms).where(eq(forms.active, true)).orderBy(forms.createdAt);
}

export async function getForm(id: number) {
  const [form] = await db.select().from(forms).where(eq(forms.id, id));
  return form;
}

export async function createForm(data: Omit<Form, 'id'>) {
  const [createdForm] = await db.insert(forms).values(data as Form).returning();
  return createdForm;
}

export async function updateForm(id: number, data: Partial<Omit<Form, 'id'>>) {
  const [updatedForm] = await db.update(forms).set(data).where(eq(forms.id, id)).returning();
  return updatedForm;
}

export async function deleteForm(id: number) {
  await db.delete(forms).where(eq(forms.id, id));
}