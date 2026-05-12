import { logAdminAction } from '$lib/actions/adminAudit';
import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';
import { deleteEvent } from '$lib/actions/events';
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
  deleteEvent: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid event ID' });
    }

    await deleteEvent(parseInt(id));
    await logAdminAction({ adminId: parseInt(locals.user.id), action: 'delete', targetType: 'event', targetId: parseInt(id), details: JSON.stringify({ targetType: 'event', targetId: parseInt(id) }) });
    return { success: true };
  }
};
