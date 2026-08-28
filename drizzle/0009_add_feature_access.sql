CREATE TABLE "feature_access" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"mode" text DEFAULT 'login' NOT NULL,
	CONSTRAINT "feature_access_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "feature_access_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"feature_key" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feature_access_users" ADD CONSTRAINT "feature_access_users_feature_key_feature_access_key_fk" FOREIGN KEY ("feature_key") REFERENCES "public"."feature_access"("key") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feature_access_users" ADD CONSTRAINT "feature_access_users_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "feature_access_users_feature_user_unique" ON "feature_access_users" USING btree ("feature_key","user_id");