import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { canonicalUrl } from "@/config/metadata";
import { languageAlternates } from "@/lib/i18n/metadata";
import { hyperApps, hyperAppsUpdatedAt } from "@/data/hyper-apps";

const title = "Compare Hyper Shopify Apps: Search, Chat & Video | NiagaraT";
const description =
  "Compare Hyper Search, AI Chat and Shoppable Video apps for Shopify. Review use cases, features and plans, then install the right app for your store.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: languageAlternates("/apps"),
  openGraph: {
    type: "website",
    url: canonicalUrl("/apps"),
    title,
    description,
    siteName: "Hyper Apps by NiagaraT",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const sourceNote =
  "Pricing and plan limits may change. Shopify App Store listings are the source of truth for current billing information.";

const problems = [
  {
    id: "search",
    heading: "Shoppers Cannot Find the Right Products",
    copy: "Choose Hyper Search when customers struggle with large catalogs, misspellings, synonyms, product attributes, collection filters, or zero-result searches.",
    appName: "Hyper Search & Product Filters",
    cta: "View the Shopify Search App",
    href: "/apps/hyper-search-filter",
  },
  {
    id: "chat",
    heading: "Shoppers Leave With Unanswered Questions",
    copy: "Choose Hyper AI Chat when customers repeatedly ask about products, sizing, availability, shipping, returns, store policies, or order information.",
    appName: "Hyper AI Chat & FAQs",
    cta: "View the Shopify AI Chat App",
    href: "/apps/hyper-ai-chat-faq",
  },
  {
    id: "video",
    heading: "Your Product Videos Are Difficult to Shop",
    copy: "Choose Hyper Shoppable Videos when you have product demonstrations, tutorials, TikToks, Reels, or user-generated content that shoppers cannot purchase from directly.",
    appName: "Hyper Shoppable Videos",
    cta: "View the Shopify Shoppable Video App",
    href: "/apps/hyper-shoppable-videos",
  },
];

const comparisonRows = [
  ["Primary purpose", "primaryPurpose"],
  ["Best for", "bestFit"],
  ["Main customer problem", "mainProblem"],
  ["Core features", "coreFeatures"],
  ["Free plan", "freePlan"],
  ["Free trial", "freeTrial"],
  ["Entry paid plan", "entryPaidPlan"],
  ["Usage limit", "usageLimit"],
  ["Setup method", "setupMethod"],
  ["Coding required", "codingRequired"],
  ["Analytics included", "analyticsIncluded"],
  ["Demo store", "demoHref"],
  ["Internal product page", "internalHref"],
  ["Install on Shopify", "installHref"],
] as const;

const faqs = [
  {
    q: "What Shopify apps does NiagaraT offer?",
    a: "NiagaraT offers three Hyper Apps for Shopify merchants: Hyper Search & Product Filters for catalog search and filtering, Hyper AI Chat & FAQs for customer questions and FAQ content, and Hyper Shoppable Videos for product-tagged video widgets.",
  },
  {
    q: "Which Hyper app should I install first?",
    a: "Start with the app tied to the largest measured customer-experience problem: zero-result searches, repeated pre-purchase questions, or product videos that shoppers watch without clicking products.",
  },
  {
    q: "Can I use the Hyper Apps independently?",
    a: "Yes. Each Hyper app can be installed independently from the Shopify App Store. Merchants do not need all three apps to use one product.",
  },
  {
    q: "Can the three Hyper Apps be used together?",
    a: "Yes, they can be used on the same Shopify store when a merchant needs search, support, and video-commerce help. There is no verified bundle price or native shared-data integration to claim on this page.",
  },
  {
    q: "Do the Hyper Apps have free plans?",
    a: `Yes. The Shopify App Store listings verified on ${hyperAppsUpdatedAt} show free plans for Hyper Search & Filter, Hyper AI Chat and FAQs, and Hyper - Shoppable Videos.`,
  },
  {
    q: "Do the paid plans include free trials?",
    a: "Yes. The current Shopify App Store listings show 14-day free trials on paid plans for all three apps.",
  },
  {
    q: "Does installation require coding?",
    a: "Standard setup is handled through Shopify app installation and in-app configuration. Hyper Search supports custom CSS, while the chat and video apps focus on widget, FAQ, content, and video configuration.",
  },
  {
    q: "Where can I see current pricing?",
    a: "Use the official Shopify App Store listings for current billing information, then review each NiagaraT product page for implementation context.",
  },
  {
    q: "Can I see the apps working before installation?",
    a: "Yes. The official listings include demo stores for Hyper Search, Hyper AI Chat, and Hyper Shoppable Videos, and those demo links are included on this page.",
  },
  {
    q: "Which app is best for a large Shopify catalog?",
    a: "Hyper Search & Product Filters is the strongest fit for large catalogs because it focuses on AI search, typo tolerance, filters, synonyms, product attributes, and analytics for search behavior.",
  },
  {
    q: "Which app is best for reducing repetitive customer questions?",
    a: "Hyper AI Chat & FAQs is the best fit for repeated product, sizing, shipping, returns, availability, policy, and order-information questions. It gives shoppers self-service answers without promising a specific ticket reduction.",
  },
  {
    q: "Which app is best for TikTok, Reels, UGC, and product videos?",
    a: "Hyper Shoppable Videos is the best fit for short-form product videos, tutorials, UGC, TikTok imports, and Instagram uploads where supported by plan.",
  },
];
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${canonicalUrl("/apps")}#webpage`,
      url: canonicalUrl("/apps"),
      name: title,
      description,
      isPartOf: { "@id": `${canonicalUrl("/")}#website` },
      about: hyperApps.map((app) => ({ "@id": `${canonicalUrl(app.internalHref)}#software` })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl("/apps")}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
        { "@type": "ListItem", position: 2, name: "Apps", item: canonicalUrl("/apps") },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${canonicalUrl("/apps")}#itemlist`,
      itemListElement: hyperApps.map((app, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: app.marketingName,
        url: canonicalUrl(app.internalHref),
      })),
    },
    ...hyperApps.map((app) => ({
      "@type": "SoftwareApplication",
      "@id": `${canonicalUrl(app.internalHref)}#software`,
      name: app.officialName,
      alternateName: app.marketingName,
      applicationCategory: "Shopify application",
      operatingSystem: "Shopify",
      url: canonicalUrl(app.internalHref),
      installUrl: app.installHref,
      sameAs: app.installHref,
      offers: app.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price === "$0" ? "0" : plan.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        url: app.installHref,
        description: [...plan.limits, plan.trial].filter(Boolean).join("; "),
      })),
    })),
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl("/apps")}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

function trackedAttrs(
  event: string,
  sectionName: string,
  ctaText: string,
  destination: string,
  appName?: string,
) {
  return {
    "data-analytics-event": event,
    "data-analytics-section": sectionName,
    "data-analytics-cta": ctaText,
    "data-analytics-destination": destination,
    ...(appName ? { "data-analytics-app": appName } : {}),
  };
}

export default function AppsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section
        spacing="lg"
        className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))]"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Hyper Apps by NiagaraT
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
                Choose the Right Hyper App for Your Shopify Store
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Compare Shopify apps for product search, customer support, and shoppable video.
                Start with the biggest source of friction in your store, then add other Hyper Apps
                as your needs grow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#compare"
                  className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...trackedAttrs("apps_compare_click", "hero", "Compare the Apps", "#compare")}
                >
                  Compare the Apps
                </Link>
                <Link
                  href="#selector"
                  className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-background px-6 py-3 text-sm font-bold text-foreground transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...trackedAttrs("apps_selector_choice", "hero", "Find My App", "#selector")}
                >
                  Find My App
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center px-2 py-3 text-sm font-bold text-primary underline-offset-4 hover:underline"
                  {...trackedAttrs(
                    "apps_contact_click",
                    "hero",
                    "Talk to the Hyper Team",
                    "/contact",
                  )}
                >
                  Talk to the Hyper Team
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {hyperApps.map((app) => (
                <Link
                  key={app.id}
                  href={app.internalHref}
                  className="group flex min-h-28 items-start gap-4 rounded-[8px] border border-border bg-surface p-5 shadow-[0_18px_48px_-42px_hsl(var(--shadow)/0.75)] transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_54px_-38px_hsl(var(--shadow)/0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:block lg:flex"
                  {...trackedAttrs(
                    "apps_product_view",
                    "hero_preview",
                    app.marketingName,
                    app.internalHref,
                    app.marketingName,
                  )}
                >
                  <Image
                    src={app.icon}
                    alt=""
                    width={40}
                    height={40}
                    aria-hidden="true"
                    className="shrink-0 rounded-[8px]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {app.shortName}
                    </p>
                    <p className="mt-2 text-sm font-bold leading-6 text-foreground">
                      {app.primaryPurpose}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="selector" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-normal">
              What Is Stopping More Shoppers From Buying?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pick the friction you can see in search reports, support messages, or video
              engagement. Every recommendation below is a normal crawlable link.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                href={problem.href}
                className="group flex min-h-[320px] flex-col rounded-[8px] border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...trackedAttrs(
                  "apps_selector_choice",
                  "problem_selector",
                  problem.cta,
                  problem.href,
                  problem.appName,
                )}
              >
                <h3 className="text-xl font-black tracking-normal">{problem.heading}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{problem.copy}</p>
                <div className="mt-auto pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Recommended app
                  </p>
                  <p className="mt-2 font-bold text-foreground">{problem.appName}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    {problem.cta} <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section id="product-cards" spacing="lg" className="bg-surface">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-normal">Review Each Hyper App</h2>
            <p className="mt-4 text-muted-foreground">
              Product names, free-plan status, free trials, entry pricing, limits, demo stores, and
              installation links are controlled from one product-data file and were checked against
              Shopify App Store listings.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {hyperApps.map((app) => (
              <article
                key={app.id}
                className="flex flex-col rounded-[8px] border border-border bg-background p-6 shadow-sm"
              >
                <div className="grid min-h-[4.75rem] grid-cols-[44px_minmax(0,1fr)] items-start gap-3">
                  <Image
                    src={app.icon}
                    alt={`${app.marketingName} icon`}
                    width={44}
                    height={44}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="flex min-h-14 items-start text-xl font-black leading-7 tracking-normal">
                      {app.marketingName}
                    </h3>
                    <p className="text-xs text-muted-foreground">{app.listedAs}</p>
                  </div>
                </div>
                <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[8px] border border-border bg-muted">
                  <Image
                    src={app.screenshot}
                    alt={app.screenshotAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-5 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
                  {app.outcome}
                </p>
                <p className="mt-3 text-sm leading-6 text-foreground">
                  <strong>Best fit:</strong> {app.bestFit}
                </p>
                <ul className="mt-5 space-y-2">
                  {app.capabilities.slice(0, 6).map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm leading-6 text-muted-foreground"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-primary"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 grid gap-3 rounded-[8px] bg-surface p-4 text-sm">
                  <div>
                    <dt className="font-semibold">Free plan</dt>
                    <dd className="text-muted-foreground">{app.freePlan}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Free trial</dt>
                    <dd className="text-muted-foreground">{app.freeTrial}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Starting paid plan</dt>
                    <dd className="text-muted-foreground">{app.entryPaidPlan}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-6">
                  <div className="grid gap-3">
                    <Link
                      href={app.installHref}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label={`Install ${app.marketingName} free on Shopify`}
                      {...trackedAttrs(
                        "apps_install_click",
                        "product_cards",
                        "Install Free on Shopify",
                        app.installHref,
                        app.marketingName,
                      )}
                    >
                      Install Free on Shopify <ExternalLink aria-hidden="true" className="size-4" />
                    </Link>
                    <Link
                      href={app.internalHref}
                      className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...trackedAttrs(
                        "apps_product_view",
                        "product_cards",
                        "View App Details",
                        app.internalHref,
                        app.marketingName,
                      )}
                    >
                      View App Details
                    </Link>
                  </div>
                  <Link
                    href={app.demoHref}
                    className="mt-4 inline-flex text-sm font-bold text-primary underline-offset-4 hover:underline"
                    {...trackedAttrs(
                      "apps_demo_click",
                      "product_cards",
                      `View ${app.shortName} Demo Store`,
                      app.demoHref,
                      app.marketingName,
                    )}
                  >
                    View {app.shortName} Demo Store
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">{sourceNote}</p>
        </Container>
      </Section>

      <Section id="compare" spacing="lg">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-normal">Compare Hyper Apps</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Use the table to compare purpose, limits, setup, demos, and installation paths.
              </p>
            </div>
            <Link
              href="/pricing"
              className="text-sm font-bold text-primary underline-offset-4 hover:underline"
            >
              Compare current pricing sections
            </Link>
          </div>
          <div
            className="mt-8 overflow-x-auto rounded-[8px] border border-border"
            tabIndex={0}
            aria-label="Scrollable Hyper Apps comparison table"
            {...trackedAttrs(
              "apps_compare_click",
              "comparison_table",
              "Scroll comparison table",
              "#compare",
            )}
          >
            <table className="min-w-[980px] w-full border-collapse bg-background text-left text-sm">
              <caption className="sr-only">Side-by-side comparison of Hyper Shopify apps</caption>
              <thead className="sticky top-0 bg-surface">
                <tr>
                  <th scope="col" className="w-48 border-b border-border p-4 font-semibold">
                    Criteria
                  </th>
                  {hyperApps.map((app) => (
                    <th
                      key={app.id}
                      scope="col"
                      className="border-b border-border p-4 font-semibold"
                    >
                      {app.marketingName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, key]) => (
                  <tr key={label} className="border-b border-border last:border-b-0">
                    <th
                      scope="row"
                      className="bg-surface/70 p-4 align-top font-bold text-foreground"
                    >
                      {label}
                    </th>
                    {hyperApps.map((app) => {
                      const value = app[key];
                      if (key === "demoHref")
                        return (
                          <td key={app.id} className="p-4 align-top">
                            <Link
                              href={app.demoHref}
                              className="font-semibold text-primary underline-offset-4 hover:underline"
                              {...trackedAttrs(
                                "apps_demo_click",
                                "comparison_table",
                                `View ${app.shortName} Demo Store`,
                                app.demoHref,
                                app.marketingName,
                              )}
                            >
                              Demo store
                            </Link>
                          </td>
                        );
                      if (key === "internalHref")
                        return (
                          <td key={app.id} className="p-4 align-top">
                            <Link
                              href={app.internalHref}
                              className="font-semibold text-primary underline-offset-4 hover:underline"
                              {...trackedAttrs(
                                "apps_product_view",
                                "comparison_table",
                                app.marketingName,
                                app.internalHref,
                                app.marketingName,
                              )}
                            >
                              Internal product page
                            </Link>
                          </td>
                        );
                      if (key === "installHref")
                        return (
                          <td key={app.id} className="p-4 align-top">
                            <Link
                              href={app.installHref}
                              className="font-semibold text-primary underline-offset-4 hover:underline"
                              aria-label={`Install ${app.marketingName} on Shopify`}
                              {...trackedAttrs(
                                "apps_install_click",
                                "comparison_table",
                                `Install ${app.shortName}`,
                                app.installHref,
                                app.marketingName,
                              )}
                            >
                              Install on Shopify
                            </Link>
                          </td>
                        );
                      return (
                        <td key={app.id} className="p-4 align-top text-muted-foreground">
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{sourceNote}</p>
        </Container>
      </Section>

      <Section
        spacing="lg"
        className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))]"
      >
        <Container>
          <h2 className="text-3xl font-black tracking-normal">
            Which Hyper App Should You Install First?
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            <div className="rounded-[8px] border border-border bg-background p-6">
              <h3 className="font-semibold">Customers cannot find products</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Start with{" "}
                <Link
                  href="/apps/hyper-search-filter"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Hyper Search
                </Link>
                .
              </p>
            </div>
            <div className="rounded-[8px] border border-border bg-background p-6">
              <h3 className="font-semibold">Customers ask repeated questions</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Start with{" "}
                <Link
                  href="/apps/hyper-ai-chat-faq"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Hyper AI Chat
                </Link>
                .
              </p>
            </div>
            <div className="rounded-[8px] border border-border bg-background p-6">
              <h3 className="font-semibold">Videos are not shoppable</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Start with{" "}
                <Link
                  href="/apps/hyper-shoppable-videos"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Hyper Shoppable Videos
                </Link>
                .
              </p>
            </div>
            <div className="rounded-[8px] border border-border bg-background p-6">
              <h3 className="font-semibold">Two or more problems apply</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Start with the largest measured leak, then add the second app after the first is
                configured.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Diagnostic
              title="Search diagnostic"
              items={[
                "What percentage of searches return zero results?",
                "Which search terms produce no relevant products?",
                "Are shoppers using words that differ from catalog terminology?",
                "Do customers abandon collection pages without refining products?",
              ]}
            />
            <Diagnostic
              title="Support diagnostic"
              items={[
                "What are the ten most repeated pre-purchase questions?",
                "How many support conversations concern shipping, sizing, returns, or availability?",
                "How long do shoppers wait for an answer?",
              ]}
            />
            <Diagnostic
              title="Video diagnostic"
              items={[
                "How many visitors watch product videos?",
                "How many video viewers click a product?",
                "Can shoppers add products to cart from the video experience?",
                "Which videos create the most product interest?",
              ]}
            />
          </div>
          <p className="mt-6 text-lg font-semibold">
            Start with the app tied to the largest measurable drop-off.
          </p>
        </Container>
      </Section>
      <Section spacing="lg">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black tracking-normal">
              Use One App or Connect the Full Shopping Journey
            </h2>
            <p className="mt-4 text-muted-foreground">
              Each app can be installed independently, and merchants do not need all three apps. If
              multiple problems are visible, the apps can support different moments in the shopping
              journey: Hyper Search helps shoppers discover relevant products, Hyper AI Chat answers
              questions that block purchase decisions, and Hyper Shoppable Videos helps shoppers
              explore products through video. Combining apps is optional. There is no bundled price
              unless Shopify or NiagaraT publishes one, and this page does not imply native
              cross-app data sharing beyond what is technically confirmed.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {hyperApps.map((app, index) => (
              <li key={app.id} className="rounded-[8px] border border-border bg-surface p-5">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
                <h3 className="mt-2 font-semibold">{app.shortName}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{app.primaryPurpose}</p>
              </li>
            ))}
            <li className="rounded-[8px] border border-border bg-surface p-5">
              <span className="text-sm font-bold text-primary">4</span>
              <h3 className="mt-2 font-semibold">Cart and checkout</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The shopper moves forward after discovery, answers, and product exploration.
              </p>
            </li>
          </ol>
        </Container>
      </Section>

      <Section
        spacing="lg"
        className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))]"
      >
        <Container>
          <h2 className="text-3xl font-black tracking-normal">
            What Happens After You Choose an App?
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {hyperApps.map((app) => (
              <article
                key={app.id}
                className="rounded-[8px] border border-border bg-background p-6"
              >
                <h3 className="text-xl font-semibold">{app.marketingName}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{app.setupNote}</p>
                <p className="mt-4 text-sm">
                  <strong>Integrations:</strong>{" "}
                  <span className="text-muted-foreground">{app.integrations}</span>
                </p>
                <Link
                  href={app.demoHref}
                  className="mt-4 inline-flex text-sm font-bold text-primary underline-offset-4 hover:underline"
                  {...trackedAttrs(
                    "apps_demo_click",
                    "setup",
                    `View ${app.shortName} Demo Store`,
                    app.demoHref,
                    app.marketingName,
                  )}
                >
                  Open demo store
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-normal">See the Apps Before You Install</h2>
            <p className="mt-4 text-muted-foreground">
              Use product evidence instead of unsupported proof: current Shopify listings, current
              plan information, dashboard screenshots, storefront previews, transparent setup
              requirements, and public demo stores.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {hyperApps.map((app) => (
              <Link
                key={app.id}
                href={app.demoHref}
                className="rounded-[8px] border border-border bg-surface p-5 font-semibold text-primary underline-offset-4 transition hover:border-primary/40 hover:underline"
                {...trackedAttrs(
                  "apps_demo_click",
                  "trust",
                  `View ${app.shortName} Demo Store`,
                  app.demoHref,
                  app.marketingName,
                )}
              >
                View {app.shortName} Demo Store
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="border-b border-border bg-background">
        <Container size="md">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Frequently asked questions
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-foreground sm:text-3xl">
              Questions Shopify Merchants Ask Before Choosing
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Use these answers to pick the first app, then confirm current plan details in Shopify.
            </p>
          </header>
          <div className="mt-9 divide-y divide-border rounded-[8px] border border-border bg-surface">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group p-5"
                {...trackedAttrs("apps_faq_interaction", "faq", faq.q, "#faq")}
              >
                <summary className="cursor-pointer list-none text-base font-black text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span aria-hidden="true" className="text-primary">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="rounded-[8px] border border-border bg-primary/10 p-8 text-center sm:p-10">
            <h2 className="text-3xl font-black tracking-normal">
              Start With Your Biggest Storefront Problem
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Choose the Hyper app that addresses your clearest customer drop-off. Review the app
              details, test the demo, or install a free plan through Shopify.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="#compare"
                className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                {...trackedAttrs(
                  "apps_compare_click",
                  "final_cta",
                  "Compare Hyper Apps",
                  "#compare",
                )}
              >
                Compare Hyper Apps
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-primary/30 bg-background px-6 py-3 text-sm font-bold text-primary"
                {...trackedAttrs(
                  "apps_contact_click",
                  "final_cta",
                  "Talk to the Hyper Team",
                  "/contact",
                )}
              >
                Talk to the Hyper Team
              </Link>
            </div>
            <div className="mt-6 flex flex-col justify-center gap-3 text-sm sm:flex-row">
              {hyperApps.map((app) => (
                <Link
                  key={app.id}
                  href={app.installHref}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                  aria-label={`Install ${app.marketingName} on Shopify`}
                  {...trackedAttrs(
                    "apps_install_click",
                    "final_cta",
                    `Install ${app.shortName}`,
                    app.installHref,
                    app.marketingName,
                  )}
                >
                  Install {app.shortName}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Hyper Apps by NiagaraT
              </Link>
              <Link href="/comparisons" className="hover:text-foreground">
                Shopify app comparisons
              </Link>
              <Link href="/tools" className="hover:text-foreground">
                Shopify tools
              </Link>
              <Link href="/resources" className="hover:text-foreground">
                Shopify documentation and resources
              </Link>
              <Link href="/blog" className="hover:text-foreground">
                Shopify app articles
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Diagnostic({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[8px] border border-border bg-background p-6">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-[6px] bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


