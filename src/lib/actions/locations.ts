import { db } from '$lib/server/db';
import { leaders, locations, type Location } from '$lib/server/db/schema';
import { count, eq } from 'drizzle-orm';

export async function getLocationsCount() {
  return await db.select({ count: count() }).from(locations)
}

export async function getLocations() {
  return await db.select().from(locations).orderBy(locations.order);
}

export async function getLocation(id: number) {
  const [location] = await db.select().from(locations).where(eq(locations.id, id));
  return location;
}

export async function createLocation(data: Omit<Location, 'id'>) {
  const [createdLocation] = await db.insert(locations).values(data).returning();
  return createdLocation;
}

export async function updateLocation(id: number, data: Partial<Omit<Location, 'id'>>) {
  const [updatedLocation] = await db
    .update(locations)
    .set(data)
    .where(eq(locations.id, id))
    .returning();
  return updatedLocation;
}

export async function deleteLocation(id: number) {
  await db.delete(locations).where(eq(locations.id, id));
}
