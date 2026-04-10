import { getUsers, deleteUser } from '$lib/actions/users';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const sortBy = (url.searchParams.get('sort') as 'email' | 'createdAt' | 'lastLogin') || 'email';
  const users = await getUsers(sortBy);
  return { users, sortBy };
};

export const actions: Actions = {
  deleteUser: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid User ID' });
    }

    await deleteUser(parseInt(id));
    return { success: true };
  }
};
