import { getForm, updateForm } from '$lib/actions/forms';
import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const id = parseInt(params.id);
  const form = await getForm(id);
  
  if (!form) {
    throw error(404, 'Form not found');
  }
  
  return { form };
};

export const actions: Actions = {
  updateForm: async ({ request, params, locals }) => {
    const id = parseInt(params.id);
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const externalUrl = formData.get('externalUrl') as string;
    const embedCode = formData.get('embedCode') as string;
    const active = formData.get('active') === 'on';

    if (!title || !externalUrl) {
      return fail(400, { message: 'Title and URL are required' });
    }

    await updateForm(id, {
      title,
      description,
      externalUrl,
      embedCode: embedCode || null,
      active
    });

    throw redirect(302, '/admin/forms');
  }
};