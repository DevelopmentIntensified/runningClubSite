import { db } from '$lib/db';
import { events } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { Event } from '$lib/types';

export async function getEvents() {
  return await db.select().from(events).orderBy(events.start);
}

export async function getEvent(id: number) {
  const [event] = await db.select().from(events).where(eq(events.id, id));
  return event;
}

export async function createEvent(data: Omit<Event, 'id'>) {
  const [createdEvent] = await db.insert(events).values(data).returning();
  return createdEvent;
}

export async function updateEvent(id: number, data: Partial<Omit<Event, 'id'>>) {
  const [updatedEvent] = await db.update(events)
    .set(data)
    .where(eq(events.id, id))
    .returning();
  return updatedEvent;
}

export async function deleteEvent(id: number) {
  await db.delete(events).where(eq(events.id, id));
}

