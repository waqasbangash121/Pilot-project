CREATE TABLE "content_analytics_events" (
  "id" text PRIMARY KEY NOT NULL,
  "workspace_id" text NOT NULL,
  "content_item_id" text,
  "content_type" text NOT NULL,
  "content_slug" text NOT NULL,
  "event_type" text NOT NULL,
  "visitor_id" text NOT NULL,
  "session_id" text NOT NULL,
  "path" text NOT NULL,
  "target_url" text,
  "target_text" text,
  "referrer" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "content_analytics_events_content_type_check" CHECK ("content_type" in ('blog', 'comparison', 'resource', 'case-study', 'tool')),
  CONSTRAINT "content_analytics_events_event_type_check" CHECK ("event_type" in ('view', 'click'))
);

ALTER TABLE "content_analytics_events"
  ADD CONSTRAINT "content_analytics_events_workspace_id_workspaces_id_fk"
  FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "content_analytics_events"
  ADD CONSTRAINT "content_analytics_events_content_item_id_content_items_id_fk"
  FOREIGN KEY ("content_item_id") REFERENCES "content_items"("id") ON DELETE set null ON UPDATE no action;

CREATE INDEX "content_analytics_events_workspace_content_idx"
  ON "content_analytics_events" ("workspace_id", "content_type", "content_slug", "created_at");

CREATE INDEX "content_analytics_events_content_item_idx"
  ON "content_analytics_events" ("content_item_id", "created_at");

CREATE INDEX "content_analytics_events_workspace_event_idx"
  ON "content_analytics_events" ("workspace_id", "event_type", "created_at");


