import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const links = await db.select().from(seasonImageLinks).orderBy(seasonImageLinks.createdAt);
  return { links };
};

export const actions: Actions = {
  deleteLink: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    if (!id) {
      return fail(400, { message: 'ID is required' });
    }

    try {
      await db.delete(seasonImageLinks).where(eq(seasonImageLinks.id, parseInt(id as string)));
    } catch (error) {
      return fail(500, { message: 'Failed to delete link' });
    }

    throw redirect(303, '/admin/season-photos');
  }
}; 
