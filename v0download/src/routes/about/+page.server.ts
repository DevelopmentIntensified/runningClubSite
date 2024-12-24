import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { leaders } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
  const leadersData = await db.select().from(leaders);

  return {
    leaders: leadersData,
  };
};

