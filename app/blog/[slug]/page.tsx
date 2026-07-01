import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "@/components/blog/article-content.module.css";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { formatBlogDate, getBlogPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Blog posts are created after deployment from the admin panel.
 * Always render this route at request time instead of trying to
 * statically generate blog slugs during the build.
 */
export const dynamic = "force-dynamic";
export const dynamicParams = true;

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

  const title = post.seoTitle || post.title;
  const description =
    post.seoDescription ||
    post.excerpt ||
    "Read Shopify, ecommerce, SEO, and AI search insights from Hyper.";

  const path = `/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      url: new URL(path, siteConfig.url).toString(),
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
      "Read Shopify, ecommerce, SEO, and AI search insights from Hyper.",
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

      <Section className="pb-12 pt-20 sm:pt-28">
        <Container className="max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to the blog
          </Link>

          <div className="mt-10">
            {post.category ? (
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
                {post.category}
              </p>
            ) : null}

            <h1 className="mt-4 type-display">{post.title}</h1>

            {post.excerpt ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {post.author ? <span>By {post.author}</span> : null}

              {post.author ? <span aria-hidden="true">•</span> : null}

              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>

              {post.readingTime ? <span aria-hidden="true">•</span> : null}

              {post.readingTime ? (
                <span className="inline-flex items-center gap-2">
                  <Clock3 aria-hidden="true" className="size-4" />
                  {post.readingTime} min read
                </span>
              ) : null}
            </div>

            {tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="pb-20 sm:pb-24">
        <Container className="max-w-4xl">
          <article className="rounded-[10px] border border-border bg-surface p-6 sm:p-10 lg:p-12">
            <div className={styles.prose}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ""}</ReactMarkdown>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
