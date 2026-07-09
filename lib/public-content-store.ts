import "server-only";

import type { BlogPostInput } from "@/lib/blog-admin-types";
import type { ManagedContentInput, ManagedContentType } from "@/lib/content-admin-types";
import {
  getPublishedBlogPostBySlug as getStoredBlogPostBySlug,
  getPublishedManagedContentBySlug as getStoredManagedContentBySlug,
  listPublishedBlogPosts as listStoredBlogPosts,
  listPublishedManagedContent as listStoredManagedContent,
} from "@/lib/content-store";

/**
 * Public content repository.
 *
 * The database is the single source of truth for public content. Pages and
 * route handlers decide whether a route is dynamic, cached, or revalidated.
 */

export async function listPublishedBlogPosts(): Promise<BlogPostInput[]> {
  return listStoredBlogPosts();
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  return getStoredBlogPostBySlug(slug);
}

export async function listPublishedManagedContent(
  type: ManagedContentType,
): Promise<ManagedContentInput[]> {
  return listStoredManagedContent(type);
}

export async function getPublishedManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  return getStoredManagedContentBySlug(type, slug);
}
