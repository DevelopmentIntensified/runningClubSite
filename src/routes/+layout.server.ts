// +page.server.ts
import { getAlumniCount } from '$lib/actions/alumni';
import { getNewsCount } from '$lib/actions/news';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const newsCount = await getNewsCount()
  const alumniCount = await getAlumniCount()

  return {
    pathname: event.url.pathname,
    isLoggedIn: !!event.locals.user,
    user: event.locals.user,
    displayAlumni: alumniCount[0].count > 0,
    displayNews: newsCount[0].count > 0
  };
};
