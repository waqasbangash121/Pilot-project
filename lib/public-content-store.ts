import "server-only";

import { unstable_cache } from "next/cache";

import type { BlogPostInput } from "@/lib/blog-admin-types";
import {
  PUBLIC_CONTENT_CACHE_TAG,
  PUBLIC_CONTENT_REVALIDATE_SECONDS,
} from "@/lib/content-cache";
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
 * The database is the single source of truth. Public reads use Next's Data
 * Cache so database-backed pages remain eligible for ISR and browser/CDN
 * caching while admin mutations can invalidate them immediately.
 */

const listCachedBlogPosts = unstable_cache(
  async () => listStoredBlogPosts(),
  ["public-content", "blog", "list"],
  {
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
    tags: [PUBLIC_CONTENT_CACHE_TAG],
  },
);

const getCachedBlogPostBySlug = unstable_cache(
  async (slug: string) => getStoredBlogPostBySlug(slug),
  ["public-content", "blog", "slug"],
  {
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
    tags: [PUBLIC_CONTENT_CACHE_TAG],
  },
);

const listCachedManagedContent = unstable_cache(
  async (type: ManagedContentType) => listStoredManagedContent(type),
  ["public-content", "managed", "list"],
  {
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
    tags: [PUBLIC_CONTENT_CACHE_TAG],
  },
);

const getCachedManagedContentBySlug = unstable_cache(
  async (type: ManagedContentType, slug: string) => getStoredManagedContentBySlug(type, slug),
  ["public-content", "managed", "slug"],
  {
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
    tags: [PUBLIC_CONTENT_CACHE_TAG],
  },
);

export async function listPublishedBlogPosts(): Promise<BlogPostInput[]> {
  return listCachedBlogPosts();
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  return getCachedBlogPostBySlug(slug);
}

export async function listPublishedManagedContent(
  type: ManagedContentType,
): Promise<ManagedContentInput[]> {
  return listCachedManagedContent(type);
}

export async function getPublishedManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  return getCachedManagedContentBySlug(type, slug);
}
