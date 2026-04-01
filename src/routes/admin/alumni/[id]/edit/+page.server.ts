import { getAlumnus, updateAlumnus } from '$lib/actions/alumni';
import { fail, redirect, error } from '@sveltejs/kit';
import { del, put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const alumnus = await getAlumnus(parseInt(params.id));
  if (!alumnus) {
    throw redirect(302, '/admin/alumni');
  }
  return { alumnus };
};

export const actions: Actions = {
  updateAlumnus: async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const major = formData.get('major') as string;
    const graduationYear = formData.get('graduationYear') as string;
    const achievements = formData.get('achievements') as string;
    const currentOccupation = formData.get('currentOccupation') as string;
    const image = formData.get('image') as File;
    const imageUrl = formData.get('imageUrl') as string;

    if (!name || !graduationYear) {
      return fail(400, { message: 'Name and graduation year are required' });
    }

    const updateData: {
      name: string;
      major: string;
      graduationYear: number;
      achievements: string | null;
      currentOccupation: string | null;
      imageUrl?: string;
    } = {
      name,
      major,
      graduationYear: parseInt(graduationYear),
      achievements: achievements || null,
      currentOccupation: currentOccupation || null
    };

    if (image && image.size > 0) {
      const { url } = await put(image.name, image, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      if (imageUrl !== null && imageUrl !== '') {
        console.log(imageUrl);
        del(imageUrl, { token: BLOB_READ_WRITE_TOKEN });
      }
      updateData.imageUrl = url;
    }

    const updatedAlumnus = await updateAlumnus(parseInt(params.id), updateData);

    if (updatedAlumnus) {
      throw redirect(302, '/admin/alumni');
    } else {
      return fail(500, { message: 'Failed to update alumnus' });
    }
  }
};
