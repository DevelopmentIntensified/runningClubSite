ALTER TABLE "user" ADD COLUMN "last_updated" timestamp;
CREATE TABLE "user_change_log" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "field" text NOT NULL,
  "old_value" text,
  "new_value" text,
  "changed_at" timestamp DEFAULT now() NOT NULL
);
