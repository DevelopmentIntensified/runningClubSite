import { db } from '$lib/db';
import { news } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { News } from '$lib/types';

export async function getNews() {
  return await db.select().from(news).orderBy(news.createdAt);
}

export async function getNewsItem(id: number) {
  const [newsItem] = await db.select().from(news).where(eq(news.id, id));
  return newsItem;
}

export async function createNews(data: Omit<News, 'id' | 'createdAt'>) {
  const [createdNews] = await db.insert(news).values(data).returning();
  return createdNews;
}

export async function updateNews(id: number, data: Partial<Omit<News, 'id' | 'createdAt'>>) {
  const [updatedNews] = await db.update(news)
    .set(data)
    .where(eq(news.id, id))
    .returning();
  return updatedNews;
}

export async function deleteNews(id: number) {
  await db.delete(news).where(eq(news.id, id));
}

