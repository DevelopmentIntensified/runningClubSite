import { logAdminAction } from '$lib/actions/adminAudit';
import {
  getFeatures,
  setFeatureMode,
  getFeatureUsers,
  addFeatureUser,
  removeFeatureUser
} from '$lib/actions/featureAccess';
import { getUsers } from '$lib/actions/users';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { FeatureMode } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  const features = await getFeatures();
  const users = await getUsers('email');
  const featureUserMap: Record<string, number[]> = {};
  for (const feature of features) {
    const rows = await getFeatureUsers(feature.key);
    featureUserMap[feature.key] = rows.map((r) => r.userId);
  }
  return { features, users, featureUserMap };
};

const VALID_MODES: FeatureMode[] = ['public', 'login', 'admin', 'restricted'];

export const actions: Actions = {
  setMode: async ({ request, locals }) => {
    const formData = await request.formData();
    const key = formData.get('key') as string;
    const mode = formData.get('mode') as string;

    if (!key || !VALID_MODES.includes(mode as FeatureMode)) {
      return fail(400, { message: 'Invalid feature or mode' });
    }

    await setFeatureMode(key, mode as FeatureMode);
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'update',
      targetType: 'feature',
      details: JSON.stringify({ feature: key, mode })
    });
    throw redirect(302, '/admin/feature-access');
  },

  addUser: async ({ request, locals }) => {
    const formData = await request.formData();
    const key = formData.get('key') as string;
    const userId = formData.get('userId') as string;

    if (!key || !userId) {
      return fail(400, { message: 'Invalid feature or user' });
    }

    await addFeatureUser(key, parseInt(userId));
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'update',
      targetType: 'feature',
      details: JSON.stringify({ feature: key, addUser: parseInt(userId) })
    });
    throw redirect(302, '/admin/feature-access');
  },

  removeUser: async ({ request, locals }) => {
    const formData = await request.formData();
    const key = formData.get('key') as string;
    const userId = formData.get('userId') as string;

    if (!key || !userId) {
      return fail(400, { message: 'Invalid feature or user' });
    }

    await removeFeatureUser(key, parseInt(userId));
    await logAdminAction({
      adminId: parseInt(locals.user!.id),
      action: 'update',
      targetType: 'feature',
      details: JSON.stringify({ feature: key, removeUser: parseInt(userId) })
    });
    throw redirect(302, '/admin/feature-access');
  }
};
