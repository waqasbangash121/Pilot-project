import Link from "next/link";

import { createPageMetadata } from "@/config/metadata";
import { PricingExplorer } from "@/components/pricing/pricing-explorer";

export const metadata = createPageMetadata({
  title: "Shopify App Pricing",
  description:
    "Compare current pricing for Hyper Search & Product Filters, Hyper AI Chat & FAQs, and Hyper Shoppable Videos for Shopify stores.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden border-b border-border py-14 sm:py-16">
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,hsl(var(--primary)/0.08),transparent)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Hyper Apps pricing
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl">
                Pick the Shopify App Plan That Matches Your Next Conversion Fix
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                Compare pricing for Shopify search, AI chat, and shoppable video in one clean view.
                Choose an app, scan the plan limits, and install from the Shopify App Store when you
                are ready.
              </p>
            </div>

            <div className="rounded-[8px] border border-border bg-surface/85 p-5 shadow-[0_18px_54px_-48px_hsl(var(--shadow)/0.8)] backdrop-blur">
              <p className="text-sm font-black text-foreground">Need help choosing?</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Book a demo if you want help picking the first app to install.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-analytics-event="demo_booking_click"
                data-analytics-label="Pricing hero demo"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PricingExplorer />
    </main>
  );
}
