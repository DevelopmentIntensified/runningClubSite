import { db } from '$lib/server/db';
import { events, type CalendarEvent } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getEvents() {
  return await db.select().from(events).orderBy(events.start);
}

export async function getEvent(id: number) {
  const [event] = await db.select().from(events).where(eq(events.id, id));
  return event;
}

export async function createEvent(data: Omit<CalendarEvent, 'id' | 'created_at'>) {
  const [createdEvent] = await db.insert(events).values(data).returning();
  return createdEvent;
}

export async function updateEvent(id: number, data: Partial<Omit<CalendarEvent, 'id'>>) {
  const [updatedEvent] = await db.update(events)
    .set(data)
    .where(eq(events.id, id))
    .returning();
  return updatedEvent;
}

export async function deleteEvent(id: number) {
  await db.delete(events).where(eq(events.id, id));
}

