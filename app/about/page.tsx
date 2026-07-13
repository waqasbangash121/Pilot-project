import Link from "next/link";
import { ArrowRight, Bot, Search, ShoppingBag, Sparkles, Video } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "About NiagaraT and Hyper Apps",
  description:
    "NiagaraT develops Hyper Apps for Shopify merchants, including search and product filters, AI chat and FAQs, and shoppable video tools for product discovery, support, engagement, and conversion optimization.",
  path: "/about",
});

const productAreas = [
  {
    title: "AI-powered product discovery",
    description:
      "Hyper Search & Product Filters helps Shopify stores deliver faster search, sharper filtering, and easier product exploration across modern catalogs.",
    Icon: Search,
  },
  {
    title: "AI customer support",
    description:
      "Hyper AI Chat & FAQs helps merchants answer common questions, reduce support pressure, and guide shoppers toward confident buying decisions.",
    Icon: Bot,
  },
  {
    title: "Shop through video",
    description:
      "Hyper Shoppable Videos turns product video into interactive shopping moments that connect discovery with action.",
    Icon: Video,
  },
];

const principles = [
  "Practical AI that fits real merchant workflows.",
  "Customer experiences that reduce friction before purchase.",
  "Tools that help Shopify teams stay visible as commerce discovery changes.",
];

export default function AboutPage() {
  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -left-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  About NiagaraT
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Hyper Apps for Shopify merchants
                </p>
                <h1 className="mt-3 max-w-4xl type-display">
                  NiagaraT builds Hyper Apps for Shopify merchants.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  NiagaraT develops ecommerce tools under the Hyper brand to help Shopify merchants improve product discovery, customer support, shopper engagement, and conversion optimization.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <ShoppingBag aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">3</p>
                <p className="mt-1 text-sm font-semibold text-foreground">core commerce areas</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Discovery, support, and video commerce working toward smoother buying journeys.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {productAreas.map(({ title, description, Icon }) => (
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Why Shopify merchants choose Hyper Apps
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for the work behind modern ecommerce growth.
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <p>
                  Hyper Apps combines practical Shopify workflows with AI commerce tools where they help merchants solve real storefront problems. Hyper Search & Product Filters supports product discovery, Hyper AI Chat & FAQs supports customer questions, and Hyper Shoppable Videos supports product-tagged engagement.
                </p>
                <p>
                  As Shopify ecommerce evolves, NiagaraT focuses on tools that help merchants make catalogs easier to navigate, answer shopper questions more clearly, and connect product content with buying intent.
                </p>
              </div>
              <Link
                href="/apps"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                Explore Hyper Apps
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>

            <aside className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Our focus
              </p>
              <ul className="mt-5 space-y-3">
                {principles.map((principle) => (
                  <li key={principle} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{principle}</span>
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