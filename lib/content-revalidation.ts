import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

import type { ContentType } from "@/db/schema";
import { PUBLIC_CONTENT_CACHE_TAG } from "@/lib/content-cache";

function rootPath(type: ContentType): string {
  if (type === "blog") return "/blog";
  if (type === "comparison") return "/comparisons";
  if (type === "resource") return "/resources";
  if (type === "case-study") return "/case-studies";
  return "/tools";
}

export function revalidateContentRoutes(
  type: ContentType,
  slug: string,
  previousSlug?: string,
): void {
  const root = rootPath(type);

  revalidateTag(PUBLIC_CONTENT_CACHE_TAG);
  revalidatePath(root);
  revalidatePath(`${root}/${slug}`);

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`${root}/${previousSlug}`);
  }

  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  revalidatePath("/llms-full.txt");
}
