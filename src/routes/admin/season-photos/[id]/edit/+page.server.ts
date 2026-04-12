import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
  const [link] = await db.select().from(seasonImageLinks).where(eq(seasonImageLinks.id, parseInt(params.id)));
  if (!link) {
    throw redirect(302, '/admin/season-photos');
  }
  return { link };
};

export const actions: Actions = {
  updateLink: async ({ request, params }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string | null;
    const link = formData.get('link') as string | null;
    const season = formData.get('season') as string | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    const updateData: { title?: string; link?: string; season?: string; imageUrl?: string | null } = {};

    if (title) updateData.title = title;
    if (link) updateData.link = link;
    if (season) updateData.season = season;
    if (imageUrl !== null) updateData.imageUrl = imageUrl || null;

    try {
      await db
        .update(seasonImageLinks)
        .set(updateData)
        .where(eq(seasonImageLinks.id, parseInt(params.id)));
    } catch (error) {
      return fail(500, { message: 'Failed to update link' });
    }

    throw redirect(303, '/admin/season-photos');
  }
}; 