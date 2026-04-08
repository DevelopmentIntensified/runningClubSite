import { pgTable, serial, text, timestamp, integer, boolean, unique, foreignKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const events = pgTable("events", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	start: timestamp("start", { withTimezone: true, mode: 'string' }).notNull(),
	end: timestamp("end", { withTimezone: true, mode: 'string' }).notNull(),
	description: text("description"),
	location: text("location"),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	type: text("type").notNull(),
});

export const alumni = pgTable("alumni", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	major: text("major"),
	achievements: text("achievements"),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	imageUrl: text("imageUrl"),
	graduationYear: integer("graduationYear"),
	currentOccupation: text("currentOccupation"),
});

export const leaders = pgTable("leaders", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	imageUrl: text("imageUrl").notNull(),
	position: text("position").notNull(),
	bio: text("bio").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	order: integer("order").notNull(),
	active: boolean("active").default(true).notNull(),
});

export const codes = pgTable("codes", {
	code: text("code").notNull(),
	expiresAt: timestamp("expiresAt", { withTimezone: true, mode: 'string' }).notNull(),
	email: text("email"),
},
(table) => {
	return {
		codes_code_unique: unique("codes_code_unique").on(table.code),
	}
});

export const news = pgTable("news", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	created_by: integer("created_by").notNull().references(() => user.id),
	imageUrl: text("imageUrl").notNull(),
});

export const locations = pgTable("locations", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	link: text("link").notNull(),
	order: integer("order"),
});

export const user = pgTable("user", {
	id: serial("id").primaryKey().notNull(),
	is_admin: boolean("is_admin").default(false).notNull(),
	email: text("email").notNull(),
},
(table) => {
	return {
		user_email_unique: unique("user_email_unique").on(table.email),
	}
});

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => user.id),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const pageImages = pgTable("pageImages", {
	id: serial("id").primaryKey().notNull(),
	alt: text("alt").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	imageUrl: text("imageUrl").notNull(),
	locationName: text("locationName").notNull(),
});

export const records = pgTable("records", {
	id: serial("id").primaryKey().notNull(),
	event: text("event").notNull(),
	name: text("name").notNull(),
	time: text("time").notNull(),
	year: integer("year"),
	gender: text("gender").notNull(),
	type: text("type").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	link: text("link"),
});

export const seasonImageLinks = pgTable("seasonImageLinks", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	link: text("link").notNull(),
	season: text("season").notNull(),
});

export const slideShowImages = pgTable("slideShowImages", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	imageUrl: text("imageUrl").notNull(),
	order: integer("order").notNull(),
});

export const forms = pgTable("forms", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description"),
	external_url: text("external_url").notNull(),
	embed_code: text("embed_code"),
	active: boolean("active").default(true).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	created_by: integer("created_by").notNull().references(() => user.id),
});