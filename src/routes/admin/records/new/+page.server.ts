import { createRecord } from '$lib/actions/records';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createRecord: async ({ request }) => {
    const formData = await request.formData();
    const event = formData.get('event');
    const name = formData.get('name');
    const time = formData.get('time');
    const year = formData.get('year');
    const gender = formData.get('gender');
    const type = formData.get('type');

    if (!event || !name || !time || !year || !gender || !type) {
      return fail(400, { message: 'All fields are required' });
    }

    const newRecord = await createRecord({
      event: event.toString(),
      name: name.toString(),
      time: time.toString(),
      year: parseInt(year.toString()),
      gender: gender.toString(),
      type: type.toString()
    });

    if (newRecord) {
      throw redirect(302, '/admin/records');
    } else {
      return fail(500, { message: 'Failed to create record' });
    }
  }
};
