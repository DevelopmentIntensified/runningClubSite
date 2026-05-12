import { logAdminAction } from '$lib/actions/adminAudit';
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
    const active = formData.get('active') === 'on';

    if (!title || !externalUrl) {
      return fail(400, { message: 'Title and URL are required' });
    }

    await updateForm(id, {
      title,
      description,
      externalUrl,
      active
    });
    await logAdminAction({ adminId: parseInt(locals.user.id), action: 'update', targetType: 'form', targetId: id, details: JSON.stringify({ title }) });

    throw redirect(302, '/admin/forms');
  }
};