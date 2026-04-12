import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions: Actions = {
  createLink: async ({ request }) => {
    const formData = await request.formData();
    console.log('=== CREATE LINK ===');
    console.log('title:', formData.get('title'));
    console.log('link:', formData.get('link'));
    console.log('season:', formData.get('season'));
    console.log('image (file):', formData.get('image'));
    console.log('imageUrl:', formData.get('imageUrl'));
    
    const title = formData.get('title') as string;
    const link = formData.get('link') as string;
    const season = formData.get('season') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    console.log('Parsed imageFile:', imageFile, 'size:', imageFile?.size);
    console.log('Parsed imageUrl:', imageUrl);

    if (!title || !link || !season) {
      return fail(400, { message: 'Title, link, and season are required' });
    }

    let finalImageUrl: string | null = imageUrl;
    
    if (imageFile && imageFile.size > 0) {
      console.log('Uploading file to blob...');
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      console.log('Blob url:', url);
      finalImageUrl = url;
    }

    console.log('finalImageUrl to save:', finalImageUrl);

    try {
      await db.insert(seasonImageLinks).values({
        title,
        link,
        season,
        imageUrl: finalImageUrl
      });
      console.log('Inserted successfully');
    } catch (error) {
      console.error('Insert error:', error);
      return fail(500, { message: 'Failed to create link' });
    }

    throw redirect(303, '/admin/season-photos');
  }
}; 