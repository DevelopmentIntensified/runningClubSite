import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async () => {
  const news = await db.query.news.findMany({
    orderBy: [{ created_at: 'desc' }],
  });

  return {
    news,
  };
};

