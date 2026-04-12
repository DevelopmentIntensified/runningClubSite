// @ts-nocheck
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';
import { formatDate } from '$lib/utils/dateUtils';
import { pageImages } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async () => {
  const eventsData = await db.select().from(events).orderBy(events.start);
  const [image] = await db.select().from(pageImages).where(eq(pageImages.locationName, 'Schedule'));

  return {
    events: eventsData,
    image
  };
};
