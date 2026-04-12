import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const links = await db.select().from(seasonImageLinks).orderBy(seasonImageLinks.createdAt);

  return {
    links
  };
}; 