import { db } from '$lib/server/db';
import { slideShowImages } from '$lib/server/db/schema';
import { fail, redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const image = formData.get('image') as File;
    const order = formData.get('order') as string;

    if (!title || !image || !order) {
      return fail(400, { message: 'All fields are required' });
    }

    if (!image) {
      throw error(400, { message: "No image" });
    }

    const { url } = await put(image.name, image, { access: "public", token: BLOB_READ_WRITE_TOKEN });

    const orderNum = parseInt(order);
    if (isNaN(orderNum)) {
      return fail(400, { message: 'Order must be a number' });
    }

    await db.insert(slideShowImages).values({
      title,
      imageUrl: url,
      order: orderNum
    });

    throw redirect(303, '/admin/slideshow');
  }
}; 
