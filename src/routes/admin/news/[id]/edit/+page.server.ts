import { getNewsItem, updateNews } from '$lib/actions/news';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { put, del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

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
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    if (!title || !content) {
      return fail(400, { message: 'Title and content are required' });
    }

    try {
      let finalImageUrl = imageUrl || '';

      if (imageFile && imageFile.size > 0) {
        const { url } = await put(imageFile.name, imageFile, {
          access: 'public',
          token: BLOB_READ_WRITE_TOKEN
        });
        finalImageUrl = url;
      } else if (imageUrl) {
        finalImageUrl = imageUrl;
      }

      const updatedNews = await updateNews(parseInt(params.id), {
        title: title.toString(),
        imageUrl: finalImageUrl,
        content: content.toString()
      });

    } catch (error) {
      console.error('Error updating news item:', error);
      return fail(500, { message: 'Failed to update news item' });
    }
        throw redirect(302, '/admin/news');
  }
};