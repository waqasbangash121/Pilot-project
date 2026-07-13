import Link from "next/link";
import { ArrowRight, Bot, Mail, MessageSquare, Search, Sparkles, Video } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { toJsonLd } from "@/lib/schema";
import { createLocalBusinessSchema } from "@/schemas";

export const metadata = createPageMetadata({
  title: "Contact NiagaraT",
  description:
    "Contact NiagaraT to learn about Hyper Apps for Shopify merchants, including Hyper Search & Product Filters, Hyper AI Chat & FAQs, and Hyper Shoppable Videos.",
  path: "/contact",
});

const supportTopics = [
  {
    title: "Product discovery",
    description: "Talk through search, filters, merchandising, and storefront discovery goals.",
    Icon: Search,
  },
  {
    title: "AI support",
    description: "Explore chat, FAQs, and automation for common customer questions.",
    Icon: Bot,
  },
  {
    title: "Video commerce",
    description: "Plan interactive product video experiences that shorten the path to purchase.",
    Icon: Video,
  },
];

const contactReasons = [
  "Find the right Hyper App for your Shopify store.",
  "Ask about implementation, workflows, or app capabilities.",
  "Discuss ways to improve customer experience and conversions.",
  "Share partnership, support, or general business questions.",
];

const localBusinessSchema = createLocalBusinessSchema();

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessSchema) }}
      />

      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Contact NiagaraT
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Hyper Apps Shopify support
                </p>
                <h1 className="mt-3 max-w-4xl type-display">
                  Let&apos;s improve your Shopify search, support, and video commerce.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Reach out to discuss NiagaraT's Hyper Apps, including Shopify product discovery, AI customer support, FAQ automation, shoppable videos, and practical ways to improve your storefront experience.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <Mail aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-sm font-semibold text-foreground">Email us directly</p>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 inline-flex break-all text-sm font-semibold text-primary underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </Link>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Tell us what you are trying to improve and which Shopify workflow needs help.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {supportTopics.map(({ title, description, Icon }) => (
              <article key={title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <MessageSquare aria-hidden="true" className="size-4 text-primary" />
                How we can help
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Share the work in front of you.
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <p>
                  NiagaraT develops Hyper Apps for Shopify product discovery, customer support automation, and interactive video commerce. We can help you understand product fit, implementation, and where a Hyper tool can reduce friction in the buying journey.
                </p>
                <p>
                  Whether you are launching a new store or improving an established one, send a
                  short note with your goals and the storefront experience you want to improve.
                </p>
              </div>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_36px_-20px_hsl(var(--primary)/0.8)] transition-transform hover:-translate-y-0.5"
              >
                Contact NiagaraT
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>

            <aside className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Good reasons to reach out
              </p>
              <ul className="mt-5 space-y-3">
                {contactReasons.map((reason) => (
                  <li key={reason} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}