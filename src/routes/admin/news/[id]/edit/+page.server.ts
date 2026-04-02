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
    const title = formData.get('title');
    const content = formData.get('content');
    const image = formData.get('image') as File;
    const currentImageUrl = formData.get('currentImageUrl') as string;

    if (!title || !content) {
      return fail(400, { message: 'Title and content are required' });
    }

    try {
      let imageUrl = currentImageUrl;

      if (image && image instanceof File && image.size > 0) {
        // Delete the old image
        await del(currentImageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e) => {
          console.log('Error deleting old image:', e);
        });

        // Upload the new image
        const { url } = await put(image.name, image, {
          access: 'public',
          token: BLOB_READ_WRITE_TOKEN
        });
        imageUrl = url;
      }

      const updatedNews = await updateNews(parseInt(params.id), {
        title: title.toString(),
        imageUrl,
        content: content.toString()
      });

    } catch (error) {
      console.error('Error updating news item:', error);
      return fail(500, { message: 'Failed to update news item' });
    }
        throw redirect(302, '/admin/news');
  }
};
