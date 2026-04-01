import { getEvent, updateEvent } from '$lib/actions/events';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { DateTime } from 'luxon';

export const load: PageServerLoad = async ({ params }) => {
  const event = await getEvent(parseInt(params.id));
  if (!event) {
    throw redirect(302, '/admin/events');
  }
  return { event };
};

export const actions: Actions = {
  updateEvent: async ({ request, params }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const start = formData.get('start') as string;
    const end = formData.get('end') as string;
    const location = formData.get('location') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;

    if (!title || !start || !end || !location || !type) {
      return fail(400, { message: 'All fields are required' });
    }

    let start2 = DateTime.fromISO(start.replace(' ', 'T'), { zone: 'America/New_York' });
    let end2 = DateTime.fromISO(end.replace(' ', 'T'), { zone: 'America/New_York' });

    const updatedEvent = await updateEvent(parseInt(params.id), {
      title,
      start: start2.toString(),
      end: end2.toString(),
      location,
      description,
      type
    });

    if (updatedEvent) {
      throw redirect(302, '/admin/events');
    } else {
      return fail(500, { message: 'Failed to update event' });
    }
  }
};
