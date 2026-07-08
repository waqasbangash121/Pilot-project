import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { BlogPostInput } from "@/lib/blog-admin-types";
import type { ManagedContentInput, ManagedContentType } from "@/lib/content-admin-types";

type StaticMetadata = Partial<BlogPostInput & ManagedContentInput> & {
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
};

const CONTENT_DIRS: Record<ManagedContentType | "blog", string> = {
  blog: "blog",
  comparison: "comparisons",
  resource: "resources",
  "case-study": "case-studies",
  tool: "tools",
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function isPublished(metadata: StaticMetadata): boolean {
  return metadata.draft !== true && Boolean(metadata.publishedAt) && metadata.publishedAt! <= todayIso();
}

function stripMetadataExport(source: string): { metadataJson: string | null; body: string } {
  const marker = "export const metadata =";
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return { metadataJson: null, body: source.trim() };

  const objectStart = source.indexOf("{", markerIndex);
  if (objectStart === -1) return { metadataJson: null, body: source.trim() };

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = objectStart; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      escaped = char === "\\" && !escaped;
      if (char === '"' && !escaped) inString = false;
      if (char !== "\\") escaped = false;
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;

    if (depth === 0) {
      const metadataJson = source.slice(objectStart, index + 1);
      const semicolonIndex = source.indexOf(";", index);
      const bodyStart = semicolonIndex === -1 ? index + 1 : semicolonIndex + 1;
      return { metadataJson, body: source.slice(bodyStart).trim() };
    }
  }

  return { metadataJson: null, body: source.trim() };
}

function parseMetadata(value: string | null): StaticMetadata | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as StaticMetadata;
  } catch {
    return null;
  }
}

async function readStaticMdxFiles(contentType: ManagedContentType | "blog") {
  const directory = path.join(process.cwd(), "content", CONTENT_DIRS[contentType]);

  try {
    const names = await readdir(directory);
    return Promise.all(
      names
        .filter((name) => name.endsWith(".mdx"))
        .map(async (name) => ({
          filePath: path.join(directory, name),
          source: await readFile(path.join(directory, name), "utf8"),
        })),
    );
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "ENOENT") return [];
    throw error;
  }
}

function toBlogInput(metadata: StaticMetadata, content: string): BlogPostInput | null {
  if (!metadata.title || !metadata.slug || !metadata.excerpt || !metadata.publishedAt) return null;
  if (!isPublished(metadata)) return null;

  return {
    title: metadata.title,
    slug: metadata.slug,
    excerpt: metadata.excerpt,
    publishedAt: metadata.publishedAt,
    updatedAt: metadata.updatedAt,
    author: metadata.author || "Hyper Team",
    category: metadata.category || "",
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    focusKeyword: metadata.focusKeyword || "",
    seoTitle: metadata.seoTitle || "",
    seoDescription: metadata.seoDescription || "",
    coverImage: metadata.coverImage || "",
    readingTime: metadata.readingTime || 1,
    draft: false,
    content,
  };
}

function toManagedInput(
  contentType: ManagedContentType,
  metadata: StaticMetadata,
  content: string,
): ManagedContentInput | null {
  if (!metadata.title || !metadata.slug || !metadata.excerpt || !metadata.publishedAt) return null;
  if (!isPublished(metadata)) return null;

  return {
    type: contentType,
    title: metadata.title,
    slug: metadata.slug,
    excerpt: metadata.excerpt,
    publishedAt: metadata.publishedAt,
    updatedAt: metadata.updatedAt,
    author: metadata.author || "Hyper Team",
    category: metadata.category || "",
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    focusKeyword: metadata.focusKeyword || "",
    seoTitle: metadata.seoTitle || "",
    seoDescription: metadata.seoDescription || "",
    coverImage: metadata.coverImage || "",
    readingTime: metadata.readingTime || 1,
    draft: false,
    content,
    competitorName: metadata.competitorName || "",
    decisionSummary: metadata.decisionSummary || "",
    resourceType: metadata.resourceType || "Guide",
    audience: metadata.audience || "",
    customerName: metadata.customerName || "",
    industry: metadata.industry || "",
    outcomeSummary: metadata.outcomeSummary || "",
    toolType: metadata.toolType || "Checklist",
    toolUrl: metadata.toolUrl || "",
    useCase: metadata.useCase || "",
  };
}

export async function listStaticBlogPosts(): Promise<BlogPostInput[]> {
  const files = await readStaticMdxFiles("blog");
  const posts = files
    .map(({ source }) => {
      const { metadataJson, body } = stripMetadataExport(source);
      const metadata = parseMetadata(metadataJson);
      return metadata ? toBlogInput(metadata, body) : null;
    })
    .filter((post): post is BlogPostInput => Boolean(post));

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getStaticBlogPostBySlug(slug: string): Promise<BlogPostInput | null> {
  const posts = await listStaticBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function listStaticManagedContent(type: ManagedContentType): Promise<ManagedContentInput[]> {
  const files = await readStaticMdxFiles(type);
  const items = files
    .map(({ source }) => {
      const { metadataJson, body } = stripMetadataExport(source);
      const metadata = parseMetadata(metadataJson);
      return metadata ? toManagedInput(type, metadata, body) : null;
    })
    .filter((item): item is ManagedContentInput => Boolean(item));

  return items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getStaticManagedContentBySlug(
  type: ManagedContentType,
  slug: string,
): Promise<ManagedContentInput | null> {
  const items = await listStaticManagedContent(type);
  return items.find((item) => item.slug === slug) ?? null;
}
