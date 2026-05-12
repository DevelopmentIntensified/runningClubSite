import { logAdminAction } from '$lib/actions/adminAudit';
import { createNews } from '$lib/actions/news';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions: Actions = {
  createNews: async ({ request, locals }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    if (!title || !content) {
      return fail(400, { message: 'Title and content are required' });
    }

    let finalImageUrl: string | null = null;
    
    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      finalImageUrl = url;
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    }

    if (!finalImageUrl) {
      return fail(400, { message: 'Image is required' });
    }

    try {
      const newNews = await createNews({
        title: title,
        imageUrl: finalImageUrl,
        content: content,
        createdBy: locals.user?.id!
      });
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'create', targetType: 'news', details: JSON.stringify({ title }) });
    } catch (error) {
      console.error('Error creating news item:', error);
      return fail(500, { message: 'Failed to create news item' });
    }
    throw redirect(302, '/admin/news');
  }
};
