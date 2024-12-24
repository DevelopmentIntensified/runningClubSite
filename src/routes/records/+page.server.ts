import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { records } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  const recordsData = await db.select().from(records).orderBy(records.event);

  return {
    records: recordsData,
  };
};


