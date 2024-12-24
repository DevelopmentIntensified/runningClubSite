import { pgTable, serial, text, integer, numeric, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	isAdmin: boolean('is_admin').default(false).notNull(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const sessions = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const news = pgTable('news', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id)
});

export const alumni = pgTable('alumni', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	image_url: text('image_url').notNull(),
	graduation_year: integer('graduation_year').notNull(),
	major: text('major').notNull(),
	achievements: text('achievements').notNull(),
	current_occupation: text('current_occupation').notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
});

export const leaders = pgTable('leaders', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	image_url: text('image_url').notNull(),
	position: text('position').notNull(),
	description: text('description').notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
});

export const events = pgTable('events', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	start: timestamp('start').notNull(),
	end: timestamp('end').notNull(),
	description: text('description'),
	location: text('location'),
	created_at: timestamp('created_at').defaultNow().notNull(),
	type: text('type').notNull(),
});

export const locations = pgTable('locations', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	latitude: numeric('latitude').notNull(),
	longitude: numeric('longitude').notNull(),
});

export const records = pgTable('records', {
	id: serial('id').primaryKey(),
	event: text('event').notNull(),
	name: text('name').notNull(),
	time: text('time').notNull(),
	year: integer('year'),
	gender: text('gender').notNull(),
	type: text('type').notNull(), // 'track' or 'cross_country'
	link: text('link'),
	created_at: timestamp('created_at').defaultNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;

export type User = typeof users.$inferSelect;
export type CalendarEvent = typeof events.$inferSelect;
