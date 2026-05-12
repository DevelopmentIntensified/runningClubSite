import { logAdminAction } from '$lib/actions/adminAudit';
import { createLeader, getLeadersCount } from '$lib/actions/leaders';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async () => {
  const leadersCount = await getLeadersCount();
  return { leadersCount };
};

export const actions: Actions = {
  createLeader: async ({ request, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const bio = formData.get('bio') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;
    const order = formData.get('order') as string;
    const active = formData.get('active') === 'on';

    if (!name || !position) {
      return fail(400, { message: 'Name and position are required' });
    }

    let finalImageUrl: string | null = imageUrl;
    
    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      finalImageUrl = url;
    }

    if (!finalImageUrl) {
      return fail(400, { message: 'Image is required' });
    }

    const newLeader = await createLeader({
      name,
      position,
      order: parseInt(order),
      bio,
      imageUrl: finalImageUrl,
      active
    });

    if (newLeader) {
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'create', targetType: 'leader', targetId: newLeader.id, details: JSON.stringify({ name }) });
      throw redirect(302, '/admin/leaders');
    } else {
      return fail(500, { message: 'Failed to create leader' });
    }
  }
};
