import type { RequestHandler } from './$types';
import { getUrl } from '$lib/utils/getUrl';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db/';
import { sql } from 'drizzle-orm';
import { deleteCode, deleteDeadCodes, getCode } from '$lib/actions/codes';
import { Resend } from 'resend';
import { RESENDAPIKEY } from '$env/static/private';

const resend = new Resend(RESENDAPIKEY);
const GENERAL_SEGMENT_ID = '708d2ae5-c8c6-41b8-94d4-8a9693b237c9';

export const POST: RequestHandler = async function(event) {
  const siteUrl = getUrl();
  const body = await event.request.json();
  const code = body.code;
  const redirectUrl = body.redirectUrl || '/groupme';

  try {
    await deleteDeadCodes()
  } catch (e) {
    console.error('deleteDeadCodes error:', e)
  }

  const codeToCheck = await getCode(code)
  if (!codeToCheck) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid or expired code. Please request a new one.' }),
      { status: 400 }
    );
  }

  try {
    const email = codeToCheck.email
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unexpected error, please try again' }),
        { status: 500 }
      );
    }

    const result = await db.execute(sql`SELECT id, email, first_name FROM "user" WHERE email = ${email}`)

    const headers = new Headers();

    if (result.length === 0 || !result[0].first_name) {
      event.cookies.set('pendingSignupEmail', email, { path: '/', maxAge: 900 });
      const setupUrl = `/login/setup?redirectUrl=${encodeURIComponent(redirectUrl)}`;
      return new Response(JSON.stringify({ success: true, redirectTo: setupUrl }), {
        headers,
        status: 200
      });
    } else {
      await db.execute(sql`UPDATE "user" SET last_login = NOW() WHERE id = ${result[0].id}`);
      const session = await lucia.createSession(result[0].id.toString(), {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      headers.append('Set-Cookie', sessionCookie.serialize());
      headers.append('Set-Cookie', 'redirectUrl=; Path=/; Max-Age=0');

      try {
        await resend.contacts.create({
          email,
          audienceId: GENERAL_SEGMENT_ID
        });
      } catch (resendError) {
        console.error('Resend contact create error:', resendError);
      }

      return new Response(JSON.stringify({ success: true, redirectTo: redirectUrl }), {
        headers,
        status: 200
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error, please try again', details: error instanceof Error ? error.message : String(error) }),
      { status: 500 }
    );
  }
};
