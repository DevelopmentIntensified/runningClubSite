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
    const userResult = await db.execute(sql`SELECT id, email, first_name FROM "user" WHERE email = ${email}`);

    const targetRedirect = event.cookies.get('redirectUrl');
    const finalRedirect = targetRedirect ? decodeURIComponent(targetRedirect) : '/groupme';

    const headers = new Headers();

    if (userResult.length === 0 || !userResult[0].first_name) {
      headers.append('Set-Cookie', `pendingSignupEmail=${encodeURIComponent(email)}; Path=/; Max-Age=900; HttpOnly; SameSite=Lax`);
      headers.append('Location', siteUrl + `/login/setup?redirectUrl=${encodeURIComponent(finalRedirect)}`);
    } else {
      const session = await lucia.createSession(userResult[0].id.toString(), {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      headers.append('Set-Cookie', sessionCookie.serialize());
      headers.append('Set-Cookie', 'redirectUrl=; Path=/; Max-Age=0');
      headers.append('Location', siteUrl + finalRedirect);
    }

    return new Response(null, {
      status: 302,
      headers
    });
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
