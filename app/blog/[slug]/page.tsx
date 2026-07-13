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
import { formatBlogDate, getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = compactPageTitle(post.seoTitle || post.title);
  const description =
    post.seoDescription ||
    post.excerpt ||
    "Read NiagaraT Hyper Apps insights for Shopify merchants on product discovery, customer support, shoppable videos, and ecommerce conversion.";

  const path = `/blog/${post.slug}`;
  const canonical = canonicalUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      tags: Array.isArray(post.tags) ? post.tags : [],
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tags = Array.isArray(post.tags) ? post.tags : [];

  const articleUrl = new URL(`/blog/${post.slug}`, siteConfig.url).toString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description:
      post.seoDescription ||
      post.excerpt ||
      "Read NiagaraT Hyper Apps insights for Shopify merchants on product discovery, customer support, shoppable videos, and ecommerce conversion.",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      name: post.author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: post.coverImage ? [new URL(post.coverImage, siteConfig.url).toString()] : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <ContentAnalyticsTracker contentType="blog" slug={post.slug} path={`/blog/${post.slug}`} />

      <Section data-content-analytics-root="true" spacing="none" className="border-b border-border/80 pb-8 pt-10 sm:pb-10 sm:pt-14">
        <Container className="max-w-6xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to the blog
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="max-w-3xl">
              {post.category ? (
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {post.category}
                </p>
              ) : null}

              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <div className="grid gap-3 border-l-0 border-border text-sm text-muted-foreground sm:grid-cols-3 lg:block lg:border-l lg:pl-6">
              {post.author ? (
                <div className="flex items-center gap-2 lg:mb-3">
                  <UserRound aria-hidden="true" className="size-4 text-primary" />
                  <span>{post.author}</span>
                </div>
              ) : null}
              <div className="flex items-center gap-2 lg:mb-3">
                <CalendarDays aria-hidden="true" className="size-4 text-primary" />
                <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
              </div>
              {post.readingTime ? (
                <div className="flex items-center gap-2">
                  <Clock3 aria-hidden="true" className="size-4 text-primary" />
                  <span>{post.readingTime} min read</span>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section data-content-analytics-root="true" spacing="none" className="py-8 sm:py-10">
        <Container className="max-w-6xl">
          {post.coverImage ? (
            <div className="mb-8 overflow-hidden rounded-[10px] border border-border bg-surface">
              <img
                src={post.coverImage}
                alt={post.title}
                className="aspect-[16/7] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,44rem)_18rem] lg:justify-between">
            <article className="min-w-0">
              <div className={styles.prose}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ""}</ReactMarkdown>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-sm font-semibold text-foreground">Article details</p>
                <dl className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  {post.category ? (
                    <div>
                      <dt className="font-medium text-foreground">Category</dt>
                      <dd className="mt-1">{post.category}</dd>
                    </div>
                  ) : null}
                  {post.updatedAt && post.updatedAt !== post.publishedAt ? (
                    <div>
                      <dt className="font-medium text-foreground">Updated</dt>
                      <dd className="mt-1">{formatBlogDate(post.updatedAt)}</dd>
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
                  href="/blog"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                >
                  More Shopify articles
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
