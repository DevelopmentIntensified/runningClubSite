-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"start" timestamp with time zone NOT NULL,
	"end" timestamp with time zone NOT NULL,
	"description" text,
	"location" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alumni" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"major" text,
	"achievements" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"imageUrl" text,
	"graduationYear" integer,
	"currentOccupation" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leaders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"imageUrl" text NOT NULL,
	"position" text NOT NULL,
	"bio" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"order" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "codes" (
	"code" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"email" text,
	CONSTRAINT "codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"imageUrl" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"link" text NOT NULL,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pageImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"imageUrl" text NOT NULL,
	"locationName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "records" (
	"id" serial PRIMARY KEY NOT NULL,
	"event" text NOT NULL,
	"name" text NOT NULL,
	"time" text NOT NULL,
	"year" integer,
	"gender" text NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"link" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seasonImageLinks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"link" text NOT NULL,
	"season" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "slideShowImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"imageUrl" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"external_url" text NOT NULL,
	"embed_code" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news" ADD CONSTRAINT "news_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forms" ADD CONSTRAINT "forms_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/