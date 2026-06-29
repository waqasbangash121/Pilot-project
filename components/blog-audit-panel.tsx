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

type ReviewPalette = {
  backgroundColor: string;
  borderColor: string;
  color: string;
  badgeBackground: string;
};

function reviewPalette(status: AuditStatus): ReviewPalette {
  if (status === "pass") {
    return {
      backgroundColor: "#ecfdf5",
      borderColor: "#6ee7b7",
      color: "#065f46",
      badgeBackground: "#d1fae5",
    };
  }

  if (status === "error") {
    return {
      backgroundColor: "#fff1f2",
      borderColor: "#fda4af",
      color: "#881337",
      badgeBackground: "#ffe4e6",
    };
  }

  return {
    backgroundColor: "#fffbeb",
    borderColor: "#fcd34d",
    color: "#78350f",
    badgeBackground: "#fef3c7",
  };
}

function potentialStatus(label: BlogAuditResult["onPagePotential"]["label"]): AuditStatus {
  if (label === "Strong") return "pass";
  if (label === "Needs work") return "error";
  return "warning";
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
      {checks.map((check) => {
        const palette = reviewPalette(check.status);

        return (
          <div
            key={check.id}
            className="rounded-lg border px-3 py-3 shadow-sm"
            style={{
              backgroundColor: palette.backgroundColor,
              borderColor: palette.borderColor,
              color: palette.color,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold tracking-[0.01em]" style={{ color: "inherit" }}>
                {check.label}
              </p>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                style={{ backgroundColor: palette.badgeBackground, color: palette.color }}
              >
                {statusLabel(check.status)}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-5" style={{ color: "inherit", opacity: 0.95 }}>
              {check.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function BlogKeywordIdeas({ title, description, ideas }: BlogKeywordIdeasProps) {
  if (!ideas.length) return null;

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <p className="text-sm font-bold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      <div className="mt-3 grid gap-2">
        {ideas.map((idea) => (
          <div key={idea.phrase} className="rounded-md border border-border bg-background px-3 py-3 shadow-sm">
            <p className="text-sm font-semibold text-foreground">{idea.phrase}</p>
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
  const potential = result ? potentialStatus(result.onPagePotential.label) : null;
  const potentialPalette = potential ? reviewPalette(potential) : null;

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
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-foreground">Content review</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Review keyword targeting, metadata, content depth, and answer coverage for this draft.
          </p>
        </div>
        {result && potentialPalette ? (
          <span
            className="rounded-full border px-2.5 py-1 text-xs font-bold"
            style={{
              backgroundColor: potentialPalette.backgroundColor,
              borderColor: potentialPalette.borderColor,
              color: potentialPalette.color,
            }}
          >
            {result.onPagePotential.score}/100
          </span>
        ) : null}
      </div>

      {result && potentialPalette ? (
        <div
          className="mt-4 rounded-lg border p-3"
          style={{
            backgroundColor: potentialPalette.backgroundColor,
            borderColor: potentialPalette.borderColor,
            color: potentialPalette.color,
          }}
        >
          <p className="text-sm font-bold" style={{ color: "inherit" }}>
            {result.onPagePotential.label} on-page potential
          </p>
          <p className="mt-1 text-xs leading-5" style={{ color: "inherit", opacity: 0.95 }}>
            {result.onPagePotential.summary}
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={runAudit}
        disabled={running}
        className="mt-5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        {running ? "Reviewing content…" : result ? "Refresh content review" : "Run content review"}
      </button>

      {result ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {improvementCount ? `${improvementCount} improvement${improvementCount === 1 ? "" : "s"} are highlighted beside the relevant fields.` : "All current draft checks are ready."}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 rounded-lg border px-3 py-3 text-sm font-medium" style={{ backgroundColor: "#fff1f2", borderColor: "#fda4af", color: "#881337" }}>
          {error}
        </p>
      ) : null}
    </section>
  );
}
