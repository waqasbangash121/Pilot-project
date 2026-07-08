import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Clock3,
  FileText,
  ListChecks,
  Scale,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { formatToolDate, getAllTools } from "@/lib/tools";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "Tools",
  description:
    "Use Hyper tools to evaluate search quality, support workflows, and merchandising opportunities.",
  path: "/tools",
});

const toolWorkflows = [
  {
    title: "Audit faster",
    description: "Spot search, discovery, and conversion gaps without rebuilding your process or adding another heavy workflow.",
    Icon: BadgeCheck,
  },
  {
    title: "Prioritize work",
    description: "Turn observations into clearer next steps for merchandising, support, and CX teams.",
    Icon: ListChecks,
  },
  {
    title: "Share decisions",
    description: "Use practical outputs that make internal reviews, planning conversations, and follow-up decisions easier to align.",
    Icon: FileText,
  },
];

const relatedLinks = [
  {
    href: "/blog",
    label: "Read the blog",
    description: "Explore practical perspectives behind better discovery and AI commerce work.",
    Icon: BookOpenText,
  },
  {
    href: "/comparisons",
    label: "Browse comparisons",
    description: "Evaluate Shopify solutions with clearer criteria before choosing your next tool.",
    Icon: Scale,
  },
];

export default async function ToolsPage() {
  const tools = await getAllTools();

  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Practical utilities
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Hyper tools
                </p>
                <h1 className="mt-3 max-w-4xl type-display">
                  Useful tools for sharper ecommerce decisions.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Access focused utilities for audit workflows, prioritization, support planning,
                  and storefront optimization without adding complexity to the work.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <FileText aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">{tools.length}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  published {tools.length === 1 ? "tool" : "tools"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Built for teams that need lightweight ways to inspect, prioritize, and act.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-6 sm:pb-8">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {toolWorkflows.map(({ title, description, Icon }) => (
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
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">How to use the tools</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Use lightweight utilities to make better ecommerce decisions.</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Tools work best when they support a focused task: auditing search quality, organizing support issues, reviewing merchandising opportunities, or prioritizing conversion improvements. Start with one workflow, capture the findings, and use the output to decide what deserves action next.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <p className="rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">Use audit tools to identify gaps in search, filtering, product discovery, or customer experience before changing your setup.</p>
                <p className="rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">Use planning tools to turn scattered observations into a shortlist of tasks your team can compare and prioritize.</p>
                <p className="rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">Use checklist-style tools before launches, app reviews, content updates, or theme changes that affect shoppers.</p>
                <p className="rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">Pair tool outputs with blog context, resources, and comparisons so each recommendation has a clear reason behind it.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
<Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Tool library
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Pick the utility that fits the task.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">
              Each tool is shaped around a concrete workflow, from audits and checklists to
              lightweight planning support.
            </p>
          </div>

          {tools.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => {
                const displayDate = tool.updatedAt ?? tool.publishedAt;
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_54px_-38px_hsl(var(--shadow)/0.78)]"
                  >
                    {tool.coverImage ? (
                      <div className="-mx-6 -mt-6 mb-6 overflow-hidden border-b border-border bg-muted">
                        <img
                          src={tool.coverImage}
                          alt={tool.title}
                          className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted/60 text-primary">
                        <FileText aria-hidden="true" className="size-5" />
                      </span>
                      <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary">
                        {tool.toolType}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {tool.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {tool.useCase || tool.excerpt} Use it to organize the task, capture practical findings, and decide what your ecommerce team should inspect or improve next.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {tool.tags.slice(0, 3).map((tag) => (
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
                        {tool.readingTime} min read
                      </span>
                      <time
                        dateTime={displayDate}
                        className="text-sm font-medium text-muted-foreground"
                      >
                        {formatToolDate(displayDate)}
                      </time>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      Open tool
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <FileText aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Tools are being prepared.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Audits, calculators, checklists, and practical utilities will appear here soon, with a focus on clear outputs that help teams inspect, prioritize, and act.
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
                  Keep improving
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Pair tools with context and evaluation.
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


