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
  const data: { email: string; privacyAccepted?: boolean } = await event.request.json();
  const email = data.email;

  if (data.privacyAccepted !== true) {
    return new Response(JSON.stringify({ success: false, error: 'You must accept the Privacy Policy to continue.' }), {
      status: 400
    });
  }

  const emailRegex = /^[a-zA-Z\d]+@liberty\.edu$/;

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

  const plainText = [
    'Liberty Running Club — sign-in verification',
    '',
    `Your verification code is: ${code}`,
    '',
    'This code expires in 15 minutes. If you did not request this email, you can ignore it.',
    '',
    `Sign-in link (optional): ${signInUrl.toString()}`,
    '',
    '— Liberty Running Club',
    'This message was sent because someone requested access with your Liberty email.',
    'Club updates may be sent to this address; see our Privacy Policy at your site /privacy'
  ].join('\n');

  const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Your verification code</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;">
<tr><td style="padding:28px 28px 8px 28px;">
<p style="margin:0 0 8px 0;font-size:15px;line-height:1.5;color:#18181b;">Liberty Running Club</p>
<h1 style="margin:0 0 16px 0;font-size:20px;line-height:1.35;color:#0f172a;font-weight:600;">Your sign-in verification code</h1>
<p style="margin:0 0 20px 0;font-size:15px;line-height:1.55;color:#3f3f46;">
Hello,
</p>
<p style="margin:0 0 20px 0;font-size:15px;line-height:1.55;color:#3f3f46;">
Use this one-time code to finish signing in. It expires in <strong>15 minutes</strong>.
</p>
<table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px 0;">
<tr><td style="background:#fafafa;border:1px solid #e4e4e7;border-radius:6px;padding:16px 24px;text-align:center;">
<span style="font-size:26px;font-weight:700;letter-spacing:0.25em;color:#0f172a;font-family:ui-monospace,Menlo,Consolas,monospace;">${code}</span>
</td></tr></table>
<p style="margin:0 0 12px 0;font-size:14px;line-height:1.5;color:#52525b;">
If you did not try to sign in, you can ignore this message. No account changes are made until the code is entered.
</p>
<hr style="border:none;border-top:1px solid #e4e4e7;margin:0 0 16px 0;" />
<p style="margin:0;font-size:12px;line-height:1.5;color:#71717a;">
Liberty Running Club · Automated message · Please do not reply to this email.
</p>
</td></tr></table>
</td></tr></table>
</body>
</html>`;

  const { success } = await sendEmail({
    to: email,
    from: CLUBEMAIL,
    subject: 'Your Liberty Running Club verification code',
    text: plainText,
    html: htmlBody
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
