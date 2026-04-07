import { getFormsActive } from '$lib/actions/forms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const forms = await getFormsActive();
  return { forms };
};