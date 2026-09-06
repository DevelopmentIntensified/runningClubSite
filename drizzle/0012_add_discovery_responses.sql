CREATE TABLE "discovery_responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" text NOT NULL,
	"details" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
