import { createEvent } from '$lib/actions/events';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { DateTime } from 'luxon';

export const actions: Actions = {
  createEvent: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const start = formData.get('start');
    const end = formData.get('end');
    const location = formData.get('location');
    const type = formData.get('type');
    const description = formData.get('description') as string;

    if (!title || !start || !end || !location || !type) {
      return fail(400, { message: 'All fields are required' });
    }
    const offset = formData.get("offset") as string

    let start2 = DateTime.fromISO(start.replace(" ", "T")).setZone('America/New_York')
    let end2 = DateTime.fromISO(end.replace(" ", "T")).setZone('America/New_York')

    const newEvent = await createEvent({
      description: description,
      title: title.toString(),
      start: start2.toString(),
      end: end2.toString(),
      location: location.toString(),
      type: type.toString()
    });

    if (newEvent) {
      throw redirect(302, '/admin/events');
    } else {
      return fail(500, { message: 'Failed to create event' });
    }
  }
};
