import { getLocation, updateLocation } from '$lib/actions/locations';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const location = await getLocation(parseInt(params.id));
  if (!location) {
    throw redirect(302, '/admin/locations');
  }
  return { location };
};

export const actions: Actions = {
  updateLocation: async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const mapUrl = formData.get('mapUrl');

    if (!name || !description || !mapUrl) {
      return fail(400, { message: 'All fields are required' });
    }

    const updatedLocation = await updateLocation(parseInt(params.id), {
      name: name.toString(),
      description: description.toString(),
      mapUrl: mapUrl.toString(),
    });

    if (updatedLocation) {
      throw redirect(302, '/admin/locations');
    } else {
      return fail(500, { message: 'Failed to update location' });
    }
  }
};

