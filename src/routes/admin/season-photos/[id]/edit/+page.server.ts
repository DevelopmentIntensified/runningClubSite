import { logAdminAction } from '$lib/actions/adminAudit';
import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { put, del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { objectDiff } from '$lib/utils/objectDiff';

export const load: PageServerLoad = async ({ params }) => {
  const [link] = await db.select().from(seasonImageLinks).where(eq(seasonImageLinks.id, parseInt(params.id)));
  if (!link) {
    throw redirect(302, '/admin/season-photos');
  }
  return { link };
};

export const actions: Actions = {
  updateLink: async ({ request, params, locals }) => {
    const formData = await request.formData();
    console.log('=== UPDATE LINK ===');
    console.log('title:', formData.get('title'));
    console.log('link:', formData.get('link'));
    console.log('season:', formData.get('season'));
    console.log('image (file):', formData.get('image'));
    console.log('imageUrl:', formData.get('imageUrl'));
    console.log('currentImageUrl:', formData.get('currentImageUrl'));
    
    const title = formData.get('title') as string | null;
    const linkValue = formData.get('link') as string | null;
    const season = formData.get('season') as string | null;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;
    const [currentLink] = await db.select().from(seasonImageLinks).where(eq(seasonImageLinks.id, parseInt(params.id)));
    const currentImageUrl = currentLink?.imageUrl || '';

    console.log('Parsed imageFile:', imageFile, 'size:', imageFile?.size);
    console.log('Parsed imageUrl:', imageUrl);

    const updateData: { title?: string; link?: string; season?: string; imageUrl?: string | null } = {};

    if (title) updateData.title = title;
    if (linkValue) updateData.link = linkValue;
    if (season) updateData.season = season;

    if (imageFile && imageFile.size > 0) {
      if (currentImageUrl) {
        await del(currentImageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e) => console.log(e));
      }
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      updateData.imageUrl = url;
    } else if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    try {
      const changes = objectDiff(currentLink, updateData);
      await db
        .update(seasonImageLinks)
        .set(updateData)
        .where(eq(seasonImageLinks.id, parseInt(params.id)));
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'update', targetType: 'season_photo', targetId: parseInt(params.id), details: JSON.stringify(changes) });
    } catch (error) {
      return fail(500, { message: 'Failed to update link' });
    }

    throw redirect(303, '/admin/season-photos');
  }
}; 
