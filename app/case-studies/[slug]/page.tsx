import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "@/components/blog/article-content.module.css";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { formatCaseStudyDate, getCaseStudyBySlug } from "@/lib/case-studies";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return { robots: { index: false, follow: false }, title: "Case study not found" };

  const title = caseStudy.seoTitle ?? caseStudy.title;
  const description = caseStudy.seoDescription ?? caseStudy.excerpt;
  const path = `/case-studies/${caseStudy.slug}`;

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
      publishedTime: caseStudy.publishedAt,
      modifiedTime: caseStudy.updatedAt ?? caseStudy.publishedAt,
      authors: [caseStudy.author],
      tags: caseStudy.tags,
      images: caseStudy.coverImage ? [{ url: caseStudy.coverImage, alt: caseStudy.title }] : undefined,
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
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Section className="pb-12 pt-20 sm:pt-28">
        <Container className="max-w-4xl">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to case studies
          </Link>
          <div className="mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">{caseStudy.customerName || caseStudy.category}</p>
            <h1 className="mt-4 type-display">{caseStudy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{caseStudy.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>By {caseStudy.author}</span><span aria-hidden="true">&middot;</span>
              <time dateTime={caseStudy.publishedAt}>{formatCaseStudyDate(caseStudy.publishedAt)}</time><span aria-hidden="true">&middot;</span>
              <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4" />{caseStudy.readingTime} min read</span>
            </div>
          </div>
          <aside className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-xl border border-border bg-background p-2 text-primary"><FileText aria-hidden="true" className="size-5" /></span>
              <div><p className="text-sm font-semibold">Outcome summary</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{caseStudy.outcomeSummary}</p></div>
            </div>
          </aside>
          {caseStudy.tags.length ? <div className="mt-6 flex flex-wrap gap-2">{caseStudy.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">{tag}</span>)}</div> : null}
        </Container>
      </Section>
      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-4xl">
          <article className="rounded-[10px] border border-border bg-surface p-6 sm:p-10 lg:p-12">
            <div className={styles.prose}><ReactMarkdown remarkPlugins={[remarkGfm]}>{caseStudy.content}</ReactMarkdown></div>
          </article>
        </Container>
      </Section>
    </>
  );
}

