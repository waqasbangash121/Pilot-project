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
import type { BlogPostInput } from "@/lib/blog-admin-types";

type BlogEditorFormProps = {
  initialPost?: BlogPostInput;
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

const emptyPost: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  publishedAt: today(),
  updatedAt: today(),
  author: "Hyper Team",
  category: "AI Commerce",
  tags: [],
  focusKeyword: "",
  seoTitle: "",
  seoDescription: "",
  coverImage: "",
  readingTime: 5,
  draft: true,
  content:
    "## Introduction\n\nOpen with the specific problem this article helps a Shopify team solve.\n\n## Why this matters\n\nExplain the business impact, buyer context, or workflow pressure behind the topic.\n\n## Practical steps\n\nBreak the advice into clear, actionable steps the reader can apply.\n\n## Example\n\nAdd a concrete scenario, implementation note, or before-and-after explanation.\n\n## Common questions\n\nAnswer the questions a reader is likely to ask before taking action.\n\n## Next steps\n\nClose with a useful recommendation and a clear path forward.",
};

const fieldLabelClass = "grid gap-2 text-sm font-semibold";
const inputClass =
  "h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const textareaClass =
  "rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60";
const primaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60";

function completionLabel(done: number, total: number) {
  if (done === total) return "Ready to publish";
  if (done >= Math.ceil(total * 0.7)) return "Almost ready";
  return "Draft setup";
}

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

type InlineAiTask = "outline" | "metadata" | "faq" | "section";

type InlineAiSuggestionPanelProps = {
  title: string;
  description: string;
  buttonLabel: string;
  applyLabel: string;
  task: InlineAiTask;
  instruction: string;
  articleTitle: string;
  focusKeyword?: string;
  existingContent: string;
  onApply: (text: string) => void;
  transformResult?: (text: string) => string;
};

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

function InlineAiSuggestionPanel({
  title,
  description,
  buttonLabel,
  applyLabel,
  task,
  instruction,
  articleTitle,
  focusKeyword,
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
          module: "blog",
          task,
          title: articleTitle.trim() || "Untitled Shopify article",
          focusKeyword,
          existingContent,
          specificInstruction: instruction,
        }),
      });
      const body = (await response.json()) as { text?: string; error?: string };

      if (!response.ok || !body.text) {
        throw new Error(body.error || "Content generation could not be completed.");
      }

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

type ToastState = {
  id: number;
  type: "success" | "error" | "warning";
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

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
export function BlogEditorForm({ initialPost, originalSlug }: BlogEditorFormProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPostInput>(initialPost ?? emptyPost);
  const [tagsText, setTagsText] = useState((initialPost?.tags ?? []).join(", "));
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [auditResult, setAuditResult] = useState<BlogAuditResult | null>(null);
  const [generatingCoverImage, setGeneratingCoverImage] = useState(false);

  const publicUrl = "/blog/" + (post.slug || "your-article-slug");
  const parsedTags = useMemo(
    () =>
      tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tagsText],
  );
  const auditArticle = useMemo<BlogPostInput>(
    () => ({
      ...post,
      focusKeyword: post.focusKeyword ?? "",
      tags: parsedTags,
    }),
    [post, parsedTags],
  );
  const auditChecks = useMemo(
    () => new Map((auditResult?.article.checks ?? []).map((check) => [check.id, check])),
    [auditResult],
  );
  const readinessItems = useMemo(
    () => [
      { label: "Title", done: post.title.trim().length >= 12 },
      { label: "Focus keyword", done: Boolean((post.focusKeyword ?? "").trim()) },
      { label: "Slug", done: Boolean(post.slug.trim()) },
      { label: "Excerpt", done: post.excerpt.trim().length >= 80 },
      { label: "Cover image", done: Boolean(post.coverImage.trim()) },
      {
        label: "Article draft",
        done: post.content.trim().length >= 450 && post.content !== emptyPost.content,
      },
      {
        label: "SEO title",
        done: post.seoTitle.trim().length >= 35 && post.seoTitle.trim().length <= 70,
      },
      {
        label: "SEO description",
        done: post.seoDescription.trim().length >= 110 && post.seoDescription.trim().length <= 180,
      },
    ],
    [post],
  );
  const completedReadiness = readinessItems.filter((item) => item.done).length;
  const readinessPercent = Math.round((completedReadiness / readinessItems.length) * 100);
  const missingPublishItems = readinessItems.filter((item) => !item.done).map((item) => item.label);
  const canPublish = missingPublishItems.length === 0;
  const coverImageValue = post.coverImage.trim();
  const coverImageAlt = post.title || "Article cover preview";

  function showToast(toastDetails: Omit<ToastState, "id">) {
    setToast({ ...toastDetails, id: Date.now() });
  }

  function feedbackFor(...ids: string[]) {
    return ids.flatMap((id) => {
      const check = auditChecks.get(id);
      return check ? [check] : [];
    });
  }

  function update<K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) {
    setPost((current) => ({ ...current, [key]: value }));
  }

  function appendGeneratedContent(text: string) {
    setPost((current) => ({
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
          module: "blog",
          title: post.title,
          focusKeyword: post.focusKeyword,
          existingContent: post.content,
        }),
      });
      const result = (await response.json()) as { error?: string; imagePath?: string };

      if (!response.ok || !result.imagePath) {
        throw new Error(result.error || "The cover image could not be generated.");
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
          : "The cover image could not be generated.";
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

    const payload = {
      ...post,
      focusKeyword: post.focusKeyword ?? "",
      tags: parsedTags,
      draft: mode === "draft",
      updatedAt: today(),
    };

    try {
      const response = await fetch(
        originalSlug ? `/api/admin/blogs/${encodeURIComponent(originalSlug)}` : "/api/admin/blogs",
        {
          method: originalSlug ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = (await response.json()) as {
        error?: string;
        slug?: string;
        commitUrl?: string;
      };

      if (!response.ok || !result.slug) {
        throw new Error(result.error || "The article could not be saved.");
      }

      setPost((current) => ({ ...current, ...payload }));
      showToast({
        type: "success",
        title: mode === "publish" ? "Article published" : "Draft saved",
        message:
          mode === "publish"
            ? "Published to Neon. The public article is available now."
            : "Draft saved to Neon. It remains hidden from the public blog.",
      });

      if (result.slug !== originalSlug) {
        router.push(`/admin/blogs/${result.slug}`);
      }

      router.refresh();
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : "The article could not be saved.";
      showToast({
        type: "error",
        title: "Could not save article",
        message,
        actionLabel: "Retry",
        onAction: () => save(mode),
      });
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-6">
      {toast ? <EditorToast key={toast.id} toast={toast} onClose={() => setToast(null)} /> : null}
      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Articles
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Article editor
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {originalSlug ? "Edit article" : "Create article"}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Shape the brief, draft visually, review on-page quality, and publish directly to Neon.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
              {["Brief", "Draft", "SEO", "Review", "Publish"].map((step) => (
                <span
                  key={step}
                  className="rounded-full border border-border bg-background px-3 py-1.5"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[32rem]">
            <div className="rounded-md border border-border bg-background p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Sparkles aria-hidden="true" className="size-3.5" />
                Readiness
              </p>
              <p className="mt-2 text-sm font-semibold">
                {completionLabel(completedReadiness, readinessItems.length)}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: readinessPercent + "%" }}
                />
              </div>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Clock3 aria-hidden="true" className="size-3.5" />
                Reading
              </p>
              <p className="mt-2 text-sm font-semibold">{post.readingTime || 0} min</p>
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
            sectionId="core-brief"
            icon={FileText}
            eyebrow="Core brief"
            title="Article details"
            description="Start with the title, keyword, URL, and summary. These fields drive the review feedback and public preview."
          >
            <div className="grid gap-5">
              <label className={fieldLabelClass}>
                Article title
                <input
                  value={post.title}
                  onChange={(event) => update("title", event.target.value)}
                  className={`${inputClass} text-base`}
                  maxLength={120}
                  placeholder="How AI Search Improves Shopify Product Discovery"
                />
              </label>
              <BlogAuditFeedback checks={feedbackFor("title-keyword")} />
              <InlineAiSuggestionPanel
                title="Title suggestions"
                description="Generate one focused title that fits the keyword and article angle."
                buttonLabel="Suggest title"
                applyLabel="Use as title"
                task="metadata"
                articleTitle={post.title}
                focusKeyword={post.focusKeyword}
                existingContent={post.content}
                instruction="Return only one polished blog title, under 70 characters when possible. Use the focus keyword naturally if it fits. Do not include labels, bullets, quotes, or explanation."
                transformResult={singleLineSuggestion}
                onApply={(text) => update("title", text)}
              />

              <label className={fieldLabelClass}>
                Focus keyword
                <input
                  value={post.focusKeyword ?? ""}
                  onChange={(event) => update("focusKeyword", event.target.value)}
                  className={inputClass}
                  maxLength={100}
                  placeholder="Shopify conversion rate optimization"
                />
                <span className="text-xs font-normal leading-5 text-muted-foreground">
                  Choose one specific phrase this article should target. It powers the content
                  review.
                </span>
              </label>
              <BlogAuditFeedback checks={feedbackFor("focus-keyword")} />
              <InlineAiSuggestionPanel
                title="Focus keyword suggestion"
                description="Find a single search phrase that fits the title and draft angle."
                buttonLabel="Suggest keyword"
                applyLabel="Use keyword"
                task="metadata"
                articleTitle={post.title}
                focusKeyword={post.focusKeyword}
                existingContent={post.content}
                instruction="Return only one primary focus keyword phrase under 80 characters. Do not include labels, bullets, quotes, or explanation."
                transformResult={singleLineSuggestion}
                onApply={(text) => update("focusKeyword", text)}
              />
              <BlogKeywordIdeas
                title="Related keyword angles"
                description="Use only the ideas that genuinely fit the article. They are writing prompts, not phrases to repeat mechanically."
                ideas={auditResult?.keywordIdeas.secondary ?? []}
              />

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <label className={fieldLabelClass}>
                  URL slug
                  <input
                    value={post.slug}
                    onChange={(event) => update("slug", slugFromTitle(event.target.value))}
                    className={inputClass}
                    placeholder="how-ai-search-improves-shopify-product-discovery"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => update("slug", slugFromTitle(post.title))}
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
                  value={post.excerpt}
                  onChange={(event) => update("excerpt", event.target.value)}
                  className={`${textareaClass} min-h-28`}
                  maxLength={350}
                  placeholder="A concise summary shown on blog cards and used as the default description."
                />
                <CharacterMeter value={post.excerpt} min={120} max={350} />
              </label>
              <BlogAuditFeedback checks={feedbackFor("excerpt-keyword")} />
              <InlineAiSuggestionPanel
                title="Excerpt suggestion"
                description="Draft a tighter card summary using the title, keyword, and current article direction."
                buttonLabel="Suggest excerpt"
                applyLabel="Use as excerpt"
                task="metadata"
                articleTitle={post.title}
                focusKeyword={post.focusKeyword}
                existingContent={post.content}
                instruction="Return only one article excerpt between 120 and 180 characters. Make it specific, useful, and plainspoken. Do not include labels, bullets, quotes, or explanation."
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
                  value={post.author}
                  onChange={(event) => update("author", event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                <span className="inline-flex items-center gap-2">
                  <Tag aria-hidden="true" className="size-4" /> Category
                </span>
                <input
                  value={post.category}
                  onChange={(event) => update("category", event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                Publish date
                <input
                  type="date"
                  value={post.publishedAt}
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
                  value={post.readingTime}
                  onChange={(event) => update("readingTime", Number(event.target.value))}
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-5 grid gap-5">
              <InlineAiSuggestionPanel
                title="Category suggestion"
                description="Choose a concise taxonomy label for this article."
                buttonLabel="Suggest category"
                applyLabel="Use category"
                task="metadata"
                articleTitle={post.title}
                focusKeyword={post.focusKeyword}
                existingContent={post.content}
                instruction="Return only one short blog category, 2 to 5 words. Do not include labels, bullets, quotes, or explanation."
                transformResult={singleLineSuggestion}
                onApply={(text) => update("category", text)}
              />

              <label className={fieldLabelClass}>
                Tags
                <input
                  value={tagsText}
                  onChange={(event) => setTagsText(event.target.value)}
                  className={inputClass}
                  placeholder="Shopify, AI Search, Product Discovery"
                />
                <span className="text-xs font-normal text-muted-foreground">
                  Separate tags with commas. Maximum 10 tags.
                </span>
              </label>
              <BlogAuditFeedback checks={feedbackFor("tag-keywords")} />
              <InlineAiSuggestionPanel
                title="Tag suggestions"
                description="Generate a clean comma-separated tag set for filtering and cards."
                buttonLabel="Suggest tags"
                applyLabel="Use tags"
                task="metadata"
                articleTitle={post.title}
                focusKeyword={post.focusKeyword}
                existingContent={post.content}
                instruction="Return only 5 to 8 comma-separated blog tags. Do not include labels, bullets, quotes, or explanation."
                onApply={(text) => setTagsText(text)}
              />

              <label className={fieldLabelClass}>
                <span className="inline-flex items-center gap-2">
                  <ImageIcon aria-hidden="true" className="size-4" /> Cover image path or URL
                </span>
                <input
                  value={post.coverImage}
                  onChange={(event) => update("coverImage", event.target.value)}
                  className={inputClass}
                  placeholder="/images/blog/ai-search.jpg or https://..."
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
            title="Article content"
            badge="H2 sections recommended"
          >
            <div className="grid gap-4">
              <div className="grid gap-3 lg:grid-cols-3">
                <InlineAiSuggestionPanel
                  title="Outline"
                  description="Create a practical H2 flow before you write."
                  buttonLabel="Generate outline"
                  applyLabel="Append outline"
                  task="outline"
                  articleTitle={post.title}
                  focusKeyword={post.focusKeyword}
                  existingContent={post.content}
                  instruction="Return a concise Markdown outline for this article with H2 headings and brief notes. Do not include an H1 or preface."
                  onApply={appendGeneratedContent}
                />
                <InlineAiSuggestionPanel
                  title="Section block"
                  description="Draft one useful section that can be edited in place."
                  buttonLabel="Draft section"
                  applyLabel="Append section"
                  task="section"
                  articleTitle={post.title}
                  focusKeyword={post.focusKeyword}
                  existingContent={post.content}
                  instruction="Return one Markdown section with a clear H2 heading, answer-first opening, practical explanation, and a concise takeaway."
                  onApply={appendGeneratedContent}
                />
                <InlineAiSuggestionPanel
                  title="FAQ block"
                  description="Add direct-answer questions for readers and AI search."
                  buttonLabel="Generate FAQs"
                  applyLabel="Append FAQs"
                  task="faq"
                  articleTitle={post.title}
                  focusKeyword={post.focusKeyword}
                  existingContent={post.content}
                  instruction="Return a Markdown FAQ block with 4 concise questions and direct answers. Use H2 for the FAQ heading and H3 for each question."
                  onApply={appendGeneratedContent}
                />
              </div>
              <MarkdownBlockEditor
                label="Article content"
                value={post.content}
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
                title="Questions to answer in the article"
                description="Turn the most relevant questions into H2 sections, then answer each directly in the first paragraph below it."
                ideas={auditResult?.keywordIdeas.questions ?? []}
              />
            </div>
          </CollapsibleEditorSection>

          <ContentPreview type="blog" item={auditArticle} tags={parsedTags} publicUrl={publicUrl} />

          <CollapsibleEditorSection
            sectionId="search-social"
            icon={Globe2}
            eyebrow="Search and social"
            title="SEO preview"
            description="These fields control the document title, meta description, social preview, and Article schema."
          >
            <div className="grid gap-5">
              <label className={fieldLabelClass}>
                SEO title
                <input
                  value={post.seoTitle}
                  onChange={(event) => update("seoTitle", event.target.value)}
                  maxLength={70}
                  className={inputClass}
                  placeholder={post.title || "SEO title"}
                />
                <CharacterMeter value={post.seoTitle} min={35} max={70} />
              </label>
              <BlogAuditFeedback checks={feedbackFor("seo-title-keyword")} />
              <InlineAiSuggestionPanel
                title="SEO title suggestion"
                description="Generate a search-focused title that stays within the visible range."
                buttonLabel="Suggest SEO title"
                applyLabel="Use SEO title"
                task="metadata"
                articleTitle={post.title}
                focusKeyword={post.focusKeyword}
                existingContent={post.content}
                instruction="Return only one SEO title between 45 and 60 characters. Use the focus keyword naturally if it fits. Do not include labels, bullets, quotes, or explanation."
                transformResult={singleLineSuggestion}
                onApply={(text) => update("seoTitle", text)}
              />

              <label className={fieldLabelClass}>
                SEO description
                <textarea
                  value={post.seoDescription}
                  onChange={(event) => update("seoDescription", event.target.value)}
                  maxLength={180}
                  className={`${textareaClass} min-h-28`}
                  placeholder={post.excerpt || "SEO description"}
                />
                <CharacterMeter value={post.seoDescription} min={110} max={180} />
              </label>
              <BlogAuditFeedback checks={feedbackFor("seo-description-keyword")} />
              <InlineAiSuggestionPanel
                title="Meta description suggestion"
                description="Generate a concise search snippet that matches the article promise."
                buttonLabel="Suggest description"
                applyLabel="Use description"
                task="metadata"
                articleTitle={post.title}
                focusKeyword={post.focusKeyword}
                existingContent={post.content}
                instruction="Return only one meta description between 140 and 160 characters. Make it specific and useful. Do not include labels, bullets, quotes, or explanation."
                onApply={(text) => update("seoDescription", text)}
              />

              <div className="rounded-md border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Search preview
                </p>
                <p className="mt-3 truncate text-lg font-semibold text-primary">
                  {post.seoTitle || post.title || "Article title"}
                </p>
                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                  www.niagarat.com{publicUrl}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {post.seoDescription || post.excerpt || "Your description will appear here."}
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
                  <AdminStatusBadge draft={post.draft} />
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
                {readinessItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    {item.done ? (
                      <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
                        <Check aria-hidden="true" className="size-3" />
                      </span>
                    ) : (
                      <CheckCircle2
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted-foreground/40"
                      />
                    )}
                    <span className={item.done ? "text-foreground" : undefined}>{item.label}</span>
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
                {saving === "publish" ? "Publishing..." : "Publish article"}
              </button>
              {!canPublish ? (
                <p className="text-xs leading-5 text-muted-foreground">
                  Publish will show what is missing before the article goes live.
                </p>
              ) : null}
            </div>
          </div>

          <BlogAuditPanel article={auditArticle} result={auditResult} onResult={setAuditResult} />
        </aside>
      </div>
    </div>
  );
}
