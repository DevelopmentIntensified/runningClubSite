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
    const event = formData.get('event') as string | null;
    const name = formData.get('name') as string | null;
    const time = formData.get('time') as string | null;
    const yearStr = formData.get('year') as string | null;
    const gender = formData.get('gender') as string | null;
    const type = formData.get('type') as string | null;
    const link = formData.get('link') as string | null;

    const updateData: {
      event?: string;
      name?: string;
      time?: string;
      year?: number | null;
      gender?: string;
      type?: string;
      link?: string;
    } = {};

    if (event) updateData.event = event;
    if (name) updateData.name = name;
    if (time) updateData.time = time;
    if (yearStr) updateData.year = parseInt(yearStr);
    if (gender) updateData.gender = gender;
    if (type) updateData.type = type;
    if (link) updateData.link = link;

    const updatedRecord = await updateRecord(parseInt(params.id), updateData);

    if (updatedRecord) {
      throw redirect(302, '/admin/records');
    } else {
      return fail(500, { message: 'Failed to update record' });
    }
  }
};
