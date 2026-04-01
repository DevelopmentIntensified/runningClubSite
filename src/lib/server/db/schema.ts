import { pgTable, serial, text, integer, numeric, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  isAdmin: boolean('is_admin').default(false).notNull(),
  email: text('email').notNull().unique()
});

export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const codes = pgTable('codes', {
  code: text('code').notNull().unique(),
  expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull(),
  email: text('email')
});

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  imageUrl: text('imageUrl').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: integer('created_by')
    .notNull()
    .references(() => users.id)
});

export const slideShowImages = pgTable('slideShowImages', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  imageUrl: text('imageUrl').notNull(),
  order: integer('order').notNull()
});

export const seasonImageLinks = pgTable('seasonImageLinks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  link: text('link').notNull(),
  season: text('season').notNull()
});

export const pageImages = pgTable('pageImages', {
  id: serial('id').primaryKey(),
  alt: text('alt').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  imageUrl: text('imageUrl').notNull(),
  locationName: text('locationName').notNull()
})

export const alumni = pgTable('alumni', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('imageUrl'),
  graduationYear: integer('graduationYear'),
  major: text('major'),
  achievements: text('achievements'),
  currentOccupation: text('currentOccupation'),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const leaders = pgTable('leaders', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('imageUrl').notNull(),
  position: text('position').notNull(),
  bio: text('bio').notNull(),
  order: integer('order').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  active: boolean('active').default(true).notNull()
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  start: timestamp('start', {
    withTimezone: true,
    mode: "string"
  }).notNull(),
  end: timestamp('end', {
    withTimezone: true,
    mode: "string"
  }).notNull(),
  description: text('description'),
  location: text('location'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  type: text('type').notNull()
});

export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  link: text('link').notNull(),
  order: integer('order'),
});

export const records = pgTable('records', {
  id: serial('id').primaryKey(),
  event: text('event').notNull(),
  name: text('name').notNull(),
  time: text('time').notNull(),
  year: integer('year'),
  gender: text('gender').notNull(),
  type: text('type').notNull(), // 'track', 'cross_country', 'field'
  category: text('category').notNull().default('road'), // 'road', 'trail'
  link: text('link'),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export type Session = typeof sessions.$inferSelect;

export type Records = typeof records.$inferSelect;
export type User = typeof users.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type CalendarEvent = typeof events.$inferSelect;
export type Alumni = typeof alumni.$inferSelect;
export type Code = typeof codes.$inferSelect;
export type News = typeof news.$inferSelect;
export type Leader = typeof leaders.$inferSelect;
