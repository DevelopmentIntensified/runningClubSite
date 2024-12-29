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
    const email = formData.get('email');
    const isAdmin = formData.get('isAdmin');
    const bio = formData.get('bio');
    const imageUrl = formData.get('imageUrl');

    if (!email || !isAdmin) {
      return fail(400, { message: 'Name and position are required' });
    }

    const updatedUser = await updateUser(parseInt(params.id), {
      email: email.toString(),
      isAdmin: isAdmin === "true",
    });

    if (updatedUser) {
      throw redirect(302, '/admin/Users');
    } else {
      return fail(500, { message: 'Failed to update User' });
    }
  }
};

