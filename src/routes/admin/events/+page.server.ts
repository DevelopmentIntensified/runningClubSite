import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';
import { getEvents, deleteEvent } from '$lib/actions/events';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const eventsData = await db.select().from(events).orderBy(events.start);

  return {
    events: eventsData.map((e) => ({
      date: e.start,
      ...e
    }))
  };
};

export const actions: Actions = {
  deleteEvent: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid event ID' });
    }

    await deleteEvent(parseInt(id));
    return { success: true };
  }
};
