import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions: Actions = {
  createLink: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const link = formData.get('link') as string;
    const season = formData.get('season') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    if (!title || !link || !season) {
      return fail(400, { message: 'Title, link, and season are required' });
    }

    let finalImageUrl: string | null = imageUrl;
    
    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      finalImageUrl = url;
    }

    try {
      await db.insert(seasonImageLinks).values({
        title,
        link,
        season,
        imageUrl: finalImageUrl
      });
    } catch (error) {
      return fail(500, { message: 'Failed to create link' });
    }

    throw redirect(303, '/admin/season-photos');
  }
}; 