import Link from "next/link";
import { ArrowRight, Clock3, FileText, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { formatCaseStudyDate, getAllCaseStudies } from "@/lib/case-studies";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Case Studies",
  description:
    "Explore measurable outcomes from brands using Hyper to improve discovery and conversion.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <Section spacing="none" className="pb-8 pt-12 sm:pt-16">
        <Container className="max-w-6xl">
          <div className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                Customer outcomes
              </span>
              <h1 className="mt-5 max-w-4xl type-display">Case Studies</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                See real-world implementation stories and practical outcomes across Hyper products.
              </p>
            </div>
            <aside className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <FileText aria-hidden="true" className="size-5 text-primary" />
              <p className="mt-4 text-4xl font-semibold tracking-tight">{caseStudies.length}</p>
              <p className="mt-1 text-sm font-semibold">
                published {caseStudies.length === 1 ? "story" : "stories"}
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-16">
        <Container className="max-w-6xl">
          {caseStudies.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {caseStudies.map((caseStudy) => {
                const displayDate = caseStudy.updatedAt ?? caseStudy.publishedAt;
                return (
                  <Link
                    key={caseStudy.slug}
                    href={`/case-studies/${caseStudy.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_54px_-38px_hsl(var(--shadow)/0.78)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted/60 text-primary">
                        <FileText aria-hidden="true" className="size-5" />
                      </span>
                      <time
                        dateTime={displayDate}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {formatCaseStudyDate(displayDate)}
                      </time>
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {caseStudy.customerName || caseStudy.category}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {caseStudy.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {caseStudy.outcomeSummary || caseStudy.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {[caseStudy.industry, ...caseStudy.tags.slice(0, 2)]
                        .filter(Boolean)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock3 aria-hidden="true" className="size-4" />
                        {caseStudy.readingTime} min read
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-primary">
                        Read story
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <FileText aria-hidden="true" className="size-6" />
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                Case studies are being prepared.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Customer implementation stories and verified outcomes will appear here soon.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
