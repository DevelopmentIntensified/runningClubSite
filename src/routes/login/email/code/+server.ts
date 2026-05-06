import type { RequestHandler } from './$types';
import { getUrl } from '$lib/utils/getUrl';
import { lucia } from '$lib/server/auth';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db/';
import { eq } from 'drizzle-orm';
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
  
  console.warn("DEBUGPRINT[1]: +server.ts:14: code=", code)

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
    let userAccount = await db.select().from(users).where(eq(users.email, email));

    let headers = new Headers();

    if (userAccount.length === 0) {
      event.cookies.set('pendingSignupEmail', email, { path: '/', maxAge: 900 });
      headers.append('Location', '/login/setup');
    } else {
      const session = await lucia.createSession(userAccount[0].id.toString(), {});
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

    let result = new Response(null, {
      status: 200,
      headers
    });

    await deleteCode(code)

    return result;
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error, please try again' }),
      { status: 500 }
    );
  }
};
