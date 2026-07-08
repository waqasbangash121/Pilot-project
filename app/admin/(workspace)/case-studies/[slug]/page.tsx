import { notFound } from "next/navigation";

import { ContentAnalyticsPanel } from "@/components/admin/content-analytics-panel";
import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { ManagedContentEditorForm } from "@/components/managed-content-editor-form";
import { getContentAnalyticsForContent } from "@/lib/content-analytics";
import { getStudioManagedContentBySlug } from "@/lib/content-store";

type CaseStudyEditPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CaseStudyEditPage({ params }: CaseStudyEditPageProps) {
  const { slug } = await params;
  const caseStudy = await getStudioManagedContentBySlug("case-study", slug);
  if (!caseStudy) notFound();

  const analytics = await getContentAnalyticsForContent("case-study", slug);

  return (
    <div className="space-y-6">
      <ManagedContentEditorForm type="case-study" initialItem={caseStudy} originalSlug={slug} />
      <ContentAnalyticsPanel stats={analytics} title="Case study analytics" />
      <section className="rounded-lg border border-rose-200 bg-rose-50/70 p-5 dark:border-rose-400/25 dark:bg-rose-400/10">
        <h2 className="text-lg font-semibold text-rose-950 dark:text-rose-50">Danger zone</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-900/90 dark:text-rose-100/85">
          Remove this case study from the database and the public case study directory. Restore it only from a database backup.
        </p>
        <div className="mt-4 max-w-xs">
          <DeleteContentButton type="case-study" slug={slug} title={caseStudy.title} redirectTo="/admin/case-studies" />
        </div>
      </section>
    </div>
  );
}

