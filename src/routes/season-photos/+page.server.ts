import { db } from '$lib/server/db';
import { seasonImageLinks, pageImages } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const links = await db.select().from(seasonImageLinks).orderBy(seasonImageLinks.createdAt);

  const [heroImage] = await db.select().from(pageImages).where(eq(pageImages.locationName, 'Season Photos Hero'));

  return {
    links,
    heroImage: heroImage || null
  };
}; 