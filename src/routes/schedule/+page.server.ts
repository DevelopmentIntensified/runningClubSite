import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';
import { formatDate } from '$lib/utils/dateUtils';

export const load: PageServerLoad = async () => {
  const eventsData = await db.select().from(events).orderBy(events.start);

  return {
    events: eventsData.map(e => ({
      date: e.start,
      ...e
    }))
  };
};


