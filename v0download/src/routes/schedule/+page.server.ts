import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { events } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
  const eventsData = await db.select().from(events).orderBy(events.start);

  return {
    events: eventsData,
  };
};

