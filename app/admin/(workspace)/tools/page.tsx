import { SearchCheck } from "lucide-react";

import { AdminModulePage, type AdminModuleItem } from "@/components/admin/admin-module-page";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { getContentAnalyticsByType } from "@/lib/content-analytics";
import { listStudioManagedContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function ToolsDashboardPage() {
  const [items, analytics] = await Promise.all([
    listStudioManagedContent("tool"),
    getContentAnalyticsByType("tool"),
  ]);

  const moduleItems: AdminModuleItem[] = items.map((item) => {
    const stats = analytics.get(item.slug);

    return {
      id: item.slug,
      title: item.title,
      href: `/admin/tools/${item.slug}`,
      publicPath: `/tools/${item.slug}`,
      description: item.useCase || item.excerpt,
      draft: item.draft,
      primaryMeta: item.toolType || item.category,
      publishedAt: item.publishedAt,
      readingTime: item.readingTime,
      views: stats?.views ?? 0,
      clicks: stats?.clicks ?? 0,
      focusKeyword: item.focusKeyword,
      secondaryAction: <DeleteContentButton compact type="tool" slug={item.slug} title={item.title} redirectTo="/admin/tools" />,
    };
  });

  return (
    <AdminModulePage
      eyebrow="Utility content"
      title="Tools"
      description="Publish audits, calculators, checklists, worksheets, and utility pages for Shopify teams."
      createHref="/admin/tools/new"
      createLabel="Create tool"
      queueLabel="Tool queue"
      queueHint="Keep use cases clear and instructions actionable."
      emptyTitle="No tools yet"
      emptyDescription="Create a practical tool page with a clear use case, format, and next action."
      emptyAction="Create tool"
      mixLabel="Tool types"
      items={moduleItems}
      Icon={SearchCheck}
      accentClassName="border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50"
      totalLabel="Total tools"
    />
  );
}
