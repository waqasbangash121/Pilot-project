import "server-only";

import type { ManagedContentInput } from "@/lib/content-admin-types";
import {
  getPublishedManagedContentBySlug,
  listPublishedManagedContent,
} from "@/lib/public-content-store";

export type ToolItem = ManagedContentInput & {
  type: "tool";
  toolType: string;
  useCase: string;
  toolUrl?: string;
};

export async function getAllTools(): Promise<ToolItem[]> {
  return (await listPublishedManagedContent("tool")) as ToolItem[];
}

export async function getToolBySlug(slug: string): Promise<ToolItem | null> {
  const item = await getPublishedManagedContentBySlug("tool", slug);
  return item as ToolItem | null;
}

export function formatToolDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00.000Z`));
}
