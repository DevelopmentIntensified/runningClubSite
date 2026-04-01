import { createNews } from '$lib/actions/news';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions: Actions = {
  createNews: async ({ request, locals }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const image = formData.get('image') as File;

    if (!title || !content) {
      return fail(400, { message: 'Title and content are required' });
    }

    if (!image || !(image instanceof File)) {
      return fail(400, { message: 'Image is required' });
    }

    try {
      const { url } = await put(image.name, image, { access: "public", token: BLOB_READ_WRITE_TOKEN });

      const newNews = await createNews({
        title: title.toString(),
        imageUrl: url,
        content: content.toString(),
        createdBy: locals.user?.id ?? 0
      });

    } catch (error) {
      console.error('Error creating news item:', error);
      return fail(500, { message: 'Failed to create news item' });
    }
    throw redirect(302, '/admin/news');
  }
};
