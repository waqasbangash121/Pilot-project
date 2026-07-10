"use client";

import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock3,
  Eye,
  Globe2,
  Tag,
  UserRound,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "@/components/blog/article-content.module.css";
import { useEditorAccordionItem } from "@/components/admin/collapsible-editor-section";
import type { BlogPostInput } from "@/lib/blog-admin-types";
import type { ManagedContentInput, ManagedContentType } from "@/lib/content-admin-types";

type PreviewContentType = ManagedContentType | "blog";

type ContentPreviewProps = {
  type: PreviewContentType;
  item: BlogPostInput | ManagedContentInput;
  tags: string[];
  publicUrl: string;
};

const previewCopy: Record<
  PreviewContentType,
  {
    backLabel: string;
    detailLabel: string;
    eyebrow: (item: BlogPostInput | ManagedContentInput) => string;
    detailRows: (item: BlogPostInput | ManagedContentInput) => Array<[string, string | undefined]>;
  }
> = {
  blog: {
    backLabel: "Back to the blog",
    detailLabel: "Article details",
    eyebrow: (item) => item.category,
    detailRows: (item) => [["Category", item.category]],
  },
  comparison: {
    backLabel: "Back to comparisons",
    detailLabel: "Comparison details",
    eyebrow: (item) => item.category,
    detailRows: (item) => {
      const content = item as ManagedContentInput;
      return [
        ["Compared with", content.competitorName],
        ["Decision summary", content.decisionSummary],
      ];
    },
  },
  resource: {
    backLabel: "Back to resources",
    detailLabel: "Resource details",
    eyebrow: (item) => (item as ManagedContentInput).resourceType || item.category,
    detailRows: (item) => {
      const content = item as ManagedContentInput;
      return [
        ["Format", content.resourceType],
        ["Built for", content.audience],
      ];
    },
  },
  "case-study": {
    backLabel: "Back to case studies",
    detailLabel: "Case study details",
    eyebrow: (item) => (item as ManagedContentInput).customerName || item.category,
    detailRows: (item) => {
      const content = item as ManagedContentInput;
      return [
        ["Customer", content.customerName],
        ["Industry", content.industry],
        ["Outcome summary", content.outcomeSummary],
      ];
    },
  },
  tool: {
    backLabel: "Back to tools",
    detailLabel: "Tool details",
    eyebrow: (item) => (item as ManagedContentInput).toolType || item.category,
    detailRows: (item) => {
      const content = item as ManagedContentInput;
      return [
        ["Type", content.toolType],
        ["Use case", content.useCase],
      ];
    },
  },
};

function formatPreviewDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value || "Publish date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function ContentPreview({ type, item, tags, publicUrl }: ContentPreviewProps) {
  const { isExpanded, toggle } = useEditorAccordionItem("page-preview");
  const copy = previewCopy[type];
  const managedItem = item as ManagedContentInput;
  const detailRows = copy
    .detailRows(item)
    .filter((row): row is [string, string] => Boolean(row[1]));
  const toolUrl = type === "tool" ? managedItem.toolUrl : undefined;
  const displayUrl = "niagarat.com" + (publicUrl.startsWith("/") ? publicUrl : "/" + publicUrl);

  return (
    <section
      className={`flex flex-col overflow-hidden rounded-md border border-border/80 bg-surface shadow-sm transition-shadow ${
        isExpanded ? "flex-1" : "shrink-0"
      }`}
    >
      <header className={`shrink-0 ${isExpanded ? "border-b border-border" : ""}`}>
        <button
          type="button"
          title={isExpanded ? "Collapse preview" : "Expand preview"}
          aria-label={isExpanded ? "Collapse preview" : "Expand preview"}
          aria-expanded={isExpanded}
          aria-controls="content-preview-panel"
          onClick={toggle}
          className={`group flex min-h-[4.5rem] w-full items-center gap-3 px-5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
            isExpanded ? "bg-surface" : "bg-surface hover:bg-muted/30"
          }`}
        >
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-primary/5 text-primary transition-colors group-hover:border-primary/25 group-hover:bg-primary/10">
            <Eye aria-hidden="true" className="size-4" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Page preview</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-amber-500" />
                Draft
              </span>
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
              {item.title || "No title yet"}
            </span>
          </span>

          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/50 text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground">
            {isExpanded ? (
              <ChevronUp aria-hidden="true" className="size-4" />
            ) : (
              <ChevronDown aria-hidden="true" className="size-4" />
            )}
          </span>
        </button>
      </header>

      {isExpanded ? (
        <div id="content-preview-panel" className="bg-muted/70 p-2 sm:p-4">
          <div className="mb-2 flex h-8 min-w-0 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs text-muted-foreground">
            <Globe2 aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="truncate">{displayUrl}</span>
          </div>
          <div className="rounded-md border border-border bg-background shadow-sm">
            <div className="border-b border-border/80 px-4 pb-8 pt-8 sm:px-6 lg:px-8">
              <span className="text-sm font-medium text-muted-foreground">{copy.backLabel}</span>

              <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {copy.eyebrow(item) || "Preview"}
                  </p>
                  <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                    {item.title || "Untitled draft"}
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    {item.excerpt || "Your excerpt will appear here as the public page summary."}
                  </p>
                </div>

                <div className="grid gap-3 border-l-0 border-border text-sm text-muted-foreground sm:grid-cols-3 lg:block lg:border-l lg:pl-6">
                  <div className="flex items-center gap-2 lg:mb-3">
                    <UserRound aria-hidden="true" className="size-4 text-primary" />
                    <span>{item.author || "Author"}</span>
                  </div>
                  <div className="flex items-center gap-2 lg:mb-3">
                    <CalendarDays aria-hidden="true" className="size-4 text-primary" />
                    <time dateTime={item.publishedAt}>{formatPreviewDate(item.publishedAt)}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 aria-hidden="true" className="size-4 text-primary" />
                    <span>{item.readingTime || 0} min read</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-8 sm:px-6 lg:px-8">
              {item.coverImage ? (
                <div className="mb-8 overflow-hidden rounded-[10px] border border-border bg-surface">
                  <img
                    src={item.coverImage}
                    alt={item.title || "Draft cover image"}
                    className="aspect-[16/7] w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="grid gap-8 lg:grid-cols-[minmax(0,44rem)_18rem] lg:justify-between">
                <article className="min-w-0">
                  <div className={styles.prose}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item.content || "Start writing to see the article body here."}
                    </ReactMarkdown>
                  </div>
                </article>

                <aside className="lg:self-start">
                  <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <p className="text-sm font-semibold text-foreground">{copy.detailLabel}</p>
                    {detailRows.length > 0 ? (
                      <dl className="mt-4 grid gap-3 text-sm text-muted-foreground">
                        {detailRows.map(([label, value]) => (
                          <div key={label}>
                            <dt className="font-medium text-foreground">{label}</dt>
                            <dd className="mt-1 leading-6">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    {toolUrl ? (
                      <span className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">
                        Launch tool
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </span>
                    ) : null}

                    {tags.length > 0 ? (
                      <div className="mt-6">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Tag aria-hidden="true" className="size-4 text-primary" />
                          Topics
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
