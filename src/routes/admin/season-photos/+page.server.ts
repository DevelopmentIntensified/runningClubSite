import { logAdminAction } from '$lib/actions/adminAudit';
import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const seasonPhotos = await db.select().from(seasonImageLinks).orderBy(seasonImageLinks.createdAt);
  return { seasonPhotos };
};

export const actions: Actions = {
  deletePhoto: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    if (!id) {
      return fail(400, { message: 'ID is required' });
    }

    try {
      await db.delete(seasonImageLinks).where(eq(seasonImageLinks.id, parseInt(id)));
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'delete', targetType: 'season_photo', targetId: parseInt(id), details: JSON.stringify({ targetType: 'season_photo', targetId: parseInt(id) }) });
    } catch (error) {
      return fail(500, { message: 'Failed to delete photo' });
    }
    return { success: true };
  }
}; 
