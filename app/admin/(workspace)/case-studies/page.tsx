import { FileText } from "lucide-react";

import { AdminModulePage, type AdminModuleItem } from "@/components/admin/admin-module-page";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { getContentAnalyticsByType } from "@/lib/content-analytics";
import { listStudioManagedContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function CaseStudiesDashboardPage() {
  const [items, analytics] = await Promise.all([
    listStudioManagedContent("case-study"),
    getContentAnalyticsByType("case-study"),
  ]);

  const moduleItems: AdminModuleItem[] = items.map((item) => {
    const stats = analytics.get(item.slug);

    return {
      id: item.slug,
      title: item.title,
      href: `/admin/case-studies/${item.slug}`,
      publicPath: `/case-studies/${item.slug}`,
      description: item.outcomeSummary || item.excerpt,
      draft: item.draft,
      primaryMeta: item.customerName ? `Customer: ${item.customerName}` : item.category,
      publishedAt: item.publishedAt,
      readingTime: item.readingTime,
      views: stats?.views ?? 0,
      clicks: stats?.clicks ?? 0,
      focusKeyword: item.focusKeyword,
      secondaryAction: <DeleteContentButton compact type="case-study" slug={item.slug} title={item.title} redirectTo="/admin/case-studies" />,
    };
  });

  return (
    <AdminModulePage
      eyebrow="Customer proof"
      title="Case Studies"
      description="Publish customer stories with verified context, implementation detail, and outcome summaries."
      createHref="/admin/case-studies/new"
      createLabel="Create case study"
      queueLabel="Case study queue"
      queueHint="Keep customer claims accurate and outcome-focused."
      emptyTitle="No case studies yet"
      emptyDescription="Create a customer story with real context, verified outcomes, and a clear implementation narrative."
      emptyAction="Create case study"
      mixLabel="Customers"
      items={moduleItems}
      Icon={FileText}
      accentClassName="border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-50"
      totalLabel="Total case studies"
    />
  );
}
