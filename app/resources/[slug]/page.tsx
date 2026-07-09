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
import { formatResourceDate, getResourceBySlug } from "@/lib/resources";
import { toJsonLd } from "@/lib/schema";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) {
    return { robots: { index: false, follow: false }, title: "Resource not found" };
  }

  const title = compactPageTitle(resource.seoTitle ?? resource.title);
  const description = resource.seoDescription ?? resource.excerpt;
  const path = `/resources/${resource.slug}`;
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
      publishedTime: resource.publishedAt,
      modifiedTime: resource.updatedAt ?? resource.publishedAt,
      authors: [resource.author],
      tags: resource.tags,
      images: resource.coverImage ? [{ url: resource.coverImage, alt: resource.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resource.coverImage ? [resource.coverImage] : undefined,
    },
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  const tags = Array.isArray(resource.tags) ? resource.tags : [];
  const pageUrl = new URL(`/resources/${resource.slug}`, siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    "@id": `${pageUrl}#resource`,
    headline: resource.title,
    name: resource.title,
    description: resource.seoDescription ?? resource.excerpt,
    datePublished: resource.publishedAt,
    dateModified: resource.updatedAt ?? resource.publishedAt,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    author: { "@type": "Organization", name: resource.author || siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    learningResourceType: resource.resourceType || "Guide",
    audience: resource.audience ? { "@type": "Audience", audienceType: resource.audience } : undefined,
    about: tags,
    keywords: tags.join(", "),
    timeRequired: `PT${resource.readingTime}M`,
    image: resource.coverImage ? [new URL(resource.coverImage, siteConfig.url).toString()] : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(schema) }}
      />

      <ContentAnalyticsTracker contentType="resource" slug={resource.slug} path={`/resources/${resource.slug}`} />

      <Section data-content-analytics-root="true" spacing="none" className="border-b border-border/80 pb-8 pt-10 sm:pb-10 sm:pt-14">
        <Container className="max-w-6xl">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to resources
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {resource.resourceType}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {resource.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {resource.excerpt}
              </p>
            </div>

            <div className="grid gap-3 border-l-0 border-border text-sm text-muted-foreground sm:grid-cols-3 lg:block lg:border-l lg:pl-6">
              <div className="flex items-center gap-2 lg:mb-3">
                <UserRound aria-hidden="true" className="size-4 text-primary" />
                <span>{resource.author}</span>
              </div>
              <div className="flex items-center gap-2 lg:mb-3">
                <CalendarDays aria-hidden="true" className="size-4 text-primary" />
                <time dateTime={resource.publishedAt}>{formatResourceDate(resource.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 aria-hidden="true" className="size-4 text-primary" />
                <span>{resource.readingTime} min read</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section data-content-analytics-root="true" spacing="none" className="py-8 sm:py-10">
        <Container className="max-w-6xl">
          {resource.coverImage ? (
            <div className="mb-8 overflow-hidden rounded-[10px] border border-border bg-surface">
              <img
                src={resource.coverImage}
                alt={resource.title}
                className="aspect-[16/7] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,44rem)_18rem] lg:justify-between">
            <article className="min-w-0">
              <div className={styles.prose}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{resource.content}</ReactMarkdown>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-sm font-semibold text-foreground">Resource details</p>
                <dl className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  <div>
                    <dt className="font-medium text-foreground">Format</dt>
                    <dd className="mt-1">{resource.resourceType}</dd>
                  </div>
                  {resource.audience ? (
                    <div>
                      <dt className="font-medium text-foreground">Built for</dt>
                      <dd className="mt-1 leading-6">{resource.audience}</dd>
                    </div>
                  ) : null}
                  {resource.updatedAt && resource.updatedAt !== resource.publishedAt ? (
                    <div>
                      <dt className="font-medium text-foreground">Updated</dt>
                      <dd className="mt-1">{formatResourceDate(resource.updatedAt)}</dd>
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
                  href="/resources"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                >
                  More resources
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


