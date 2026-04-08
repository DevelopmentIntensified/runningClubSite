import { getForm } from '$lib/actions/forms';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const id = parseInt(params.id);
  const form = await getForm(id);
  
  if (!form || !form.active) {
    throw error(404, 'Form not found');
  }
  
  const isAdmin = locals.user?.isAdmin ?? false;
  
  return { form, isAdmin };
};