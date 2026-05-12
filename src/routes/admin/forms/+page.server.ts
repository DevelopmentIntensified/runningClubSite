import { logAdminAction } from '$lib/actions/adminAudit';
import { getForms, deleteForm } from '$lib/actions/forms';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const forms = await getForms();
  return { forms };
};

export const actions: Actions = {
  deleteForm: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { message: 'Invalid form ID' });
    }

    await deleteForm(parseInt(id));
    await logAdminAction({ adminId: parseInt(locals.user.id), action: 'delete', targetType: 'form', targetId: parseInt(id), details: JSON.stringify({ targetType: 'form', targetId: parseInt(id) }) });
    return { success: true };
  }
};