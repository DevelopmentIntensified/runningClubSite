import { db } from "$lib/server/db";
import { pageImages } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const [image] = await db.select().from(pageImages).where(eq(pageImages.locationName, 'Contact'));
  return {
    image
  };
}; 