import { getRecords, deleteRecord } from '$lib/actions/records';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const records = await getRecords();
  return { records };
};

export const actions: Actions = {
  deleteRecord: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid record ID' });
    }

    await deleteRecord(parseInt(id));
    return { success: true };
  }
};
