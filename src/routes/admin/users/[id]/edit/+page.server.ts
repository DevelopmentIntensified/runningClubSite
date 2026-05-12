import { logAdminAction } from '$lib/actions/adminAudit';
import { getUser, updateUser } from '$lib/actions/users';
import { deleteUserSessions } from '$lib/actions/sessions';
import { updateUserProfile } from '$lib/actions/userProfile';
import { db } from '$lib/server/db';
import { userChangeLog } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const User = await getUser(parseInt(params.id));
  if (!User) {
    throw redirect(302, '/admin/users');
  }
  const changeLog = await db.select()
    .from(userChangeLog)
    .where(eq(userChangeLog.userId, parseInt(params.id)))
    .orderBy(desc(userChangeLog.changedAt))
    .limit(50);
  return { User, changeLog };
};

export const actions: Actions = {
  updateUser: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string | null;
    const isAdmin = formData.get('isAdmin') as string | null;
    const firstName = formData.get('firstName') as string | null;
    const lastName = formData.get('lastName') as string | null;
    const stateOfOrigin = formData.get('stateOfOrigin') as string | null;
    const graduationYear = formData.get('graduationYear') as string | null;

    const userId = parseInt(params.id);

    const updateData: Record<string, any> = {};
    if (email) updateData.email = email;
    if (isAdmin) updateData.isAdmin = isAdmin === 'true';
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (stateOfOrigin) updateData.stateOfOrigin = stateOfOrigin;
    if (graduationYear) updateData.graduationYear = parseInt(graduationYear);

    if (firstName || lastName || stateOfOrigin || graduationYear) {
      await updateUserProfile(userId, updateData);
    }

    if (email || isAdmin) {
      const updatedUser = await updateUser(userId, { email, isAdmin: isAdmin === 'true' });
      if (updatedUser) {
        await deleteUserSessions(userId);
      }
    }
    await logAdminAction({ adminId: parseInt(locals.user.id), action: 'update', targetType: 'user', targetId: userId });

    throw redirect(302, '/admin/users');
  }
};
