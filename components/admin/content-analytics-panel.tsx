import { BarChart3, Eye, MousePointerClick, UsersRound } from "lucide-react";

import type { ContentAnalyticsStats } from "@/lib/content-analytics";

const numberFormat = new Intl.NumberFormat("en");

type ContentAnalyticsPanelProps = {
  stats: ContentAnalyticsStats;
  title?: string;
  description?: string;
};

function formatNumber(value: number): string {
  return numberFormat.format(value);
}

function formatDate(value: string | null): string {
  if (!value) return "No views yet";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function ContentAnalyticsPanel({
  stats,
  title = "Content analytics",
  description = "Anonymous first-party views and link clicks for this content item.",
}: ContentAnalyticsPanelProps) {
  const metrics = [
    { label: "Views", value: stats.views, Icon: Eye },
    { label: "Clicks", value: stats.clicks, Icon: MousePointerClick },
    { label: "Visitors", value: stats.visitors, Icon: UsersRound },
  ];

  return (
    <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <BarChart3 aria-hidden="true" className="size-4 text-primary" />
            Analytics
          </div>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Last view: {formatDate(stats.lastViewedAt)}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {metrics.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-md border border-border bg-background p-4">
            <Icon aria-hidden="true" className="size-4 text-primary" />
            <p className="mt-3 text-2xl font-semibold tracking-tight">{formatNumber(value)}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-md border border-border bg-background">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold tracking-tight">Top clicked links</h3>
        </div>
        {stats.topTargets.length ? (
          <div className="divide-y divide-border">
            {stats.topTargets.map((target) => (
              <div key={target.targetUrl} className="grid gap-2 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{target.targetText}</p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{target.targetUrl}</p>
                </div>
                <span className="w-fit rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-semibold text-foreground/80">
                  {formatNumber(target.clicks)} clicks
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-4 py-5 text-sm leading-6 text-muted-foreground">
            No link clicks have been recorded for this content yet.
          </p>
        )}
      </div>
    </section>
  );
}
