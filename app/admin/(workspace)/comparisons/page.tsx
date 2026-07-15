import { Scale } from "lucide-react";

import { AdminModulePage, type AdminModuleItem } from "@/components/admin/admin-module-page";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { getContentAnalyticsByType } from "@/lib/content-analytics";
import { listStudioManagedContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function ComparisonDashboardPage() {
  const [items, analytics] = await Promise.all([
    listStudioManagedContent("comparison"),
    getContentAnalyticsByType("comparison"),
  ]);

  const moduleItems: AdminModuleItem[] = items.map((item) => {
    const stats = analytics.get(item.slug);

    return {
      id: item.slug,
      title: item.title,
      href: `/admin/comparisons/${item.slug}`,
      publicPath: `/comparisons/${item.slug}`,
      description: item.decisionSummary || item.excerpt,
      draft: item.draft,
      primaryMeta: item.competitorName ? `Target: ${item.competitorName}` : item.category,
      publishedAt: item.publishedAt,
      readingTime: item.readingTime,
      views: stats?.views ?? 0,
      clicks: stats?.clicks ?? 0,
      focusKeyword: item.focusKeyword,
      secondaryAction: <DeleteContentButton compact type="comparison" slug={item.slug} title={item.title} redirectTo="/admin/comparisons" />,
    };
  });

  return (
    <AdminModulePage
      eyebrow="Decision content"
      title="Comparisons"
      description="Create neutral versus and alternative pages that help Shopify merchants compare options clearly."
      createHref="/admin/comparisons/new"
      createLabel="Create comparison"
      queueLabel="Comparison queue"
      queueHint="Keep claims fair, current, and buyer-focused."
      emptyTitle="No comparisons yet"
      emptyDescription="Start with a verified, buyer-focused comparison rather than an unsupported alternative page."
      emptyAction="Create comparison"
      mixLabel="Targets"
      items={moduleItems}
      Icon={Scale}
      accentClassName="border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50"
      totalLabel="Total comparisons"
    />
  );
}
