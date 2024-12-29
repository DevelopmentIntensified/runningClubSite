import { getLeader, updateLeader } from '$lib/actions/leaders';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const leader = await getLeader(parseInt(params.id));
  if (!leader) {
    throw redirect(302, '/admin/leaders');
  }
  return { leader };
};

export const actions: Actions = {
  updateLeader: async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const position = formData.get('position');
    const bio = formData.get('bio');
    const imageUrl = formData.get('imageUrl');

    if (!name || !position) {
      return fail(400, { message: 'Name and position are required' });
    }

    const updatedLeader = await updateLeader(parseInt(params.id), {
      name: name.toString(),
      position: position.toString(),
      bio: bio?.toString() || null,
      imageUrl: imageUrl?.toString() || null,
    });

    if (updatedLeader) {
      throw redirect(302, '/admin/leaders');
    } else {
      return fail(500, { message: 'Failed to update leader' });
    }
  }
};

