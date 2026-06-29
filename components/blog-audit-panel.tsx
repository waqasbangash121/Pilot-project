"use client";

import { useState } from "react";

import type { BlogPostInput } from "@/lib/blog-admin-types";

export type AuditStatus = "pass" | "warning" | "error";

export type BlogAuditCheck = {
  id: string;
  label: string;
  status: AuditStatus;
  message: string;
};

export type KeywordIdea = {
  phrase: string;
  reason: string;
};

export type BlogAuditResult = {
  generatedAt: string;
  focusKeyword: string;
  onPagePotential: {
    score: number;
    label: "Strong" | "Developing" | "Needs work";
    summary: string;
  };
  article: {
    wordCount: number;
    headingCount: number;
    questionHeadingCount: number;
    keywordMentions: number;
    checks: BlogAuditCheck[];
  };
  keywordIdeas: {
    secondary: KeywordIdea[];
    questions: KeywordIdea[];
  };
};

type BlogAuditPanelProps = {
  article: BlogPostInput;
  result: BlogAuditResult | null;
  onResult: (result: BlogAuditResult) => void;
};

type BlogAuditFeedbackProps = {
  checks: BlogAuditCheck[];
};

type BlogKeywordIdeasProps = {
  title: string;
  description: string;
  ideas: KeywordIdea[];
};

function statusClass(status: AuditStatus): string {
  if (status === "pass") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200";
  if (status === "error") return "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-200";
  return "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-100";
}

function statusLabel(status: AuditStatus): string {
  if (status === "pass") return "Ready";
  if (status === "error") return "Fix this";
  return "Improve";
}

export function BlogAuditFeedback({ checks }: BlogAuditFeedbackProps) {
  if (!checks.length) return null;

  return (
    <div className="grid gap-2" aria-live="polite">
      {checks.map((check) => (
        <div key={check.id} className={`rounded-lg border px-3 py-2.5 ${statusClass(check.status)}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold">{check.label}</p>
            <span className="text-xs font-semibold">{statusLabel(check.status)}</span>
          </div>
          <p className="mt-1 text-xs leading-5 opacity-90">{check.message}</p>
        </div>
      ))}
    </div>
  );
}

export function BlogKeywordIdeas({ title, description, ideas }: BlogKeywordIdeasProps) {
  if (!ideas.length) return null;

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      <div className="mt-3 grid gap-2">
        {ideas.map((idea) => (
          <div key={idea.phrase} className="rounded-md border border-border bg-background px-3 py-2.5">
            <p className="text-sm font-medium text-primary">{idea.phrase}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{idea.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogAuditPanel({ article, result, onResult }: BlogAuditPanelProps) {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  async function runAudit() {
    setRunning(true);
    setError("");

    try {
      const response = await fetch("/api/admin/blogs/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      const body = (await response.json()) as BlogAuditResult & { error?: string };

      if (!response.ok) throw new Error(body.error || "The content review could not be completed.");
      onResult(body);
    } catch (auditError) {
      setError(auditError instanceof Error ? auditError.message : "The content review could not be completed.");
    } finally {
      setRunning(false);
    }
  }

  const improvementCount = result?.article.checks.filter((check) => check.status !== "pass").length ?? 0;

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Content review</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Review keyword targeting, metadata, content depth, and answer coverage for this draft.
          </p>
        </div>
        {result ? (
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold">
            {result.onPagePotential.score}/100
          </span>
        ) : null}
      </div>

      {result ? (
        <div className="mt-4 rounded-lg border border-border bg-background p-3">
          <p className="text-sm font-semibold">{result.onPagePotential.label} on-page potential</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{result.onPagePotential.summary}</p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={runAudit}
        disabled={running}
        className="mt-5 w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        {running ? "Reviewing content…" : result ? "Refresh content review" : "Run content review"}
      </button>

      {result ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {improvementCount ? `${improvementCount} improvement${improvementCount === 1 ? "" : "s"} are highlighted beside the relevant fields.` : "All current draft checks are ready."}
        </p>
      ) : null}
      {error ? <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">{error}</p> : null}
    </section>
  );
}
