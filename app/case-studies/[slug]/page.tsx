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
import { formatCaseStudyDate, getCaseStudyBySlug } from "@/lib/case-studies";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return { robots: { index: false, follow: false }, title: "Case study not found" };

  const title = compactPageTitle(caseStudy.seoTitle ?? caseStudy.title);
  const description = caseStudy.seoDescription ?? caseStudy.excerpt;
  const path = `/case-studies/${caseStudy.slug}`;
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
      publishedTime: caseStudy.publishedAt,
      modifiedTime: caseStudy.updatedAt ?? caseStudy.publishedAt,
      authors: [caseStudy.author],
      tags: caseStudy.tags,
      images: caseStudy.coverImage
        ? [{ url: caseStudy.coverImage, alt: caseStudy.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: caseStudy.coverImage ? [caseStudy.coverImage] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const tags = Array.isArray(caseStudy.tags) ? caseStudy.tags : [];
  const pageUrl = new URL(`/case-studies/${caseStudy.slug}`, siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.seoDescription ?? caseStudy.excerpt,
    datePublished: caseStudy.publishedAt,
    dateModified: caseStudy.updatedAt ?? caseStudy.publishedAt,
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: caseStudy.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    about: [{ "@type": "Organization", name: caseStudy.customerName }],
    image: caseStudy.coverImage ? [new URL(caseStudy.coverImage, siteConfig.url).toString()] : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <ContentAnalyticsTracker contentType="case-study" slug={caseStudy.slug} path={`/case-studies/${caseStudy.slug}`} />

      <Section data-content-analytics-root="true" spacing="none" className="border-b border-border/80 pb-8 pt-10 sm:pb-10 sm:pt-14">
        <Container className="max-w-6xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to case studies
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {caseStudy.customerName || caseStudy.category}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {caseStudy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {caseStudy.excerpt}
              </p>
            </div>

            <div className="grid gap-3 border-l-0 border-border text-sm text-muted-foreground sm:grid-cols-3 lg:block lg:border-l lg:pl-6">
              <div className="flex items-center gap-2 lg:mb-3">
                <UserRound aria-hidden="true" className="size-4 text-primary" />
                <span>{caseStudy.author}</span>
              </div>
              <div className="flex items-center gap-2 lg:mb-3">
                <CalendarDays aria-hidden="true" className="size-4 text-primary" />
                <time dateTime={caseStudy.publishedAt}>
                  {formatCaseStudyDate(caseStudy.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 aria-hidden="true" className="size-4 text-primary" />
                <span>{caseStudy.readingTime} min read</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section data-content-analytics-root="true" spacing="none" className="py-8 sm:py-10">
        <Container className="max-w-6xl">
          {caseStudy.coverImage ? (
            <div className="mb-8 overflow-hidden rounded-[10px] border border-border bg-surface">
              <img
                src={caseStudy.coverImage}
                alt={caseStudy.title}
                className="aspect-[16/7] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,44rem)_18rem] lg:justify-between">
            <article className="min-w-0">
              <div className={styles.prose}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{caseStudy.content}</ReactMarkdown>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-sm font-semibold text-foreground">Case study details</p>
                <dl className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  {caseStudy.customerName ? (
                    <div>
                      <dt className="font-medium text-foreground">Customer</dt>
                      <dd className="mt-1">{caseStudy.customerName}</dd>
                    </div>
                  ) : null}
                  {caseStudy.industry ? (
                    <div>
                      <dt className="font-medium text-foreground">Industry</dt>
                      <dd className="mt-1">{caseStudy.industry}</dd>
                    </div>
                  ) : null}
                  {caseStudy.outcomeSummary ? (
                    <div>
                      <dt className="font-medium text-foreground">Outcome summary</dt>
                      <dd className="mt-1 leading-6">{caseStudy.outcomeSummary}</dd>
                    </div>
                  ) : null}
                  {caseStudy.updatedAt && caseStudy.updatedAt !== caseStudy.publishedAt ? (
                    <div>
                      <dt className="font-medium text-foreground">Updated</dt>
                      <dd className="mt-1">{formatCaseStudyDate(caseStudy.updatedAt)}</dd>
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
                  href="/case-studies"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                >
                  More stories
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


