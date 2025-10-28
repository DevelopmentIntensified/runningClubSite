import { getLocations } from '$lib/actions/locations';
import { db } from "$lib/server/db";
import { pageImages } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const locations = await getLocations();
  const [image] = await db.select().from(pageImages).where(eq(pageImages.locationName, 'Locations'));
  return {
    locations,
    image
  };
};
