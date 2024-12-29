import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (e) => {
  const eventsData = await db
    .select()
    .from(events)
    .where(eq(events.id, e.params.id))
    .orderBy(events.start);

  return {
    event: eventsData.map((e) => ({
      date: e.start,
      ...e
    }))[0]
  };
};
