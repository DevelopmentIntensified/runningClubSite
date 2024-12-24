import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { alumni } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
  const alumniData = await db.select().from(alumni).orderBy(alumni.graduation_year);

  return {
    alumni: alumniData,
  };
};

