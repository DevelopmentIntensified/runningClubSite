import { logAdminAction } from '$lib/actions/adminAudit';
import { getLocation, getLocationsCount, updateLocation } from '$lib/actions/locations';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { objectDiff } from '$lib/utils/objectDiff';

export const load: PageServerLoad = async ({ params }) => {
  const locationsCount = await getLocationsCount();
  const location = await getLocation(parseInt(params.id));
  if (!location) {
    throw redirect(302, '/admin/locations');
  }
  return { location, locationsCount };
};

export const actions: Actions = {
  updateLocation: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const link = formData.get('link') as string | null;
    let order = formData.get('order') as string | null;

    const updateData: {
      name?: string;
      order?: number;
      description?: string;
      link?: string;
    } = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (link) updateData.link = link;
    if (order) updateData.order = parseInt(order);

    const existingLocation = await getLocation(parseInt(params.id));

    const updatedLocation = await updateLocation(parseInt(params.id), updateData);

    if (updatedLocation) {
      const changes = objectDiff(existingLocation, updateData);
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'update', targetType: 'location', targetId: parseInt(params.id), details: JSON.stringify(changes) });
      throw redirect(302, '/admin/locations');
    } else {
      return fail(500, { message: 'Failed to update location' });
    }
  }
};
