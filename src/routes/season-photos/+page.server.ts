import { db } from '$lib/server/db';
import { seasonImageLinks } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const links = await db.select().from(seasonImageLinks).orderBy(seasonImageLinks.createdAt);

  // Group links by season
  const linksBySeason = links.reduce((acc, link) => {
    if (!acc[link.season]) {
      acc[link.season] = [];
    }
    acc[link.season].push(link);
    return acc;
  }, {} as Record<string, typeof links>);

  // Sort seasons in reverse chronological order
  const sortedSeasons = Object.keys(linksBySeason).sort((a, b) => {
    const [aTerm, aYear] = a.split(' ');
    const [bTerm, bYear] = b.split(' ');
    
    if (aYear !== bYear) {
      return parseInt(bYear) - parseInt(aYear);
    }
    
    return aTerm === 'Fall' ? 1 : -1;
  });

  return {
    seasons: sortedSeasons,
    linksBySeason
  };
}; 