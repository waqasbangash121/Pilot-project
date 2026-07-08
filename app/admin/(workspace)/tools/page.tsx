import Link from "next/link";
import { FileText, Plus, SearchCheck } from "lucide-react";

import { AdminContentRow, AdminEmptyState, AdminMetric } from "@/components/admin/admin-ui";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { getContentAnalyticsByType } from "@/lib/content-analytics";
import { listStudioManagedContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function ToolsDashboardPage() {
  const [tools, analytics] = await Promise.all([
    listStudioManagedContent("tool"),
    getContentAnalyticsByType("tool"),
  ]);
  const draftCount = tools.filter((tool) => tool.draft).length;
  const publishedCount = tools.length - draftCount;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Utility content</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Tools</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Publish audits, calculators, checklists, worksheets, and utility pages for Shopify teams.
            </p>
          </div>
          <Link href="/admin/tools/new" className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Plus aria-hidden="true" className="size-4" />
            Create tool
          </Link>
        </div>
      </section>

      <section aria-label="Tool stats" className="grid gap-3 sm:grid-cols-3">
        <AdminMetric label="Total tools" value={tools.length} tone="violet" />
        <AdminMetric label="Published" value={publishedCount} tone="green" />
        <AdminMetric label="Drafts" value={draftCount} tone="blue" />
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold tracking-tight">Tool queue</h2>
            <p className="mt-1 text-sm text-muted-foreground">Keep use cases clear and instructions actionable.</p>
          </div>
          <span className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground sm:inline-flex">
            <SearchCheck aria-hidden="true" className="size-4" />
            Check usefulness
          </span>
        </div>

        {tools.length ? (
          tools.map((tool) => (
            <AdminContentRow
              key={tool.slug}
              href={`/admin/tools/${tool.slug}`}
              title={tool.title}
              path={`/tools/${tool.slug}`}
              description={tool.useCase || tool.excerpt}
              draft={tool.draft}
              meta={[
                tool.toolType ?? tool.category,
                `${tool.readingTime} min read`,
                formatDate(tool.publishedAt),
                `Views: ${analytics.get(tool.slug)?.views ?? 0}`,
                `Clicks: ${analytics.get(tool.slug)?.clicks ?? 0}`,
                ...(tool.toolUrl ? [`Launch: ${tool.toolUrl}`] : []),
              ]}
              Icon={FileText}
              secondaryAction={<DeleteContentButton compact type="tool" slug={tool.slug} title={tool.title} redirectTo="/admin/tools" />}
            />
          ))
        ) : (
          <AdminEmptyState title="No tools yet" description="Create a practical tool page with a clear use case, format, and next action." href="/admin/tools/new" action="Create tool" Icon={FileText} />
        )}
      </section>
    </div>
  );
}

