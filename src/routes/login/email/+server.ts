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

  const { success } = await sendEmail({
    to: email,
    from: 'login@libertyrunningclub.com',
    subject: 'Liberty Running Club Email Confirmation for ' + email,
    html: `<h1>Here is the code to use for logging in: ${code}</h1>
or if you would rather, here is a link for loggin in: <a href="${signInUrl.toString()}"> link </a>
`
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
