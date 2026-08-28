ALTER TABLE "admin_audit_log" DROP CONSTRAINT "admin_audit_log_admin_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "admin_audit_log" ALTER COLUMN "admin_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_audit_log" ADD CONSTRAINT "admin_audit_log_admin_id_user_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;