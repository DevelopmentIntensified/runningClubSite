import { getLeaders } from '$lib/actions/leaders';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const leaders = await getLeaders();
  return { leaders };
};
