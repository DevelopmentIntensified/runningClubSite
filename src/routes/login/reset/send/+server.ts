import { sendEmail } from '$lib/utils/sendEmail';
import { CLUBEMAIL } from '$env/static/private';
import { codes } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { generateRandomString, type RandomReader } from '@oslojs/crypto/random';
import { sql } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export const POST = async (event: RequestEvent) => {
  const { email } = await event.request.json();

  if (!email) {
    return new Response(JSON.stringify({ success: false, error: 'Email is required' }), { status: 400 });
  }

  const emailRegex = /^[a-zA-Z\d]+@liberty\.edu$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid email' }), { status: 400 });
  }

  const result = await db.execute(sql`SELECT id FROM "user" WHERE email = ${email}`);
  if (result.length === 0) {
    return new Response(JSON.stringify({ success: false, error: 'No account found with this email.' }), { status: 400 });
  }

  const nums = '0123456789';
  const random: RandomReader = {
    read(bytes) { crypto.getRandomValues(bytes); }
  };
  const code = generateRandomString(random, nums, 8);

  const plainText = [
    'Liberty Running Club — password reset code',
    '',
    `Your reset code is: ${code}`,
    '',
    'This code expires in 15 minutes. If you did not request this, you can ignore it.',
    '',
    '— Liberty Running Club'
  ].join('\n');

  const htmlBody = `<!DOCTYPE html><html><body style="font-family:Georgia,serif;padding:24px;">
<h1 style="font-size:20px;">Password Reset</h1>
<p style="font-size:15px;">Your password reset code is:</p>
<p style="font-size:26px;font-weight:700;letter-spacing:0.25em;font-family:monospace;background:#f4f4f5;padding:16px 24px;border-radius:6px;text-align:center;">${code}</p>
<p style="font-size:14px;color:#52525b;">This code expires in 15 minutes. If you did not request this, you can ignore it.</p>
</body></html>`;

  await db.insert(codes).values([{ code, expiresAt: new Date(Date.now() + 15 * 60 * 1000), email }]);
  await sendEmail({ to: email, from: CLUBEMAIL, subject: 'Your Liberty Running Club password reset code', text: plainText, html: htmlBody });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
