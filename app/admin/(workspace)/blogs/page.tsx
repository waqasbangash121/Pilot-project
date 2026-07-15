import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  Eye,
  FileText,
  MousePointerClick,
  PencilLine,
  SearchCheck,
  Tag,
  TrendingUp,
} from "lucide-react";

import { AdminEmptyState, AdminStatusBadge } from "@/components/admin/admin-ui";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { getContentAnalyticsByType } from "@/lib/content-analytics";
import { listStudioBlogPosts } from "@/lib/content-store";
import type { BlogPostInput } from "@/lib/blog-admin-types";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

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

function sortDate(post: BlogPostInput): number {
  const value = post.updatedAt || post.publishedAt;
  const date = new Date(`${value}T12:00:00.000Z`).getTime();
  return Number.isNaN(date) ? 0 : date;
}

function pct(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
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
          Articles
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-2 text-sm leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}

export default async function BlogDashboardPage() {
  const [posts, analytics] = await Promise.all([
    listStudioBlogPosts(),
    getContentAnalyticsByType("blog"),
  ]);

  const sortedPosts = [...posts].sort((a, b) => sortDate(b) - sortDate(a));
  const draftCount = posts.filter((post) => post.draft).length;
  const publishedCount = posts.length - draftCount;
  const totalViews = posts.reduce((sum, post) => sum + (analytics.get(post.slug)?.views ?? 0), 0);
  const totalClicks = posts.reduce((sum, post) => sum + (analytics.get(post.slug)?.clicks ?? 0), 0);
  const totalReadingTime = posts.reduce((sum, post) => sum + post.readingTime, 0);
  const avgReadTime = posts.length > 0 ? Math.round(totalReadingTime / posts.length) : 0;
  const clickRate = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;
  const categories = new Set(posts.map((post) => post.category).filter(Boolean));
  const keywordCount = posts.filter((post) => Boolean(post.focusKeyword)).length;
  const topPost = [...posts].sort((a, b) => (analytics.get(b.slug)?.views ?? 0) - (analytics.get(a.slug)?.views ?? 0))[0];
  const topPostStats = topPost ? analytics.get(topPost.slug) : null;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="flex flex-col gap-5 border-b border-border p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <BookOpenText aria-hidden="true" className="size-4 text-primary" />
                  Article module
                </span>
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
                  {publishedCount} published
                </span>
                <span className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50">
                  {draftCount} drafts
                </span>
              </div>
              <div className="mt-5 max-w-3xl">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Articles</h1>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Plan, review, and improve SEO articles with publishing status, keyword coverage, and page performance in one place.
                </p>
              </div>
            </div>
            <Link
              href="/admin/blogs/new"
              className="inline-flex h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Create article
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total articles"
              value={formatNumber(posts.length)}
              detail={`${pct(publishedCount, posts.length)}% published across ${formatNumber(categories.size)} categories.`}
              Icon={BookOpenText}
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
              value={`${pct(keywordCount, posts.length)}%`}
              detail={`${formatNumber(keywordCount)} articles have a focus keyword.`}
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
                <FileText aria-hidden="true" className="size-4 text-primary" />
                Article queue
              </div>
              <h2 className="mt-2 font-semibold tracking-tight">Newest and recently edited</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              <PencilLine aria-hidden="true" className="size-4" />
              {draftCount} drafts need review
            </span>
          </div>

          {sortedPosts.length ? (
            <div className="grid gap-3 p-4 lg:grid-cols-2">
              {sortedPosts.map((post) => {
                const stats = analytics.get(post.slug);
                return (
                  <article key={post.slug} className="rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-muted/40">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-50">
                        <BookOpenText aria-hidden="true" className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <AdminStatusBadge draft={post.draft} />
                          <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-semibold text-muted-foreground">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-6 tracking-tight">{post.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                        <CalendarDays aria-hidden="true" className="size-3.5" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                        <Clock3 aria-hidden="true" className="size-3.5" />
                        {post.readingTime} min
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                        <Eye aria-hidden="true" className="size-3.5" />
                        {formatCompactNumber(stats?.views ?? 0)} views
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                        <MousePointerClick aria-hidden="true" className="size-3.5" />
                        {formatCompactNumber(stats?.clicks ?? 0)} clicks
                      </span>
                      {post.focusKeyword ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-900 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50">
                          <Tag aria-hidden="true" className="size-3.5" />
                          {post.focusKeyword}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                      <span className="truncate text-sm text-muted-foreground">/blog/{post.slug}</span>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blogs/${post.slug}`}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          Edit
                          <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                        <DeleteContentButton compact type="blog" slug={post.slug} title={post.title} redirectTo="/admin/blogs" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <AdminEmptyState
              title="No articles yet"
              description="Create the first blog draft, add keyword context, and use the content review before publishing."
              href="/admin/blogs/new"
              action="Create article"
              Icon={BookOpenText}
            />
          )}
        </div>

        <aside className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Top article</p>
                <h2 className="mt-1 text-base font-semibold tracking-tight">Performance leader</h2>
              </div>
              <TrendingUp aria-hidden="true" className="size-5 text-primary" />
            </div>
            {topPost ? (
              <div className="mt-4 rounded-lg border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
                    <Eye aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-2xl font-semibold tracking-tight tabular-nums" title={`${formatNumber(topPostStats?.views ?? 0)} views`}>
                    {formatCompactNumber(topPostStats?.views ?? 0)}
                  </span>
                </div>
                <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-5">{topPost.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-900 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50">
                    {formatCompactNumber(topPostStats?.clicks ?? 0)} clicks
                  </span>
                  <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-semibold text-muted-foreground">
                    {topPost.category}
                  </span>
                </div>
                <Link
                  href={`/admin/blogs/${topPost.slug}`}
                  className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Open article
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            ) : (
              <p className="mt-4 rounded-md border border-border bg-background p-3 text-sm leading-6 text-muted-foreground">
                Article analytics will appear after pages receive views.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Content mix</p>
            <h2 className="mt-1 text-base font-semibold tracking-tight">Categories</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...categories].length ? (
                [...categories].map((category) => (
                  <span key={category} className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">
                    {category}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No categories yet.</span>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
