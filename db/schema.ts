import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const contentTypes = ["blog", "comparison", "resource"] as const;
export type ContentType = (typeof contentTypes)[number];

export const contentStatuses = ["draft", "published", "archived"] as const;
export type ContentStatus = (typeof contentStatuses)[number];

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

export type Workspace = typeof workspaces.$inferSelect;
export type WorkspaceSettings = typeof workspaceSettings.$inferSelect;
export type WorkspaceSecret = typeof workspaceSecrets.$inferSelect;
export type ContentItem = typeof contentItems.$inferSelect;
export type ContentRevision = typeof contentRevisions.$inferSelect;
