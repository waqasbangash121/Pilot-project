"use client";

import { useState } from "react";

type ContentModule = "blog" | "comparison" | "resource";
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

const actions: Array<{ task: GenerationTask; label: string; description: string }> = [
  { task: "outline", label: "Generate outline", description: "Create a structured H2 outline." },
  { task: "metadata", label: "Improve metadata", description: "Draft an SEO title, description, excerpt, and tags." },
  { task: "faq", label: "Suggest FAQs", description: "Create direct-answer FAQ ideas." },
  { task: "section", label: "Draft a section", description: "Write one grounded Markdown section." },
];

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

  async function generate(task: GenerationTask) {
    setRunningTask(task);
    setError("");
    setCopied(false);

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

  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">AI writing assistant</p>
        <h2 className="mt-2 font-semibold">Generate an editable starting point</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Suggestions are never published automatically. Review every claim, edit the draft, then choose when to save or publish.
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.task}
            type="button"
            disabled={runningTask !== null}
            onClick={() => generate(action.task)}
            className="rounded-lg border border-border bg-background px-3 py-3 text-left transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="block text-sm font-semibold text-foreground">
              {runningTask === action.task ? "Generating…" : action.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">{action.description}</span>
          </button>
        ))}
      </div>

      {error ? <p className="mt-4 rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-950">{error}</p> : null}

      {result ? (
        <div className="mt-5 rounded-lg border border-border bg-background p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold">Generated draft</p>
            <div className="flex gap-2">
              <button type="button" onClick={copyResult} className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                {copied ? "Copied" : "Copy"}
              </button>
              {onAppendToContent ? (
                <button
                  type="button"
                  onClick={() => onAppendToContent(result)}
                  className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  Append to draft
                </button>
              ) : null}
            </div>
          </div>
          <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-muted/50 p-3 text-xs leading-6 text-foreground">
            {result}
          </pre>
        </div>
      ) : null}
    </section>
  );
}
