import { getEvents, deleteEvent } from '$lib/actions/events';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const events = await getEvents();
  return { events };
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

