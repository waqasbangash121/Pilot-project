"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  Hash,
  ImageIcon,
  Loader2,
  Save,
  Send,
  Sparkles,
  Tag,
  UserRound,
  X,
} from "lucide-react";

import { AdminStatusBadge } from "@/components/admin/admin-ui";
import {
  CollapsibleEditorSection,
  EditorAccordion,
} from "@/components/admin/collapsible-editor-section";
import { ContentPreview } from "@/components/admin/content-preview";
import {
  BlogAuditFeedback,
  BlogAuditPanel,
  BlogKeywordIdeas,
  type BlogAuditResult,
} from "@/components/blog-audit-panel";
import { MarkdownBlockEditor } from "@/components/markdown-block-editor";
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
const toolTypes: ToolType[] = [
  "Calculator",
  "Audit",
  "Checklist",
  "Generator",
  "Template",
  "Worksheet",
];

function completionLabel(done: number, total: number) {
  if (done === total) return "Ready to publish";
  if (done >= Math.ceil(total * 0.7)) return "Almost ready";
  return "Draft setup";
}

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
    description:
      "Build a neutral decision page with verified claims, buyer context, and clear fit guidance.",
    defaultCategory: "Shopify App Comparison",
    defaultContent:
      "## Who this comparison is for\n\nExplain the buyer scenario and the decision this page helps them make.\n\n## Key differences\n\nUse only verified, fair comparison points.\n\n## Choosing the right fit\n\nGive clear guidance based on use case.",
    titlePlaceholder: "Hyper Search & Product Filters vs [Alternative]",
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
    description:
      "Create a practical resource with a defined audience, useful outcome, and clear next step.",
    defaultCategory: "Shopify Resource",
    defaultContent:
      "## What you will learn\n\nExplain the practical outcome of this resource.\n\n## How to use this resource\n\nProvide clear, actionable steps.\n\n## Next steps\n\nHelp the reader apply what they learned.",
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
    description:
      "Document customer context, implementation decisions, and verified outcomes without inventing metrics.",
    defaultCategory: "Customer Story",
    defaultContent:
      "## Customer context\n\nDescribe the customer, storefront challenge, and why the work mattered.\n\n## Implementation\n\nExplain what changed, who was involved, and what constraints shaped the rollout.\n\n## Outcomes\n\nShare only verified results, qualitative learnings, and next steps.",
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
    description:
      "Publish useful tools, worksheets, audits, and calculators with clear use cases and instructions.",
    defaultCategory: "Ecommerce Tool",
    defaultContent:
      "## When to use this tool\n\nExplain the workflow, decision, or audit this tool supports.\n\n## How it works\n\nDescribe the inputs, steps, and expected output.\n\n## What to do next\n\nHelp the reader act on the result.",
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
  if (type === "resource")
    return { ...common, resourceType: "Guide", audience: "Shopify merchants and ecommerce teams" };
  if (type === "case-study")
    return { ...common, customerName: "", industry: "", outcomeSummary: "" };
  return {
    ...common,
    toolType: "Checklist",
    toolUrl: "",
    useCase: "Shopify merchants and ecommerce teams",
  };
}

const fieldLabelClass = "grid gap-2 text-sm font-semibold";
const inputClass =
  "h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const textareaClass =
  "rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const sectionClass = "rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6";
const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60";
const primaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60";

type InlineAiTask = "outline" | "metadata" | "faq" | "section";

type ToastState = {
  id: number;
  type: "success" | "error" | "warning";
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

function lengthMeterState(value: string, min: number, max: number) {
  const length = value.trim().length;

  if (length === 0) {
    return {
      label: "Empty",
      barClass: "bg-muted-foreground/25",
      textClass: "text-muted-foreground",
    };
  }

  if (length < min) {
    return {
      label: "Short",
      barClass: "bg-amber-500",
      textClass: "text-amber-700 dark:text-amber-300",
    };
  }

  if (length > max) {
    return {
      label: "Long",
      barClass: "bg-rose-500",
      textClass: "text-rose-700 dark:text-rose-300",
    };
  }

  return {
    label: "Good",
    barClass: "bg-emerald-500",
    textClass: "text-emerald-700 dark:text-emerald-300",
  };
}

function CharacterMeter({ value, max, min }: { value: string; max: number; min: number }) {
  const meter = lengthMeterState(value, min, max);
  const length = value.trim().length;
  const width = Math.min(100, Math.round((length / max) * 100));

  return (
    <div className="grid gap-1.5">
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${meter.barClass}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="flex items-center justify-between gap-3 text-xs font-normal">
        <span className={meter.textClass}>{meter.label}</span>
        <span className="text-muted-foreground">
          {length}/{max} characters
        </span>
      </div>
    </div>
  );
}

function compactSuggestion(text: string) {
  return text
    .trim()
    .replace(/^```(?:\w+)?\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function singleLineSuggestion(text: string) {
  const cleaned = compactSuggestion(text)
    .split("\n")
    .map((line) =>
      line
        .replace(/^[-*\d.)\s]+/, "")
        .replace(/^[A-Za-z ]+:\s*/, "")
        .trim(),
    )
    .filter(Boolean)[0];

  return (cleaned ?? "").replace(/^['"]|['"]$/g, "").trim();
}

function EditorToast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  useEffect(() => {
    if (toast.actionLabel) return;

    const timeout = window.setTimeout(onClose, toast.type === "success" ? 4200 : 6500);
    return () => window.clearTimeout(timeout);
  }, [onClose, toast]);

  const isSuccess = toast.type === "success";
  const isWarning = toast.type === "warning";

  return (
    <div className="fixed right-4 top-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-border bg-surface p-4 shadow-lg sm:right-6 sm:top-6">
      <div className="flex items-start gap-3">
        <span
          className={
            isSuccess
              ? "inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200"
              : isWarning
                ? "inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-700 dark:bg-amber-400/15 dark:text-amber-200"
                : "inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-700 dark:bg-rose-400/15 dark:text-rose-200"
          }
        >
          {isSuccess ? (
            <CheckCircle2 aria-hidden="true" className="size-5" />
          ) : (
            <AlertCircle aria-hidden="true" className="size-5" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{toast.title}</p>
          {toast.message ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{toast.message}</p>
          ) : null}
          {toast.actionLabel && toast.onAction ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                toast.onAction?.();
              }}
              className="mt-3 inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground"
            >
              {toast.actionLabel}
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Dismiss notification"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}

type InlineAiSuggestionPanelProps = {
  module: ManagedContentType;
  title: string;
  description: string;
  buttonLabel: string;
  applyLabel: string;
  task: InlineAiTask;
  instruction: string;
  itemTitle: string;
  focusKeyword?: string;
  audience?: string;
  competitorName?: string;
  existingContent: string;
  onApply: (text: string) => void;
  transformResult?: (text: string) => string;
};

function InlineAiSuggestionPanel({
  module,
  title,
  description,
  buttonLabel,
  applyLabel,
  task,
  instruction,
  itemTitle,
  focusKeyword,
  audience,
  competitorName,
  existingContent,
  onApply,
  transformResult = compactSuggestion,
}: InlineAiSuggestionPanelProps) {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState("");
  const [panelError, setPanelError] = useState("");
  const [applied, setApplied] = useState(false);

  async function generate() {
    setRunning(true);
    setPanelError("");
    setApplied(false);

    try {
      const response = await fetch("/api/admin/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module,
          task,
          title: itemTitle.trim() || "Untitled content page",
          focusKeyword,
          audience,
          competitorName,
          existingContent,
          specificInstruction: instruction,
        }),
      });
      const body = (await response.json()) as { text?: string; error?: string };

      if (!response.ok || !body.text)
        throw new Error(body.error || "Content generation could not be completed.");
      setResult(transformResult(body.text));
    } catch (generationError) {
      setPanelError(
        generationError instanceof Error
          ? generationError.message
          : "Content generation could not be completed.",
      );
    } finally {
      setRunning(false);
    }
  }

  function applyResult() {
    if (!result) return;
    onApply(result);
    setApplied(true);
  }

  return (
    <details className="rounded-md border border-border bg-background p-3">
      <summary className="cursor-pointer list-none">
        <span className="flex items-start justify-between gap-3">
          <span className="flex min-w-0 items-start gap-2">
            <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles aria-hidden="true" className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{title}</span>
              <span className="mt-1 block text-xs font-normal leading-5 text-muted-foreground">
                {description}
              </span>
            </span>
          </span>
          <span className="text-xs font-semibold text-muted-foreground">AI</span>
        </span>
      </summary>
      <div className="mt-4 grid gap-3">
        <button
          type="button"
          onClick={generate}
          disabled={running}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-xs font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {running ? (
            <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
          ) : (
            <Sparkles aria-hidden="true" className="size-3.5" />
          )}
          {running ? "Generating..." : buttonLabel}
        </button>
        {panelError ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 p-3 text-xs leading-5 text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">
            {panelError}
          </p>
        ) : null}
        {result ? (
          <div className="rounded-md border border-border bg-muted/50 p-3">
            <pre className="max-h-56 overflow-auto whitespace-pre-wrap text-xs leading-5 text-foreground">
              {result}
            </pre>
            <button
              type="button"
              onClick={applyResult}
              className="mt-3 inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground"
            >
              {applied ? <Check aria-hidden="true" className="size-3.5" /> : null}
              {applied ? "Applied" : applyLabel}
            </button>
          </div>
        ) : null}
      </div>
    </details>
  );
}

export function ManagedContentEditorForm({
  type,
  initialItem,
  originalSlug,
}: ManagedContentEditorFormProps) {
  const router = useRouter();
  const copy = modules[type];
  const [item, setItem] = useState<ManagedContentInput>(initialItem ?? createEmptyItem(type));
  const [tagsText, setTagsText] = useState((initialItem?.tags ?? []).join(", "));
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [auditResult, setAuditResult] = useState<BlogAuditResult | null>(null);
  const [generatingCoverImage, setGeneratingCoverImage] = useState(false);

  const publicUrl = useMemo(
    () => copy.publicRoot + "/" + (item.slug || "your-" + type + "-slug"),
    [copy.publicRoot, item.slug, type],
  );
  const parsedTags = useMemo(
    () =>
      tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tagsText],
  );
  const auditItem = useMemo(
    () => ({
      ...item,
      tags: parsedTags,
    }),
    [item, parsedTags],
  );
  const auditChecks = useMemo(
    () => new Map((auditResult?.article.checks ?? []).map((check) => [check.id, check])),
    [auditResult],
  );
  const aiAudience = item.audience || item.industry || item.useCase;
  const moduleReadinessItem = useMemo(() => {
    if (type === "comparison") {
      return { label: "Comparison target", done: Boolean((item.competitorName ?? "").trim()) };
    }

    if (type === "resource") {
      return { label: "Target audience", done: Boolean((item.audience ?? "").trim()) };
    }

    if (type === "case-study") {
      return {
        label: "Customer context",
        done: Boolean((item.customerName ?? "").trim() || (item.industry ?? "").trim()),
      };
    }

    return { label: "Tool use case", done: Boolean((item.useCase ?? "").trim()) };
  }, [item.audience, item.competitorName, item.customerName, item.industry, item.useCase, type]);
  const readinessItems = useMemo(
    () => [
      { label: "Title", done: item.title.trim().length >= 12 },
      { label: "Focus keyword", done: Boolean((item.focusKeyword ?? "").trim()) },
      moduleReadinessItem,
      { label: "Slug", done: Boolean(item.slug.trim()) },
      { label: "Excerpt", done: item.excerpt.trim().length >= 80 },
      { label: "Cover image", done: Boolean(item.coverImage.trim()) },
      {
        label: `${copy.singular[0].toUpperCase()}${copy.singular.slice(1)} draft`,
        done: item.content.trim().length >= 350 && item.content !== copy.defaultContent,
      },
      {
        label: "SEO title",
        done: item.seoTitle.trim().length >= 35 && item.seoTitle.trim().length <= 70,
      },
      {
        label: "SEO description",
        done: item.seoDescription.trim().length >= 110 && item.seoDescription.trim().length <= 180,
      },
    ],
    [copy.defaultContent, copy.singular, item, moduleReadinessItem],
  );
  const completedReadiness = readinessItems.filter((readinessItem) => readinessItem.done).length;
  const readinessPercent = Math.round((completedReadiness / readinessItems.length) * 100);
  const missingPublishItems = readinessItems
    .filter((readinessItem) => !readinessItem.done)
    .map((readinessItem) => readinessItem.label);
  const canPublish = missingPublishItems.length === 0;
  const coverImageValue = item.coverImage.trim();
  const coverImageAlt = item.title || `${copy.singular} cover preview`;

  function showToast(toastDetails: Omit<ToastState, "id">) {
    setToast({ ...toastDetails, id: Date.now() });
  }

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
    setItem((current) => ({
      ...current,
      content: `${current.content.trim()}\n\n${text.trim()}`.trim(),
    }));
    showToast({
      type: "success",
      title: "AI suggestion added",
      message: "Review the inserted draft before saving or publishing.",
    });
  }

  async function generateCoverImage() {
    setToast(null);
    setGeneratingCoverImage(true);

    try {
      const response = await fetch("/api/admin/content/generate-cover-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module: type,
          title: item.title,
          focusKeyword: item.focusKeyword,
          existingContent: item.content,
        }),
      });
      const result = (await response.json()) as { error?: string; imagePath?: string };

      if (!response.ok || !result.imagePath) {
        throw new Error(result.error || `The ${copy.singular} cover could not be generated.`);
      }

      update("coverImage", result.imagePath);
      showToast({
        type: "success",
        title: "Cover image generated",
        message: "The new image path was added and the preview is ready.",
      });
    } catch (coverError) {
      const message =
        coverError instanceof Error
          ? coverError.message
          : `The ${copy.singular} cover could not be generated.`;
      showToast({
        type: "error",
        title: "Could not generate cover",
        message,
        actionLabel: "Retry",
        onAction: generateCoverImage,
      });
    } finally {
      setGeneratingCoverImage(false);
    }
  }

  async function save(mode: "draft" | "publish") {
    setToast(null);

    if (mode === "publish" && !canPublish) {
      showToast({
        type: "warning",
        title: "Finish required fields",
        message: "Before publishing, finish: " + missingPublishItems.join(", ") + ".",
      });
      return;
    }

    setSaving(mode);

    const payload: ManagedContentInput = {
      ...item,
      type,
      tags: parsedTags,
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
      showToast({
        type: "success",
        title: mode === "publish" ? `${copy.singular} published` : "Draft saved",
        message:
          mode === "publish"
            ? `Published to Neon. The public ${copy.singular} is available now.`
            : `Draft saved to Neon. It remains hidden from the public ${copy.plural} page.`,
      });

      if (result.slug !== originalSlug) router.push(`/admin/${copy.plural}/${result.slug}`);
      router.refresh();
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : `The ${copy.singular} could not be saved.`;
      showToast({
        type: "error",
        title: `Could not save ${copy.singular}`,
        message,
        actionLabel: "Retry",
        onAction: () => save(mode),
      });
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
            <input
              value={item.competitorName ?? ""}
              onChange={(event) => update("competitorName", event.target.value)}
              className={inputClass}
              maxLength={120}
              placeholder="The product or alternative being compared"
            />
          </label>
          <InlineAiSuggestionPanel
            module={type}
            title="Comparison target angle"
            description="Suggest a safe comparison target label or placeholder based on the page title."
            buttonLabel="Suggest target"
            applyLabel="Use target"
            task="metadata"
            itemTitle={item.title}
            focusKeyword={item.focusKeyword}
            audience={aiAudience}
            competitorName={item.competitorName}
            existingContent={item.content}
            instruction="Return only one comparison target name or generic alternative placeholder. Do not invent a real company, product, or competitor if the title does not identify one. Do not include labels, bullets, quotes, or explanation."
            transformResult={singleLineSuggestion}
            onApply={(text) => update("competitorName", text)}
          />
          <label className={`${fieldLabelClass} sm:col-span-2`}>
            Decision summary
            <textarea
              value={item.decisionSummary ?? ""}
              onChange={(event) => update("decisionSummary", event.target.value)}
              className={`${textareaClass} min-h-28`}
              maxLength={300}
              placeholder="Summarize the buyer scenario and when each option may be the right fit."
            />
          </label>
          <div className="sm:col-span-2">
            <InlineAiSuggestionPanel
              module={type}
              title="Decision summary suggestion"
              description="Draft a neutral buyer-fit summary without unsupported competitor claims."
              buttonLabel="Suggest summary"
              applyLabel="Use summary"
              task="metadata"
              itemTitle={item.title}
              focusKeyword={item.focusKeyword}
              audience={aiAudience}
              competitorName={item.competitorName}
              existingContent={item.content}
              instruction="Return only one neutral comparison decision summary between 120 and 220 characters. Mark unverifiable claims with [verify]. Do not include labels, bullets, quotes, or explanation."
              onApply={(text) => update("decisionSummary", text)}
            />
          </div>
        </div>
      );
    }

    if (type === "resource") {
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={fieldLabelClass}>
            Resource type
            <select
              value={item.resourceType ?? "Guide"}
              onChange={(event) => update("resourceType", event.target.value as ResourceType)}
              className={inputClass}
            >
              {resourceTypes.map((resourceType) => (
                <option key={resourceType} value={resourceType}>
                  {resourceType}
                </option>
              ))}
            </select>
          </label>
          <label className={fieldLabelClass}>
            Target audience
            <input
              value={item.audience ?? ""}
              onChange={(event) => update("audience", event.target.value)}
              className={inputClass}
              maxLength={160}
              placeholder="Shopify merchants and ecommerce teams"
            />
          </label>
          <div className="sm:col-span-2">
            <InlineAiSuggestionPanel
              module={type}
              title="Audience suggestion"
              description="Name the specific reader group this resource should serve."
              buttonLabel="Suggest audience"
              applyLabel="Use audience"
              task="metadata"
              itemTitle={item.title}
              focusKeyword={item.focusKeyword}
              audience={aiAudience}
              existingContent={item.content}
              instruction="Return only one concise target audience phrase under 120 characters. Do not include labels, bullets, quotes, or explanation."
              transformResult={singleLineSuggestion}
              onApply={(text) => update("audience", text)}
            />
          </div>
        </div>
      );
    }

    if (type === "case-study") {
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={fieldLabelClass}>
            Customer name
            <input
              value={item.customerName ?? ""}
              onChange={(event) => update("customerName", event.target.value)}
              className={inputClass}
              maxLength={120}
              placeholder="Customer or brand name"
            />
            <span className="text-xs font-normal leading-5 text-muted-foreground">
              Use a real approved customer name, or an approved anonymized label.
            </span>
          </label>
          <label className={fieldLabelClass}>
            Industry
            <input
              value={item.industry ?? ""}
              onChange={(event) => update("industry", event.target.value)}
              className={inputClass}
              maxLength={120}
              placeholder="Fashion, beauty, electronics, B2B commerce..."
            />
          </label>
          <div className="sm:col-span-2">
            <InlineAiSuggestionPanel
              module={type}
              title="Industry suggestion"
              description="Suggest a concise industry label from the approved customer context."
              buttonLabel="Suggest industry"
              applyLabel="Use industry"
              task="metadata"
              itemTitle={item.title}
              focusKeyword={item.focusKeyword}
              audience={aiAudience}
              existingContent={item.content}
              instruction="Return only one broad ecommerce industry label. Do not invent customer identity or metrics. Do not include labels, bullets, quotes, or explanation."
              transformResult={singleLineSuggestion}
              onApply={(text) => update("industry", text)}
            />
          </div>
          <label className={`${fieldLabelClass} sm:col-span-2`}>
            Outcome summary
            <textarea
              value={item.outcomeSummary ?? ""}
              onChange={(event) => update("outcomeSummary", event.target.value)}
              className={`${textareaClass} min-h-28`}
              maxLength={300}
              placeholder="Summarize the verified outcome, implementation lesson, or customer result."
            />
          </label>
          <div className="sm:col-span-2">
            <InlineAiSuggestionPanel
              module={type}
              title="Outcome summary suggestion"
              description="Shape the outcome language while keeping unverified metrics marked."
              buttonLabel="Suggest outcome"
              applyLabel="Use outcome"
              task="metadata"
              itemTitle={item.title}
              focusKeyword={item.focusKeyword}
              audience={aiAudience}
              existingContent={item.content}
              instruction="Return only one case-study outcome summary between 120 and 220 characters. Use [verify] for metrics, quotes, or results that need confirmation. Do not include labels, bullets, quotes, or explanation."
              onApply={(text) => update("outcomeSummary", text)}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={fieldLabelClass}>
          Tool type
          <select
            value={item.toolType ?? "Checklist"}
            onChange={(event) => update("toolType", event.target.value as ToolType)}
            className={inputClass}
          >
            {toolTypes.map((toolType) => (
              <option key={toolType} value={toolType}>
                {toolType}
              </option>
            ))}
          </select>
        </label>
        <label className={fieldLabelClass}>
          Use case
          <input
            value={item.useCase ?? ""}
            onChange={(event) => update("useCase", event.target.value)}
            className={inputClass}
            maxLength={180}
            placeholder="Audit search quality, prioritize merchandising work..."
          />
        </label>
        <div className="sm:col-span-2">
          <InlineAiSuggestionPanel
            module={type}
            title="Use-case suggestion"
            description="Clarify when someone should use this tool and what job it helps with."
            buttonLabel="Suggest use case"
            applyLabel="Use case"
            task="metadata"
            itemTitle={item.title}
            focusKeyword={item.focusKeyword}
            audience={aiAudience}
            existingContent={item.content}
            instruction="Return only one practical tool use-case phrase under 150 characters. Do not imply features or automation not described in the draft. Do not include labels, bullets, quotes, or explanation."
            transformResult={singleLineSuggestion}
            onApply={(text) => update("useCase", text)}
          />
        </div>
        <label className={`${fieldLabelClass} sm:col-span-2`}>
          Launch URL
          <input
            value={item.toolUrl ?? ""}
            onChange={(event) => update("toolUrl", event.target.value)}
            className={inputClass}
            maxLength={500}
            placeholder="/tools/my-tool or https://..."
          />
          <span className="text-xs font-normal leading-5 text-muted-foreground">
            Optional. Use this when the tool lives outside the written detail page.
          </span>
        </label>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {toast ? <EditorToast key={toast.id} toast={toast} onClose={() => setToast(null)} /> : null}
      <section className={sectionClass}>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <Link
              href={`/admin/${copy.plural}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              {copy.backLabel}
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {copy.eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {originalSlug ? `Edit ${copy.singular}` : `Create ${copy.singular}`}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {copy.description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[32rem]">
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                State
              </p>
              <div className="mt-2">
                <AdminStatusBadge draft={item.draft} />
              </div>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Clock3 aria-hidden="true" className="size-3.5" />
                Reading
              </p>
              <p className="mt-2 text-sm font-semibold">{item.readingTime || 0} min</p>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Globe2 aria-hidden="true" className="size-3.5" />
                URL
              </p>
              <p className="mt-2 truncate text-sm font-semibold">{publicUrl}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <EditorAccordion>
          <CollapsibleEditorSection
            sectionId="content-brief"
            icon={FileText}
            eyebrow="Content brief"
            title="Page details"
            description="Start with the title, keyword, URL, and summary. These fields drive the review feedback and public preview."
          >
            <div className="grid gap-5">
              <label className={fieldLabelClass}>
                Page title
                <input
                  value={item.title}
                  onChange={(event) => update("title", event.target.value)}
                  className={`${inputClass} text-base`}
                  maxLength={120}
                  placeholder={copy.titlePlaceholder}
                />
              </label>
              <BlogAuditFeedback checks={feedbackFor("title-keyword")} />
              <InlineAiSuggestionPanel
                module={type}
                title="Title suggestion"
                description={`Generate one focused ${copy.singular} title for this page.`}
                buttonLabel="Suggest title"
                applyLabel="Use as title"
                task="metadata"
                itemTitle={item.title}
                focusKeyword={item.focusKeyword}
                audience={aiAudience}
                competitorName={item.competitorName}
                existingContent={item.content}
                instruction={`Return only one polished ${copy.singular} title, under 70 characters when possible. Use the focus keyword naturally if it fits. Do not include labels, bullets, quotes, or explanation.`}
                transformResult={singleLineSuggestion}
                onApply={(text) => update("title", text)}
              />
              {renderBriefFields()}
              <label className={fieldLabelClass}>
                Focus keyword
                <input
                  value={item.focusKeyword ?? ""}
                  onChange={(event) => update("focusKeyword", event.target.value)}
                  className={inputClass}
                  maxLength={100}
                  placeholder={copy.focusPlaceholder}
                />
              </label>
              <BlogAuditFeedback checks={feedbackFor("focus-keyword")} />
              <BlogKeywordIdeas
                title="Secondary keyword ideas"
                description="Use these phrases where they genuinely support the page topic."
                ideas={auditResult?.keywordIdeas.secondary ?? []}
              />
              <InlineAiSuggestionPanel
                module={type}
                title="Focus keyword suggestion"
                description={`Find one search phrase that fits this ${copy.singular} and its reader intent.`}
                buttonLabel="Suggest keyword"
                applyLabel="Use keyword"
                task="metadata"
                itemTitle={item.title}
                focusKeyword={item.focusKeyword}
                audience={aiAudience}
                competitorName={item.competitorName}
                existingContent={item.content}
                instruction={`Return only one primary focus keyword phrase for this ${copy.singular}, under 80 characters. Do not include labels, bullets, quotes, or explanation.`}
                transformResult={singleLineSuggestion}
                onApply={(text) => update("focusKeyword", text)}
              />
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <label className={fieldLabelClass}>
                  URL slug
                  <input
                    value={item.slug}
                    onChange={(event) => update("slug", slugFromTitle(event.target.value))}
                    className={inputClass}
                    placeholder={copy.slugPlaceholder}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => update("slug", slugFromTitle(item.title))}
                  className={secondaryButtonClass}
                >
                  <Hash aria-hidden="true" className="size-4" />
                  Generate slug
                </button>
              </div>
              <BlogAuditFeedback checks={feedbackFor("slug-keyword")} />
              <div className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
                <Globe2 aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">Public URL: {publicUrl}</span>
              </div>
              <label className={fieldLabelClass}>
                Excerpt
                <textarea
                  value={item.excerpt}
                  onChange={(event) => update("excerpt", event.target.value)}
                  className={`${textareaClass} min-h-28`}
                  maxLength={350}
                  placeholder="A clear summary for cards, search previews, and reader expectations."
                />
                <CharacterMeter value={item.excerpt} min={120} max={350} />
              </label>
              <BlogAuditFeedback checks={feedbackFor("excerpt-keyword")} />
              <InlineAiSuggestionPanel
                module={type}
                title="Excerpt suggestion"
                description="Draft a clear summary for cards, previews, and reader expectations."
                buttonLabel="Suggest excerpt"
                applyLabel="Use as excerpt"
                task="metadata"
                itemTitle={item.title}
                focusKeyword={item.focusKeyword}
                audience={aiAudience}
                competitorName={item.competitorName}
                existingContent={item.content}
                instruction={`Return only one ${copy.singular} excerpt between 120 and 180 characters. Make it specific, useful, and plainspoken. Do not include labels, bullets, quotes, or explanation.`}
                onApply={(text) => update("excerpt", text)}
              />
            </div>
          </CollapsibleEditorSection>

          <CollapsibleEditorSection
            sectionId="publishing-details"
            icon={CalendarDays}
            eyebrow="Publishing details"
            title="Ownership and taxonomy"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={fieldLabelClass}>
                <span className="inline-flex items-center gap-2">
                  <UserRound aria-hidden="true" className="size-4" /> Author
                </span>
                <input
                  value={item.author}
                  onChange={(event) => update("author", event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                <span className="inline-flex items-center gap-2">
                  <Tag aria-hidden="true" className="size-4" /> Category
                </span>
                <input
                  value={item.category}
                  onChange={(event) => update("category", event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                Publish date
                <input
                  type="date"
                  value={item.publishedAt}
                  onChange={(event) => update("publishedAt", event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                Reading time (minutes)
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={item.readingTime}
                  onChange={(event) => update("readingTime", Number(event.target.value))}
                  className={inputClass}
                />
              </label>
            </div>
            <div className="mt-5 grid gap-5">
              <InlineAiSuggestionPanel
                module={type}
                title="Category suggestion"
                description={`Choose a concise taxonomy label for this ${copy.singular}.`}
                buttonLabel="Suggest category"
                applyLabel="Use category"
                task="metadata"
                itemTitle={item.title}
                focusKeyword={item.focusKeyword}
                audience={aiAudience}
                competitorName={item.competitorName}
                existingContent={item.content}
                instruction={`Return only one short category for this ${copy.singular}, 2 to 5 words. Do not include labels, bullets, quotes, or explanation.`}
                transformResult={singleLineSuggestion}
                onApply={(text) => update("category", text)}
              />

              <label className={fieldLabelClass}>
                Tags
                <input
                  value={tagsText}
                  onChange={(event) => setTagsText(event.target.value)}
                  className={inputClass}
                  placeholder="Shopify, Ecommerce, Product Discovery"
                />
                <span className="text-xs font-normal text-muted-foreground">
                  Separate tags with commas. Maximum 10 tags.
                </span>
              </label>
              <BlogAuditFeedback checks={feedbackFor("tag-keywords")} />
              <InlineAiSuggestionPanel
                module={type}
                title="Tag suggestions"
                description="Generate a clean comma-separated tag set for filtering and cards."
                buttonLabel="Suggest tags"
                applyLabel="Use tags"
                task="metadata"
                itemTitle={item.title}
                focusKeyword={item.focusKeyword}
                audience={aiAudience}
                competitorName={item.competitorName}
                existingContent={item.content}
                instruction={`Return only 5 to 8 comma-separated tags for this ${copy.singular}. Do not include labels, bullets, quotes, or explanation.`}
                onApply={(text) => setTagsText(text)}
              />
              <label className={fieldLabelClass}>
                <span className="inline-flex items-center gap-2">
                  <ImageIcon aria-hidden="true" className="size-4" /> Cover image path or URL
                </span>
                <input
                  value={item.coverImage}
                  onChange={(event) => update("coverImage", event.target.value)}
                  className={inputClass}
                  placeholder={copy.coverPlaceholder}
                />
              </label>

              <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold">AI cover image</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Generate a no-text editorial cover, save it to the site, and preview it here.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={generateCoverImage}
                    disabled={generatingCoverImage}
                    className={secondaryButtonClass}
                  >
                    {generatingCoverImage ? (
                      <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                    ) : (
                      <Sparkles aria-hidden="true" className="size-4" />
                    )}
                    {generatingCoverImage ? "Generating..." : "Generate cover"}
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-md border border-border bg-background">
                {coverImageValue ? (
                  <div
                    aria-label={coverImageAlt}
                    className="aspect-[16/7] bg-cover bg-center"
                    role="img"
                    style={{ backgroundImage: "url('" + coverImageValue + "')" }}
                  />
                ) : (
                  <div className="flex aspect-[16/7] items-center justify-center bg-muted text-sm font-semibold text-muted-foreground">
                    Cover preview appears here
                  </div>
                )}
              </div>
            </div>
          </CollapsibleEditorSection>

          <CollapsibleEditorSection
            sectionId="visual-draft"
            icon={ImageIcon}
            eyebrow="Visual draft"
            title={copy.contentLabel}
            badge="H2 sections recommended"
          >
            <div className="grid gap-4">
              <div className="grid gap-3 lg:grid-cols-3">
                <InlineAiSuggestionPanel
                  module={type}
                  title="Outline"
                  description="Create a practical H2 flow before writing."
                  buttonLabel="Generate outline"
                  applyLabel="Append outline"
                  task="outline"
                  itemTitle={item.title}
                  focusKeyword={item.focusKeyword}
                  audience={aiAudience}
                  competitorName={item.competitorName}
                  existingContent={item.content}
                  instruction={`Return a concise Markdown outline for this ${copy.singular} with H2 headings and brief notes. Do not include an H1 or preface.`}
                  onApply={appendGeneratedContent}
                />
                <InlineAiSuggestionPanel
                  module={type}
                  title="Section block"
                  description="Draft one useful section that can be edited in place."
                  buttonLabel="Draft section"
                  applyLabel="Append section"
                  task="section"
                  itemTitle={item.title}
                  focusKeyword={item.focusKeyword}
                  audience={aiAudience}
                  competitorName={item.competitorName}
                  existingContent={item.content}
                  instruction={`Return one Markdown section for this ${copy.singular} with a clear H2 heading, answer-first opening, practical explanation, and concise takeaway.`}
                  onApply={appendGeneratedContent}
                />
                <InlineAiSuggestionPanel
                  module={type}
                  title="FAQ block"
                  description="Add direct-answer questions for readers and AI search."
                  buttonLabel="Generate FAQs"
                  applyLabel="Append FAQs"
                  task="faq"
                  itemTitle={item.title}
                  focusKeyword={item.focusKeyword}
                  audience={aiAudience}
                  competitorName={item.competitorName}
                  existingContent={item.content}
                  instruction={`Return a Markdown FAQ block for this ${copy.singular} with 4 concise questions and direct answers. Use H2 for the FAQ heading and H3 for each question.`}
                  onApply={appendGeneratedContent}
                />
              </div>
              <MarkdownBlockEditor
                label={copy.contentLabel}
                value={item.content}
                onChange={(content) => update("content", content)}
              />
            </div>
            <div className="mt-4">
              <BlogAuditFeedback
                checks={feedbackFor(
                  "content-depth",
                  "content-keyword",
                  "intro-keyword",
                  "heading-coverage",
                  "question-coverage",
                )}
              />
            </div>
            <div className="mt-4">
              <BlogKeywordIdeas
                title={`Questions to answer in the ${copy.singular}`}
                description="Turn the most relevant questions into H2 sections, then answer each directly in the first paragraph below it."
                ideas={auditResult?.keywordIdeas.questions ?? []}
              />
            </div>
          </CollapsibleEditorSection>

          <ContentPreview type={type} item={auditItem} tags={parsedTags} publicUrl={publicUrl} />

          <CollapsibleEditorSection
            sectionId="search-social"
            icon={Globe2}
            eyebrow="Search and social"
            title="SEO preview"
            description="These fields control the document title, meta description, social preview, and structured page metadata."
          >
            <div className="grid gap-5">
              <label className={fieldLabelClass}>
                SEO title
                <input
                  value={item.seoTitle}
                  onChange={(event) => update("seoTitle", event.target.value)}
                  maxLength={70}
                  className={inputClass}
                  placeholder={item.title || "SEO title"}
                />
                <CharacterMeter value={item.seoTitle} min={35} max={70} />
              </label>
              <BlogAuditFeedback checks={feedbackFor("seo-title-keyword")} />
              <InlineAiSuggestionPanel
                module={type}
                title="SEO title suggestion"
                description="Generate a search-focused title that stays within the visible range."
                buttonLabel="Suggest SEO title"
                applyLabel="Use SEO title"
                task="metadata"
                itemTitle={item.title}
                focusKeyword={item.focusKeyword}
                audience={aiAudience}
                competitorName={item.competitorName}
                existingContent={item.content}
                instruction={`Return only one SEO title for this ${copy.singular} between 45 and 60 characters. Use the focus keyword naturally if it fits. Do not include labels, bullets, quotes, or explanation.`}
                transformResult={singleLineSuggestion}
                onApply={(text) => update("seoTitle", text)}
              />
              <label className={fieldLabelClass}>
                SEO description
                <textarea
                  value={item.seoDescription}
                  onChange={(event) => update("seoDescription", event.target.value)}
                  maxLength={180}
                  className={`${textareaClass} min-h-28`}
                  placeholder={item.excerpt || "SEO description"}
                />
                <CharacterMeter value={item.seoDescription} min={110} max={180} />
              </label>
              <BlogAuditFeedback checks={feedbackFor("seo-description-keyword")} />
              <InlineAiSuggestionPanel
                module={type}
                title="Meta description suggestion"
                description="Generate a concise search snippet that matches the page promise."
                buttonLabel="Suggest description"
                applyLabel="Use description"
                task="metadata"
                itemTitle={item.title}
                focusKeyword={item.focusKeyword}
                audience={aiAudience}
                competitorName={item.competitorName}
                existingContent={item.content}
                instruction={`Return only one meta description for this ${copy.singular} between 140 and 160 characters. Make it specific and useful. Do not include labels, bullets, quotes, or explanation.`}
                onApply={(text) => update("seoDescription", text)}
              />
              <div className="rounded-md border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Search preview
                </p>
                <p className="mt-3 truncate text-lg font-semibold text-primary">
                  {item.seoTitle || item.title || "Page title"}
                </p>
                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                  www.niagarat.com{publicUrl}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.seoDescription || item.excerpt || "Your description will appear here."}
                </p>
              </div>
            </div>
          </CollapsibleEditorSection>
        </EditorAccordion>

        <aside className="h-fit space-y-4 xl:sticky xl:top-24">
          <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <Send aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold">Publishing</h2>
                  <AdminStatusBadge draft={item.draft} />
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Drafts can be saved anytime. Publishing asks for the essentials first.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-md border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>{completionLabel(completedReadiness, readinessItems.length)}</span>
                <span className="text-muted-foreground">
                  {completedReadiness}/{readinessItems.length}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: readinessPercent + "%" }}
                />
              </div>
              <div className="mt-4 grid gap-2">
                {readinessItems.map((readinessItem) => (
                  <div
                    key={readinessItem.label}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    {readinessItem.done ? (
                      <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
                        <Check aria-hidden="true" className="size-3" />
                      </span>
                    ) : (
                      <CheckCircle2
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted-foreground/40"
                      />
                    )}
                    <span className={readinessItem.done ? "text-foreground" : undefined}>
                      {readinessItem.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => save("draft")}
                disabled={saving !== null}
                className={secondaryButtonClass}
              >
                {saving === "draft" ? (
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                ) : (
                  <Save aria-hidden="true" className="size-4" />
                )}
                {saving === "draft" ? "Saving draft..." : "Save draft"}
              </button>
              <button
                type="button"
                onClick={() => save("publish")}
                disabled={saving !== null}
                className={primaryButtonClass}
              >
                {saving === "publish" ? (
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                ) : (
                  <Send aria-hidden="true" className="size-4" />
                )}
                {saving === "publish" ? "Publishing..." : `Publish ${copy.singular}`}
              </button>
            </div>
          </div>

          <BlogAuditPanel article={auditItem} result={auditResult} onResult={setAuditResult} />
        </aside>
      </div>
    </div>
  );
}
