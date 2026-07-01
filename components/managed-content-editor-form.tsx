"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Globe2,
  Hash,
  ImageIcon,
  Loader2,
  Save,
  Send,
  Tag,
  UserRound,
} from "lucide-react";

import { AdminStatusBadge } from "@/components/admin/admin-ui";
import { BlogAuditPanel, type BlogAuditResult } from "@/components/blog-audit-panel";
import { ContentAiAssistant } from "@/components/content-ai-assistant";
import type {
  ManagedContentInput,
  ManagedContentType,
  ResourceType,
  ToolType,
} from "@/lib/content-admin-types";

const resourceTypes: ResourceType[] = [
  "Guide",
  "Playbook",
  "Checklist",
  "Template",
  "Case Study",
  "Documentation",
];
const toolTypes: ToolType[] = ["Calculator", "Audit", "Checklist", "Generator", "Template", "Worksheet"];

type ModuleCopy = {
  singular: string;
  plural: string;
  backLabel: string;
  contentLabel: string;
  publicRoot: string;
  eyebrow: string;
  description: string;
  defaultCategory: string;
  defaultContent: string;
  titlePlaceholder: string;
  focusPlaceholder: string;
  slugPlaceholder: string;
  coverPlaceholder: string;
};

const modules: Record<ManagedContentType, ModuleCopy> = {
  comparison: {
    singular: "comparison",
    plural: "comparisons",
    backLabel: "Comparisons",
    contentLabel: "Comparison content",
    publicRoot: "/comparisons",
    eyebrow: "Comparison editor",
    description: "Build a neutral decision page with verified claims, buyer context, and clear fit guidance.",
    defaultCategory: "Shopify App Comparison",
    defaultContent: "## Who this comparison is for\n\nExplain the buyer scenario and the decision this page helps them make.\n\n## Key differences\n\nUse only verified, fair comparison points.\n\n## Choosing the right fit\n\nGive clear guidance based on use case.",
    titlePlaceholder: "Hyper AI Search vs [Alternative]",
    focusPlaceholder: "Shopify search app alternatives",
    slugPlaceholder: "hyper-ai-search-vs-alternative",
    coverPlaceholder: "/images/comparisons/alternative.jpg or https://...",
  },
  resource: {
    singular: "resource",
    plural: "resources",
    backLabel: "Resources",
    contentLabel: "Resource content",
    publicRoot: "/resources",
    eyebrow: "Resource editor",
    description: "Create a practical resource with a defined audience, useful outcome, and clear next step.",
    defaultCategory: "Shopify Resource",
    defaultContent: "## What you will learn\n\nExplain the practical outcome of this resource.\n\n## How to use this resource\n\nProvide clear, actionable steps.\n\n## Next steps\n\nHelp the reader apply what they learned.",
    titlePlaceholder: "A practical guide to Shopify product discovery",
    focusPlaceholder: "Shopify product discovery guide",
    slugPlaceholder: "shopify-product-discovery-guide",
    coverPlaceholder: "/images/resources/guide.jpg or https://...",
  },
  "case-study": {
    singular: "case study",
    plural: "case-studies",
    backLabel: "Case Studies",
    contentLabel: "Case study content",
    publicRoot: "/case-studies",
    eyebrow: "Case study editor",
    description: "Document customer context, implementation decisions, and verified outcomes without inventing metrics.",
    defaultCategory: "Customer Story",
    defaultContent: "## Customer context\n\nDescribe the customer, storefront challenge, and why the work mattered.\n\n## Implementation\n\nExplain what changed, who was involved, and what constraints shaped the rollout.\n\n## Outcomes\n\nShare only verified results, qualitative learnings, and next steps.",
    titlePlaceholder: "How [Brand] improved product discovery with Hyper",
    focusPlaceholder: "Shopify search case study",
    slugPlaceholder: "brand-product-discovery-case-study",
    coverPlaceholder: "/images/case-studies/customer.jpg or https://...",
  },
  tool: {
    singular: "tool",
    plural: "tools",
    backLabel: "Tools",
    contentLabel: "Tool content",
    publicRoot: "/tools",
    eyebrow: "Tool editor",
    description: "Publish useful tools, worksheets, audits, and calculators with clear use cases and instructions.",
    defaultCategory: "Ecommerce Tool",
    defaultContent: "## When to use this tool\n\nExplain the workflow, decision, or audit this tool supports.\n\n## How it works\n\nDescribe the inputs, steps, and expected output.\n\n## What to do next\n\nHelp the reader act on the result.",
    titlePlaceholder: "Shopify product discovery audit tool",
    focusPlaceholder: "Shopify audit tool",
    slugPlaceholder: "shopify-product-discovery-audit-tool",
    coverPlaceholder: "/images/tools/audit-tool.jpg or https://...",
  },
};

type ManagedContentEditorFormProps = {
  type: ManagedContentType;
  initialItem?: ManagedContentInput;
  originalSlug?: string;
};

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
  const copy = modules[type];
  const common: ManagedContentInput = {
    type,
    title: "",
    slug: "",
    excerpt: "",
    publishedAt: today(),
    updatedAt: today(),
    author: "Hyper Team",
    category: copy.defaultCategory,
    tags: [],
    focusKeyword: "",
    seoTitle: "",
    seoDescription: "",
    coverImage: "",
    readingTime: 6,
    draft: true,
    content: copy.defaultContent,
  };

  if (type === "comparison") return { ...common, competitorName: "", decisionSummary: "" };
  if (type === "resource") return { ...common, resourceType: "Guide", audience: "Shopify merchants and ecommerce teams" };
  if (type === "case-study") return { ...common, customerName: "", industry: "", outcomeSummary: "" };
  return { ...common, toolType: "Checklist", toolUrl: "", useCase: "Shopify merchants and ecommerce teams" };
}

const fieldLabelClass = "grid gap-2 text-sm font-semibold";
const inputClass = "h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const textareaClass = "rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const sectionClass = "rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6";
const secondaryButtonClass = "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60";
const primaryButtonClass = "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60";

export function ManagedContentEditorForm({ type, initialItem, originalSlug }: ManagedContentEditorFormProps) {
  const router = useRouter();
  const copy = modules[type];
  const [item, setItem] = useState<ManagedContentInput>(initialItem ?? createEmptyItem(type));
  const [tagsText, setTagsText] = useState((initialItem?.tags ?? []).join(", "));
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [auditResult, setAuditResult] = useState<BlogAuditResult | null>(null);

  const publicUrl = useMemo(
    () => `${copy.publicRoot}/${item.slug || `your-${type}-slug`}`,
    [copy.publicRoot, item.slug, type],
  );
  const auditItem = useMemo(
    () => ({
      ...item,
      tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
    }),
    [item, tagsText],
  );

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
      tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
      draft: mode === "draft",
      updatedAt: today(),
    };
    const endpoint = `/api/admin/${copy.plural}${originalSlug ? `/${encodeURIComponent(originalSlug)}` : ""}`;

    try {
      const response = await fetch(endpoint, {
        method: originalSlug ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; slug?: string };

      if (!response.ok || !result.slug) {
        throw new Error(result.error || `The ${copy.singular} could not be saved.`);
      }

      setItem((current) => ({ ...current, ...payload }));
      setSuccess(
        mode === "publish"
          ? `Published to Neon. The public ${copy.singular} is available now.`
          : `Draft saved to Neon. It remains hidden from the public ${copy.plural} page.`,
      );

      if (result.slug !== originalSlug) router.push(`/admin/${copy.plural}/${result.slug}`);
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : `The ${copy.singular} could not be saved.`);
    } finally {
      setSaving(null);
    }
  }

  function renderBriefFields() {
    if (type === "comparison") {
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={fieldLabelClass}>
            Comparison target
            <input value={item.competitorName ?? ""} onChange={(event) => update("competitorName", event.target.value)} className={inputClass} maxLength={120} placeholder="The product or alternative being compared" />
          </label>
          <label className={fieldLabelClass}>
            Decision summary
            <textarea value={item.decisionSummary ?? ""} onChange={(event) => update("decisionSummary", event.target.value)} className={`${textareaClass} min-h-28`} maxLength={300} placeholder="Summarize the buyer scenario and when each option may be the right fit." />
          </label>
        </div>
      );
    }

    if (type === "resource") {
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={fieldLabelClass}>
            Resource type
            <select value={item.resourceType ?? "Guide"} onChange={(event) => update("resourceType", event.target.value as ResourceType)} className={inputClass}>
              {resourceTypes.map((resourceType) => <option key={resourceType} value={resourceType}>{resourceType}</option>)}
            </select>
          </label>
          <label className={fieldLabelClass}>
            Target audience
            <input value={item.audience ?? ""} onChange={(event) => update("audience", event.target.value)} className={inputClass} maxLength={160} placeholder="Shopify merchants and ecommerce teams" />
          </label>
        </div>
      );
    }

    if (type === "case-study") {
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={fieldLabelClass}>
            Customer name
            <input value={item.customerName ?? ""} onChange={(event) => update("customerName", event.target.value)} className={inputClass} maxLength={120} placeholder="Customer or brand name" />
          </label>
          <label className={fieldLabelClass}>
            Industry
            <input value={item.industry ?? ""} onChange={(event) => update("industry", event.target.value)} className={inputClass} maxLength={120} placeholder="Fashion, beauty, electronics, B2B commerce..." />
          </label>
          <label className={`${fieldLabelClass} sm:col-span-2`}>
            Outcome summary
            <textarea value={item.outcomeSummary ?? ""} onChange={(event) => update("outcomeSummary", event.target.value)} className={`${textareaClass} min-h-28`} maxLength={300} placeholder="Summarize the verified outcome, implementation lesson, or customer result." />
          </label>
        </div>
      );
    }

    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={fieldLabelClass}>
          Tool type
          <select value={item.toolType ?? "Checklist"} onChange={(event) => update("toolType", event.target.value as ToolType)} className={inputClass}>
            {toolTypes.map((toolType) => <option key={toolType} value={toolType}>{toolType}</option>)}
          </select>
        </label>
        <label className={fieldLabelClass}>
          Use case
          <input value={item.useCase ?? ""} onChange={(event) => update("useCase", event.target.value)} className={inputClass} maxLength={180} placeholder="Audit search quality, prioritize merchandising work..." />
        </label>
        <label className={`${fieldLabelClass} sm:col-span-2`}>
          Launch URL
          <input value={item.toolUrl ?? ""} onChange={(event) => update("toolUrl", event.target.value)} className={inputClass} maxLength={500} placeholder="/tools/my-tool or https://..." />
          <span className="text-xs font-normal leading-5 text-muted-foreground">Optional. Use this when the tool lives outside the written detail page.</span>
        </label>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className={sectionClass}>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <Link href={`/admin/${copy.plural}`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft aria-hidden="true" className="size-4" />
              {copy.backLabel}
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">{copy.eyebrow}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">{originalSlug ? `Edit ${copy.singular}` : `Create ${copy.singular}`}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{copy.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[32rem]">
            <div className="rounded-md border border-border bg-background p-3"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">State</p><div className="mt-2"><AdminStatusBadge draft={item.draft} /></div></div>
            <div className="rounded-md border border-border bg-background p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"><Clock3 aria-hidden="true" className="size-3.5" />Reading</p><p className="mt-2 text-sm font-semibold">{item.readingTime || 0} min</p></div>
            <div className="rounded-md border border-border bg-background p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"><Globe2 aria-hidden="true" className="size-3.5" />URL</p><p className="mt-2 truncate text-sm font-semibold">{publicUrl}</p></div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <section className={sectionClass}>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary"><FileText aria-hidden="true" className="size-5" /></span>
              <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Content brief</p><h2 className="mt-1 text-xl font-semibold tracking-tight">Page details</h2></div>
            </div>
            <div className="mt-6 grid gap-5">
              <label className={fieldLabelClass}>Page title<input value={item.title} onChange={(event) => update("title", event.target.value)} className={`${inputClass} text-base`} maxLength={120} placeholder={copy.titlePlaceholder} /></label>
              {renderBriefFields()}
              <label className={fieldLabelClass}>Focus keyword<input value={item.focusKeyword ?? ""} onChange={(event) => update("focusKeyword", event.target.value)} className={inputClass} maxLength={100} placeholder={copy.focusPlaceholder} /></label>
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <label className={fieldLabelClass}>URL slug<input value={item.slug} onChange={(event) => update("slug", slugFromTitle(event.target.value))} className={inputClass} placeholder={copy.slugPlaceholder} /></label>
                <button type="button" onClick={() => update("slug", slugFromTitle(item.title))} className={secondaryButtonClass}><Hash aria-hidden="true" className="size-4" />Generate slug</button>
              </div>
              <div className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground"><Globe2 aria-hidden="true" className="size-4 shrink-0" /><span className="truncate">Public URL: {publicUrl}</span></div>
              <label className={fieldLabelClass}>Excerpt<textarea value={item.excerpt} onChange={(event) => update("excerpt", event.target.value)} className={`${textareaClass} min-h-28`} maxLength={350} placeholder="A clear summary for cards, search previews, and reader expectations." /><span className="text-xs font-normal text-muted-foreground">{item.excerpt.length}/350 characters</span></label>
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary"><CalendarDays aria-hidden="true" className="size-5" /></span>
              <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Publishing details</p><h2 className="mt-1 text-xl font-semibold tracking-tight">Ownership and taxonomy</h2></div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className={fieldLabelClass}><span className="inline-flex items-center gap-2"><UserRound aria-hidden="true" className="size-4" /> Author</span><input value={item.author} onChange={(event) => update("author", event.target.value)} className={inputClass} /></label>
              <label className={fieldLabelClass}><span className="inline-flex items-center gap-2"><Tag aria-hidden="true" className="size-4" /> Category</span><input value={item.category} onChange={(event) => update("category", event.target.value)} className={inputClass} /></label>
              <label className={fieldLabelClass}>Publish date<input type="date" value={item.publishedAt} onChange={(event) => update("publishedAt", event.target.value)} className={inputClass} /></label>
              <label className={fieldLabelClass}>Reading time (minutes)<input type="number" min="1" max="120" value={item.readingTime} onChange={(event) => update("readingTime", Number(event.target.value))} className={inputClass} /></label>
            </div>
            <div className="mt-5 grid gap-5">
              <label className={fieldLabelClass}>Tags<input value={tagsText} onChange={(event) => setTagsText(event.target.value)} className={inputClass} placeholder="Shopify, Ecommerce, Product Discovery" /><span className="text-xs font-normal text-muted-foreground">Separate tags with commas. Maximum 10 tags.</span></label>
              <label className={fieldLabelClass}><span className="inline-flex items-center gap-2"><ImageIcon aria-hidden="true" className="size-4" /> Cover image path or URL</span><input value={item.coverImage} onChange={(event) => update("coverImage", event.target.value)} className={inputClass} placeholder={copy.coverPlaceholder} /></label>
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Markdown draft</p><h2 className="mt-1 text-xl font-semibold tracking-tight">{copy.contentLabel}</h2></div>
              <span className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">Direct answers help search</span>
            </div>
            <label className={`${fieldLabelClass} mt-6`}>{copy.contentLabel}<textarea value={item.content} onChange={(event) => update("content", event.target.value)} className={`${textareaClass} min-h-[34rem] font-mono leading-7`} spellCheck={false} /></label>
          </section>

          <section className={sectionClass}>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary"><Globe2 aria-hidden="true" className="size-5" /></span>
              <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Search and social</p><h2 className="mt-1 text-xl font-semibold tracking-tight">SEO preview</h2></div>
            </div>
            <div className="mt-6 grid gap-5">
              <label className={fieldLabelClass}>SEO title<input value={item.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} maxLength={70} className={inputClass} placeholder={item.title || "SEO title"} /><span className="text-xs font-normal text-muted-foreground">{item.seoTitle.length}/70 characters</span></label>
              <label className={fieldLabelClass}>SEO description<textarea value={item.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} maxLength={180} className={`${textareaClass} min-h-28`} placeholder={item.excerpt || "SEO description"} /><span className="text-xs font-normal text-muted-foreground">{item.seoDescription.length}/180 characters</span></label>
              <div className="rounded-md border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Search preview</p>
                <p className="mt-3 truncate text-lg font-semibold text-primary">{item.seoTitle || item.title || "Page title"}</p>
                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">www.niagarat.com{publicUrl}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.seoDescription || item.excerpt || "Your description will appear here."}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 xl:sticky xl:top-24">
          <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary"><Send aria-hidden="true" className="size-5" /></span>
              <div><h2 className="font-semibold">Publishing</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Saving writes the content record to Neon and refreshes the public routes.</p></div>
            </div>
            <div className="mt-5 grid gap-3">
              <button type="button" onClick={() => save("draft")} disabled={saving !== null} className={secondaryButtonClass}>{saving === "draft" ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Save aria-hidden="true" className="size-4" />}{saving === "draft" ? "Saving draft..." : "Save draft"}</button>
              <button type="button" onClick={() => save("publish")} disabled={saving !== null} className={primaryButtonClass}>{saving === "publish" ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Send aria-hidden="true" className="size-4" />}{saving === "publish" ? "Publishing..." : `Publish ${copy.singular}`}</button>
            </div>
          </div>

          <ContentAiAssistant module={type} title={item.title} focusKeyword={item.focusKeyword} audience={item.audience || item.industry || item.useCase} competitorName={item.competitorName} existingContent={item.content} onAppendToContent={appendGeneratedContent} />
          <BlogAuditPanel article={auditItem} result={auditResult} onResult={setAuditResult} />

          {error ? <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">{error}</p> : null}
          {success ? <p className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">{success}</p> : null}
        </aside>
      </div>
    </div>
  );
}
