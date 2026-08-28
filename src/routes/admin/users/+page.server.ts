import { logAdminAction } from '$lib/actions/adminAudit';
import { getUsers, deleteUser, updateUser } from '$lib/actions/users';
import { deleteUserSessions } from '$lib/actions/sessions';
import { getFeatures, getUserDeniedKeys, setUserDeniedKeys } from '$lib/actions/featureAccess';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const sortBy =
    (url.searchParams.get('sort') as 'email' | 'createdAt' | 'lastLogin' | 'lastUpdated') ||
    'email';
  const users = await getUsers(sortBy);
  const features = await getFeatures();
  // Build a map of userId -> denied feature keys.
  const deniedFeatureMap: Record<number, string[]> = {};
  await Promise.all(
    users.map(async (u) => {
      deniedFeatureMap[u.id] = await getUserDeniedKeys(u.id);
    })
  );
  return { users, sortBy, features, deniedFeatureMap };
};

export const actions: Actions = {
  deleteUser: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid User ID' });
    }

    const userId = parseInt(id, 10);
    if (Number.isNaN(userId)) {
      return fail(400, { message: 'Invalid User ID' });
    }
    if (userId === parseInt(locals.user!.id)) {
      return fail(400, { message: 'You cannot delete your own account' });
    }

    await deleteUser(userId);
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'delete',
      targetType: 'user',
      targetId: userId,
      details: JSON.stringify({ targetType: 'user', targetId: userId })
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
  },

  updateUserFeatureAccess: async ({ request, locals }) => {
    const formData = await request.formData();
    const userId = parseInt(formData.get('userId') as string, 10);
    if (Number.isNaN(userId)) {
      return fail(400, { message: 'Invalid User ID' });
    }

    // Collect denied keys from the posted checkboxes.
    const denied: string[] = [];
    for (const value of formData.getAll('denied')) {
      denied.push(value as string);
    }

    await setUserDeniedKeys(userId, denied);
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'updateFeatureAccess',
      targetType: 'user',
      targetId: userId,
      details: JSON.stringify({ targetType: 'user', targetId: userId, denied })
    });
    return { success: true };
  }
};
