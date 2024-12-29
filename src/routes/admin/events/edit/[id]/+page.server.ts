import { getEvent, updateEvent } from '$lib/server/db/events';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';

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
    const title = formData.get('title');
    const start = formData.get('start');
    const end = formData.get('end');
    const location = formData.get('location');
    const type = formData.get('type');

    if (!title || !start || !end || !location || !type) {
      return fail(400, { message: 'All fields are required' });
    }

    const updatedEvent = await updateEvent(parseInt(params.id), {
      title: title.toString(),
      start: new Date(start.toString()),
      end: new Date(end.toString()),
      location: location.toString(),
      type: type.toString(),
    });

    if (updatedEvent) {
      throw redirect(302, '/admin/events');
    } else {
      return fail(500, { message: 'Failed to update event' });
    }
  }
};
