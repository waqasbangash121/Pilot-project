"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BlogAuditFeedback,
  BlogAuditPanel,
  BlogKeywordIdeas,
  type BlogAuditResult,
} from "@/components/blog-audit-panel";
import { ContentAiAssistant } from "@/components/content-ai-assistant";
import type {
  ManagedContentInput,
  ManagedContentType,
  ResourceType,
} from "@/lib/content-admin-types";

type ManagedContentEditorFormProps = {
  type: ManagedContentType;
  initialItem?: ManagedContentInput;
  originalSlug?: string;
};

const resourceTypes: ResourceType[] = [
  "Guide",
  "Playbook",
  "Checklist",
  "Template",
  "Case Study",
  "Documentation",
];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function slugFromTitle(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function createEmptyItem(type: ManagedContentType): ManagedContentInput {
  const common = {
    type,
    title: "",
    slug: "",
    excerpt: "",
    publishedAt: today(),
    updatedAt: today(),
    author: "Hyper Team",
    category: type === "comparison" ? "Shopify App Comparison" : "Shopify Resource",
    tags: [],
    focusKeyword: "",
    seoTitle: "",
    seoDescription: "",
    coverImage: "",
    readingTime: 6,
    draft: true,
    content:
      type === "comparison"
        ? "## Who this comparison is for\n\nExplain the buyer scenario and the decision this page helps them make.\n\n## Key differences\n\nUse only verified, fair comparison points.\n\n## Choosing the right fit\n\nGive clear guidance based on use case."
        : "## What you will learn\n\nExplain the practical outcome of this resource.\n\n## How to use this resource\n\nProvide clear, actionable steps.\n\n## Next steps\n\nHelp the reader apply what they learned.",
  };

  return type === "comparison"
    ? { ...common, competitorName: "", decisionSummary: "" }
    : { ...common, resourceType: "Guide", audience: "Shopify merchants and ecommerce teams" };
}

function labelsFor(type: ManagedContentType) {
  return type === "comparison"
    ? {
        singular: "comparison",
        plural: "comparisons",
        title: "comparison page",
        contentLabel: "Comparison content",
        publicRoot: "/comparisons",
      }
    : {
        singular: "resource",
        plural: "resources",
        title: "resource",
        contentLabel: "Resource content",
        publicRoot: "/resources",
      };
}

export function ManagedContentEditorForm({ type, initialItem, originalSlug }: ManagedContentEditorFormProps) {
  const router = useRouter();
  const labels = labelsFor(type);
  const [item, setItem] = useState<ManagedContentInput>(initialItem ?? createEmptyItem(type));
  const [tagsText, setTagsText] = useState((initialItem?.tags ?? []).join(", "));
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [auditResult, setAuditResult] = useState<BlogAuditResult | null>(null);

  const publicUrl = useMemo(() => `${labels.publicRoot}/${item.slug || `your-${labels.singular}-slug`}`, [item.slug, labels.publicRoot, labels.singular]);
  const auditItem = useMemo(
    () => ({
      ...item,
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }),
    [item, tagsText],
  );
  const auditChecks = useMemo(
    () => new Map((auditResult?.article.checks ?? []).map((check) => [check.id, check])),
    [auditResult],
  );

  function feedbackFor(...ids: string[]) {
    return ids.flatMap((id) => {
      const check = auditChecks.get(id);
      return check ? [check] : [];
    });
  }

  function update<K extends keyof ManagedContentInput>(key: K, value: ManagedContentInput[K]) {
    setItem((current) => ({ ...current, [key]: value }));
  }

  function appendGeneratedContent(text: string) {
    update("content", `${item.content.trim()}\n\n${text.trim()}`.trim());
    setSuccess("AI suggestion added to the editable draft. Review it before saving or publishing.");
  }

  async function save(mode: "draft" | "publish") {
    setSaving(mode);
    setError("");
    setSuccess("");

    const payload: ManagedContentInput = {
      ...item,
      type,
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      draft: mode === "draft",
      updatedAt: today(),
    };
    const endpoint = `/api/admin/${labels.plural}${originalSlug ? `/${encodeURIComponent(originalSlug)}` : ""}`;

    try {
      const response = await fetch(endpoint, {
        method: originalSlug ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; slug?: string };

      if (!response.ok || !result.slug) {
        throw new Error(result.error || `The ${labels.singular} could not be saved.`);
      }

      setItem((current) => ({ ...current, ...payload }));
      setSuccess(
        mode === "publish"
          ? `Published to GitHub. Vercel will deploy the new ${labels.singular} automatically.`
          : `Draft saved to GitHub. It will remain hidden from the public ${labels.plural} page.`,
      );

      if (result.slug !== originalSlug) {
        router.push(`/admin/${labels.plural}/${result.slug}`);
      }
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : `The ${labels.singular} could not be saved.`);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {originalSlug ? `Edit ${labels.singular}` : `Create ${labels.singular}`}
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use Markdown, review every factual claim, and keep the draft useful for the buyer intent this page serves.
              </p>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {item.draft ? "Draft" : "Published"}
            </span>
          </div>

          <div className="mt-8 grid gap-5">
            <label className="grid gap-2 text-sm font-medium">
              Page title
              <input
                value={item.title}
                onChange={(event) => update("title", event.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-base outline-none ring-ring transition focus:ring-2"
                maxLength={120}
                placeholder={type === "comparison" ? "Hyper AI Search vs [Alternative]" : "A practical guide to Shopify product discovery"}
              />
            </label>
            <BlogAuditFeedback checks={feedbackFor("title-keyword")} />

            {type === "comparison" ? (
              <>
                <label className="grid gap-2 text-sm font-medium">
                  Comparison target
                  <input
                    value={item.competitorName ?? ""}
                    onChange={(event) => update("competitorName", event.target.value)}
                    className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                    maxLength={120}
                    placeholder="The product or alternative being compared"
                  />
                  <span className="text-xs font-normal text-muted-foreground">Use the exact public product name. Keep all claims neutral and verifiable.</span>
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Decision summary
                  <textarea
                    value={item.decisionSummary ?? ""}
                    onChange={(event) => update("decisionSummary", event.target.value)}
                    className="min-h-24 rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                    maxLength={300}
                    placeholder="Summarize the buyer scenario and when each option may be the right fit."
                  />
                </label>
              </>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Resource type
                  <select
                    value={item.resourceType ?? "Guide"}
                    onChange={(event) => update("resourceType", event.target.value as ResourceType)}
                    className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                  >
                    {resourceTypes.map((resourceType) => (
                      <option key={resourceType} value={resourceType}>{resourceType}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Target audience
                  <input
                    value={item.audience ?? ""}
                    onChange={(event) => update("audience", event.target.value)}
                    className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                    maxLength={160}
                    placeholder="Shopify merchants and ecommerce teams"
                  />
                </label>
              </div>
            )}

            <label className="grid gap-2 text-sm font-medium">
              Focus keyword
              <input
                value={item.focusKeyword ?? ""}
                onChange={(event) => update("focusKeyword", event.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                maxLength={100}
                placeholder={type === "comparison" ? "Shopify search app alternatives" : "Shopify product discovery guide"}
              />
              <span className="text-xs font-normal text-muted-foreground">Choose one phrase this page should target. It powers the content review and AI suggestions.</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("focus-keyword")} />
            <BlogKeywordIdeas
              title="Related keyword angles"
              description="Use only ideas that strengthen the actual buyer question. They are prompts, not mandatory phrases."
              ideas={auditResult?.keywordIdeas.secondary ?? []}
            />

            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <label className="grid gap-2 text-sm font-medium">
                URL slug
                <input
                  value={item.slug}
                  onChange={(event) => update("slug", slugFromTitle(event.target.value))}
                  className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                  placeholder={type === "comparison" ? "hyper-ai-search-vs-alternative" : "shopify-product-discovery-guide"}
                />
              </label>
              <button
                type="button"
                onClick={() => update("slug", slugFromTitle(item.title))}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Generate slug
              </button>
            </div>
            <BlogAuditFeedback checks={feedbackFor("slug-keyword")} />
            <p className="-mt-2 text-xs text-muted-foreground">Public URL: {publicUrl}</p>

            <label className="grid gap-2 text-sm font-medium">
              Excerpt
              <textarea
                value={item.excerpt}
                onChange={(event) => update("excerpt", event.target.value)}
                className="min-h-24 rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                maxLength={350}
                placeholder="A clear summary for cards, search previews, and reader expectations."
              />
              <span className="text-xs font-normal text-muted-foreground">{item.excerpt.length}/350 characters</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("excerpt-keyword")} />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Author
                <input value={item.author} onChange={(event) => update("author", event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Category
                <input value={item.category} onChange={(event) => update("category", event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Publish date
                <input type="date" value={item.publishedAt} onChange={(event) => update("publishedAt", event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Reading time (minutes)
                <input type="number" min="1" max="120" value={item.readingTime} onChange={(event) => update("readingTime", Number(event.target.value))} className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2" />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Tags
              <input
                value={tagsText}
                onChange={(event) => setTagsText(event.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                placeholder="Shopify, Ecommerce, Product Discovery"
              />
              <span className="text-xs font-normal text-muted-foreground">Separate tags with commas. Maximum 10 tags.</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("tag-keywords")} />

            <label className="grid gap-2 text-sm font-medium">
              Cover image path or URL
              <input
                value={item.coverImage}
                onChange={(event) => update("coverImage", event.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                placeholder="/images/resources/guide.jpg or https://..."
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              {labels.contentLabel}
              <textarea
                value={item.content}
                onChange={(event) => update("content", event.target.value)}
                className="min-h-[32rem] rounded-lg border border-border bg-background px-3 py-3 font-mono text-sm leading-7 outline-none ring-ring transition focus:ring-2"
                spellCheck={false}
              />
            </label>
            <BlogAuditFeedback checks={feedbackFor("content-depth", "content-keyword", "intro-keyword", "heading-coverage", "question-coverage")} />
            <BlogKeywordIdeas
              title="Questions to answer in this page"
              description="Use the relevant prompts as H2 sections, then answer each directly in the first paragraph below the heading."
              ideas={auditResult?.keywordIdeas.questions ?? []}
            />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">SEO and social preview</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These fields control the document title, meta description, social preview, and structured data for this page.
          </p>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 text-sm font-medium">
              SEO title
              <input
                value={item.seoTitle}
                onChange={(event) => update("seoTitle", event.target.value)}
                maxLength={70}
                className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                placeholder={item.title || "SEO title"}
              />
              <span className="text-xs font-normal text-muted-foreground">{item.seoTitle.length}/70 characters</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("seo-title-keyword")} />

            <label className="grid gap-2 text-sm font-medium">
              SEO description
              <textarea
                value={item.seoDescription}
                onChange={(event) => update("seoDescription", event.target.value)}
                maxLength={180}
                className="min-h-28 rounded-lg border border-border bg-background px-3 py-2.5 outline-none ring-ring transition focus:ring-2"
                placeholder={item.excerpt || "SEO description"}
              />
              <span className="text-xs font-normal text-muted-foreground">{item.seoDescription.length}/180 characters</span>
            </label>
            <BlogAuditFeedback checks={feedbackFor("seo-description-keyword")} />

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Search preview</p>
              <p className="mt-3 truncate text-lg font-medium text-primary">{item.seoTitle || item.title || "Page title"}</p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">www.niagarat.com{publicUrl}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.seoDescription || item.excerpt || "Your description will appear here."}</p>
            </div>
          </div>
        </section>
      </div>

      <aside className="h-fit space-y-4 lg:sticky lg:top-6">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-semibold">Publishing</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Saving creates a GitHub commit. Vercel deploys the changed content automatically.
          </p>
          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={() => save("draft")}
              disabled={saving !== null}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving === "draft" ? "Saving draft…" : "Save draft"}
            </button>
            <button
              type="button"
              onClick={() => save("publish")}
              disabled={saving !== null}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving === "publish" ? "Publishing…" : `Publish ${labels.singular}`}
            </button>
          </div>
        </div>

        <ContentAiAssistant
          module={type}
          title={item.title}
          focusKeyword={item.focusKeyword}
          audience={item.audience}
          competitorName={item.competitorName}
          existingContent={item.content}
          onAppendToContent={appendGeneratedContent}
        />

        <BlogAuditPanel article={auditItem} result={auditResult} onResult={setAuditResult} />

        {error ? <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">{error}</p> : null}
        {success ? <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-200">{success}</p> : null}
      </aside>
    </div>
  );
}
