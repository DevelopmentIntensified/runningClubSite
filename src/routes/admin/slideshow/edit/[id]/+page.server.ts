import { db } from '$lib/server/db';
import { slideShowImages } from '$lib/server/db/schema';
import { fail, redirect, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { del, put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const image = await db
    .select()
    .from(slideShowImages)
    .where(eq(slideShowImages.id, parseInt(params.id)))
    .limit(1);

  if (!image.length) {
    throw redirect(303, '/admin/slideshow');
  }

  return {
    image: image[0]
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string | null;
    const image = formData.get('image') as File;
    const order = formData.get('order') as string | null;
    const imageUrl = formData.get('imageUrl') as string;

    const updateData: { title?: string; order?: number; imageUrl?: string } = {};

    if (title) updateData.title = title;
    if (order) {
      const orderNum = parseInt(order);
      if (!isNaN(orderNum)) {
        updateData.order = orderNum;
      }
    }

    if (image && image.size > 0) {
      const { url } = await put(image.name, image, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      await del(imageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e)=>{
        console.log(e)
      })
      updateData.imageUrl = url;
    }

    await db
      .update(slideShowImages)
      .set(updateData)
      .where(eq(slideShowImages.id, parseInt(params.id)));

    throw redirect(303, '/admin/slideshow');
  }
}; 
