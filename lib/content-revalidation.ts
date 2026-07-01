import "server-only";

import { revalidatePath } from "next/cache";

import type { ContentType } from "@/db/schema";

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

  revalidatePath(root);
  revalidatePath(`${root}/${slug}`);

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`${root}/${previousSlug}`);
  }

  revalidatePath("/sitemap.xml");
}
