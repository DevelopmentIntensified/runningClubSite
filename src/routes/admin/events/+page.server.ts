import { logAdminAction } from '$lib/actions/adminAudit';
import { getEvents, deleteEvent } from '$lib/actions/events';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const eventsData = await getEvents();

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
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'delete',
      targetType: 'event',
      targetId: parseInt(id),
      details: JSON.stringify({ targetType: 'event', targetId: parseInt(id) })
    });
    return { success: true };
  }
};
