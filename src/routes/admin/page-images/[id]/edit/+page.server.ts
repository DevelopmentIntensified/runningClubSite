import { logAdminAction } from '$lib/actions/adminAudit';
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
  default: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const locationName = formData.get('locationName') as string;
    const alt = formData.get('alt') as string;
    const image = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;
    const currentImageUrl = formData.get('currentImageUrl') as string || '';

    if (!locationName || !alt) {
      return fail(400, {
        message: 'Location and alt text are required'
      });
    }

    try {
      let finalImageUrl = currentImageUrl;

      if (image && image.size > 0) {
        if (currentImageUrl) {
          await del(currentImageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e) => console.log(e));
        }
        const { url } = await put(image.name, image, {
          access: 'public',
          token: BLOB_READ_WRITE_TOKEN
        });
        finalImageUrl = url;
      } else if (imageUrl) {
        finalImageUrl = imageUrl;
      }

      await db
        .update(pageImages)
        .set({
          locationName: locationName.toString(),
          alt: alt.toString(),
          imageUrl: finalImageUrl
        })
        .where(eq(pageImages.id, parseInt(params.id)));
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'update', targetType: 'page_image', targetId: parseInt(params.id), details: JSON.stringify({ locationName }) });
    } catch (err) {
      console.error('Error updating image:', err);
      return fail(500, {
        message: 'Failed to update image'
      });
    }
    throw redirect(303, '/admin/page-images');
  }
};