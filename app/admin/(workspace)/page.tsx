import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenText,
  CalendarClock,
  Clock3,
  Eye,
  FileText,
  Layers3,
  MousePointerClick,
  Plus,
  Scale,
  SearchCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { AdminStatusBadge } from "@/components/admin/admin-ui";
import { getContentAnalyticsOverview } from "@/lib/content-analytics";
import {
  listStudioBlogPosts,
  listStudioManagedContent,
} from "@/lib/content-store";
import { listTeamMembers } from "@/lib/team";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type DashboardItem = {
  title: string;
  href: string;
  typeLabel: string;
  draft: boolean;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  Icon: LucideIcon;
};

type ContentSection = {
  label: string;
  href: string;
  createHref: string;
  action: string;
  description: string;
  tone: "blue" | "violet" | "green" | "amber" | "rose";
  Icon: LucideIcon;
  items: DashboardItem[];
};

const numberFormat = new Intl.NumberFormat("en");
const compactNumberFormat = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const toneClasses = {
  blue: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-50",
  violet:
    "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50",
  green:
    "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50",
  amber:
    "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50",
  rose: "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50",
};

function formatNumber(value: number): string {
  return numberFormat.format(value);
}

function formatCompactNumber(value: number): string {
  return compactNumberFormat.format(value);
}

function formatDate(value: string): string {
  const date = new Date(`${value}T12:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

function sortDate(item: DashboardItem): number {
  const value = item.updatedAt || item.publishedAt;
  const date = new Date(`${value}T12:00:00.000Z`).getTime();
  return Number.isNaN(date) ? 0 : date;
}

function pct(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

function toDashboardItems(
  items: Array<{
    title: string;
    slug: string;
    draft: boolean;
    excerpt: string;
    publishedAt: string;
    updatedAt?: string;
    readingTime: number;
  }>,
  baseHref: string,
  typeLabel: string,
  Icon: LucideIcon,
): DashboardItem[] {
  return items.map((item) => ({
    title: item.title,
    href: `${baseHref}/${item.slug}`,
    typeLabel,
    draft: item.draft,
    excerpt: item.excerpt,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    readingTime: item.readingTime,
    Icon,
  }));
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
  tone?: ContentSection["tone"];
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className={cn("inline-flex size-10 items-center justify-center rounded-md border", toneClasses[tone])}>
          <Icon aria-hidden="true" className="size-5" />
        </div>
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

export default async function AdminHomePage() {
  const [analytics, blogs, comparisons, resources, caseStudies, tools, teamMembers] = await Promise.all([
    getContentAnalyticsOverview(8),
    listStudioBlogPosts(),
    listStudioManagedContent("comparison"),
    listStudioManagedContent("resource"),
    listStudioManagedContent("case-study"),
    listStudioManagedContent("tool"),
    listTeamMembers(),
  ]);

  const sections: ContentSection[] = [
    {
      label: "Articles",
      href: "/admin/blogs",
      createHref: "/admin/blogs/new",
      action: "New article",
      description: "Thought leadership, announcements, and search content.",
      tone: "blue",
      Icon: BookOpenText,
      items: toDashboardItems(blogs, "/admin/blogs", "Article", BookOpenText),
    },
    {
      label: "Comparisons",
      href: "/admin/comparisons",
      createHref: "/admin/comparisons/new",
      action: "New comparison",
      description: "Alternative and versus pages for demand capture.",
      tone: "violet",
      Icon: Scale,
      items: toDashboardItems(comparisons, "/admin/comparisons", "Comparison", Scale),
    },
    {
      label: "Resources",
      href: "/admin/resources",
      createHref: "/admin/resources/new",
      action: "New resource",
      description: "Guides, playbooks, templates, and enablement assets.",
      tone: "green",
      Icon: FileText,
      items: toDashboardItems(resources, "/admin/resources", "Resource", FileText),
    },
    {
      label: "Case Studies",
      href: "/admin/case-studies",
      createHref: "/admin/case-studies/new",
      action: "New case study",
      description: "Customer proof, outcomes, and implementation stories.",
      tone: "amber",
      Icon: FileText,
      items: toDashboardItems(caseStudies, "/admin/case-studies", "Case Study", FileText),
    },
    {
      label: "Tools",
      href: "/admin/tools",
      createHref: "/admin/tools/new",
      action: "New tool",
      description: "Audits, calculators, checklists, and utility pages.",
      tone: "rose",
      Icon: SearchCheck,
      items: toDashboardItems(tools, "/admin/tools", "Tool", SearchCheck),
    },
  ];

  const allItems = sections.flatMap((section) => section.items);
  const totalContent = allItems.length;
  const publishedCount = allItems.filter((item) => !item.draft).length;
  const draftCount = totalContent - publishedCount;
  const totalReadingTime = allItems.reduce((sum, item) => sum + item.readingTime, 0);
  const clickRate = analytics.views > 0 ? Math.round((analytics.clicks / analytics.views) * 100) : 0;
  const recentItems = [...allItems].sort((a, b) => sortDate(b) - sortDate(a)).slice(0, 5);
  const topPages = analytics.rows.slice(0, 5);
  const strongestSection = [...sections].sort((a, b) => b.items.length - a.items.length)[0];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_34rem]">
        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="border-b border-border p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Layers3 aria-hidden="true" className="size-4 text-primary" />
                Content studio
              </span>
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
                {publishedCount} published
              </span>
              <span className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50">
                {draftCount} drafts
              </span>
            </div>
            <div className="mt-5 max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Your publishing workspace at a glance.
              </h1>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Monitor the content library, spot what needs attention, and jump straight into the next page without losing context.
              </p>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Content items"
              value={formatNumber(totalContent)}
              detail={`${pct(publishedCount, totalContent)}% published across ${sections.length} content types.`}
              Icon={Layers3}
              tone="blue"
            />
            <StatCard
              label="Total views"
              value={formatCompactNumber(analytics.views)}
              detail={`${formatCompactNumber(analytics.visitors)} visitors and ${formatCompactNumber(analytics.sessions)} sessions tracked.`}
              Icon={Eye}
              tone="green"
            />
            <StatCard
              label="Click rate"
              value={`${clickRate}%`}
              detail={`${formatCompactNumber(analytics.clicks)} tracked clicks from content pages.`}
              Icon={MousePointerClick}
              tone="violet"
            />
            <StatCard
              label="Team profiles"
              value={formatNumber(teamMembers.length)}
              detail={`${formatNumber(totalReadingTime)} minutes of total reading time in the library.`}
              Icon={UsersRound}
              tone="amber"
            />
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Quick create
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">Start from the right format.</h2>
            </div>
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
              <Plus aria-hidden="true" className="size-5" />
            </span>
          </div>
          <div className="mt-5 grid gap-2">
            {sections.map(({ createHref, action, Icon }) => (
              <Link
                key={createHref}
                href={createHref}
                className="inline-flex h-10 items-center justify-between gap-3 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-4" />
                  {action}
                </span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            ))}
            <Link
              href="/admin/team/new"
              className="inline-flex h-10 items-center justify-between gap-3 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="inline-flex items-center gap-2">
                <UsersRound aria-hidden="true" className="size-4" />
                New member
              </span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </aside>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Library coverage
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">What exists, what is live, and where to go next.</h2>
            </div>
            <Link
              href={strongestSection.href}
              className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Open {strongestSection.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
            {sections.map(({ label, href, description, tone, Icon, items }) => {
              const live = items.filter((item) => !item.draft).length;
              const drafts = items.length - live;
              return (
                <Link
                  key={label}
                  href={href}
                  className="group rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={cn("inline-flex size-10 items-center justify-center rounded-md border", toneClasses[tone])}>
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-2xl font-semibold tracking-tight">{items.length}</span>
                  </div>
                  <h3 className="mt-3 font-semibold tracking-tight group-hover:text-primary">{label}</h3>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
                      {live} live
                    </span>
                    <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50">
                      {drafts} draft
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_34rem]">
        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <CalendarClock aria-hidden="true" className="size-4 text-primary" />
                Recent activity
              </div>
              <h2 className="mt-2 font-semibold tracking-tight">Latest edited content</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              <Clock3 aria-hidden="true" className="size-4" />
              Sorted by update date
            </span>
          </div>

          <div className="divide-y divide-border">
            {recentItems.length > 0 ? (
              recentItems.map(({ title, href, typeLabel, draft, excerpt, publishedAt, readingTime, Icon }) => (
                <article key={`${typeLabel}-${href}`} className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5">
                  <div className="flex min-w-0 gap-3">
                    <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-semibold tracking-tight">{title}</h3>
                        <AdminStatusBadge draft={draft} />
                      </div>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{excerpt}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">{typeLabel}</span>
                        <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">{formatDate(publishedAt)}</span>
                        <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">{readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={href}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Edit
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </article>
              ))
            ) : (
              <div className="px-5 py-12 text-center text-sm text-muted-foreground">No content has been created yet.</div>
            )}
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Top pages
              </p>
              <h2 className="mt-1 truncate text-base font-semibold tracking-tight">Performance leaders</h2>
            </div>
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
              <TrendingUp aria-hidden="true" className="size-4" />
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {topPages.length > 0 ? (
              topPages.map((page, index) => (
                <div key={`${page.contentType}-${page.slug}`} className="rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/40 hover:bg-muted/40">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60 text-xs font-semibold text-muted-foreground">
                      #{index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {page.contentType}
                        </span>
                        <TrendingUp aria-hidden="true" className="size-3.5 shrink-0 text-primary" />
                      </div>
                      <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 tracking-tight">{page.title}</h3>
                    </div>
                    <div className="shrink-0 text-right" title={`${formatNumber(page.views)} views`}>
                      <p className="text-xl font-semibold leading-none tracking-tight tabular-nums">
                        {formatCompactNumber(page.views)}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">views</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 pl-12">
                    <span className="rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-900 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50">
                      {formatCompactNumber(page.clicks)} clicks
                    </span>
                    <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
                      {formatCompactNumber(page.visitors)} visitors
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-border bg-background p-4 text-sm leading-6 text-muted-foreground sm:col-span-2">
                Analytics will appear after visitors view tracked content pages.
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
