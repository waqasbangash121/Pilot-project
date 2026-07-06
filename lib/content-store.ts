import "server-only";

import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";

import { getDb, getSql } from "@/db";
import {
  contentItems,
  contentRevisions,
  workspaces,
  workspaceSettings,
  type ContentItem,
  type ContentType,
} from "@/db/schema";
import type { BlogPostInput } from "@/lib/blog-admin-types";
import type { ManagedContentInput, ManagedContentType } from "@/lib/content-admin-types";

export const CONTENT_WORKSPACE_ID = "hyper-default";

type PublicContentType = ContentType;
type StoredContentInput = BlogPostInput | ManagedContentInput;

export class ContentStoreError extends Error {}

type ContentItemRow = {
  id: string;
  workspace_id: string;
  type: PublicContentType;
  status: ContentItem["status"];
  slug: string;
  title: string;
  excerpt: string;
  body_markdown: string;
  author_name: string;
  category: string;
  tags: string[] | null;
  focus_keyword: string | null;
  seo_title: string | null;
  seo_description: string | null;
  cover_image_url: string | null;
  reading_time: number;
  details: Record<string, unknown> | null;
  published_at: string | Date | null;
  created_at: string | Date;
  updated_at: string | Date;
};
export type SavedContentItem = {
  id: string;
  type: PublicContentType;
  slug: string;
  title: string;
  draft: boolean;
};

function dateAtNoon(value: string): Date {
  return new Date(`${value}T12:00:00.000Z`);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function endOfTodayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));
}

function formatDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

function toContentItem(row: ContentItemRow): ContentItem {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    type: row.type,
    status: row.status,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    bodyMarkdown: row.body_markdown,
    authorName: row.author_name,
    category: row.category,
    tags: row.tags ?? [],
    focusKeyword: row.focus_keyword,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    coverImageUrl: row.cover_image_url,
    readingTime: row.reading_time,
    details: row.details ?? {},
    publishedAt: row.published_at ? toDate(row.published_at) : null,
    createdAt: toDate(row.created_at),
    updatedAt: toDate(row.updated_at),
  };
}

function detailString(details: Record<string, unknown>, key: string): string {
  const value = details[key];
  return typeof value === "string" ? value : "";
}

function isManagedType(type: PublicContentType): type is ManagedContentType {
  return type === "comparison" || type === "resource" || type === "case-study" || type === "tool";
}

function isPubliclyAvailable(item: ContentItem): boolean {
  return item.status === "published" && Boolean(item.publishedAt) && item.publishedAt! <= endOfTodayUtc();
}

function toBaseInput(item: ContentItem): Omit<BlogPostInput, "draft" | "content"> {
  return {
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    publishedAt: formatDate(item.publishedAt ?? item.createdAt),
    updatedAt: formatDate(item.updatedAt),
    author: item.authorName,
    category: item.category,
    tags: item.tags,
    focusKeyword: item.focusKeyword ?? "",
    seoTitle: item.seoTitle ?? "",
    seoDescription: item.seoDescription ?? "",
    coverImage: item.coverImageUrl ?? "",
    readingTime: item.readingTime,
  };
}

function toBlogPost(item: ContentItem): BlogPostInput {
  return {
    ...toBaseInput(item),
    draft: item.status !== "published",
    content: item.bodyMarkdown,
  };
}

function toManagedContent(item: ContentItem, type: ManagedContentType): ManagedContentInput {
  const common = {
    ...toBaseInput(item),
    type,
    draft: item.status !== "published",
    content: item.bodyMarkdown,
  };

  if (type === "comparison") {
    return {
      ...common,
      type: "comparison",
      competitorName: detailString(item.details, "competitorName"),
      decisionSummary: detailString(item.details, "decisionSummary"),
    };
  }

  if (type === "resource") {
    return {
      ...common,
      type: "resource",
      resourceType: detailString(item.details, "resourceType") as ManagedContentInput["resourceType"],
      audience: detailString(item.details, "audience"),
    };
  }

  if (type === "case-study") {
    return {
      ...common,
      type: "case-study",
      customerName: detailString(item.details, "customerName"),
      industry: detailString(item.details, "industry"),
      outcomeSummary: detailString(item.details, "outcomeSummary"),
    };
  }

  return {
    ...common,
    type: "tool",
    toolType: detailString(item.details, "toolType") as ManagedContentInput["toolType"],
    toolUrl: detailString(item.details, "toolUrl"),
    useCase: detailString(item.details, "useCase"),
  };
}

async function ensureWorkspace(): Promise<void> {
  const db = getDb();

  await db.insert(workspaces).values({
    id: CONTENT_WORKSPACE_ID,
    name: "Hyper Content Studio",
  }).onConflictDoNothing({ target: workspaces.id });

  await db.insert(workspaceSettings).values({
    workspaceId: CONTENT_WORKSPACE_ID,
  }).onConflictDoNothing({ target: workspaceSettings.workspaceId });
}

async function getStoredItem(
  type: PublicContentType,
  slug: string,
): Promise<ContentItem | null> {
  const sql = getSql();
  const rows = await sql`
    select
      "id",
      "workspace_id",
      "type",
      "status",
      "slug",
      "title",
      "excerpt",
      "body_markdown",
      "author_name",
      "category",
      "tags",
      "focus_keyword",
      "seo_title",
      "seo_description",
      "cover_image_url",
      "reading_time",
      "details",
      "published_at",
      "created_at",
      "updated_at"
    from "content_items"
    where
      "workspace_id" = ${CONTENT_WORKSPACE_ID}
      and "type" = ${type}
      and "slug" = ${slug}
    limit 1
  ` as ContentItemRow[];

  return rows[0] ? toContentItem(rows[0]) : null;
}

async function listStoredItems(
  type: PublicContentType,
  publishedOnly: boolean,
): Promise<ContentItem[]> {
  const sql = getSql();

  const rows = publishedOnly
    ? await sql`
        select
          "id",
          "workspace_id",
          "type",
          "status",
          "slug",
          "title",
          "excerpt",
          "body_markdown",
          "author_name",
          "category",
          "tags",
          "focus_keyword",
          "seo_title",
          "seo_description",
          "cover_image_url",
          "reading_time",
          "details",
          "published_at",
          "created_at",
          "updated_at"
        from "content_items"
        where
          "workspace_id" = ${CONTENT_WORKSPACE_ID}
          and "type" = ${type}
          and "status" = ${"published"}
          and "published_at" <= ${endOfTodayUtc()}
        order by "published_at" desc, "created_at" desc
      ` as ContentItemRow[]
    : await sql`
        select
          "id",
          "workspace_id",
          "type",
          "status",
          "slug",
          "title",
          "excerpt",
          "body_markdown",
          "author_name",
          "category",
          "tags",
          "focus_keyword",
          "seo_title",
          "seo_description",
          "cover_image_url",
          "reading_time",
          "details",
          "published_at",
          "created_at",
          "updated_at"
        from "content_items"
        where
          "workspace_id" = ${CONTENT_WORKSPACE_ID}
          and "type" = ${type}
          and "status" <> ${"archived"}
        order by "published_at" desc, "created_at" desc
      ` as ContentItemRow[];

  return rows.map(toContentItem);
}
export async function listPublishedBlogPosts(): Promise<BlogPostInput[]> {
  return (await listStoredItems("blog", true)).map(toBlogPost);
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  const item = await getStoredItem("blog", slug);
  return item && isPubliclyAvailable(item) ? toBlogPost(item) : null;
}

export async function listPublishedManagedContent(
  type: ManagedContentType,
): Promise<ManagedContentInput[]> {
  return (await listStoredItems(type, true)).map((item) => toManagedContent(item, type));
}

export async function getPublishedManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  const item = await getStoredItem(type, slug);
  return item && isPubliclyAvailable(item) ? toManagedContent(item, type) : null;
}

export async function listStudioBlogPosts(): Promise<BlogPostInput[]> {
  return (await listStoredItems("blog", false)).map(toBlogPost);
}

export async function getStudioBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  const item = await getStoredItem("blog", slug);
  return item && item.status !== "archived" ? toBlogPost(item) : null;
}

export async function listStudioManagedContent(
  type: ManagedContentType,
): Promise<ManagedContentInput[]> {
  return (await listStoredItems(type, false)).map((item) => toManagedContent(item, type));
}

export async function getStudioManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  const item = await getStoredItem(type, slug);
  return item && item.status !== "archived" ? toManagedContent(item, type) : null;
}

function valuesForContent(input: StoredContentInput, type: PublicContentType) {
  const managedInput = input as ManagedContentInput;
  const details =
    type === "comparison"
      ? {
          competitorName: managedInput.competitorName ?? "",
          decisionSummary: managedInput.decisionSummary ?? "",
        }
      : type === "resource"
        ? {
            resourceType: managedInput.resourceType ?? "Guide",
            audience: managedInput.audience ?? "",
          }
        : type === "case-study"
          ? {
              customerName: managedInput.customerName ?? "",
              industry: managedInput.industry ?? "",
              outcomeSummary: managedInput.outcomeSummary ?? "",
            }
          : type === "tool"
            ? {
                toolType: managedInput.toolType ?? "Checklist",
                toolUrl: managedInput.toolUrl ?? "",
                useCase: managedInput.useCase ?? "",
              }
            : {};

  return {
    workspaceId: CONTENT_WORKSPACE_ID,
    type,
    status: input.draft ? "draft" as const : "published" as const,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    bodyMarkdown: input.content.trim(),
    authorName: input.author,
    category: input.category,
    tags: input.tags,
    focusKeyword: input.focusKeyword || null,
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    coverImageUrl: input.coverImage || null,
    readingTime: input.readingTime,
    details,
    publishedAt: dateAtNoon(input.publishedAt),
    updatedAt: dateAtNoon(input.updatedAt || today()),
  };
}

async function saveContent(
  type: PublicContentType,
  input: StoredContentInput,
  editorLogin: string,
  originalSlug?: string,
): Promise<SavedContentItem> {
  await ensureWorkspace();

  const db = getDb();
  const current = originalSlug ? await getStoredItem(type, originalSlug) : null;
  const existingWithNextSlug = await getStoredItem(type, input.slug);

  if (originalSlug && (!current || current.status === "archived")) {
    throw new ContentStoreError("This content item no longer exists.");
  }

  if (existingWithNextSlug && existingWithNextSlug.id !== current?.id) {
    throw new ContentStoreError(`A ${type} with this slug already exists.`);
  }

  const values = valuesForContent(input, type);
  const id = current?.id ?? randomUUID();

  if (current) {
    await db.update(contentItems).set(values).where(eq(contentItems.id, id));
  } else {
    await db.insert(contentItems).values({
      id,
      ...values,
      createdAt: new Date(),
    });
  }

  await db.insert(contentRevisions).values({
    id: randomUUID(),
    contentItemId: id,
    snapshot: {
      ...input,
      type,
      savedAt: new Date().toISOString(),
    },
    createdBy: editorLogin,
  });

  return {
    id,
    type,
    slug: input.slug,
    title: input.title,
    draft: input.draft,
  };
}

export async function saveBlogPost(
  input: BlogPostInput,
  editorLogin: string,
  originalSlug?: string,
): Promise<SavedContentItem> {
  return saveContent("blog", input, editorLogin, originalSlug);
}

export async function saveManagedContent(
  input: ManagedContentInput,
  editorLogin: string,
  originalSlug?: string,
): Promise<SavedContentItem> {
  if (!isManagedType(input.type)) {
    throw new ContentStoreError("Only managed content types can be saved here.");
  }

  return saveContent(input.type, input, editorLogin, originalSlug);
}

export async function deleteStoredContent(
  type: PublicContentType,
  slug: string,
): Promise<{ title: string; slug: string; type: PublicContentType }> {
  const db = getDb();
  const deleted = await db
    .delete(contentItems)
    .where(
      and(
        eq(contentItems.workspaceId, CONTENT_WORKSPACE_ID),
        eq(contentItems.type, type),
        eq(contentItems.slug, slug),
      ),
    )
    .returning({
      title: contentItems.title,
      slug: contentItems.slug,
      type: contentItems.type,
    });

  const item = deleted[0];

  if (!item) {
    throw new ContentStoreError("This content item no longer exists.");
  }

  return item;
}
