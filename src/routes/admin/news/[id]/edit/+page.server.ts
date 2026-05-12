import { logAdminAction } from '$lib/actions/adminAudit';
import { getNewsItem, updateNews } from '$lib/actions/news';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { put, del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { objectDiff } from '$lib/utils/objectDiff';

export const load: PageServerLoad = async ({ params }) => {
  const newsItem = await getNewsItem(parseInt(params.id));
  if (!newsItem) {
    throw redirect(302, '/admin/news');
  }
  return { newsItem };
};

export const actions: Actions = {
  updateNews: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;
    const currentImageUrl = formData.get('currentImageUrl') as string || '';

    if (!title || !content) {
      return fail(400, { message: 'Title and content are required' });
    }

    const existingNews = await getNewsItem(parseInt(params.id));

    try {
      let finalImageUrl = currentImageUrl;

      if (imageFile && imageFile.size > 0) {
        if (currentImageUrl) {
          await del(currentImageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e) => {
            console.log('Error deleting old image:', e);
          });
        }
        const { url } = await put(imageFile.name, imageFile, {
          access: 'public',
          token: BLOB_READ_WRITE_TOKEN
        });
        finalImageUrl = url;
      } else if (imageUrl) {
        finalImageUrl = imageUrl;
      }

      const updateData = { title: title.toString(), imageUrl: finalImageUrl, content: content.toString() };
      const updatedNews = await updateNews(parseInt(params.id), updateData);
      const changes = objectDiff(existingNews, updateData);
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'update', targetType: 'news', targetId: parseInt(params.id), details: JSON.stringify(changes) });
    } catch (error) {
      console.error('Error updating news item:', error);
      return fail(500, { message: 'Failed to update news item' });
    }
        throw redirect(302, '/admin/news');
  }
};
