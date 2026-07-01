import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "@/components/blog/article-content.module.css";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { formatToolDate, getToolBySlug } from "@/lib/tools";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return { robots: { index: false, follow: false }, title: "Tool not found" };

  const title = tool.seoTitle ?? tool.title;
  const description = tool.seoDescription ?? tool.excerpt;
  const path = `/tools/${tool.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: new URL(path, siteConfig.url).toString(),
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
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Section className="pb-12 pt-20 sm:pt-28">
        <Container className="max-w-4xl">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to tools
          </Link>
          <div className="mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">{tool.toolType}</p>
            <h1 className="mt-4 type-display">{tool.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{tool.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>By {tool.author}</span><span aria-hidden="true">&middot;</span>
              <time dateTime={tool.publishedAt}>{formatToolDate(tool.publishedAt)}</time><span aria-hidden="true">&middot;</span>
              <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4" />{tool.readingTime} min read</span>
            </div>
          </div>
          <aside className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="rounded-xl border border-border bg-background p-2 text-primary"><FileText aria-hidden="true" className="size-5" /></span>
                <div><p className="text-sm font-semibold">Use case</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{tool.useCase}</p></div>
              </div>
              {tool.toolUrl ? <a href={tool.toolUrl} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5">Launch<ArrowRight aria-hidden="true" className="size-4" /></a> : null}
            </div>
          </aside>
          {tool.tags.length ? <div className="mt-6 flex flex-wrap gap-2">{tool.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">{tag}</span>)}</div> : null}
        </Container>
      </Section>
      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-4xl">
          <article className="rounded-[10px] border border-border bg-surface p-6 sm:p-10 lg:p-12">
            <div className={styles.prose}><ReactMarkdown remarkPlugins={[remarkGfm]}>{tool.content}</ReactMarkdown></div>
          </article>
        </Container>
      </Section>
    </>
  );
}
