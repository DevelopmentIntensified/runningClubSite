import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { hash, verify } from '@node-rs/argon2';
import { updateUserProfile } from '$lib/actions/userProfile';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  return { user: locals.user };
};

export const actions: Actions = {
  updateProfile: async ({ request, locals }) => {
    if (!locals.user) return { success: false, error: 'Not authenticated' };

    const form = await request.formData();
    const firstName = form.get('firstName') as string;
    const lastName = form.get('lastName') as string;
    const stateOfOrigin = form.get('stateOfOrigin') as string;
    const graduationYear = form.get('graduationYear') as string;
    const academicLevel = form.get('academicLevel') as string;

    if (!firstName || !lastName || !stateOfOrigin) {
      return { success: false, error: 'All fields are required' };
    }

    const updateData: Record<string, any> = { firstName, lastName, stateOfOrigin };
    if (graduationYear) updateData.graduationYear = parseInt(graduationYear);
    if (academicLevel) updateData.academicLevel = academicLevel;

    await updateUserProfile(parseInt(locals.user.id), updateData);

    return { success: true };
  },

  changePassword: async ({ request, locals }) => {
    if (!locals.user) return { success: false, error: 'Not authenticated' };

    const form = await request.formData();
    const currentPassword = form.get('currentPassword') as string;
    const newPassword = form.get('newPassword') as string;
    const confirmPassword = form.get('confirmPassword') as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, error: 'All fields are required' };
    }

    if (newPassword.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters' };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: 'New passwords do not match' };
    }

    const result = await db.execute(sql`SELECT hashed_password FROM "user" WHERE id = ${parseInt(locals.user.id)}`);

    if (result.length === 0) return { success: false, error: 'User not found' };

    const storedHash = result[0].hashed_password;
    if (storedHash) {
      const valid = await verify(storedHash as string, currentPassword);
      if (!valid) return { success: false, error: 'Current password is incorrect' };
    }

    const hashedPassword = await hash(newPassword);
    await db.update(users)
      .set({ hashedPassword })
      .where(eq(users.id, parseInt(locals.user.id)));

    return { success: true };
  }
};
