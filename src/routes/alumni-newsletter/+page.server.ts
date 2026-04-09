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
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://www.libertyrunningclub.com/logo.png" alt="Liberty Running Club" style="max-width: 200px; height: auto;">
              </div>
              <p style="font-size: 18px;">Hi ${firstName},</p>
              <p style="font-size: 16px; line-height: 1.6;">Welcome to the Liberty Running Club Alumni Newsletter! We're excited to have you as part of our alumni community.</p>
              <p style="font-size: 16px; line-height: 1.6; margin-top: 20px;">You'll receive updates about:</p>
              <ul style="font-size: 16px; line-height: 1.8;">
                <li>Alumni events and reunions</li>
                <li>Club news and achievements</li>
                <li>Upcoming races and competitions</li>
                <li>Opportunities to stay connected with fellow alumni</li>
              </ul>
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center; font-style: italic; font-size: 14px;">
                <p>"Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."</p>
                <p style="font-weight: bold; margin-top: 10px;">- Joshua 1:9</p>
              </div>
              <p style="font-size: 16px;">Go Flames!</p>
              <p style="font-size: 14px; color: #666;">- Liberty Running Club</p>
            </div>
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