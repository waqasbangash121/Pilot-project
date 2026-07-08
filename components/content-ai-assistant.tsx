"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  Clipboard,
  FileText,
  HelpCircle,
  Loader2,
  PanelTop,
  PlusCircle,
  Sparkles,
} from "lucide-react";

type ContentModule = "blog" | "comparison" | "resource" | "case-study" | "tool";
type GenerationTask = "outline" | "metadata" | "faq" | "section";

type ContentAiAssistantProps = {
  module: ContentModule;
  title: string;
  focusKeyword?: string;
  audience?: string;
  competitorName?: string;
  existingContent?: string;
  onAppendToContent?: (text: string) => void;
};

type GenerationBrief = {
  searchIntent: string;
  funnelStage: string;
  primaryCta: string;
  proofPoints: string;
  internalLinks: string;
  productFocus: string;
  mustAvoidClaims: string;
};

const actions: Array<{ task: GenerationTask; label: string; description: string; Icon: LucideIcon }> = [
  { task: "outline", label: "Outline", description: "Create a structured H2 flow.", Icon: PanelTop },
  { task: "metadata", label: "Metadata", description: "Draft title, description, excerpt, and tags.", Icon: FileText },
  { task: "faq", label: "FAQs", description: "Suggest direct-answer questions.", Icon: HelpCircle },
  { task: "section", label: "Section", description: "Write one grounded Markdown section.", Icon: PlusCircle },
];

const funnelStages = ["Awareness", "Consideration", "Decision", "Retention"];
const briefLabelClass = "grid gap-1.5 text-xs font-semibold text-foreground";
const briefInputClass = "h-9 rounded-md border border-border bg-background px-2.5 text-xs text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const briefTextareaClass = "min-h-20 rounded-md border border-border bg-background px-2.5 py-2 text-xs leading-5 text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";

function defaultProductFocus(module: ContentModule): string {
  if (module === "comparison") return "Hyper AI Search and relevant Shopify alternatives";
  if (module === "resource") return "Hyper Shopify apps and ecommerce workflows";
  if (module === "case-study") return "Hyper Shopify apps used in the customer story";
  if (module === "tool") return "The tool workflow and related Hyper Shopify apps";
  return "Hyper Shopify apps for product discovery, support, and conversion";
}

export function ContentAiAssistant({
  module,
  title,
  focusKeyword,
  audience,
  competitorName,
  existingContent,
  onAppendToContent,
}: ContentAiAssistantProps) {
  const [runningTask, setRunningTask] = useState<GenerationTask | null>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [appended, setAppended] = useState(false);
  const [brief, setBrief] = useState<GenerationBrief>({
    searchIntent: "",
    funnelStage: "Consideration",
    primaryCta: "",
    proofPoints: "",
    internalLinks: "",
    productFocus: defaultProductFocus(module),
    mustAvoidClaims: "",
  });

  function updateBrief<K extends keyof GenerationBrief>(key: K, value: GenerationBrief[K]) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  async function generate(task: GenerationTask) {
    setRunningTask(task);
    setError("");
    setCopied(false);
    setAppended(false);

    try {
      const response = await fetch("/api/admin/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module,
          task,
          title,
          focusKeyword,
          audience,
          competitorName,
          ...brief,
          existingContent,
        }),
      });
      const body = (await response.json()) as { text?: string; error?: string };
      if (!response.ok || !body.text) throw new Error(body.error || "Content generation could not be completed.");
      setResult(body.text);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Content generation could not be completed.");
    } finally {
      setRunningTask(null);
    }
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
  }

  function appendResult() {
    if (!result || !onAppendToContent) return;
    onAppendToContent(result);
    setAppended(true);
  }

  return (
    <section className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
          <Sparkles aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">AI assistant</p>
          <h2 className="mt-1 font-semibold">Generate a starting point</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Suggestions stay editable. Review claims, adjust the voice, then save or publish when ready.
          </p>
        </div>
      </div>

      <details className="mt-5 rounded-md border border-border bg-background p-3">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">Content brief</summary>
        <div className="mt-4 grid gap-3">
          <label className={briefLabelClass}>
            Search intent
            <input
              value={brief.searchIntent}
              onChange={(event) => updateBrief("searchIntent", event.target.value)}
              className={briefInputClass}
              maxLength={160}
              placeholder="Compare options, solve a problem, choose a tool..."
            />
          </label>
          <label className={briefLabelClass}>
            Funnel stage
            <select
              value={brief.funnelStage}
              onChange={(event) => updateBrief("funnelStage", event.target.value)}
              className={briefInputClass}
            >
              {funnelStages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </label>
          <label className={briefLabelClass}>
            Product or app focus
            <input
              value={brief.productFocus}
              onChange={(event) => updateBrief("productFocus", event.target.value)}
              className={briefInputClass}
              maxLength={160}
              placeholder="Hyper AI Search, Hyper AI Chat, Hyper Shoppable Videos..."
            />
          </label>
          <label className={briefLabelClass}>
            Primary CTA
            <input
              value={brief.primaryCta}
              onChange={(event) => updateBrief("primaryCta", event.target.value)}
              className={briefInputClass}
              maxLength={140}
              placeholder="Book a demo, install the app, read the guide..."
            />
          </label>
          <label className={briefLabelClass}>
            Proof points
            <textarea
              value={brief.proofPoints}
              onChange={(event) => updateBrief("proofPoints", event.target.value)}
              className={briefTextareaClass}
              maxLength={1200}
              placeholder="Verified metrics, customer notes, feature details, screenshots to mention..."
            />
          </label>
          <label className={briefLabelClass}>
            Internal links
            <textarea
              value={brief.internalLinks}
              onChange={(event) => updateBrief("internalLinks", event.target.value)}
              className={briefTextareaClass}
              maxLength={900}
              placeholder="/apps/hyper-search-filter - Hyper AI Search overview"
            />
          </label>
          <label className={briefLabelClass}>
            Avoid
            <textarea
              value={brief.mustAvoidClaims}
              onChange={(event) => updateBrief("mustAvoidClaims", event.target.value)}
              className={briefTextareaClass}
              maxLength={900}
              placeholder="Unsupported pricing claims, competitor weaknesses, unverified rankings..."
            />
          </label>
        </div>
      </details>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        {actions.map((action) => {
          const isRunning = runningTask === action.task;
          const Icon = action.Icon;

          return (
            <button
              key={action.task}
              type="button"
              disabled={runningTask !== null}
              onClick={() => generate(action.task)}
              className="group rounded-md border border-border bg-background px-3 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                {isRunning ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Icon aria-hidden="true" className="size-4 text-primary" />}
                {isRunning ? "Generating..." : action.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">{action.description}</span>
            </button>
          );
        })}
      </div>

      {error ? <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">{error}</p> : null}

      {result ? (
        <div className="mt-5 rounded-md border border-border bg-background p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold">Generated draft</p>
            <div className="flex gap-2">
              <button type="button" onClick={copyResult} className="inline-flex h-8 items-center gap-2 rounded-md border border-border px-3 text-xs font-semibold hover:bg-muted">
                {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Clipboard aria-hidden="true" className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              {onAppendToContent ? (
                <button
                  type="button"
                  onClick={appendResult}
                  className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground"
                >
                  {appended ? <Check aria-hidden="true" className="size-3.5" /> : <PlusCircle aria-hidden="true" className="size-3.5" />}
                  {appended ? "Appended" : "Append"}
                </button>
              ) : null}
            </div>
          </div>
          <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-muted/60 p-3 text-xs leading-6 text-foreground">
            {result}
          </pre>
        </div>
      ) : null}
    </section>
  );
}
