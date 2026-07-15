import { FileText } from "lucide-react";

import { AdminModulePage, type AdminModuleItem } from "@/components/admin/admin-module-page";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { getContentAnalyticsByType } from "@/lib/content-analytics";
import { listStudioManagedContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function ResourceDashboardPage() {
  const [items, analytics] = await Promise.all([
    listStudioManagedContent("resource"),
    getContentAnalyticsByType("resource"),
  ]);

  const moduleItems: AdminModuleItem[] = items.map((item) => {
    const stats = analytics.get(item.slug);

    return {
      id: item.slug,
      title: item.title,
      href: `/admin/resources/${item.slug}`,
      publicPath: `/resources/${item.slug}`,
      description: item.excerpt,
      draft: item.draft,
      primaryMeta: item.resourceType || item.category,
      publishedAt: item.publishedAt,
      readingTime: item.readingTime,
      views: stats?.views ?? 0,
      clicks: stats?.clicks ?? 0,
      focusKeyword: item.focusKeyword,
      secondaryAction: <DeleteContentButton compact type="resource" slug={item.slug} title={item.title} redirectTo="/admin/resources" />,
    };
  });

  return (
    <AdminModulePage
      eyebrow="Practical content"
      title="Resources"
      description="Publish actionable guides, playbooks, checklists, templates, and documentation for Shopify teams."
      createHref="/admin/resources/new"
      createLabel="Create resource"
      queueLabel="Resource queue"
      queueHint="Keep outcomes clear and the next step obvious."
      emptyTitle="No resources yet"
      emptyDescription="Create a practical resource with a clear audience, format, and implementation outcome."
      emptyAction="Create resource"
      mixLabel="Formats"
      items={moduleItems}
      Icon={FileText}
      accentClassName="border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50"
      totalLabel="Total resources"
    />
  );
}
