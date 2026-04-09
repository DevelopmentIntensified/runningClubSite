import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (e) => {
  const eventsData = await db
    .select()
    .from(events)
    .where(eq(events.id, Number(e.params.id)))
    .orderBy(events.start);

  const eventData = eventsData[0];
  
  if (!eventData) {
    throw error(404, 'Event not found');
  }

  return {
    event: {
      date: new Date(eventData.start),
      ...eventData,
      start: new Date(eventData.start),
      end: new Date(eventData.end),
    }
  };
};
