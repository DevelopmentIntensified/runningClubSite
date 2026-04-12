import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createLink: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const link = formData.get('link') as string;
    const season = formData.get('season') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (!title || !link || !season) {
      return fail(400, { message: 'Title, link, and season are required' });
    }

    try {
      await db.insert(seasonImageLinks).values({
        title,
        link,
        season,
        imageUrl: imageUrl || null
      });
    } catch (error) {
      return fail(500, { message: 'Failed to create link' });
    }

    throw redirect(303, '/admin/season-photos');
  }
}; 