import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const contentTypes = ["blog", "comparison", "resource", "case-study", "tool"] as const;
export type ContentType = (typeof contentTypes)[number];

export const contentStatuses = ["draft", "published", "archived"] as const;
export type ContentStatus = (typeof contentStatuses)[number];

export const contentAnalyticsEventTypes = ["view", "click"] as const;
export type ContentAnalyticsEventType = (typeof contentAnalyticsEventTypes)[number];

export const workspaces = pgTable("workspaces", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const workspaceSettings = pgTable("workspace_settings", {
  workspaceId: text("workspace_id")
    .primaryKey()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  aiProvider: text("ai_provider").notNull().default("openai"),
  aiModel: text("ai_model"),
  contentDefaults: jsonb("content_defaults")
    .$type<Record<string, unknown>>()
    .notNull()
    .default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const workspaceSecrets = pgTable(
  "workspace_secrets",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    secretName: text("secret_name").notNull(),
    ciphertext: text("ciphertext").notNull(),
    iv: text("iv").notNull(),
    authTag: text("auth_tag").notNull(),
    keyVersion: integer("key_version").notNull().default(1),
    last4: text("last4").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("workspace_secrets_workspace_secret_name_idx").on(table.workspaceId, table.secretName),
  ],
);

export const contentItems = pgTable(
  "content_items",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    type: text("type").$type<ContentType>().notNull(),
    status: text("status").$type<ContentStatus>().notNull().default("draft"),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    bodyMarkdown: text("body_markdown").notNull().default(""),
    authorName: text("author_name").notNull().default("Hyper Team"),
    category: text("category").notNull().default(""),
    tags: jsonb("tags").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    focusKeyword: text("focus_keyword"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    coverImageUrl: text("cover_image_url"),
    readingTime: integer("reading_time").notNull().default(1),
    details: jsonb("details").$type<Record<string, unknown>>().notNull().default(sql`'{}'::jsonb`),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check(
      "content_items_type_check",
      sql`${table.type} in ('blog', 'comparison', 'resource', 'case-study', 'tool')`,
    ),
    uniqueIndex("content_items_workspace_type_slug_idx").on(table.workspaceId, table.type, table.slug),
    index("content_items_public_index").on(table.workspaceId, table.type, table.status, table.publishedAt),
  ],
);

export const contentRevisions = pgTable(
  "content_revisions",
  {
    id: text("id").primaryKey(),
    contentItemId: text("content_item_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    snapshot: jsonb("snapshot").$type<Record<string, unknown>>().notNull(),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("content_revisions_item_created_idx").on(table.contentItemId, table.createdAt)],
);

export const contentAnalyticsEvents = pgTable(
  "content_analytics_events",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    contentItemId: text("content_item_id").references(() => contentItems.id, { onDelete: "set null" }),
    contentType: text("content_type").$type<ContentType>().notNull(),
    contentSlug: text("content_slug").notNull(),
    eventType: text("event_type").$type<ContentAnalyticsEventType>().notNull(),
    visitorId: text("visitor_id").notNull(),
    sessionId: text("session_id").notNull(),
    path: text("path").notNull(),
    targetUrl: text("target_url"),
    targetText: text("target_text"),
    referrer: text("referrer"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check(
      "content_analytics_events_content_type_check",
      sql`${table.contentType} in ('blog', 'comparison', 'resource', 'case-study', 'tool')`,
    ),
    check(
      "content_analytics_events_event_type_check",
      sql`${table.eventType} in ('view', 'click')`,
    ),
    index("content_analytics_events_workspace_content_idx").on(
      table.workspaceId,
      table.contentType,
      table.contentSlug,
      table.createdAt,
    ),
    index("content_analytics_events_content_item_idx").on(table.contentItemId, table.createdAt),
    index("content_analytics_events_workspace_event_idx").on(
      table.workspaceId,
      table.eventType,
      table.createdAt,
    ),
  ],
);

export const teamMembers = pgTable(
  "team_members",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    designation: text("designation").notNull(),
    quote: text("quote").notNull().default(""),
    photoUrl: text("photo_url"),
    linkedinUrl: text("linkedin_url"),
    displayOrder: integer("display_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("team_members_workspace_order_idx").on(table.workspaceId, table.displayOrder, table.createdAt),
  ],
);

export type Workspace = typeof workspaces.$inferSelect;
export type WorkspaceSettings = typeof workspaceSettings.$inferSelect;
export type WorkspaceSecret = typeof workspaceSecrets.$inferSelect;
export type ContentItem = typeof contentItems.$inferSelect;
export type ContentRevision = typeof contentRevisions.$inferSelect;
export type ContentAnalyticsEvent = typeof contentAnalyticsEvents.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;








