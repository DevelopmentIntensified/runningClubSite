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
    const image = formData.get('image') as File;

    if (!locationName || !alt || !image) {
      return {
        success: false,
        message: 'All fields are required',
        status: 400
      }
    }

    if (!(image instanceof File)) {
      return {
        success: false,
        message: 'Invalid image file',
        status: 400
      }
    }

    try {
      const { url } = await put(image.name, image, {
        access: 'public',
        token: BLOB_READ_WRITE_TOKEN
      });

      await db.insert(pageImages).values({
        locationName: locationName.toString(),
        alt: alt.toString(),
        imageUrl: url
      });

    } catch (error) {
      console.error('Error uploading image:', error);
      return {
        success: false,
        status: 500,
        message: 'Error uploading image'
      }
    }
    throw redirect(302, '/admin/page-images');
  }
}; 
