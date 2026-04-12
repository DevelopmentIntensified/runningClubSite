import { getEvent, updateEvent } from '$lib/actions/events';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { DateTime } from 'luxon';

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
  const event = await getEvent(parseInt(params.id));
  if (!event) {
    throw redirect(302, '/admin/events');
  }
  return { event };
};

export const actions: Actions = {
  updateEvent: async ({ request, params }: { request: Request; params: { id: string } }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string | null;
    const start = formData.get('start') as string | null;
    const end = formData.get('end') as string | null;
    const location = formData.get('location') as string | null;
    const type = formData.get('type') as string | null;

    const updateData: {
      title?: string;
      start?: string;
      end?: string;
      location?: string;
      type?: string;
      description?: string;
    } = {};

    if (title) updateData.title = title;
    if (location) updateData.location = location;
    if (type) updateData.type = type;
    if (formData.get('description')) updateData.description = formData.get('description') as string;
    
    if (start) {
      updateData.start = DateTime.fromISO(start.replace(" ", "T")).setZone('America/New_York').toString();
    }
    if (end) {
      updateData.end = DateTime.fromISO(end.replace(" ", "T")).setZone('America/New_York').toString();
    }

    const updatedEvent = await updateEvent(parseInt(params.id), updateData);

    if (updatedEvent) {
      throw redirect(302, '/admin/events');
    } else {
      return fail(500, { message: 'Failed to update event' });
    }
  }
};
