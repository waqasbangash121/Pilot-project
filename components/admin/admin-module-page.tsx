import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Eye,
  MousePointerClick,
  PencilLine,
  SearchCheck,
  Tag,
  TrendingUp,
} from "lucide-react";

import { AdminEmptyState, AdminStatusBadge } from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

export type AdminModuleItem = {
  id: string;
  title: string;
  href: string;
  publicPath: string;
  description?: string;
  draft?: boolean;
  primaryMeta?: string;
  publishedAt?: string;
  readingTime?: number;
  views?: number;
  clicks?: number;
  focusKeyword?: string;
  secondaryAction?: ReactNode;
};

type AdminModulePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  createHref: string;
  createLabel: string;
  queueLabel: string;
  queueHint: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyAction: string;
  mixLabel: string;
  items: AdminModuleItem[];
  Icon: LucideIcon;
  accentClassName: string;
  totalLabel: string;
};

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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00.000Z`));
}

function pct(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

function sortDate(item: AdminModuleItem): number {
  if (!item.publishedAt) return 0;
  const date = new Date(`${item.publishedAt}T12:00:00.000Z`).getTime();
  return Number.isNaN(date) ? 0 : date;
}

function StatCard({
  label,
  value,
  detail,
  Icon,
  tone = "blue",
}: {
  label: string;
  value: string;
  detail: string;
  Icon: LucideIcon;
  tone?: "blue" | "green" | "violet" | "amber";
}) {
  const toneClasses = {
    blue: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-50",
    green:
      "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50",
    violet:
      "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50",
    amber:
      "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className={cn("inline-flex size-10 items-center justify-center rounded-md border", toneClasses[tone])}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Current
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-2 text-sm leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}

export function AdminModulePage({
  eyebrow,
  title,
  description,
  createHref,
  createLabel,
  queueLabel,
  queueHint,
  emptyTitle,
  emptyDescription,
  emptyAction,
  mixLabel,
  items,
  Icon,
  accentClassName,
  totalLabel,
}: AdminModulePageProps) {
  const sortedItems = [...items].sort((a, b) => sortDate(b) - sortDate(a));
  const draftCount = items.filter((item) => item.draft).length;
  const publishedCount = items.length - draftCount;
  const totalViews = items.reduce((sum, item) => sum + (item.views ?? 0), 0);
  const totalClicks = items.reduce((sum, item) => sum + (item.clicks ?? 0), 0);
  const totalReadingTime = items.reduce((sum, item) => sum + (item.readingTime ?? 0), 0);
  const avgReadTime = items.length > 0 ? Math.round(totalReadingTime / items.length) : 0;
  const clickRate = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;
  const keywordCount = items.filter((item) => Boolean(item.focusKeyword)).length;
  const mixItems = new Set(
    items.map((item) => item.primaryMeta).filter((item): item is string => Boolean(item)),
  );
  const topItem = [...items].sort((a, b) => (b.views ?? 0) - (a.views ?? 0))[0];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex flex-col gap-5 border-b border-border p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Icon aria-hidden="true" className="size-4 text-primary" />
                {eyebrow}
              </span>
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
                {publishedCount} published
              </span>
              <span className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50">
                {draftCount} drafts
              </span>
            </div>
            <div className="mt-5 max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
            </div>
          </div>
          <Link
            href={createHref}
            className="inline-flex h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {createLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label={totalLabel}
            value={formatNumber(items.length)}
            detail={`${pct(publishedCount, items.length)}% published across ${formatNumber(mixItems.size)} ${mixLabel.toLowerCase()}.`}
            Icon={Icon}
            tone="blue"
          />
          <StatCard
            label="Total views"
            value={formatCompactNumber(totalViews)}
            detail={`${formatCompactNumber(totalClicks)} clicks with a ${clickRate}% click rate.`}
            Icon={Eye}
            tone="green"
          />
          <StatCard
            label="Keyword coverage"
            value={`${pct(keywordCount, items.length)}%`}
            detail={`${formatNumber(keywordCount)} items have a focus keyword.`}
            Icon={SearchCheck}
            tone="violet"
          />
          <StatCard
            label="Average read"
            value={`${avgReadTime}m`}
            detail={`${formatNumber(totalReadingTime)} total reading minutes in the library.`}
            Icon={Clock3}
            tone="amber"
          />
        </div>
      </section>

      <section className="grid gap-4">
        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Icon aria-hidden="true" className="size-4 text-primary" />
                {queueLabel}
              </div>
              <h2 className="mt-2 font-semibold tracking-tight">Newest and recently edited</h2>
              <p className="mt-1 text-sm text-muted-foreground">{queueHint}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              <PencilLine aria-hidden="true" className="size-4" />
              {draftCount} drafts need review
            </span>
          </div>

          {sortedItems.length ? (
            <div className="grid gap-3 p-4 lg:grid-cols-2">
              {sortedItems.map((item) => (
                <article key={item.id} className="rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-muted/40">
                  <div className="flex items-start gap-3">
                    <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-md border", accentClassName)}>
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {typeof item.draft === "boolean" ? <AdminStatusBadge draft={item.draft} /> : null}
                        {item.primaryMeta ? (
                          <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-semibold text-muted-foreground">
                            {item.primaryMeta}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-6 tracking-tight">{item.title}</h3>
                      {item.description ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.description}</p> : null}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.publishedAt ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                        <CalendarDays aria-hidden="true" className="size-3.5" />
                        {formatDate(item.publishedAt)}
                      </span>
                    ) : null}
                    {typeof item.readingTime === "number" ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                        <Clock3 aria-hidden="true" className="size-3.5" />
                        {item.readingTime} min
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                      <Eye aria-hidden="true" className="size-3.5" />
                      {formatCompactNumber(item.views ?? 0)} views
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                      <MousePointerClick aria-hidden="true" className="size-3.5" />
                      {formatCompactNumber(item.clicks ?? 0)} clicks
                    </span>
                    {item.focusKeyword ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-900 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50">
                        <Tag aria-hidden="true" className="size-3.5" />
                        {item.focusKeyword}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                    <span className="truncate text-sm text-muted-foreground">{item.publicPath}</span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={item.href}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Edit
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                      {item.secondaryAction}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState
              title={emptyTitle}
              description={emptyDescription}
              href={createHref}
              action={emptyAction}
              Icon={Icon}
            />
          )}
        </div>

        <aside className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Top item</p>
                <h2 className="mt-1 text-base font-semibold tracking-tight">Performance leader</h2>
              </div>
              <TrendingUp aria-hidden="true" className="size-5 text-primary" />
            </div>
            {topItem ? (
              <div className="mt-4 rounded-lg border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-md border", accentClassName)}>
                    <Eye aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-2xl font-semibold tracking-tight tabular-nums" title={`${formatNumber(topItem.views ?? 0)} views`}>
                    {formatCompactNumber(topItem.views ?? 0)}
                  </span>
                </div>
                <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-5">{topItem.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-900 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50">
                    {formatCompactNumber(topItem.clicks ?? 0)} clicks
                  </span>
                  {topItem.primaryMeta ? (
                    <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-semibold text-muted-foreground">
                      {topItem.primaryMeta}
                    </span>
                  ) : null}
                </div>
                <Link
                  href={topItem.href}
                  className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Open item
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            ) : (
              <p className="mt-4 rounded-md border border-border bg-background p-3 text-sm leading-6 text-muted-foreground">
                Performance data will appear after pages receive views.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Content mix</p>
            <h2 className="mt-1 text-base font-semibold tracking-tight">{mixLabel}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...mixItems].length ? (
                [...mixItems].map((item) => (
                  <span key={item} className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No mix data yet.</span>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
