import { getRecord, updateRecord } from '$lib/actions/records';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const record = await getRecord(parseInt(params.id));
  if (!record) {
    throw redirect(302, '/admin/records');
  }
  return { record };
};

export const actions: Actions = {
  updateRecord: async ({ request, params }) => {
    const formData = await request.formData();
    const event = formData.get('event');
    const name = formData.get('name');
    const time = formData.get('time');
    const yearStr = formData.get('year') as string;
    const gender = formData.get('gender');
    const type = formData.get('type');
    const link = formData.get('link') as string;

    if (!event || !name || !time || !gender || !type) {
      return fail(400, { message: 'All fields are required' });
    }

    const year = yearStr ? parseInt(yearStr) : null;

    const updatedRecord = await updateRecord(parseInt(params.id), {
      event: event.toString(),
      name: name.toString(),
      time: time.toString(),
      year,
      gender: gender.toString(),
      type: type.toString(),
      link
    });

    if (updatedRecord) {
      throw redirect(302, '/admin/records');
    } else {
      return fail(500, { message: 'Failed to update record' });
    }
  }
};
