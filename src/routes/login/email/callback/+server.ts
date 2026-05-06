import { parseJWT, validateJWT } from 'oslo/jwt';
import type { RequestHandler } from './$types';
import { getUrl } from '$lib/utils/getUrl';
import { EMAILSECRET } from '$env/static/private';
import type { EmailTokenPayload } from '../+server';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db/';
import { sql } from 'drizzle-orm';

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
    const userResult = await db.execute(sql`SELECT id, email FROM "user" WHERE email = ${email}`);

    let headers = new Headers();

    if (userResult.length === 0) {
      event.cookies.set('pendingSignupEmail', email, { path: '/', maxAge: 900 });
      headers.append('Location', siteUrl + '/login/setup');
    } else {
      const session = await lucia.createSession(userResult[0].id.toString(), {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      headers.append('Set-Cookie', sessionCookie.serialize());
      headers.append('Location', siteUrl + 'groupme/');
    }

    let response = new Response(null, {
      status: 302,
      headers
    });

    return response;
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
