import { db } from '$lib/server/db';
import { slideShowImages } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;
    const order = formData.get('order') as string;

    if (!title || !order) {
      return fail(400, { message: 'All fields are required' });
    }

    let finalImageUrl: string | null = imageUrl;
    
    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      finalImageUrl = url;
    }

    if (!finalImageUrl) {
      return fail(400, { message: 'Image is required' });
    }

    const orderNum = parseInt(order);
    if (isNaN(orderNum)) {
      return fail(400, { message: 'Order must be a number' });
    }

    await db.insert(slideShowImages).values({
      title,
      imageUrl: finalImageUrl,
      order: orderNum
    });

    throw redirect(303, '/admin/slideshow');
  }
}; 
