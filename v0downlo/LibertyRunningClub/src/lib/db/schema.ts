import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('auth_user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  isAdmin: boolean('is_admin').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const sessions = pgTable('auth_session', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  activeExpires: timestamp('active_expires').notNull(),
  idleExpires: timestamp('idle_expires').notNull()
});

export const keys = pgTable('auth_key', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  hashedPassword: text('hashed_password')
});

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userId: text('user_id').notNull().references(() => users.id)
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  start: timestamp('start').notNull(),
  end: timestamp('end').notNull(),
  location: text('location').notNull(),
  type: varchar('type', { length: 20 }).notNull().default('social')
});

export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  mapUrl: text('map_url').notNull(),
});

export const records = pgTable('records', {
  id: serial('id').primaryKey(),
  event: text('event').notNull(),
  name: text('name').notNull(),
  time: text('time').notNull(),
  year: integer('year').notNull(),
  gender: varchar('gender', { length: 10 }).notNull(),
  type: varchar('type', { length: 20 }).notNull() // 'track' or 'cross_country'
});

export const alumni = pgTable('alumni', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  graduationYear: integer('graduation_year').notNull(),
  achievements: text('achievements'),
  currentOccupation: text('current_occupation'),
  imageUrl: text('image_url')
});

export const leaders = pgTable('leaders', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  bio: text('bio'),
  imageUrl: text('image_url')
});

