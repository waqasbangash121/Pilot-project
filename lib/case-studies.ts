import "server-only";

import type { ManagedContentInput } from "@/lib/content-admin-types";
import {
  getPublishedManagedContentBySlug,
  listPublishedManagedContent,
} from "@/lib/public-content-store";

export type CaseStudy = ManagedContentInput & {
  type: "case-study";
  customerName: string;
  industry: string;
  outcomeSummary: string;
};

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return (await listPublishedManagedContent("case-study")) as CaseStudy[];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const item = await getPublishedManagedContentBySlug("case-study", slug);
  return item as CaseStudy | null;
}

export function formatCaseStudyDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00.000Z`));
}
