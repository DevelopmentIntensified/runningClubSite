import { createAlumnus } from '$lib/actions/alumni';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createAlumnus: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const graduationYear = formData.get('graduationYear');
    const achievements = formData.get('achievements');
    const currentOccupation = formData.get('currentOccupation');
    const imageUrl = formData.get('imageUrl');

    if (!name || !graduationYear) {
      return fail(400, { message: 'Name and graduation year are required' });
    }

    const newAlumnus = await createAlumnus({
      name: name.toString(),
      graduationYear: parseInt(graduationYear.toString()),
      achievements: achievements?.toString() || null,
      currentOccupation: currentOccupation?.toString() || null,
      imageUrl: imageUrl?.toString() || null,
    });

    if (newAlumnus) {
      throw redirect(302, '/admin/alumni');
    } else {
      return fail(500, { message: 'Failed to create alumnus' });
    }
  }
};

