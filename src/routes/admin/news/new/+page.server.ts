import { createNews } from '$lib/actions/news';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createNews: async ({ request, locals }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const content = formData.get('content');

    if (!title || !content) {
      return fail(400, { message: 'Title and content are required' });
    }

    const newNews = await createNews({
      title: title.toString(),
      imageUrl: imageUrl.toString(),
      content: content.toString(),
      userId: locals.user?.id // Replace with actual user ID when authentication is implemented
    });

    if (newNews) {
      throw redirect(302, '/admin/news');
    } else {
      return fail(500, { message: 'Failed to create news item' });
    }
  }
};
