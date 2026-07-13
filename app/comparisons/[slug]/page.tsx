import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Tag, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ContentAnalyticsTracker } from "@/components/content-analytics-tracker";
import styles from "@/components/blog/article-content.module.css";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { canonicalUrl, compactPageTitle } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { formatComparisonDate, getAllComparisons, getComparisonBySlug } from "@/lib/comparisons";

type ComparisonPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const comparisons = await getAllComparisons();
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) {
    return { robots: { index: false, follow: false }, title: "Comparison not found" };
  }

  const title = compactPageTitle(comparison.seoTitle ?? comparison.title);
  const description = comparison.seoDescription ?? comparison.excerpt;
  const path = `/comparisons/${comparison.slug}`;
  const canonical = canonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      publishedTime: comparison.publishedAt,
      modifiedTime: comparison.updatedAt ?? comparison.publishedAt,
      authors: [comparison.author],
      tags: comparison.tags,
      images: comparison.coverImage
        ? [{ url: comparison.coverImage, alt: comparison.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: comparison.coverImage ? [comparison.coverImage] : undefined,
    },
  };
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) notFound();

  const tags = Array.isArray(comparison.tags) ? comparison.tags : [];
  const pageUrl = new URL(`/comparisons/${comparison.slug}`, siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.seoDescription ?? comparison.excerpt,
    datePublished: comparison.publishedAt,
    dateModified: comparison.updatedAt ?? comparison.publishedAt,
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: comparison.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    about: [
      { "@type": "Thing", name: siteConfig.name },
      { "@type": "Thing", name: comparison.competitorName },
    ],
    image: comparison.coverImage
      ? [new URL(comparison.coverImage, siteConfig.url).toString()]
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <ContentAnalyticsTracker contentType="comparison" slug={comparison.slug} path={`/comparisons/${comparison.slug}`} />

      <Section data-content-analytics-root="true" spacing="none" className="border-b border-border/80 pb-8 pt-10 sm:pb-10 sm:pt-14">
        <Container className="max-w-6xl">
          <Link
            href="/comparisons"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to comparisons
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {comparison.category}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {comparison.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {comparison.excerpt}
              </p>
            </div>

            <div className="grid gap-3 border-l-0 border-border text-sm text-muted-foreground sm:grid-cols-3 lg:block lg:border-l lg:pl-6">
              <div className="flex items-center gap-2 lg:mb-3">
                <UserRound aria-hidden="true" className="size-4 text-primary" />
                <span>{comparison.author}</span>
              </div>
              <div className="flex items-center gap-2 lg:mb-3">
                <CalendarDays aria-hidden="true" className="size-4 text-primary" />
                <time dateTime={comparison.publishedAt}>
                  {formatComparisonDate(comparison.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 aria-hidden="true" className="size-4 text-primary" />
                <span>{comparison.readingTime} min read</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section data-content-analytics-root="true" spacing="none" className="py-8 sm:py-10">
        <Container className="max-w-6xl">
          {comparison.coverImage ? (
            <div className="mb-8 overflow-hidden rounded-[10px] border border-border bg-surface">
              <img
                src={comparison.coverImage}
                alt={comparison.title}
                className="aspect-[16/7] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,44rem)_18rem] lg:justify-between">
            <article className="min-w-0">
              <div className={styles.prose}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{comparison.content}</ReactMarkdown>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-sm font-semibold text-foreground">Comparison details</p>
                <dl className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  {comparison.competitorName ? (
                    <div>
                      <dt className="font-medium text-foreground">Compared with</dt>
                      <dd className="mt-1">{comparison.competitorName}</dd>
                    </div>
                  ) : null}
                  {comparison.decisionSummary ? (
                    <div>
                      <dt className="font-medium text-foreground">Decision summary</dt>
                      <dd className="mt-1 leading-6">{comparison.decisionSummary}</dd>
                    </div>
                  ) : null}
                  {comparison.updatedAt && comparison.updatedAt !== comparison.publishedAt ? (
                    <div>
                      <dt className="font-medium text-foreground">Updated</dt>
                      <dd className="mt-1">{formatComparisonDate(comparison.updatedAt)}</dd>
                    </div>
                  ) : null}
                </dl>

                {tags.length > 0 ? (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Tag aria-hidden="true" className="size-4 text-primary" />
                      Topics
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <Link
                  href="/comparisons"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                >
                  More Shopify comparisons
                  <ArrowLeft aria-hidden="true" className="size-4 rotate-180" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
