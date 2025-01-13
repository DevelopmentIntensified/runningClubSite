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
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const bio = formData.get('bio') as string;
    const order = formData.get('order') as string;
    const image = formData.get('image') as File;
    let imageUrl = formData.get('imageUrl') as string;
    console.log(image,imageUrl)
    console.log(bio)

    if (!name || !position) {
      return fail(400, { message: 'Name and position are required' });
    }

    if (image.size > 0) {
      const { url } = await put(image.name, image, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      await del(imageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e)=>{
        console.log(e)
      })
      imageUrl = url
    }

    const updatedLeader = await updateLeader(parseInt(params.id), {
      name,
      position,
      order: parseInt(order),
      bio,
      imageUrl
    });

    if (updatedLeader) {
      throw redirect(302, '/admin/leaders');
    } else {
      return fail(500, { message: 'Failed to update leader' });
    }
  }
};
