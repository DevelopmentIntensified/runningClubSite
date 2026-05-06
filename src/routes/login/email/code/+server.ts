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
  
  await deleteDeadCodes()

  const codeToCheck = await getCode(code)
  if (!codeToCheck) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error, please try again' }),
      { status: 500 }
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

    const result = await db.execute(sql`SELECT id, email FROM "user" WHERE email = ${email}`);

    let headers = new Headers();

    if (result.length === 0) {
      event.cookies.set('pendingSignupEmail', email, { path: '/', maxAge: 900 });
      headers.append('Location', '/login/setup');
    } else {
      const session = await lucia.createSession(result[0].id.toString(), {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      headers.append('Set-Cookie', sessionCookie.serialize());
      headers.append('Set-Cookie', `redirectUrl=; path=/; max-age=0`);
      headers.append('Location', redirectUrl);

      try {
        await resend.contacts.create({
          email,
          audienceId: GENERAL_SEGMENT_ID
        });
      } catch (resendError) {
        console.error('Resend contact create error:', resendError);
      }
    }

    let result2 = new Response(null, {
      status: 200,
      headers
    });

    await deleteCode(code)

    return result2;
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error, please try again' }),
      { status: 500 }
    );
  }
};
