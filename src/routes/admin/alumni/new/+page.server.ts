import { logAdminAction } from '$lib/actions/adminAudit';
import { createAlumnus } from '$lib/actions/alumni';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions: Actions = {
  createAlumnus: async ({ request, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const major = formData.get('major') as string | null;
    const graduationYear = formData.get('graduationYear') as string;
    const achievements = formData.get('achievements') as string | null;
    const currentOccupation = formData.get('currentOccupation') as string | null;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    if (!name || !graduationYear) {
      return fail(400, { message: 'Name and graduation year are required' });
    }

    let finalImageUrl: string | null = imageUrl;
    
    if (imageFile && imageFile.size > 0) {
      const { url } = await put(imageFile.name, imageFile, { access: "public", token: BLOB_READ_WRITE_TOKEN });
      finalImageUrl = url;
    }

    const newAlumnus = await createAlumnus({
      name: name,
      major: major,
      graduationYear: parseInt(graduationYear),
      achievements: achievements || null,
      currentOccupation: currentOccupation || null,
      imageUrl: finalImageUrl
    });

    if (newAlumnus) {
      await logAdminAction({ adminId: parseInt(locals.user.id), action: 'create', targetType: 'alumnus', targetId: newAlumnus.id, details: JSON.stringify({ name }) });
      throw redirect(302, '/admin/alumni');
    } else {
      return fail(500, { message: 'Failed to create alumnus' });
    }
  }
};
