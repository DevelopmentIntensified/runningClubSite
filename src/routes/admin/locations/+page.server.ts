import { logAdminAction } from '$lib/actions/adminAudit';
import { getLocations, deleteLocation } from '$lib/actions/locations';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const locations = await getLocations();
  return { locations };
};

export const actions: Actions = {
  deleteLocation: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid location ID' });
    }

    await deleteLocation(parseInt(id));
    await logAdminAction({ adminId: parseInt(locals.user.id), action: 'delete', targetType: 'location', targetId: parseInt(id), details: JSON.stringify({ targetType: 'location', targetId: parseInt(id) }) });
    return { success: true };
  }
};
