import "server-only";

import type { BlogPostInput } from "@/lib/blog-admin-types";
import type { ManagedContentInput, ManagedContentType } from "@/lib/content-admin-types";
import {
  getPublishedBlogPostBySlug as getStoredBlogPostBySlug,
  getPublishedManagedContentBySlug as getStoredManagedContentBySlug,
  listPublishedBlogPosts as listStoredBlogPosts,
  listPublishedManagedContent as listStoredManagedContent,
} from "@/lib/content-store";
import {
  getStaticBlogPostBySlug,
  getStaticManagedContentBySlug,
  listStaticBlogPosts,
  listStaticManagedContent,
} from "@/lib/static-content-store";

/**
 * Public content repository.
 *
 * This file must remain database/content-only:
 * - no cookies()
 * - no headers()
 * - no draftMode()
 * - no auth/session helpers
 * - no noStore() or route rendering configuration
 *
 * Pages and route handlers decide whether a route is dynamic,
 * cached, or revalidated.
 */

function isDatabaseUnavailable(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("fetch failed") ||
    message.includes("Error connecting to database") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ENOTFOUND") ||
    message.includes("ETIMEDOUT")
  );
}

function mergeBySlug<T extends { slug: string }>(primary: T[], fallback: T[]): T[] {
  const items = new Map<string, T>();

  for (const item of fallback) items.set(item.slug, item);
  for (const item of primary) items.set(item.slug, item);

  return Array.from(items.values()).sort((a, b) => {
    const nextDate = "publishedAt" in b && typeof b.publishedAt === "string" ? b.publishedAt : "";
    const currentDate = "publishedAt" in a && typeof a.publishedAt === "string" ? a.publishedAt : "";
    return nextDate.localeCompare(currentDate);
  });
}

export async function listPublishedBlogPosts(): Promise<BlogPostInput[]> {
  const staticPosts = await listStaticBlogPosts();

  try {
    const storedPosts = await listStoredBlogPosts();
    return mergeBySlug(storedPosts, staticPosts);
  } catch (error) {
    if (isDatabaseUnavailable(error)) return staticPosts;
    throw error;
  }
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  try {
    const storedPost = await getStoredBlogPostBySlug(slug);
    return storedPost ?? (await getStaticBlogPostBySlug(slug));
  } catch (error) {
    if (isDatabaseUnavailable(error)) return getStaticBlogPostBySlug(slug);
    throw error;
  }
}

export async function listPublishedManagedContent(
  type: ManagedContentType,
): Promise<ManagedContentInput[]> {
  const staticItems = await listStaticManagedContent(type);

  try {
    const storedItems = await listStoredManagedContent(type);
    return mergeBySlug(storedItems, staticItems);
  } catch (error) {
    if (isDatabaseUnavailable(error)) return staticItems;
    throw error;
  }
}

export async function getPublishedManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  try {
    const storedItem = await getStoredManagedContentBySlug(type, slug);
    return storedItem ?? (await getStaticManagedContentBySlug(type, slug));
  } catch (error) {
    if (isDatabaseUnavailable(error)) return getStaticManagedContentBySlug(type, slug);
    throw error;
  }
}


