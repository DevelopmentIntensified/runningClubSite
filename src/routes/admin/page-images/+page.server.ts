import { db } from '$lib/server/db';
import { pageImages } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { eq } from 'drizzle-orm';
import { del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async () => {
  const images = await db.select().from(pageImages).orderBy(pageImages.locationName);

  return {
    images
  };
};

export const actions: Actions = {
  deleteImage: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');
    let imageUrl = formData.get('imageUrl') as string;

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid image ID' });
    }

    await del(imageUrl, { token: BLOB_READ_WRITE_TOKEN });
    await db.delete(pageImages).where(eq(pageImages.id, parseInt(id)));
    return { success: true };
  }
}; 
