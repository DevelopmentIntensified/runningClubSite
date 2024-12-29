import { getRecords } from '$lib/actions/records';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const records = await getRecords();
  return { records };
};

