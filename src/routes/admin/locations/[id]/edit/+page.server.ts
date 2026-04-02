import { getLocation, getLocationsCount, updateLocation } from '$lib/actions/locations';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const locationsCount = await getLocationsCount();
  const location = await getLocation(parseInt(params.id));
  if (!location) {
    throw redirect(302, '/admin/locations');
  }
  return { location, locationsCount };
};

export const actions: Actions = {
  updateLocation: async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const link = formData.get('link');
    let order = formData.get('order') as string;

    if (!name || !description || !link) {
      return fail(400, { message: 'All fields are required' });
    }

    if(!order){
      order = "10";
    }

    const updatedLocation = await updateLocation(parseInt(params.id), {
      name: name.toString(),
      order: parseInt(order),
      description: description.toString(),
      link: link.toString()
    });

    if (updatedLocation) {
      throw redirect(302, '/admin/locations');
    } else {
      return fail(500, { message: 'Failed to update location' });
    }
  }
};
