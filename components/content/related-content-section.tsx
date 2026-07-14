import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export type RelatedContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  readingTime: number;
  coverImage?: string;
};

type RelatedContentSectionProps = {
  items: RelatedContentItem[];
  basePath: string;
  heading: string;
  viewAllLabel: string;
};

export function RelatedContentSection({
  items,
  basePath,
  heading,
  viewAllLabel,
}: RelatedContentSectionProps) {
  if (items.length === 0) return null;

  return (
    <Section
      data-content-analytics-root="true"
      spacing="none"
      className="border-t border-border bg-surface py-12 sm:py-16"
    >
      <Container className="max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Continue reading
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-foreground sm:text-4xl">
              {heading}
            </h2>
          </div>
          <Link
            href={basePath}
            className="inline-flex min-h-10 items-center gap-2 self-start text-sm font-bold text-foreground transition-colors hover:text-primary focus-visible:rounded-sm sm:self-auto"
          >
            {viewAllLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-7 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.slug} className="group min-w-0">
              {item.coverImage ? (
                <Link
                  href={`${basePath}/${item.slug}`}
                  className="block overflow-hidden rounded-[8px] border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                </Link>
              ) : null}
              <div className="pt-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {item.category ? (
                    <>
                      <span className="text-primary">{item.category}</span>
                      <span aria-hidden="true">/</span>
                    </>
                  ) : null}
                  <span>{item.readingTime} min</span>
                </div>
                <h3 className="mt-3 text-xl font-black leading-7 tracking-normal text-foreground">
                  <Link
                    href={`${basePath}/${item.slug}`}
                    className="transition-colors hover:text-primary focus-visible:rounded-sm"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
