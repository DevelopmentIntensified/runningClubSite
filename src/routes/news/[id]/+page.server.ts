import { getNewsItem } from '$lib/actions/news';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const newsItem = await getNewsItem(parseInt(params.id));
  
  if (!newsItem) {
    throw error(404, 'News article not found');
  }

  return { newsItem };
}; 