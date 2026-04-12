import { db } from '$lib/server/db';
import { pageImages } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const locationName = formData.get('locationName');
    const alt = formData.get('alt');
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    if (!locationName || !alt) {
      return fail(400, { message: 'Location and alt text are required' });
    }

    let finalImageUrl: string | null = imageUrl;
    
    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, {
        access: 'public',
        token: BLOB_READ_WRITE_TOKEN
      });
      finalImageUrl = url;
    }

    if (!finalImageUrl) {
      return fail(400, { message: 'Image is required' });
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
