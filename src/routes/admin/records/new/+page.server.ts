import { logAdminAction } from '$lib/actions/adminAudit';
import { createRecord } from '$lib/actions/records';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createRecord: async ({ request, locals }) => {
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

    const newRecord = await createRecord({
      event: event.toString(),
      name: name.toString(),
      time: time.toString(),
      year,
      gender: gender.toString(),
      type: type.toString(),
      link: link || null
    });

    if (newRecord) {
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'create', targetType: 'record', targetId: newRecord.id, details: JSON.stringify({ created: { event: event.toString(), name: name.toString(), time: time.toString(), year, gender: gender.toString(), type: type.toString(), link: link || null } }) });
      throw redirect(302, '/admin/records');
    } else {
      return fail(500, { message: 'Failed to create record' });
    }
  }
};
