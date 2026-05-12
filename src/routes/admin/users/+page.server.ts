import { logAdminAction } from '$lib/actions/adminAudit';
import { getUsers, deleteUser } from '$lib/actions/users';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const sortBy = (url.searchParams.get('sort') as 'email' | 'createdAt' | 'lastLogin') || 'email';
  const users = await getUsers(sortBy);
  return { users, sortBy };
};

export const actions: Actions = {
  deleteUser: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid User ID' });
    }

    await deleteUser(parseInt(id));
    await logAdminAction({ adminId: parseInt(locals.user.id), action: 'delete', targetType: 'user', targetId: parseInt(id), details: JSON.stringify({ targetType: 'user', targetId: parseInt(id) }) });
    return { success: true };
  }
};
