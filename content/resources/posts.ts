import type { ComponentType } from "react";

import ContentAGuideToShopifyAppInstallation, * as ContentAGuideToShopifyAppInstallationModule from "./a-guide-to-shopify-app-installation.mdx";

export type ManagedContentMetadata = {
  type: "resource";
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
  competitorName?: string;
  decisionSummary?: string;
  resourceType?: "Guide" | "Playbook" | "Checklist" | "Template" | "Case Study" | "Documentation";
  audience?: string;
};

export type ManagedContentEntry = ManagedContentMetadata & {
  Content: ComponentType;
};

const ContentAGuideToShopifyAppInstallationMetadata = (ContentAGuideToShopifyAppInstallationModule as unknown as { metadata: ManagedContentMetadata }).metadata;

export const resourceEntries: ManagedContentEntry[] = [
  { ...ContentAGuideToShopifyAppInstallationMetadata, Content: ContentAGuideToShopifyAppInstallation },
];
