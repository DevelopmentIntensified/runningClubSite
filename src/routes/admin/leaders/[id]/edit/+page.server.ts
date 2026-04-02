import { getLeader, updateLeader } from '$lib/actions/leaders';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { del, put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
  const leader = await getLeader(parseInt(params.id));
  if (!leader) {
    throw redirect(302, '/admin/leaders');
  }
  return { leader };
};

export const actions: Actions = {
  updateLeader: async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string | null;
    const position = formData.get('position') as string | null;
    const bio = formData.get('bio') as string | null;
    const order = formData.get('order') as string | null;
    const image = formData.get('image') as File;
    const active = formData.get('active') === 'on';
    let imageUrl = formData.get('imageUrl') as string;

    const updateData: {
      name?: string;
      position?: string;
      bio?: string;
      order?: number;
      imageUrl?: string;
      active?: boolean;
    } = {};

    if (name) updateData.name = name;
    if (position) updateData.position = position;
    if (bio) updateData.bio = bio;
    if (order) updateData.order = parseInt(order);
    updateData.active = active;

    if (image && image.size > 0) {
      const { url } = await put(image.name, image, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      await del(imageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e)=>{
        console.log(e)
      })
      updateData.imageUrl = url;
    }

    const updatedLeader = await updateLeader(parseInt(params.id), updateData);

    if (updatedLeader) {
      throw redirect(302, '/admin/leaders');
    } else {
      return fail(500, { message: 'Failed to update leader' });
    }
  }
};
