import { getNewsItem, updateNews } from '$lib/actions/news';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const newsItem = await getNewsItem(parseInt(params.id));
  if (!newsItem) {
    throw redirect(302, '/admin/news');
  }
  return { newsItem };
};

export const actions: Actions = {
  updateNews: async ({ request, params }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');

    if (!title || !content) {
      return fail(400, { message: 'Title and content are required' });
    }

    const updatedNews = await updateNews(parseInt(params.id), {
      title: title.toString(),
      content: content.toString(),
    });

    if (updatedNews) {
      throw redirect(302, '/admin/news');
    } else {
      return fail(500, { message: 'Failed to update news item' });
    }
  }
};

