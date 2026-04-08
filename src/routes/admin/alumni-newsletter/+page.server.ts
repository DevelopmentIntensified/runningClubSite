import { db } from '$lib/server/db';
import { alumniNewsletter } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import type { PageServerLoad, Actions } from './$types';

const resend = new Resend(process.env.RESEND_API_KEY);

export const load: PageServerLoad = async () => {
  const signups = await db.select().from(alumniNewsletter).orderBy(alumniNewsletter.createdAt);
  return { signups };
};

export const actions: Actions = {
  deleteSignup: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');
    
    if (id) {
      const signup = await db.select().from(alumniNewsletter).where(eq(alumniNewsletter.id, parseInt(id as string)));
      
      if (signup.length > 0) {
        const email = signup[0].email;
        
        try {
          await resend.contacts.delete({
            email,
            audienceId: '5046fe42-78bf-469f-8252-add00f568bf9'
          });
        } catch (resendError) {
          console.error('Resend delete error:', resendError);
        }
        
        await db.delete(alumniNewsletter).where(eq(alumniNewsletter.id, parseInt(id as string)));
      }
    }
    return { success: true };
  }
};