import Link from "next/link";
import { ArrowRight, Clock3, FileText, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { formatToolDate, getAllTools } from "@/lib/tools";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Tools",
  description:
    "Use Hyper tools to evaluate search quality, support workflows, and merchandising opportunities.",
  path: "/tools",
});

export default async function ToolsPage() {
  const tools = await getAllTools();

  return (
    <>
      <Section spacing="none" className="pb-8 pt-12 sm:pt-16">
        <Container className="max-w-6xl">
          <div className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                Practical utilities
              </span>
              <h1 className="mt-5 max-w-4xl type-display">Tools</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Access practical utilities for audit workflows, prioritization, and storefront
                optimization.
              </p>
            </div>
            <aside className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <FileText aria-hidden="true" className="size-5 text-primary" />
              <p className="mt-4 text-4xl font-semibold tracking-tight">{tools.length}</p>
              <p className="mt-1 text-sm font-semibold">
                published {tools.length === 1 ? "tool" : "tools"}
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-16">
        <Container className="max-w-6xl">
          {tools.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => {
                const displayDate = tool.updatedAt ?? tool.publishedAt;
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_54px_-38px_hsl(var(--shadow)/0.78)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted/60 text-primary">
                        <FileText aria-hidden="true" className="size-5" />
                      </span>
                      <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary">
                        {tool.toolType}
                      </span>
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {tool.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {tool.useCase || tool.excerpt}
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
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
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
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-primary">
                      Open tool
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </span>
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
                Tools are being prepared.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Audits, calculators, checklists, and practical utilities will appear here soon.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
