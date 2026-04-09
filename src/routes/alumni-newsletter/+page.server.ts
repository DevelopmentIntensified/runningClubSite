import { db } from '$lib/server/db';
import { alumniNewsletter } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import { fail } from '@sveltejs/kit';
import { RESENDAPIKEY, CLUBEMAIL } from '$env/static/private';
import type { Actions } from './$types';

const resend = new Resend(RESENDAPIKEY);

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
          lastName
        });

        await resend.emails.send({
          from: `Liberty Running Club <${CLUBEMAIL}>`,
          to: [email],
          subject: 'Welcome to the Liberty Running Club Alumni Newsletter!',
          html: `
            <p>Hi ${firstName},</p>
            <p>Welcome to the Liberty Running Club Alumni Newsletter! We're excited to have you as part of our alumni community.</p>
            <p>You'll receive updates about:</p>
            <ul>
              <li>Alumni events and reunions</li>
              <li>Club news and achievements</li>
              <li>Upcoming races and competitions</li>
              <li>Opportunities to stay connected with fellow alumni</li>
            </ul>
            <p>Go Flames!</p>
            <p>- Liberty Running Club</p>
          `
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