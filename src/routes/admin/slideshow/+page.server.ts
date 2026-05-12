import { logAdminAction } from '$lib/actions/adminAudit';
import { db } from '$lib/server/db';
import { slideShowImages } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { eq } from 'drizzle-orm';
import { del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async () => {
  const slideshowImages = await db.select().from(slideShowImages).orderBy(slideShowImages.order);

  return {
    slideshowImages
  };
};

export const actions: Actions = {
  deleteImage: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');
    let imageUrl = formData.get('imageUrl') as string;

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid image ID' });
    }

    await del(imageUrl, { token: BLOB_READ_WRITE_TOKEN });
    await db.delete(slideShowImages).where(eq(slideShowImages.id,parseInt(id)));
    await logAdminAction({ adminId: parseInt(locals.user.id), action: 'delete', targetType: 'slide', targetId: parseInt(id) });
    return { success: true };
  }
}; 
