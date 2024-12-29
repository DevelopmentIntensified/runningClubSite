import { getLeaders, deleteLeader } from '$lib/actions/leaders';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const leaders = await getLeaders();
  return { leaders };
};

export const actions: Actions = {
  deleteLeader: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid leader ID' });
    }

    await deleteLeader(parseInt(id));
    return { success: true };
  }
};

