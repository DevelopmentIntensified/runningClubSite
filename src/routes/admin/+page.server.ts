import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import {
  adminAuditLog,
  alumni,
  alumniNewsletter,
  events,
  forms,
  leaders,
  locations,
  news,
  pageImages,
  records,
  seasonImageLinks,
  slideShowImages,
  users
} from '$lib/server/db/schema';
import { desc, eq, inArray } from 'drizzle-orm';

const TARGET_TABLES: Record<string, { table: any; nameCol: any }> = {
  user: { table: users, nameCol: users.email },
  news: { table: news, nameCol: news.title },
  slide: { table: slideShowImages, nameCol: slideShowImages.title },
  season_photo: { table: seasonImageLinks, nameCol: seasonImageLinks.title },
  page_image: { table: pageImages, nameCol: pageImages.alt },
  alumnus: { table: alumni, nameCol: alumni.name },
  leader: { table: leaders, nameCol: leaders.name },
  event: { table: events, nameCol: events.title },
  location: { table: locations, nameCol: locations.name },
  record: { table: records, nameCol: records.name },
  form: { table: forms, nameCol: forms.title }
};

export const load: PageServerLoad = async () => {
  const logsRaw = await db
    .select({
      log: adminAuditLog,
      admin: users
    })
    .from(adminAuditLog)
    .leftJoin(users, eq(users.id, adminAuditLog.adminId))
    .orderBy(desc(adminAuditLog.createdAt))
    .limit(200);

  const targetNames = new Map<number, string>();
  const grouped = new Map<string, number[]>();
  for (const { log } of logsRaw) {
    if (!log.targetType || !log.targetId) continue;
    const type = log.targetType;
    if (type === 'alumni_newsletter') continue;
    if (!grouped.has(type)) grouped.set(type, []);
    grouped.get(type)!.push(log.targetId);
  }

  for (const [type, ids] of grouped) {
    const config = TARGET_TABLES[type];
    if (!config) continue;
    const rows = await db
      .select({ id: config.table.id, name: config.nameCol })
      .from(config.table)
      .where(inArray(config.table.id, ids));
    for (const row of rows) {
      targetNames.set(row.id, String(row.name ?? ''));
    }
  }

  const alumniNewsletterIds = logsRaw
    .filter(({ log }) => log.targetType === 'alumni_newsletter' && log.targetId)
    .map(({ log }) => log.targetId!);
  const newsletterNames = new Map<number, string>();
  if (alumniNewsletterIds.length) {
    const rows = await db
      .select()
      .from(alumniNewsletter)
      .where(inArray(alumniNewsletter.id, alumniNewsletterIds));
    for (const row of rows) {
      newsletterNames.set(row.id, [row.firstName, row.lastName].filter(Boolean).join(' ') || row.email);
    }
  }

  const logs = logsRaw.map(({ log, admin }) => {
    let parsedDetails: Record<string, any> | null = null;
    try {
      parsedDetails = log.details ? JSON.parse(log.details) : null;
    } catch {}
    return {
      ...log,
      parsedDetails,
      adminName: [admin?.firstName, admin?.lastName].filter(Boolean).join(' ') || admin?.email || null,
      targetName: log.targetId
        ? log.targetType === 'alumni_newsletter'
          ? newsletterNames.get(log.targetId) || null
          : targetNames.get(log.targetId) || null
        : null
    };
  });

  return { logs };
};
