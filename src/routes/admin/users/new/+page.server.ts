import { createUser } from '$lib/actions/users';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createUser: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const isAdmin = formData.get('isAdmin');

    if (!email) {
      return fail(400, { message: 'Email is required' });
    }

    const newUser = await createUser({
      email: email.toString(),
      isAdmin: isAdmin === 'on'
    });

    if (newUser) {
      throw redirect(302, '/admin/users');
    } else {
      return fail(500, { message: 'Failed to create user' });
    }
  }
};
