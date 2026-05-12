import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { codes } from '$lib/server/db/schema';
import { sql, eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';

export const POST: RequestHandler = async ({ request }) => {
  const { code, email, password } = await request.json();

  if (!code || !email || !password) {
    return new Response(
      JSON.stringify({ success: false, error: 'All fields are required.' }),
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return new Response(
      JSON.stringify({ success: false, error: 'Password must be at least 8 characters.' }),
      { status: 400 }
    );
  }

  try {
    const codeRecord = await db.select().from(codes).where(eq(codes.code, code)).then(rows => rows[0]);
    if (!codeRecord || codeRecord.email !== email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid or expired code.' }),
        { status: 400 }
      );
    }

    if (codeRecord.expiresAt < new Date()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Code has expired. Please request a new one.' }),
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password);

    await db.execute(sql`UPDATE "user" SET hashed_password = ${hashedPassword} WHERE email = ${email}`);

    await db.delete(codes).where(eq(codes.code, code));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Password reset error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error, please try again.' }),
      { status: 500 }
    );
  }
};
