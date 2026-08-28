import { logAdminAction } from '$lib/actions/adminAudit';
import { getUsers, deleteUser, updateUser } from '$lib/actions/users';
import { deleteUserSessions } from '$lib/actions/sessions';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const sortBy =
    (url.searchParams.get('sort') as 'email' | 'createdAt' | 'lastLogin' | 'lastUpdated') ||
    'email';
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
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'delete',
      targetType: 'user',
      targetId: parseInt(id),
      details: JSON.stringify({ targetType: 'user', targetId: parseInt(id) })
    });
    return { success: true };
  },

  banUser: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid User ID' });
    }

    const userId = parseInt(id);
    if (userId === parseInt(locals.user!.id)) {
      return fail(400, { message: 'You cannot ban your own account' });
    }

    await updateUser(userId, { banned: true });
    await deleteUserSessions(userId);
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'ban',
      targetType: 'user',
      targetId: userId,
      details: JSON.stringify({ targetType: 'user', targetId: userId, banned: true })
    });
    throw redirect(302, '/admin/users');
  },

  unbanUser: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid User ID' });
    }

    const userId = parseInt(id);
    await updateUser(userId, { banned: false });
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'unban',
      targetType: 'user',
      targetId: userId,
      details: JSON.stringify({ targetType: 'user', targetId: userId, banned: false })
    });
    throw redirect(302, '/admin/users');
  }
};
