import { getNews } from '$lib/actions/news';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const news = await getNews();
  return { news };
};
