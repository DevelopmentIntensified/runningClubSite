import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (e) => {
  const eventsData = await db
    .select()
    .from(events)
    .where(eq(events.id, parseInt(e.params.id)))
    .orderBy(events.start);

  return {
    event: eventsData.map((event) => ({
      date: new Date(event.start),
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }))[0]
  };
};
