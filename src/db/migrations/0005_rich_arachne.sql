ALTER TABLE "videos" DROP CONSTRAINT "videos_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;