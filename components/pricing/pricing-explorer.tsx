"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

type ProductPricing = {
  id: string;
  name: string;
  shortName: string;
  href: string;
  installHref: string;
  useCase: string;
  bestFor: string;
  primaryMetric: string;
  selectorLabel: string;
  plans: Plan[];
};

const products: ProductPricing[] = [
  {
    id: "search",
    name: "Hyper Search & Product Filters",
    shortName: "Search",
    selectorLabel: "Product discovery",
    href: "/apps/hyper-search-filter",
    installHref: "https://apps.shopify.com/hyper-search-product-filters?utm_source=niagarat.com",
    useCase: "AI search, filters, synonyms, typo tolerance, merchandising, and analytics.",
    bestFor: "Stores with catalogs where shoppers need to narrow choices fast.",
    primaryMetric: "Search usage, zero-result searches, and product clicks from search.",
    plans: [
      {
        name: "Free",
        price: "Free",
        description: "Essential search and filters for small catalogs.",
        features: ["Up to 50 products", "15 filters", "7-day analytics", "Basic support"],
      },
      {
        name: "Starter",
        price: "$15",
        period: "/mo",
        description: "More catalog room, filters, and synonym control.",
        features: ["Up to 5,000 products", "50 synonyms", "Unlimited filters", "30-day analytics"],
      },
      {
        name: "Professional",
        price: "$49",
        period: "/mo",
        description: "Advanced relevance, reporting, and merchandising.",
        highlighted: true,
        features: [
          "Up to 50,000 products",
          "Unlimited synonyms",
          "Zero-results reporting",
          "Priority support",
        ],
      },
      {
        name: "Enterprise",
        price: "$119",
        period: "/mo",
        description: "High-volume search and merchandising controls.",
        features: [
          "Up to 200,000 products",
          "Unlimited analytics history",
          "Product labels",
          "Dedicated priority support",
        ],
      },
    ],
  },
  {
    id: "chat",
    name: "Hyper AI Chat & FAQs",
    shortName: "AI Chat",
    selectorLabel: "Instant support",
    href: "/apps/hyper-ai-chat-faq",
    installHref: "https://apps.shopify.com/hyper-chatbot-and-faqs?utm_source=niagarat.com",
    useCase: "AI chatbot, FAQ automation, chat history, branding, and support analytics.",
    bestFor: "Stores that answer repeated product, policy, shipping, or return questions.",
    primaryMetric:
      "Answered questions, repeated topics, FAQ usage, and support conversations avoided.",
    plans: [
      {
        name: "Free",
        price: "Free",
        description: "Start answering common questions with AI chat.",
        features: ["50 AI replies/month", "AI training", "10 FAQs", "Email support"],
      },
      {
        name: "Starter",
        price: "$19",
        period: "/mo",
        description: "Support automation for growing stores.",
        features: ["500 AI replies/month", "25 FAQs", "180-day chat history", "Custom branding"],
      },
      {
        name: "Growth",
        price: "$49",
        period: "/mo",
        description: "More answers, unlimited FAQs, and stronger analytics.",
        highlighted: true,
        features: [
          "2,500 AI replies/month",
          "Unlimited FAQs",
          "365-day chat history",
          "Premium support",
        ],
      },
      {
        name: "Pro",
        price: "$99",
        period: "/mo",
        description: "High-volume AI support for larger stores.",
        features: [
          "10,000 AI replies/month",
          "Unlimited chat history",
          "White-label branding",
          "Priority support",
        ],
      },
    ],
  },
  {
    id: "video",
    name: "Hyper Shoppable Videos",
    shortName: "Video",
    selectorLabel: "Shoppable content",
    href: "/apps/hyper-shoppable-videos",
    installHref: "https://apps.shopify.com/hyper-shopable-videos?utm_source=niagarat.com",
    useCase: "Product-tagged videos, storefront widgets, social uploads, views, and analytics.",
    bestFor: "Stores that use demos, UGC, tutorials, styling clips, or social content.",
    primaryMetric: "Video engagement, product interactions, add-to-cart paths, and product clicks.",
    plans: [
      {
        name: "Free",
        price: "Free",
        description: "Add your first shoppable video placements.",
        features: ["5 videos", "1 widget", "1 tag/video", "1,000 monthly views"],
      },
      {
        name: "Starter",
        price: "$19",
        period: "/mo",
        description: "More videos, widgets, and monthly views.",
        features: ["30 videos", "5 widgets", "3 tags/video", "8,000 monthly views"],
      },
      {
        name: "Growth",
        price: "$49",
        period: "/mo",
        description: "Scale video shopping with analytics and testing.",
        highlighted: true,
        features: ["200 videos", "15 widgets", "10 tags/video", "A/B testing"],
      },
      {
        name: "Pro",
        price: "$119",
        period: "/mo",
        description: "Large video libraries and unlimited storefront usage.",
        features: ["500 videos", "Unlimited widgets", "Unlimited monthly views", "HeyGen import"],
      },
    ],
  },
];

function priceText(plan: Plan) {
  return `${plan.price}${plan.period ?? ""}`;
}

function PlanCard({ product, plan }: { product: ProductPricing; plan: Plan }) {
  return (
    <article
      className={`group relative flex min-h-full flex-col rounded-[8px] border p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-32px_hsl(var(--shadow)/0.9)] ${
        plan.highlighted
          ? "border-primary/45 bg-[linear-gradient(180deg,hsl(var(--primary)/0.09),hsl(var(--surface))_42%)]"
          : "border-border bg-surface hover:border-primary/25"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-foreground">{plan.name}</h3>
          <p className="mt-2 flex items-baseline gap-1 text-3xl font-black text-foreground">
            {plan.price}
            {plan.period ? (
              <span className="text-xs font-semibold text-muted-foreground">{plan.period}</span>
            ) : null}
          </p>
        </div>
        {plan.highlighted ? (
          <span className="rounded-full bg-primary px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.1em] text-primary-foreground">
            Popular
          </span>
        ) : null}
      </div>

      <p className="mt-4 min-h-12 text-sm leading-6 text-muted-foreground">{plan.description}</p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6 text-foreground">
            <span className="mt-2 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span className="size-1.5 rounded-full bg-primary" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={product.installHref}
        className={`mt-7 inline-flex h-11 items-center justify-center rounded-[6px] px-4 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          plan.highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-border bg-background text-foreground hover:border-primary/35 hover:bg-primary/10 hover:text-foreground"
        }`}
        data-analytics-event="outbound_shopify_app_store_click"
        data-analytics-label={`${product.name} ${plan.name} ${priceText(plan)}`}
      >
        {plan.price === "Free" ? "Install Free" : "Install Plan"}
      </a>
    </article>
  );
}

function ProductPanel({ product }: { product: ProductPricing }) {
  const startingPlan = product.plans[0];
  const popularPlan = product.plans.find((plan) => plan.highlighted) ?? product.plans[1];

  return (
    <>
      <div className="grid gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            {product.shortName} pricing
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-foreground">
            {product.name}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {product.useCase}
          </p>
        </div>
        <div className="rounded-[8px] border border-border bg-muted/35 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Best fit
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-foreground">{product.bestFor}</p>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[8px] border border-border bg-surface p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Starts at
          </p>
          <p className="mt-1 text-2xl font-black text-foreground">{priceText(startingPlan)}</p>
        </div>
        <div className="rounded-[8px] border border-border bg-surface p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Typical pick
          </p>
          <p className="mt-1 text-2xl font-black text-foreground">{popularPlan.name}</p>
        </div>
        <div className="rounded-[8px] border border-border bg-surface p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Track after launch
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-foreground">
            {product.primaryMetric}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {product.plans.map((plan) => (
          <PlanCard key={plan.name} product={product} plan={plan} />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-[8px] border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted-foreground">
          Want the full feature list before installing? Review the product page, then confirm final
          billing details in Shopify.
        </p>
        <Link
          href={product.href}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-[6px] border border-border bg-background px-4 text-sm font-black text-foreground transition hover:border-primary/35 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-analytics-event={`${product.id}_app_page_click`}
          data-analytics-label={`Pricing ${product.name} details`}
        >
          View {product.shortName} Details
        </Link>
      </div>
    </>
  );
}

export function PricingExplorer() {
  const [activeId, setActiveId] = useState(products[0].id);
  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeId) ?? products[0],
    [activeId],
  );

  function handleProductSelect(productId: string) {
    setActiveId(productId);
    window.requestAnimationFrame(() => {
      const target = document.getElementById(`pricing-panel-${productId}`);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <section className="py-12 sm:py-16" aria-labelledby="pricing-explorer-heading">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Compare by app
            </p>
            <h2 id="pricing-explorer-heading" className="mt-2 text-2xl font-black text-foreground">
              Start with the problem you want to fix first
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Pricing below uses public plan information from the site. Shopify billing and app store
            listings are the final source before install.
          </p>
        </div>

        <div className="rounded-[10px] border border-border bg-surface/80 p-3 shadow-[0_28px_80px_-62px_hsl(var(--shadow)/0.95)] backdrop-blur">
          <div className="grid gap-4">
            <aside className="rounded-[8px] bg-muted/35 p-2">
              <div
                className="grid gap-2 sm:grid-cols-3"
                aria-label="Choose a Hyper app pricing section"
              >
                {products.map((product, index) => {
                  const isActive = product.id === activeProduct.id;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      aria-controls={`pricing-panel-${product.id}`}
                      onClick={() => handleProductSelect(product.id)}
                      className={`group rounded-[8px] border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive
                          ? "border-primary/50 bg-surface shadow-[0_16px_34px_-26px_hsl(var(--shadow)/0.9)]"
                          : "border-transparent text-foreground hover:border-primary/20 hover:bg-surface/80"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface text-muted-foreground group-hover:text-primary"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-sm font-black text-foreground">
                            {product.shortName}
                          </span>
                          <span className="mt-0.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                            {product.selectorLabel}
                          </span>
                        </span>
                      </span>
                      <span className="mt-3 block text-xs leading-5 text-muted-foreground">
                        {product.bestFor}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-[8px] border border-border bg-surface p-4 text-sm leading-6 text-muted-foreground">
                <p className="font-black text-foreground">Pricing note</p>
                <p className="mt-1">
                  If plan details change in Shopify, the App Store listing is the source of truth.
                </p>
              </div>
            </aside>

            <div className="min-w-0 space-y-12 rounded-[8px] bg-background p-4 sm:p-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  id={`pricing-panel-${product.id}`}
                  className="scroll-mt-28 border-b border-border pb-12 last:border-b-0 last:pb-0"
                >
                  <ProductPanel product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
