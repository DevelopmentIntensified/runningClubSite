import { getAlumnus, updateAlumnus } from '$lib/actions/alumni';
import { fail, redirect } from '@sveltejs/kit';
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
    const name = formData.get('name');
    const major = formData.get('major');
    const graduationYear = formData.get('graduationYear');
    const achievements = formData.get('achievements');
    const currentOccupation = formData.get('currentOccupation');
    const imageUrl = formData.get('imageUrl');

    if (!name || !graduationYear) {
      return fail(400, { message: 'Name and graduation year are required' });
    }

    const updatedAlumnus = await updateAlumnus(parseInt(params.id), {
      name: name.toString(),
      major: major.toString(),
      graduationYear: parseInt(graduationYear.toString()),
      achievements: achievements?.toString() || null,
      currentOccupation: currentOccupation?.toString() || null,
      imageUrl: imageUrl?.toString() || null,
    });

    if (updatedAlumnus) {
      throw redirect(302, '/admin/alumni');
    } else {
      return fail(500, { message: 'Failed to update alumnus' });
    }
  }
};

