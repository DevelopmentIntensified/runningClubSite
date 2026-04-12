import { getAlumnus, updateAlumnus } from '$lib/actions/alumni';
import { fail, redirect } from '@sveltejs/kit';
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
    const name = formData.get('name') as string | null;
    const major = formData.get('major') as string | null;
    const graduationYear = formData.get('graduationYear') as string | null;
    const achievements = formData.get('achievements') as string | null;
    const currentOccupation = formData.get('currentOccupation') as string | null;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    const updateData: {
      name?: string;
      major?: string;
      graduationYear?: number;
      achievements?: string | null;
      currentOccupation?: string | null;
      imageUrl?: string;
    } = {};

    if (name) updateData.name = name;
    if (major) updateData.major = major;
    if (graduationYear) updateData.graduationYear = parseInt(graduationYear);
    if (achievements !== null) updateData.achievements = achievements || null;
    if (currentOccupation !== null) updateData.currentOccupation = currentOccupation || null;

    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      if (currentImageUrl) {
        del(currentImageUrl, { token: BLOB_READ_WRITE_TOKEN }).catch((e) => console.log(e));
      }
      updateData.imageUrl = url;
    } else if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const updatedAlumnus = await updateAlumnus(parseInt(params.id), updateData);

    if (updatedAlumnus) {
      throw redirect(302, '/admin/alumni');
    } else {
      return fail(500, { message: 'Failed to update alumnus' });
    }
  }
};
