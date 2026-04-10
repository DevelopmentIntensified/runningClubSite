import { getUser, updateUser } from '$lib/actions/users';
import { deleteUserSessions } from '$lib/actions/sessions';
import { fail, redirect } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESENDAPIKEY } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

const resend = new Resend(RESENDAPIKEY);

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

    const existingUser = await getUser(parseInt(params.id));
    const userId = parseInt(params.id);
    
    const updatedUser = await updateUser(userId, updateData);

    if (updatedUser) {
      await deleteUserSessions(userId);
      
      if (existingUser && existingUser.email !== email && email) {
        try {
          await resend.contacts.delete({
            email: existingUser.email
          });
          await resend.contacts.create({
            email
          });
        } catch (resendError) {
          console.error('Resend sync error:', resendError);
        }
      }
      throw redirect(302, '/admin/users');
    } else {
      return fail(500, { message: 'Failed to update User' });
    }
  }
};
