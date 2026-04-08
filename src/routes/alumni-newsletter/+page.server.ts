import { db } from '$lib/server/db';
import { alumniNewsletter } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const resend = new Resend(process.env.RESEND_API_KEY);

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const privacyAccepted = formData.get('privacyAccepted') === 'on';

    if (!firstName || !lastName || !email) {
      return fail(400, { message: 'All fields are required', error: 'missing_fields' });
    }

    if (!privacyAccepted) {
      return fail(400, { message: 'You must accept the Privacy Policy to sign up', error: 'privacy_required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { message: 'Please enter a valid email address', error: 'invalid_email' });
    }

    try {
      const existing = await db.select().from(alumniNewsletter).where(eq(alumniNewsletter.email, email));
      if (existing.length > 0) {
        return fail(400, { message: 'This email is already signed up for the alumni newsletter', error: 'already_signed_up' });
      }

      await db.insert(alumniNewsletter).values({
        firstName,
        lastName,
        email
      });

      try {
        await resend.contacts.create({
          email,
          firstName,
          lastName,
          audienceId: '5046fe42-78bf-469f-8252-add00f568bf9'
        });
      } catch (resendError) {
        console.error('Resend error:', resendError);
      }

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return fail(500, { message: 'An error occurred. Please try again.', error: 'server_error' });
    }
  }
};