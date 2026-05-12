import { logAdminAction } from '$lib/actions/adminAudit';
import { createEvent } from '$lib/actions/events';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { DateTime } from 'luxon';

export const actions: Actions = {
  createEvent: async ({ request, locals }) => {
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

    let start2 = DateTime.fromISO(start.replace(" ", "T")).setZone('America/New_York');
    let end2 = DateTime.fromISO(end.replace(" ", "T")).setZone('America/New_York');

    const newEvent = await createEvent({
      description: description,
      title: title,
      start: start2.toString(),
      end: end2.toString(),
      location: location,
      type: type
    });

    if (newEvent) {
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'create', targetType: 'event', targetId: newEvent.id, details: JSON.stringify({ created: { title, start: start2.toString(), end: end2.toString(), location, type, description } }) });
      throw redirect(302, '/admin/events');
    } else {
      return fail(500, { message: 'Failed to create event' });
    }
  }
};
