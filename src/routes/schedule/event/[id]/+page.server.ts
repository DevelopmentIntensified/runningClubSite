import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getEvent } from '$lib/actions/events';

export const load: PageServerLoad = async (e) => {
  const eventData = await getEvent(Number(e.params.id));

  if (!eventData) {
    throw error(404, 'Event not found');
  }

  return {
    event: {
      date: new Date(eventData.start),
      ...eventData,
      start: new Date(eventData.start),
      end: new Date(eventData.end)
    }
  };
};
