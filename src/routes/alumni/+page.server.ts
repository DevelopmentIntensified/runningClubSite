import { getAlumni } from '$lib/actions/alumni';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const alumni = await getAlumni();
  return { alumni };
};
