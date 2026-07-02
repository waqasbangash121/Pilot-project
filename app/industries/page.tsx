import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot, Search, Shirt, ShoppingBag, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Industries",
  description:
    "See how Hyper solutions map to fashion, beauty, electronics, and multi-category commerce.",
  path: "/industries",
});

const industries = [
  {
    title: "Fashion and apparel",
    description:
      "Help shoppers narrow by size, color, fit, material, and style while reducing friction in large seasonal catalogs.",
    Icon: Shirt,
  },
  {
    title: "Beauty and personal care",
    description:
      "Support ingredient-led discovery, routine questions, recommendations, and confidence-building product education.",
    Icon: Sparkles,
  },
  {
    title: "Electronics and accessories",
    description:
      "Make technical catalogs easier to compare with stronger search, compatibility guidance, and support automation.",
    Icon: Search,
  },
  {
    title: "Multi-category commerce",
    description:
      "Give growing catalogs a cleaner discovery layer across categories, filters, product education, and support needs.",
    Icon: ShoppingBag,
  },
];

const capabilities = [
  {
    title: "Intent-aware discovery",
    description: "Connect shopper language to relevant products, filters, and collections.",
    Icon: Search,
  },
  {
    title: "Support automation",
    description: "Answer product, policy, and buying questions before they become tickets.",
    Icon: Bot,
  },
  {
    title: "Conversion support",
    description: "Reduce uncertainty across search, education, and product exploration moments.",
    Icon: BadgeCheck,
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Industries
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Shopify verticals
                </p>
                <h1 className="mt-3 max-w-4xl type-display">
                  AI commerce workflows for different catalog realities.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Hyper supports industry-specific merchandising, search, support, and conversion
                  workflows for modern ecommerce teams.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <ShoppingBag aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">4</p>
                <p className="mt-1 text-sm font-semibold text-foreground">commerce categories</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Adaptable workflows for catalogs with different shopper questions and buying paths.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-6 sm:pb-8">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map(({ title, description, Icon }) => (
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
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Industry fit
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Shape discovery around how shoppers decide.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">
              Different catalogs need different paths to clarity. Hyper helps teams meet shoppers
              with the right search, support, and product education moments.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {industries.map(({ title, description, Icon }) => (
              <article key={title} className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted/60 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Need a specific workflow?
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Talk to us about your catalog and customer journey.
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_36px_-20px_hsl(var(--primary)/0.8)] transition-transform hover:-translate-y-0.5"
              >
                Contact Hyper
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}