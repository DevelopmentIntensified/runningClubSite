import { sendEmail } from '$lib/utils/sendEmail';
import { type RequestEvent } from '@sveltejs/kit';
import { CLUBEMAIL, EMAILSECRET } from '$env/static/private';
import { codes } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { getUrl } from '$lib/utils/getUrl';
import { createJWT } from 'oslo/jwt';
import { TimeSpan } from 'lucia';
import { generateRandomString, type RandomReader } from '@oslojs/crypto/random';

export type EmailTokenPayload = {
  email: string;
};

export const POST = async (event: RequestEvent) => {
  const data: { email: string } = await event.request.json();
  const email = data.email;
  console.warn('DEBUGPRINT[1]: +server.ts:20: email=', email);

  const emailRegex = /^[a-zA-Z\d]+@liberty\.edu$/;

  console.log(emailRegex.test(email));
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid email' }), {
      status: 400
    });
  }

  const nums = '0123456789';

  const random: RandomReader = {
    read(bytes) {
      crypto.getRandomValues(bytes);
    }
  };

  const secret = new TextEncoder().encode(EMAILSECRET);
  const code = generateRandomString(random, nums, 8);

  const token = await createJWT(
    'HS256',
    secret,
    {
      email,
      code
    },
    {
      headers: {
        alg: 'HS256',
        typ: 'JWT'
      },
      expiresIn: new TimeSpan(15, 'm')
    }
  );

  const signInUrl = new URL(getUrl());
  signInUrl.pathname = '/login/email/callback';
  signInUrl.searchParams.set('token', token);
  console.log(signInUrl.toString())

  const { success } = await sendEmail({
    to: email,
    from: 'Liberty Running Club <noreply@libertyrunningclub.com>',
    subject: 'Your Liberty Running Club Login Code',
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1a365d;">Liberty Running Club</h2>
      <p>Dear Member,</p>
      <p>You have requested to sign in to your Liberty Running Club account. Please use the following verification code:</p>
      <div style="background: #f7f7f7; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0;">
        ${code}
      </div>
      <p>This code will expire in 15 minutes for security purposes.</p>
      <p>If you did not request this code, please disregard this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">This is an automated message from Liberty Running Club. Please do not reply to this email.</p>
    </div>`
  });

  if (success) {
    await db.insert(codes).values([
      {
        code,
        expiresAt: new Date(Date.now() + 60 * 1000 * 15),
        email
      }
    ]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  return new Response(
    JSON.stringify({ success: false, error: 'Unexpected error, please try again' }),
    { status: 500 }
  );
};
