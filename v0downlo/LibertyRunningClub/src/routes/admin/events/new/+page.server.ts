import { createEvent } from '$lib/actions/events';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createEvent: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const start = formData.get('start');
    const end = formData.get('end');
    const location = formData.get('location');
    const type = formData.get('type');

    if (!title || !start || !end || !location || !type) {
      return fail(400, { message: 'All fields are required' });
    }

    const newEvent = await createEvent({
      title: title.toString(),
      start: new Date(start.toString()),
      end: new Date(end.toString()),
      location: location.toString(),
      type: type.toString(),
    });

    if (newEvent) {
      throw redirect(302, '/admin/events');
    } else {
      return fail(500, { message: 'Failed to create event' });
    }
  }
};

