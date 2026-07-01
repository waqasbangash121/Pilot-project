export type ManagedContentType = "comparison" | "resource" | "case-study" | "tool";

export type ResourceType = "Guide" | "Playbook" | "Checklist" | "Template" | "Case Study" | "Documentation";
export type ToolType = "Calculator" | "Audit" | "Checklist" | "Generator" | "Template" | "Worksheet";

export interface ManagedContentInput {
  type: ManagedContentType;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  focusKeyword?: string;
  seoTitle: string;
  seoDescription: string;
  coverImage: string;
  readingTime: number;
  draft: boolean;
  content: string;
  competitorName?: string;
  decisionSummary?: string;
  resourceType?: ResourceType;
  audience?: string;
  customerName?: string;
  industry?: string;
  outcomeSummary?: string;
  toolType?: ToolType;
  toolUrl?: string;
  useCase?: string;
}

export interface RemoteManagedContent extends ManagedContentInput {
  sourcePath: string;
}

export type ComparisonContentInput = ManagedContentInput & {
  type: "comparison";
  competitorName: string;
  decisionSummary: string;
};

export type ResourceContentInput = ManagedContentInput & {
  type: "resource";
  resourceType: ResourceType;
  audience: string;
};

export type CaseStudyContentInput = ManagedContentInput & {
  type: "case-study";
  customerName: string;
  industry: string;
  outcomeSummary: string;
};

export type ToolContentInput = ManagedContentInput & {
  type: "tool";
  toolType: ToolType;
  useCase: string;
  toolUrl?: string;
};
