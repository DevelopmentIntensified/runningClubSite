import { logAdminAction } from '$lib/actions/adminAudit';
import { createLeader } from '$lib/actions/leaders';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const position = formData.get('position');
    const bio = formData.get('bio');
    const imageUrl = formData.get('imageUrl');

    if (!name || !position) {
      return fail(400, { message: 'Name and position are required' });
    }

    const newuser = await createLeader({
      name: name.toString(),
      position: position.toString(),
      bio: bio?.toString() || null,
      imageUrl: imageUrl?.toString() || null,
      order: 0,
      active: true
    });

    if (newuser) {
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'create', targetType: 'user', details: JSON.stringify({ created: { name: name.toString(), position: position.toString(), bio: bio?.toString() || null, imageUrl: imageUrl?.toString() || null } }) });
      throw redirect(302, '/admin/users');
    } else {
      return fail(500, { message: 'Failed to create user' });
    }
  }
};
