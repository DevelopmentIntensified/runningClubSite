// +page.server.ts
import { getAlumniCount } from '$lib/actions/alumni';
import { getNewsCount } from '$lib/actions/news';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
  const newsCount = await getNewsCount()
  const alumniCount = await getAlumniCount()

  const user = event.locals.user;

  if (user && !event.url.pathname.startsWith('/login/setup')) {
    const result = await db.execute(sql`SELECT first_name FROM "user" WHERE id = ${user.id}`);
    if (result.length > 0 && !result[0].first_name) {
      throw redirect(302, '/login/setup');
    }
  }

  return {
    pathname: event.url.pathname,
    isLoggedIn: !!user,
    user,
    displayAlumni: alumniCount[0].count > 0,
    displayNews: newsCount[0].count > 0
  };
};
