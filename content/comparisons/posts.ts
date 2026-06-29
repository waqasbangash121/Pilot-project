import type { ComponentType } from "react";

export type ComparisonMetadata = {
  type: "comparison";
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  focusKeyword?: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: string;
  readingTime: number;
  draft?: boolean;
  competitorName: string;
  decisionSummary: string;
};

export type ComparisonEntry = ComparisonMetadata & {
  Content: ComponentType;
};

export const comparisonEntries: ComparisonEntry[] = [];
