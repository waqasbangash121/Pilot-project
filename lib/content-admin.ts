import "server-only";

import type {
  ManagedContentInput,
  ManagedContentType,
  ResourceType,
  ToolType,
} from "@/lib/content-admin-types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const resourceTypes = new Set<ResourceType>([
  "Guide",
  "Playbook",
  "Checklist",
  "Template",
  "Case Study",
  "Documentation",
]);
const toolTypes = new Set<ToolType>([
  "Calculator",
  "Audit",
  "Checklist",
  "Generator",
  "Template",
  "Worksheet",
]);

const contentLocations: Record<
  ManagedContentType,
  { directory: string; registryPath: string; publicRoot: string; entriesName: string }
> = {
  comparison: {
    directory: "content/comparisons",
    registryPath: "content/comparisons/posts.ts",
    publicRoot: "/comparisons",
    entriesName: "comparisonEntries",
  },
  resource: {
    directory: "content/resources",
    registryPath: "content/resources/posts.ts",
    publicRoot: "/resources",
    entriesName: "resourceEntries",
  },
  "case-study": {
    directory: "content/case-studies",
    registryPath: "content/case-studies/posts.ts",
    publicRoot: "/case-studies",
    entriesName: "caseStudyEntries",
  },
  tool: {
    directory: "content/tools",
    registryPath: "content/tools/posts.ts",
    publicRoot: "/tools",
    entriesName: "toolEntries",
  },
};

export class ManagedContentInputError extends Error {}

function requiredString(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") throw new ManagedContentInputError(`${label} is required.`);

  const result = value.trim();
  if (!result) throw new ManagedContentInputError(`${label} is required.`);
  if (result.length > maxLength) {
    throw new ManagedContentInputError(`${label} must be ${maxLength} characters or fewer.`);
  }

  return result;
}

function optionalString(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") return "";

  const result = value.trim();
  if (result.length > maxLength) {
    throw new ManagedContentInputError(`${label} must be ${maxLength} characters or fewer.`);
  }

  return result;
}

function validDate(value: string, label: string): string {
  if (!datePattern.test(value) || Number.isNaN(new Date(`${value}T12:00:00.000Z`).getTime())) {
    throw new ManagedContentInputError(`${label} must use YYYY-MM-DD.`);
  }

  return value;
}

function normalizeTags(value: unknown): string[] {
  const values = Array.isArray(value) ? value : [];
  if (values.length > 10) throw new ManagedContentInputError("Use a maximum of 10 tags.");

  return [...new Set(values.map((tag) => requiredString(tag, "Each tag", 40)))];
}

function normalizePathOrUrl(value: unknown, label: string): string {
  const path = optionalString(value, label, 2000);
  if (!path) return "";
  if (path.startsWith("/")) return path;

  try {
    const url = new URL(path);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    // Fall through to the user-facing validation error below.
  }

  throw new ManagedContentInputError(`${label} must be a root-relative path or an http(s) URL.`);
}

function normalizeImage(value: unknown): string {
  return normalizePathOrUrl(value, "Cover image");
}

function getType(value: unknown): ManagedContentType {
  if (
    value === "comparison" ||
    value === "resource" ||
    value === "case-study" ||
    value === "tool"
  ) {
    return value;
  }
  throw new ManagedContentInputError("Choose a valid managed content type.");
}

function getResourceType(value: unknown): ResourceType {
  if (typeof value === "string" && resourceTypes.has(value as ResourceType)) {
    return value as ResourceType;
  }

  throw new ManagedContentInputError("Choose a valid resource type.");
}

function getToolType(value: unknown): ToolType {
  if (typeof value === "string" && toolTypes.has(value as ToolType)) {
    return value as ToolType;
  }

  throw new ManagedContentInputError("Choose a valid tool type.");
}

export function contentDirectory(type: ManagedContentType): string {
  return contentLocations[type].directory;
}

export function contentRegistryPath(type: ManagedContentType): string {
  return contentLocations[type].registryPath;
}

export function publicContentPath(type: ManagedContentType, slug: string): string {
  return `${contentLocations[type].publicRoot}/${slug}`;
}

export function parseManagedContentInput(value: unknown, expectedType?: ManagedContentType): ManagedContentInput {
  if (!value || typeof value !== "object") {
    throw new ManagedContentInputError("Invalid content form data.");
  }

  const input = value as Record<string, unknown>;
  const type = getType(input.type ?? expectedType);
  if (expectedType && type !== expectedType) {
    throw new ManagedContentInputError("This form is being submitted to the wrong content module.");
  }

  const slug = requiredString(input.slug, "Slug", 120).toLowerCase();
  if (!slugPattern.test(slug)) {
    throw new ManagedContentInputError("Slug can use lowercase letters, numbers, and hyphens only.");
  }

  const readingTime = Number(input.readingTime);
  if (!Number.isInteger(readingTime) || readingTime < 1 || readingTime > 120) {
    throw new ManagedContentInputError("Reading time must be a whole number between 1 and 120.");
  }

  const common: ManagedContentInput = {
    type,
    title: requiredString(input.title, "Title", 120),
    slug,
    excerpt: requiredString(input.excerpt, "Excerpt", 350),
    publishedAt: validDate(requiredString(input.publishedAt, "Publish date", 10), "Publish date"),
    updatedAt: optionalString(input.updatedAt, "Updated date", 10),
    author: requiredString(input.author, "Author", 120),
    category: requiredString(input.category, "Category", 80),
    tags: normalizeTags(input.tags),
    focusKeyword: optionalString(input.focusKeyword, "Focus keyword", 100),
    seoTitle: optionalString(input.seoTitle, "SEO title", 70),
    seoDescription: optionalString(input.seoDescription, "SEO description", 180),
    coverImage: normalizeImage(input.coverImage),
    readingTime,
    draft: Boolean(input.draft),
    content: requiredString(input.content, "Content", 120000),
  };

  if (type === "comparison") {
    return {
      ...common,
      competitorName: requiredString(input.competitorName, "Competitor name", 120),
      decisionSummary: requiredString(input.decisionSummary, "Decision summary", 300),
    };
  }

  if (type === "resource") {
    return {
      ...common,
      resourceType: getResourceType(input.resourceType),
      audience: requiredString(input.audience, "Audience", 160),
    };
  }

  if (type === "case-study") {
    return {
      ...common,
      customerName: requiredString(input.customerName, "Customer name", 120),
      industry: requiredString(input.industry, "Industry", 120),
      outcomeSummary: requiredString(input.outcomeSummary, "Outcome summary", 300),
    };
  }

  return {
    ...common,
    toolType: getToolType(input.toolType),
    toolUrl: normalizePathOrUrl(input.toolUrl, "Tool URL"),
    useCase: requiredString(input.useCase, "Use case", 180),
  };
}

export function serializeManagedContent(item: ManagedContentInput): string {
  const metadata = {
    type: item.type,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt || undefined,
    author: item.author,
    category: item.category,
    tags: item.tags,
    focusKeyword: item.focusKeyword || undefined,
    seoTitle: item.seoTitle || undefined,
    seoDescription: item.seoDescription || undefined,
    coverImage: item.coverImage || undefined,
    readingTime: item.readingTime,
    draft: item.draft,
    competitorName: item.type === "comparison" ? item.competitorName : undefined,
    decisionSummary: item.type === "comparison" ? item.decisionSummary : undefined,
    resourceType: item.type === "resource" ? item.resourceType : undefined,
    audience: item.type === "resource" ? item.audience : undefined,
    customerName: item.type === "case-study" ? item.customerName : undefined,
    industry: item.type === "case-study" ? item.industry : undefined,
    outcomeSummary: item.type === "case-study" ? item.outcomeSummary : undefined,
    toolType: item.type === "tool" ? item.toolType : undefined,
    toolUrl: item.type === "tool" ? item.toolUrl || undefined : undefined,
    useCase: item.type === "tool" ? item.useCase : undefined,
  };

  return `export const metadata = ${JSON.stringify(metadata, null, 2)};\n\n${item.content.trim()}\n`;
}

export function parseManagedContent(source: string, expectedType: ManagedContentType): ManagedContentInput {
  const match = source.match(/^export const metadata = (\{[\s\S]*?\});\s*\n\n/);
  if (!match) {
    throw new ManagedContentInputError("This item does not use the admin-compatible MDX metadata format.");
  }

  let metadata: Record<string, unknown>;
  try {
    metadata = JSON.parse(match[1]) as Record<string, unknown>;
  } catch {
    throw new ManagedContentInputError("This item metadata is not valid JSON.");
  }

  return parseManagedContentInput({ ...metadata, type: expectedType, content: source.slice(match[0].length) }, expectedType);
}

function getIdentifier(slug: string): string {
  return `Content${slug
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join("")}`;
}

export function createManagedContentRegistry(type: ManagedContentType, items: ManagedContentInput[]): string {
  const ordered = [...items].sort(
    (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
  const imports = ordered
    .map((item) => {
      const identifier = getIdentifier(item.slug);
      return `import ${identifier}, * as ${identifier}Module from "./${item.slug}.mdx";`;
    })
    .join("\n");
  const metadata = ordered
    .map((item) => {
      const identifier = getIdentifier(item.slug);
      return `const ${identifier}Metadata = (${identifier}Module as unknown as { metadata: ManagedContentMetadata }).metadata;`;
    })
    .join("\n");
  const entries = ordered
    .map((item) => {
      const identifier = getIdentifier(item.slug);
      return `  { ...${identifier}Metadata, Content: ${identifier} },`;
    })
    .join("\n");
  const typeName = contentLocations[type].entriesName;

  return `import type { ComponentType } from "react";\n\n${imports}\n\nexport type ManagedContentMetadata = {\n  type: "${type}";\n  title: string;\n  slug: string;\n  excerpt: string;\n  publishedAt: string;\n  updatedAt?: string;\n  author: string;\n  category: string;\n  tags: string[];\n  focusKeyword?: string;\n  seoTitle?: string;\n  seoDescription?: string;\n  coverImage?: string;\n  readingTime: number;\n  draft?: boolean;\n  competitorName?: string;\n  decisionSummary?: string;\n  resourceType?: "Guide" | "Playbook" | "Checklist" | "Template" | "Case Study" | "Documentation";\n  audience?: string;\n  customerName?: string;\n  industry?: string;\n  outcomeSummary?: string;\n  toolType?: "Calculator" | "Audit" | "Checklist" | "Generator" | "Template" | "Worksheet";\n  toolUrl?: string;\n  useCase?: string;\n};\n\nexport type ManagedContentEntry = ManagedContentMetadata & {\n  Content: ComponentType;\n};\n\n${metadata}\n\nexport const ${typeName}: ManagedContentEntry[] = [\n${entries}\n];\n`;
}
