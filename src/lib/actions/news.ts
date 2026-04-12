import { db } from '$lib/server/db';
import { news } from '$lib/server/db/schema';
import { count, desc, eq } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';

type News = InferInsertModel<typeof news>;

export async function getNewsCount() {
  return await db.select({ count: count() }).from(news)
}

export async function getNews() {
  return await db.select().from(news).orderBy(desc(news.createdAt));
}

export async function getNewsItem(id: number) {
  const [newsItem] = await db.select().from(news).where(eq(news.id, id));
  return newsItem;
}

export async function createNews(data: Omit<News, 'id'>) {
  const [createdNews] = await db.insert(news).values(data as News).returning();
  return createdNews;
}

export async function updateNews(id: number, data: Partial<Omit<News, 'id'>>) {
  const [updatedNews] = await db.update(news).set(data).where(eq(news.id, id)).returning();
  return updatedNews;
}

export async function deleteNews(id: number) {
  await db.delete(news).where(eq(news.id, id));
}
