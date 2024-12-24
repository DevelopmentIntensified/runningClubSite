import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { news } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const newsItems = await db.select().from(news).orderBy(desc(news.createdAt));

	return {
		news: newsItems
	};
};
