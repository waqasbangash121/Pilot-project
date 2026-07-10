import Link from "next/link";
import {
  BarChart3,
  BookOpenText,
  CheckCircle2,
  Eye,
  FileText,
  Layers3,
  MousePointerClick,
  PencilLine,
  Scale,
  SearchCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { getContentAnalyticsOverview } from "@/lib/content-analytics";

const quickCreateActions = [
  { createHref: "/admin/blogs/new", action: "New article", Icon: BookOpenText },
  { createHref: "/admin/comparisons/new", action: "New comparison", Icon: Scale },
  { createHref: "/admin/resources/new", action: "New resource", Icon: FileText },
  { createHref: "/admin/case-studies/new", action: "New case study", Icon: FileText },
  { createHref: "/admin/tools/new", action: "New tool", Icon: SearchCheck },
  { createHref: "/admin/team/new", action: "New member", Icon: UsersRound },
];

export const dynamic = "force-dynamic";

const workflow = [
  { label: "Draft", description: "Capture the angle, slug, and core content.", Icon: PencilLine },
  {
    label: "Review",
    description: "Run content checks and improve the page before publishing.",
    Icon: SearchCheck,
  },
  {
    label: "Publish",
    description: "Save to Neon and refresh public routes immediately.",
    Icon: CheckCircle2,
  },
];

const numberFormat = new Intl.NumberFormat("en");
const compactNumberFormat = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatNumber(value: number): string {
  return numberFormat.format(value);
}

function formatCompactNumber(value: number): string {
  return compactNumberFormat.format(value);
}

export default async function AdminHomePage() {
  const analytics = await getContentAnalyticsOverview(0);
  const clickRate =
    analytics.views > 0 ? Math.round((analytics.clicks / analytics.views) * 100) : 0;
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Layers3 aria-hidden="true" className="size-4" />
              Content operations
            </span>
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
              Workspace ready
            </span>
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Choose what you want to create next.
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Start with the right content format, then move through one consistent editing, review,
              and publish flow.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {quickCreateActions.map(({ createHref, action, Icon }) => (
              <Link
                key={createHref}
                href={createHref}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon aria-hidden="true" className="size-4" />
                {action}
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Publishing path
          </p>
          <div className="mt-5 grid gap-4">
            {workflow.map(({ label, description, Icon }) => (
              <div key={label} className="flex gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section
        aria-label="Content analytics"
        className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
      >
        <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <BarChart3 aria-hidden="true" className="size-4 text-primary" />
              Content analytics
            </div>
            <h2 className="mt-2 font-semibold tracking-tight">Combined performance</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Totals across articles, comparisons, resources, case studies, and tools.
            </p>
          </div>
          <span
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground"
            title={`${formatNumber(analytics.trackedContent)} pages tracked`}
          >
            <Layers3 aria-hidden="true" className="size-4" />
            {formatCompactNumber(analytics.trackedContent)} pages tracked
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:p-5">
          {[
            { label: "Total views", value: analytics.views, Icon: Eye },
            { label: "Total clicks", value: analytics.clicks, Icon: MousePointerClick },
            { label: "Visitors", value: analytics.visitors, Icon: UsersRound },
            { label: "Sessions", value: analytics.sessions, Icon: BarChart3 },
            { label: "Click rate", value: clickRate, suffix: "%", Icon: MousePointerClick },
            { label: "Pages tracked", value: analytics.trackedContent, Icon: Layers3 },
          ].map(({ label, value, suffix = "", Icon }) => (
            <div key={label} className="rounded-md border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {label}
                </p>
                <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
              </div>
              <p
                className="mt-3 truncate text-3xl font-semibold tabular-nums tracking-tight"
                title={`${formatNumber(value)}${suffix}`}
              >
                {formatCompactNumber(value)}
                {suffix}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Assistant support
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Every editor includes AI drafting and SEO review.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Use suggestions as editable material, then rely on the review panel to catch keyword,
              metadata, and answer-coverage gaps before publishing.
            </p>
          </div>
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
            <Sparkles aria-hidden="true" className="size-6" />
          </span>
        </div>
      </section>
    </div>
  );
}
