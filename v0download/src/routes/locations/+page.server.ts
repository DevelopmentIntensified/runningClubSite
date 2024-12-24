import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { locations } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
  const locationsData = await db.select().from(locations);

  return {
    locations: locationsData,
  };
};

