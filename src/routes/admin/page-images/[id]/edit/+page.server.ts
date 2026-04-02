import { db } from '$lib/server/db';
import { pageImages } from '$lib/server/db/schema';
import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { eq } from 'drizzle-orm';
import { put, del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
  const image = await db
    .select()
    .from(pageImages)
    .where(eq(pageImages.id, parseInt(params.id)))
    .limit(1);

  if (!image.length) {
    throw error(404, 'Image not found');
  }

  return {
    image: image[0]
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();
    const locationName = formData.get('locationName');
    const alt = formData.get('alt');
    const image = formData.get('image') as File;
    const currentImageUrl = formData.get('currentImageUrl') as string;

    if (!locationName || !alt) {
      return fail(400, {
        message: 'Location and alt text are required'
      });
    }

    try {
      let imageUrl = currentImageUrl;

      if (image && image instanceof File) {
        // Delete the old image
        await del(currentImageUrl, { token: BLOB_READ_WRITE_TOKEN });

        // Upload the new image
        const { url } = await put(image.name, image, {
          access: 'public',
          token: BLOB_READ_WRITE_TOKEN
        });
        imageUrl = url;
      }

      await db
        .update(pageImages)
        .set({
          locationName: locationName.toString(),
          alt: alt.toString(),
          imageUrl
        })
        .where(eq(pageImages.id, parseInt(params.id)));

    } catch (error) {
      console.error('Error updating image:', error);
      return fail(500, {
        message: 'Failed to update image'
      });
    }
    throw redirect(303, '/admin/page-images');
  }
}; 
