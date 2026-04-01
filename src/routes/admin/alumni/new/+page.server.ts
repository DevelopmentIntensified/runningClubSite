import { createAlumnus } from '$lib/actions/alumni';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions: Actions = {
  createAlumnus: async ({ request }) => {
    console.log('Creating new alumnus');
    const formData = await request.formData();
    const name = formData.get('name');
    const major = formData.get('major');
    const graduationYear = formData.get('graduationYear');
    const achievements = formData.get('achievements');
    const currentOccupation = formData.get('currentOccupation');
    const image = formData.get('image') as File;

    if (!name || !graduationYear) {
      return fail(400, { message: 'Name and graduation year are required' });
    }

    if (!image || image.size < 1) {
      throw error(400, { message: "No image" });
    }

    console.log('Uploading image');
    console.log(image);
    console.log(image.name);
    const { url } = await put(image.name, image, { access: "public", token: BLOB_READ_WRITE_TOKEN });
    const newAlumnus = await createAlumnus({
      name: name.toString(),
      major: major?.toString() || null,
      graduationYear: parseInt(graduationYear.toString()),
      achievements: achievements?.toString() || null,
      currentOccupation: currentOccupation?.toString() || null,
      imageUrl: url
    });

    if (newAlumnus) {
      throw redirect(302, '/admin/alumni');
    } else {
      return fail(500, { message: 'Failed to create alumnus' });
    }
  }
};
