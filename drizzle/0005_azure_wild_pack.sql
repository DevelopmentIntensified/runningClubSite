CREATE TABLE "admin_audit_log" (
  "id" serial PRIMARY KEY NOT NULL,
  "admin_id" integer NOT NULL REFERENCES "user"("id"),
  "action" text NOT NULL,
  "target_type" text,
  "target_id" integer,
  "details" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);
