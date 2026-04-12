import { db } from '$lib/server/db';
import { alumniNewsletter } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const signups = await db.select().from(alumniNewsletter).orderBy(alumniNewsletter.createdAt);
  return { signups };
};

export const actions: Actions = {
  deleteSignup: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');
    
    if (id) {
      await db.delete(alumniNewsletter).where(eq(alumniNewsletter.id, parseInt(id as string)));
    }
    return { success: true };
  }
};