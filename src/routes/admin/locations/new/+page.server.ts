import { createLocation } from '$lib/actions/locations';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createLocation: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const link = formData.get('link');

    if (!name || !description || !link) {
    console.warn("DEBUGPRINT[2]: +page.server.ts:6: request=", formData)
      return fail(400, { message: 'All fields are required' });
    }

    const newLocation = await createLocation({
      name: name.toString(),
      description: description.toString(),
      link: link.toString(),
    });

    if (newLocation) {
      return redirect(302, '/admin/locations');
    } else {
      return fail(500, { message: 'Failed to create location' });
    }
  }
};

