import { getLocations } from '$lib/actions/locations';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const locations = await getLocations();
  return { locations };
};
