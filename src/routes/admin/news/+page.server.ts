import { logAdminAction } from '$lib/actions/adminAudit';
import { getNews, deleteNews } from '$lib/actions/news';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const news = await getNews();
  return { news };
};

export const actions: Actions = {
  deleteNews: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid news ID' });
    }

    await deleteNews(parseInt(id));
    await logAdminAction({ adminId: parseInt(locals.user.id), action: 'delete', targetType: 'news', targetId: parseInt(id), details: JSON.stringify({ targetType: 'news', targetId: parseInt(id) }) });
    return { success: true };
  }
};
