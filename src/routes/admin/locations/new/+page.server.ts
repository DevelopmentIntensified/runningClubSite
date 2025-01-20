import { createLocation, getLocationsCount } from '$lib/actions/locations';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const locationsCount = await getLocationsCount();
  return { locationsCount };
};

export const actions: Actions = {
  createLocation: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const link = formData.get('link') as string;
    const order = formData.get('order') as string;

    if (!name || !description || !link) {
      console.warn('DEBUGPRINT[2]: +page.server.ts:6: request=', formData);
      return fail(400, { message: 'All fields are required' });
    }

    const newLocation = await createLocation({
      name: name,
      order: parseInt(order),
      description: description,
      link: link
    });

    if (newLocation) {
      return redirect(302, '/admin/locations');
    } else {
      return fail(500, { message: 'Failed to create location' });
    }
  }
};
