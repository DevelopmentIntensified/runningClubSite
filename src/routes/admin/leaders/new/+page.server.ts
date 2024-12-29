import { createLeader } from '$lib/actions/leaders';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createLeader: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const position = formData.get('position');
    const bio = formData.get('bio');
    const imageUrl = formData.get('imageUrl');

    if (!name || !position) {
      return fail(400, { message: 'Name and position are required' });
    }

    const newLeader = await createLeader({
      name: name.toString(),
      position: position.toString(),
      bio: bio?.toString() || null,
      imageUrl: imageUrl?.toString() || null,
    });

    if (newLeader) {
      throw redirect(302, '/admin/leaders');
    } else {
      return fail(500, { message: 'Failed to create leader' });
    }
  }
};

