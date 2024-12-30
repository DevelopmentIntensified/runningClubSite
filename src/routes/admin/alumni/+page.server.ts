import { getAlumni, deleteAlumnus } from '$lib/actions/alumni';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const alumni = await getAlumni();
  return { alumni };
};

export const actions: Actions = {
  deleteAlumnus: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid alumnus ID' });
    }

    await deleteAlumnus(parseInt(id));
    return { success: true };
  }
};
