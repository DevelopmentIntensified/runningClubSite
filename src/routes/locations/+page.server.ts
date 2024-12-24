import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { locations } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  const locationsData = await db.select().from(locations);

  return {
    locations: locationsData,
  };
};

