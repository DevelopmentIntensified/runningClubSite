import { db } from '$lib/server/db';
import { events, locations } from '$lib/server/db/schema';
import { eq, asc, ilike } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';

type CalendarEvent = InferInsertModel<typeof events>;

/** Resolve a location id matching the given name, or null if none matches. */
export async function resolveLocationId(name: string | null | undefined): Promise<number | null> {
  if (!name) return null;
  const [row] = await db
    .select({ id: locations.id })
    .from(locations)
    .where(ilike(locations.name, name.trim()))
    .limit(1);
  return row?.id ?? null;
}

export async function getEvents() {
  const rows = await db
    .select({ event: events, location: locations })
    .from(events)
    .leftJoin(locations, eq(events.locationId, locations.id))
    .orderBy(asc(events.start));

  return rows.map((r) => ({
    ...r.event,
    locationName: r.location?.name ?? null,
    locationLink: r.location?.link ?? null,
    locationDescription: r.location?.description ?? null
  }));
}

export async function getEvent(id: number) {
  const [row] = await db
    .select({ event: events, location: locations })
    .from(events)
    .leftJoin(locations, eq(events.locationId, locations.id))
    .where(eq(events.id, id));

  if (!row) return null;

  return {
    ...row.event,
    locationName: row.location?.name ?? null,
    locationLink: row.location?.link ?? null,
    locationDescription: row.location?.description ?? null
  };
}

export async function createEvent(data: Omit<CalendarEvent, 'id'>) {
  const [createdEvent] = await db.insert(events).values(data).returning();
  return createdEvent;
}

export async function updateEvent(id: number, data: Partial<Omit<CalendarEvent, 'id'>>) {
  const [updatedEvent] = await db.update(events).set(data).where(eq(events.id, id)).returning();
  return updatedEvent;
}

export async function deleteEvent(id: number) {
  await db.delete(events).where(eq(events.id, id));
}
