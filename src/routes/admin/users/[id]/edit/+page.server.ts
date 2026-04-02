import { getUser, updateUser } from '$lib/actions/users';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const User = await getUser(parseInt(params.id));
  if (!User) {
    throw redirect(302, '/admin/users');
  }
  return { User };
};

export const actions: Actions = {
  updateUser: async ({ request, params }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string | null;
    const isAdmin = formData.get('isAdmin') as string | null;
    const bio = formData.get('bio') as string | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    const updateData: {
      email?: string;
      isAdmin?: boolean;
    } = {};

    if (email) updateData.email = email;
    if (isAdmin) updateData.isAdmin = isAdmin === 'true';

    const updatedUser = await updateUser(parseInt(params.id), updateData);

    if (updatedUser) {
      throw redirect(302, '/admin/users');
    } else {
      return fail(500, { message: 'Failed to update User' });
    }
  }
};
