import { createForm } from '$lib/actions/forms';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  createForm: async ({ request, locals }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const externalUrl = formData.get('externalUrl') as string;
    const embed = formData.get('embed') === 'on';
    const active = formData.get('active') === 'on';

    if (!title || !externalUrl) {
      return fail(400, { message: 'Title and URL are required' });
    }

    const userId = locals.user?.id;
    if (!userId) {
      return fail(401, { message: 'Unauthorized' });
    }

    await createForm({
      title,
      description,
      externalUrl,
      embed,
      active,
      createdBy: userId
    });

    throw redirect(302, '/admin/forms');
  }
};