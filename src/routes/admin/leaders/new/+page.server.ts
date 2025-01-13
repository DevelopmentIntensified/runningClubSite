import { createLeader, getLeadersCount } from '$lib/actions/leaders';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async () => {
  const leadersCount = await getLeadersCount();
  return { leadersCount };
};

export const actions: Actions = {
  createLeader: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const bio = formData.get('bio') as string;
    const image = formData.get('image') as File;
    const order = formData.get('order') as string;

    if (!name || !position) {
      return fail(400, { message: 'Name and position are required' });
    }

    if (!image) {
      throw error(400, { message: "No image" });
    }
    const { url } = await put(image.name, image, { access: "public", token: BLOB_READ_WRITE_TOKEN });
    const newLeader = await createLeader({
      name,
      position,
      order: parseInt(order),
      bio,
      imageUrl: url
    });

    if (newLeader) {
      throw redirect(302, '/admin/leaders');
    } else {
      return fail(500, { message: 'Failed to create leader' });
    }
  }
};
