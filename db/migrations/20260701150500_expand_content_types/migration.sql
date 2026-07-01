ALTER TABLE "content_items" ADD CONSTRAINT "content_items_type_check" CHECK ("type" in ('blog', 'comparison', 'resource', 'case-study', 'tool'));
