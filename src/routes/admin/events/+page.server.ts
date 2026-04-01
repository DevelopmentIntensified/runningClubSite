import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';
import { deleteEvent } from '$lib/actions/events';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const oneDay = 24 * 60 * 60 * 1000;

export const load: PageServerLoad = async () => {
  const eventsData = await db.select().from(events).orderBy(events.start);

  const transformedEvents = eventsData.flatMap((e) => {
    const start = new Date(e.start);
    const end = new Date(e.end);
    if (start.getDate() === end.getDate()) {
      return { date: start, ...e };
    }
    const diffDays = Math.round(Math.abs((start.getTime() - end.getTime()) / oneDay));
    const days = [];
    for (let i = 0; i <= diffDays; i++) {
      days.push({ date: new Date(start.getTime() + oneDay * i), ...e });
    }
    return days;
  });

  return {
    events: transformedEvents,
    isAdmin: true
  };
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
