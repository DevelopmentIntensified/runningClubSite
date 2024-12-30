import type { RequestHandler } from './$types';
import { getUrl } from '$lib/utils/getUrl';
import { lucia } from '$lib/server/auth';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db/';
import { eq } from 'drizzle-orm';
import { deleteCode, deleteDeadCodes, getCode } from '$lib/actions/codes';

export const POST: RequestHandler = async function(event) {
  const siteUrl = getUrl();
  const redirectUrl = new URL(siteUrl + '/login');
  redirectUrl.searchParams.set('error', 'The code incorrect. Please try again');
  const code = (await event.request.json()).code
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
    if (userAccount.length === 0) {
      let ids = await db
        .insert(users)
        .values({
          email,
          isAdmin: false
        })
        .returning({ id: users.id });
      userAccount = [{ id: ids[0].id, email, isAdmin: false }];
    }

    const session = await lucia.createSession(userAccount[0].id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    let headers = new Headers();
    headers.append('Set-Cookie', sessionCookie.serialize());

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
