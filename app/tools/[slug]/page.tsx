import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Tag,
  UserRound,
} from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ContentAnalyticsTracker } from "@/components/content-analytics-tracker";
import styles from "@/components/blog/article-content.module.css";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { canonicalUrl, compactPageTitle } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { formatToolDate, getAllTools, getToolBySlug } from "@/lib/tools";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const tools = await getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return { robots: { index: false, follow: false }, title: "Tool not found" };

  const title = compactPageTitle(tool.seoTitle ?? tool.title);
  const description = tool.seoDescription ?? tool.excerpt;
  const path = `/tools/${tool.slug}`;
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
      publishedTime: tool.publishedAt,
      modifiedTime: tool.updatedAt ?? tool.publishedAt,
      authors: [tool.author],
      tags: tool.tags,
      images: tool.coverImage ? [{ url: tool.coverImage, alt: tool.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: tool.coverImage ? [tool.coverImage] : undefined,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const tags = Array.isArray(tool.tags) ? tool.tags : [];
  const pageUrl = new URL(`/tools/${tool.slug}`, siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tool.title,
    description: tool.seoDescription ?? tool.excerpt,
    datePublished: tool.publishedAt,
    dateModified: tool.updatedAt ?? tool.publishedAt,
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: tool.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    about: [{ "@type": "Thing", name: tool.toolType }],
    image: tool.coverImage ? [new URL(tool.coverImage, siteConfig.url).toString()] : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <ContentAnalyticsTracker contentType="tool" slug={tool.slug} path={`/tools/${tool.slug}`} />

      <Section data-content-analytics-root="true" spacing="none" className="border-b border-border/80 pb-8 pt-10 sm:pb-10 sm:pt-14">
        <Container className="max-w-6xl">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to tools
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {tool.toolType}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {tool.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {tool.excerpt}
              </p>
            </div>

            <div className="grid gap-3 border-l-0 border-border text-sm text-muted-foreground sm:grid-cols-3 lg:block lg:border-l lg:pl-6">
              <div className="flex items-center gap-2 lg:mb-3">
                <UserRound aria-hidden="true" className="size-4 text-primary" />
                <span>{tool.author}</span>
              </div>
              <div className="flex items-center gap-2 lg:mb-3">
                <CalendarDays aria-hidden="true" className="size-4 text-primary" />
                <time dateTime={tool.publishedAt}>{formatToolDate(tool.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 aria-hidden="true" className="size-4 text-primary" />
                <span>{tool.readingTime} min read</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section data-content-analytics-root="true" spacing="none" className="py-8 sm:py-10">
        <Container className="max-w-6xl">
          {tool.coverImage ? (
            <div className="mb-8 overflow-hidden rounded-[10px] border border-border bg-surface">
              <img
                src={tool.coverImage}
                alt={tool.title}
                className="aspect-[16/7] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,44rem)_18rem] lg:justify-between">
            <article className="min-w-0">
              <div className={styles.prose}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{tool.content}</ReactMarkdown>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-sm font-semibold text-foreground">Tool details</p>
                <dl className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  <div>
                    <dt className="font-medium text-foreground">Type</dt>
                    <dd className="mt-1">{tool.toolType}</dd>
                  </div>
                  {tool.useCase ? (
                    <div>
                      <dt className="font-medium text-foreground">Use case</dt>
                      <dd className="mt-1 leading-6">{tool.useCase}</dd>
                    </div>
                  ) : null}
                  {tool.updatedAt && tool.updatedAt !== tool.publishedAt ? (
                    <div>
                      <dt className="font-medium text-foreground">Updated</dt>
                      <dd className="mt-1">{formatToolDate(tool.updatedAt)}</dd>
                    </div>
                  ) : null}
                </dl>

                {tool.toolUrl ? (
                  <a
                    href={tool.toolUrl}
                    className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
                  >
                    Launch tool
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                ) : null}

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
                  href="/tools"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                >
                  More tools
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
