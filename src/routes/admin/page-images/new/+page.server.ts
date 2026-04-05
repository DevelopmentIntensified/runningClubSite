import { db } from '$lib/server/db';
import { pageImages } from '$lib/server/db/schema';
import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const locationName = formData.get('locationName');
    const alt = formData.get('alt');
    const image = formData.get('image') as File;
    const imageUrl = formData.get('imageUrl') as string;

    if (!locationName || !alt) {
      return fail(400, { message: 'Location and alt text are required' });
    }

    let finalImageUrl = imageUrl;
    
    if (!finalImageUrl && image.size > 0) {
      const { url } = await put(image.name, image, {
        access: 'public',
        token: BLOB_READ_WRITE_TOKEN
      });
      finalImageUrl = url;
    }

    if (!finalImageUrl) {
      throw error(400, { message: "No image" });
    }

    try {
      await db.insert(pageImages).values({
        locationName: locationName.toString(),
        alt: alt.toString(),
        imageUrl: finalImageUrl
      });

    } catch (err) {
      console.error('Error uploading image:', err);
      return fail(500, { message: 'Error uploading image' });
    }
    throw redirect(302, '/admin/page-images');
  }
}; 
