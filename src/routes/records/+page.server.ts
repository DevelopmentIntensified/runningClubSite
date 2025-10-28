import { getRecords } from '$lib/actions/records';
import { db } from "$lib/server/db";
import { pageImages } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const records = await getRecords();
  const [girlsImage] = await db.select().from(pageImages).where(eq(pageImages.locationName, 'Girls Records'));
  const [boysImage] = await db.select().from(pageImages).where(eq(pageImages.locationName, 'Boys Records'));
  return {
    records,
    girlsImage,
    boysImage
  };
};
