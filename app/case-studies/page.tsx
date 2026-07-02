import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Clock3,
  FileText,
  Scale,
  Sparkles,
  UsersRound,
} from "lucide-react";

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

const outcomeSignals = [
  {
    title: "Real context",
    description: "Understand the customer, storefront challenge, and implementation setting.",
    Icon: UsersRound,
  },
  {
    title: "Clear outcomes",
    description: "See the practical result or operational lesson behind each customer story.",
    Icon: BadgeCheck,
  },
  {
    title: "Useful patterns",
    description: "Pull out ideas your team can adapt for discovery, support, and conversion work.",
    Icon: FileText,
  },
];

const relatedLinks = [
  {
    href: "/blog",
    label: "Read the blog",
    description: "Explore the thinking behind better AI commerce and storefront experiences.",
    Icon: BookOpenText,
  },
  {
    href: "/comparisons",
    label: "Browse comparisons",
    description: "Evaluate Shopify solutions with clear trade-offs and practical decision criteria.",
    Icon: Scale,
  },
];

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -left-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Customer outcomes
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Hyper case studies
                </p>
                <h1 className="mt-3 max-w-4xl type-display">
                  Real implementation stories from ecommerce teams.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Explore customer stories, implementation lessons, and measurable outcomes from
                  brands using Hyper to improve discovery, support, and conversion.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <FileText aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">{caseStudies.length}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  published {caseStudies.length === 1 ? "story" : "stories"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Written to help teams connect product improvements with practical results.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-6 sm:pb-8">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {outcomeSignals.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Case study library
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                See how teams put Hyper to work.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">
              Each story highlights the customer context, the work performed, and the outcome or
              lesson worth carrying forward.
            </p>
          </div>

          {caseStudies.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {caseStudies.map((caseStudy) => {
                const displayDate = caseStudy.updatedAt ?? caseStudy.publishedAt;
                return (
                  <Link
                    key={caseStudy.slug}
                    href={`/case-studies/${caseStudy.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_54px_-38px_hsl(var(--shadow)/0.78)] sm:p-7"
                  >
                    {caseStudy.coverImage ? (
                      <div className="-mx-6 -mt-6 mb-6 overflow-hidden border-b border-border bg-muted sm:-mx-7 sm:-mt-7">
                        <img
                          src={caseStudy.coverImage}
                          alt={caseStudy.title}
                          className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted/60 text-primary">
                        <UsersRound aria-hidden="true" className="size-5" />
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
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {caseStudy.title}
                    </h3>
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

                    <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock3 aria-hidden="true" className="size-4" />
                        {caseStudy.readingTime} min read
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        Read story
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <UsersRound aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Case studies are being prepared.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Customer implementation stories and verified outcomes will appear here soon.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Keep exploring
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Turn customer lessons into your next plan.
                </h2>
              </div>
              <BadgeCheck aria-hidden="true" className="size-6 text-primary" />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {relatedLinks.map(({ href, label, description, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_42px_-30px_hsl(var(--shadow)/0.75)]"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    Continue exploring
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}