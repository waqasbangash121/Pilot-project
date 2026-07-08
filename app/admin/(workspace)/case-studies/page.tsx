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

export default async function CaseStudiesDashboardPage() {
  const [caseStudies, analytics] = await Promise.all([
    listStudioManagedContent("case-study"),
    getContentAnalyticsByType("case-study"),
  ]);
  const draftCount = caseStudies.filter((caseStudy) => caseStudy.draft).length;
  const publishedCount = caseStudies.length - draftCount;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Customer proof</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Case Studies</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Publish customer stories with verified context, implementation detail, and outcome summaries.
            </p>
          </div>
          <Link href="/admin/case-studies/new" className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Plus aria-hidden="true" className="size-4" />
            Create case study
          </Link>
        </div>
      </section>

      <section aria-label="Case study stats" className="grid gap-3 sm:grid-cols-3">
        <AdminMetric label="Total case studies" value={caseStudies.length} tone="blue" />
        <AdminMetric label="Published" value={publishedCount} tone="green" />
        <AdminMetric label="Drafts" value={draftCount} tone="violet" />
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold tracking-tight">Case study queue</h2>
            <p className="mt-1 text-sm text-muted-foreground">Keep customer claims accurate and outcome-focused.</p>
          </div>
          <span className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground sm:inline-flex">
            <SearchCheck aria-hidden="true" className="size-4" />
            Verify outcomes
          </span>
        </div>

        {caseStudies.length ? (
          caseStudies.map((caseStudy) => (
            <AdminContentRow
              key={caseStudy.slug}
              href={`/admin/case-studies/${caseStudy.slug}`}
              title={caseStudy.title}
              path={`/case-studies/${caseStudy.slug}`}
              description={caseStudy.outcomeSummary || caseStudy.excerpt}
              draft={caseStudy.draft}
              meta={[
                caseStudy.customerName ? `Customer: ${caseStudy.customerName}` : caseStudy.category,
                caseStudy.industry ? `Industry: ${caseStudy.industry}` : `${caseStudy.readingTime} min read`,
                formatDate(caseStudy.publishedAt),
                `Views: ${analytics.get(caseStudy.slug)?.views ?? 0}`,
                `Clicks: ${analytics.get(caseStudy.slug)?.clicks ?? 0}`,
                ...(caseStudy.focusKeyword ? [`Keyword: ${caseStudy.focusKeyword}`] : []),
              ]}
              Icon={FileText}
              secondaryAction={<DeleteContentButton compact type="case-study" slug={caseStudy.slug} title={caseStudy.title} redirectTo="/admin/case-studies" />}
            />
          ))
        ) : (
          <AdminEmptyState title="No case studies yet" description="Create a customer story with real context, verified outcomes, and a clear implementation narrative." href="/admin/case-studies/new" action="Create case study" Icon={FileText} />
        )}
      </section>
    </div>
  );
}

