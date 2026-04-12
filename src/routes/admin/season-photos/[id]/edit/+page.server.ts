import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

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
    const linkValue = formData.get('link') as string | null;
    const season = formData.get('season') as string | null;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    const updateData: { title?: string; link?: string; season?: string; imageUrl?: string | null } = {};

    if (title) updateData.title = title;
    if (linkValue) updateData.link = linkValue;
    if (season) updateData.season = season;

    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      updateData.imageUrl = url;
    } else if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

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