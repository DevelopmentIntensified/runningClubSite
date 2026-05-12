import { logAdminAction } from '$lib/actions/adminAudit';
import { getLeader, updateLeader } from '$lib/actions/leaders';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { del, put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { objectDiff } from '$lib/utils/objectDiff';

export const load: PageServerLoad = async ({ params }) => {
  const leader = await getLeader(parseInt(params.id));
  if (!leader) {
    throw redirect(302, '/admin/leaders');
  }
  return { leader };
};

export const actions: Actions = {
  updateLeader: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const bio = formData.get('bio') as string;
    const order = formData.get('order') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;
    const currentImageUrl = formData.get('currentImageUrl') as string;
    const active = formData.get('active') === 'on';

    if (!name || !position) {
      return fail(400, { message: 'Name and position are required' });
    }

    const existingLeader = await getLeader(parseInt(params.id));

    let finalImageUrl = currentImageUrl;

    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      if (currentImageUrl) {
        await del(currentImageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e) => {
          console.log(e);
        });
      }
      finalImageUrl = url;
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    }

    const updateData = { name, position, order: parseInt(order), bio, imageUrl: finalImageUrl, active };
    const updatedLeader = await updateLeader(parseInt(params.id), updateData);

    if (updatedLeader) {
      const changes = objectDiff(existingLeader, updateData);
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'update', targetType: 'leader', targetId: parseInt(params.id), details: JSON.stringify(changes) });
      throw redirect(302, '/admin/leaders');
    } else {
      return fail(500, { message: 'Failed to update leader' });
    }
  }
};
