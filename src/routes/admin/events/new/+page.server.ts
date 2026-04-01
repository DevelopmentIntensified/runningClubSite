import { createEvent } from '$lib/actions/events';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { DateTime } from 'luxon';

export const load: PageServerLoad = async ({ url }) => {
  const dateParam = url.searchParams.get('date');
  let defaultDate = '';

  if (dateParam) {
    const parsed = DateTime.fromFormat(dateParam, 'yyyy-MM-dd', { zone: 'America/New_York' });
    if (parsed.isValid) {
      defaultDate = parsed.toFormat('yyyy-MM-dd');
    }
  }

  return { defaultDate };
};

export const actions: Actions = {
  createEvent: async ({ request }) => {
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

    const newEvent = await createEvent({
      description,
      title,
      start: start2.toString(),
      end: end2.toString(),
      location,
      type
    });

    if (newEvent) {
      throw redirect(302, '/admin/events');
    } else {
      return fail(500, { message: 'Failed to create event' });
    }
  }
};
