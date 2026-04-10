import type { RequestHandler } from './$types';
import { getUrl } from '$lib/utils/getUrl';
import { lucia } from '$lib/server/auth';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db/';
import { eq } from 'drizzle-orm';
import { deleteCode, deleteDeadCodes, getCode } from '$lib/actions/codes';
import { deleteExpiredSessions, deleteUserSessions } from '$lib/actions/sessions';
import { Resend } from 'resend';
import { RESENDAPIKEY } from '$env/static/private';
import { updateUser } from '$lib/actions/users';

const resend = new Resend(RESENDAPIKEY);
const GENERAL_SEGMENT_ID = '708d2ae5-c8c6-41b8-94d4-8a9693b237c9';

export const POST: RequestHandler = async function(event) {
  const siteUrl = getUrl();
  const body = await event.request.json();
  const code = body.code;
  const redirectUrl = body.redirectUrl || '/groupme';
  
  console.warn("DEBUGPRINT[1]: +server.ts:14: code=", code)

  await deleteDeadCodes();
  await deleteExpiredSessions();

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
    if (userAccount.length === 0) {
      let ids = await db
        .insert(users)
        .values({
          email,
          isAdmin: false
        })
        .returning({ id: users.id });
      userAccount = [{ id: ids[0].id, email, isAdmin: false }];

      try {
        await resend.contacts.create({
          email,
          audienceId: GENERAL_SEGMENT_ID
        });
      } catch (resendError) {
        console.error('Resend contact create error:', resendError);
      }
    } else {
      await updateUser(userAccount[0].id, { lastLogin: new Date() });
      await deleteUserSessions(userAccount[0].id);
    }

    const session = await lucia.createSession(userAccount[0].id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    let headers = new Headers();
    headers.append('Set-Cookie', sessionCookie.serialize());
    headers.append('Set-Cookie', `redirectUrl=; path=/; max-age=0`);

    let result = new Response(null, {
      status: 200,
      headers,
      redirect: redirectUrl
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