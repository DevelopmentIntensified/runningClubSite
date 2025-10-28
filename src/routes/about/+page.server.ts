import { getLeaders } from '$lib/actions/leaders';
import { db } from "$lib/server/db";
import { leaders, pageImages } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const leadersData = await db.select().from(leaders)
  .where(eq(leaders.active, true))
  .orderBy(leaders.order);
  const [image] = await db.select().from(pageImages).where(eq(pageImages.locationName, 'About'));
  return {
    leaders: leadersData,
    image
  };
};
