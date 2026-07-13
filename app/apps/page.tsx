import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Hyper Apps for Shopify Search, Support, and Video Commerce",
  description:
    "NiagaraT develops Hyper Apps for Shopify merchants: Hyper Search & Product Filters, Hyper AI Chat & FAQs, and Hyper Shoppable Videos for product discovery, support automation, engagement, and conversion growth.",
  path: "/apps",
});

const apps = [
  {
    title: "Hyper Search & Product Filters",
    description:
      "Improve Shopify product discovery with product search, collection filters, merchandising controls, typo tolerance, synonym matching, and analytics that help shoppers find relevant products.",
    features: [
      "Shopify product search",
      "Product and collection filters",
      "Faster product discovery",
      "Search analytics and merchandising",
      "Improved store navigation",
    ],
    href: "/apps/hyper-search-filter",
    cta: "Explore Hyper Search & Product Filters",
    icon: "/hyper-search.svg",
  },
  {
    title: "Hyper AI Chat & FAQs",
    description:
      "Answer common Shopify customer questions with an AI chatbot, searchable FAQs, chat history, custom branding, and support analytics.",
    features: [
      "AI customer support chatbot",
      "Searchable FAQ page",
      "Self-service support answers",
      "Reduced support tickets",
      "Customer support analytics",
    ],
    href: "/apps/hyper-ai-chat-faq",
    cta: "Explore Hyper AI Chat & FAQs",
    icon: "/hyper-aichat.svg",
  },
  {
    title: "Hyper Shoppable Videos",
    description:
      "Turn product videos into interactive Shopify shopping experiences with product tagging, widgets, views, analytics, and social-video imports where supported by plan.",
    features: [
      "Interactive shoppable videos",
      "Video-based product discovery",
      "Video engagement analytics",
      "Product-tagged video widgets",
      "Shopify storefront integration",
    ],
    href: "/apps/hyper-shoppable-videos",
    cta: "Explore Shoppable Videos",
    icon: "/hyper-videos.svg",
  },
];

export default function AppsPage() {
  return (
    <>
      {/* HERO (SEO optimized intro block) */}
      <Section className="pt-28 pb-16">
        <Container className="max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              NiagaraT Shopify App Suite
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
              Hyper Apps for Shopify Search, Support, and Video Commerce
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-muted-foreground text-base sm:text-lg leading-7">
              NiagaraT develops Hyper Apps for Shopify merchants. The suite includes Hyper Search & Product Filters for product discovery, Hyper AI Chat & FAQs for self-service support, and Hyper Shoppable Videos for product-tagged video engagement.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Contact NiagaraT
              </Link>

              <Link href="#apps" className="text-sm font-medium text-primary underline">
                Explore Hyper Apps
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* SEO CONTENT BLOCK (important for GEO + ranking) */}
      <Section className="pb-16">
        <Container className="max-w-5xl">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              How Hyper Apps Work Together for Shopify Conversion
            </h2>

            <div className="mt-5 space-y-5 text-muted-foreground leading-7">
              <p>
                Modern Shopify ecommerce depends on fast product discovery, clear customer support, and engaging product content. When search, FAQs, chat, and video commerce work separately, shoppers can struggle to find products, answer questions, and move confidently toward purchase.
              </p>

              <p>
                Hyper Apps solves this with a Shopify conversion stack: search and product filters for catalog navigation, AI chat and FAQs for support automation, and shoppable videos for product discovery and engagement.
              </p>

              <p>
                Together, NiagaraT's Hyper products help Shopify merchants improve shopper experience, purchase confidence, and ecommerce conversion without relying on unsupported claims or unnecessary complexity.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* APPS GRID (conversion-focused cards) */}
      <Section id="apps" className="pb-16">
        <Container className="max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">
            Hyper Apps Shopify Conversion Stack
          </h2>

          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Choose the NiagaraT product that matches the Shopify problem you need to solve: product discovery, customer support, or shoppable video engagement.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {apps.map((app) => (
              <Link
                key={app.title}
                href={app.href}
                className="group rounded-2xl border border-border bg-surface p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <Image
                  src={app.icon}
                  alt={`${app.title} logo`}
                  width={42}
                  height={42}
                  className="rounded-md object-contain"
                />

                <h3 className="mt-4 text-lg font-semibold">{app.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground leading-6">{app.description}</p>

                <ul className="mt-5 space-y-2">
                  {app.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-sm font-medium text-primary">{app.cta} →</div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* BENEFITS SECTION (SEO + trust builder) */}
      <Section className="pb-16">
        <Container className="max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Improve Shopify Conversion Paths",
                desc: "Use Hyper Apps to reduce friction across Shopify search, support questions, product videos, and buying decisions.",
              },
              {
                title: "Clarify Product Discovery",
                desc: "Help shoppers move from broad intent to relevant products with search, filtering, recommendations, and merchandising controls.",
              },
              {
                title: "Automate Shopify Customer Support",
                desc: "Use Hyper AI Chat & FAQs to answer common customer questions and support self-service help.",
              },
              {
                title: "Increase Shopper Engagement",
                desc: "Use product-tagged videos and clearer support paths to help shoppers understand products before they buy.",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ SECTION (VERY IMPORTANT FOR SEO/GEO) */}
      <Section className="pb-20">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-semibold text-center">Frequently Asked Questions</h2>

          <div className="mt-8 space-y-5">
            {[
              {
                q: "What is Hyper Apps?",
                a: "Hyper Apps is NiagaraT's Shopify app suite for product discovery, customer support automation, and shoppable video commerce.",
              },
              {
                q: "Which products are included in Hyper Apps?",
                a: "Hyper Apps includes Hyper Search & Product Filters, Hyper AI Chat & FAQs, and Hyper Shoppable Videos.",
              },
              {
                q: "Can NiagaraT apps be used together?",
                a: "Yes. Shopify merchants can use one Hyper product or combine search, AI support, and shoppable video tools as the Hyper Shopify Conversion Stack.",
              },
            ].map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="pb-24">
        <Container className="max-w-5xl">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Ready to Improve Shopify Discovery, Support, and Engagement?
            </h2>

            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Use Hyper Apps from NiagaraT to improve Shopify product discovery, automate common support questions, and turn product videos into shoppable experiences.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Contact NiagaraT
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
