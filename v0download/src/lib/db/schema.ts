import { pgTable, serial, text, numeric, bigint } from 'drizzle-orm/pg-core';

// Existing tables (news, alumni, leaders, events)

// New locations table
export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  latitude: numeric('latitude').notNull(),
  longitude: numeric('longitude').notNull(),
});

export const auth_user = pgTable("auth_user", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique()
});

export const user_key = pgTable("user_key", {
	id: text("id").primaryKey(),
	user_id: text("user_id").notNull().references(() => auth_user.id),
	hashed_password: text("hashed_password")
});

export const user_session = pgTable("user_session", {
	id: text("id").primaryKey(),
	user_id: text("user_id").notNull().references(() => auth_user.id),
	active_expires: bigint("active_expires", { mode: "number" }).notNull(),
	idle_expires: bigint("idle_expires", { mode: "number" }).notNull()
});

