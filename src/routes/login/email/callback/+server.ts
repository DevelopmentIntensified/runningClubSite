import { parseJWT, validateJWT } from 'oslo/jwt';
import type { RequestHandler } from './$types';
import { getUrl } from '$lib/utils/getUrl';
import { EMAILSECRET } from '$env/static/private';
import type { EmailTokenPayload } from '../+server';
import { lucia } from '$lib/server/auth';
import { users, type User } from '$lib/server/db/schema';
import { db } from '$lib/server/db/';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async function (event) {
  const requestUrl = new URL(event.url);
  const siteUrl = getUrl();
  const redirectUrl = new URL(siteUrl + '/login');
  const token = requestUrl.searchParams.get('token') as string;
  const secret = new TextEncoder().encode(EMAILSECRET);

  redirectUrl.searchParams.set('error', 'The token provided was not valid, please try again.');

  if (!requestUrl.searchParams.has('token')) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString()
      }
    });
  }

  try {
    await validateJWT('HS256', secret, token);
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString()
      }
    });
  }

  const parcedToken = parseJWT(token);
  if (!parcedToken) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString()
      }
    });
  }
  const payload: EmailTokenPayload = parcedToken?.payload as EmailTokenPayload;

  if (!payload) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString()
      }
    });
  }

  if (!!event.locals.user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString()
      }
    });
  }

  try {
    const { email } = payload;
    let userAccount: User[] = await db.select().from(users).where(eq(users.email, email));

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
    headers.append('Location', siteUrl + 'groupme/');

    let result = new Response(null, {
      status: 302,
      headers
    });

    return result;
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString()
      }
    });
  }
};
