import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/config/metadata";
import { toJsonLd } from "@/lib/schema";

const title = "Shopify AI Apps for Search, Support & Video | Hyper Apps";
const description =
  "Improve Shopify product discovery, automate customer support, and turn product videos into shoppable experiences with Hyper Apps. Install free or book a demo.";
const siteUrl = "https://niagarat.com/";
const links = {
  search: "/apps/hyper-search-filter",
  chat: "/apps/hyper-ai-chat-faq",
  video: "/apps/hyper-shoppable-videos",
};

export const metadata = createPageMetadata({ title, description, path: "/" });

const problems = [
  [
    "Customers Cannot Find the Right Products",
    "Help shoppers discover relevant products using AI-powered search, filters, synonyms, typo tolerance, merchandising rules, and search analytics.",
    "Explore Shopify AI Search and Filters",
    links.search,
    "search_app_page_click",
  ],
  [
    "Customers Leave With Unanswered Questions",
    "Give shoppers instant answers about products, sizing, shipping, returns, availability, and store policies using an AI chatbot trained on approved store content.",
    "Explore the Shopify AI Chatbot",
    links.chat,
    "chat_app_page_click",
  ],
  [
    "Product Videos Get Views but Not Purchases",
    "Turn product videos, social content, and user-generated content into shoppable experiences that let customers discover and purchase products directly.",
    "Explore Shopify Shoppable Videos",
    links.video,
    "video_app_page_click",
  ],
] as const;

const demos = [
  {
    name: "Hyper Search & Product Filters",
    href: links.search,
    img: "/search-banner.png",
    event: "search_app_page_click",
    alt: "Hyper Search and Product Filters interface showing Shopify storefront search and filtering controls",
    problem: "Shoppers use different words than your catalog uses.",
    solution:
      "Map related searches such as sneakers, trainers, and running shoes to the same products using synonym rules. Review zero-result searches to see what shoppers want but cannot find.",
    caps: [
      "Show product, collection, and popular-search suggestions while shoppers type.",
      "Create filters from Shopify data such as tags, vendors, variants, prices, collections, and metafields.",
      "Use merchandising rules, pinned products, synonyms, typo tolerance, and analytics to improve search results.",
    ],
    cta: "Explore Hyper Search & Product Filters for Shopify",
  },
  {
    name: "Hyper AI Chat & FAQs",
    href: links.chat,
    img: "/aichat-banner.png",
    event: "chat_app_page_click",
    alt: "Hyper AI Chat and FAQs interface showing a Shopify customer support chat experience",
    problem: "Shoppers leave when simple questions go unanswered.",
    solution:
      "Train the chatbot using your product descriptions, shipping policy, returns page, FAQs, and approved store content. When shoppers ask about delivery, sizing, availability, or returns, Hyper Apps by NiagaraT retrieves an answer from the information you control.",
    caps: [
      "Answer product, shipping, returns, sizing, availability, and store-policy questions from approved content.",
      "Publish a searchable FAQ page so shoppers can find common answers without opening a ticket.",
      "Review chat history and support analytics to spot gaps in your store content.",
    ],
    cta: "Explore Hyper AI Chat & FAQs for Shopify",
  },
  {
    name: "Hyper Shoppable Videos",
    href: links.video,
    img: "/shoppable-banner.png",
    event: "video_app_page_click",
    alt: "Hyper Shoppable Videos interface showing product-tagged video commerce for a Shopify store",
    problem: "Videos get attention but do not always move shoppers to a product.",
    solution:
      "Tag products inside videos and place shoppable widgets on your Shopify storefront. Shoppers can watch demos, styling clips, tutorials, or UGC-style content and continue toward the featured products.",
    caps: [
      "Tag Shopify products in videos so shoppers can explore featured items while they watch.",
      "Use storefront widgets for product pages, home pages, and other video placements supported by your setup.",
      "Review video analytics to see which product content receives shopper engagement.",
    ],
    cta: "Explore Hyper Shoppable Videos for Shopify",
  },
] as const;

const proof = [
  "Help customers discover relevant products",
  "Answer repetitive shopping questions instantly",
  "Turn product content into interactive shopping experiences",
  "Give merchants clearer insight into shopper behavior",
];
const rows = [
  [
    "Main use case",
    "Storefront search, collection filters, merchandising, and product discovery.",
    "AI chatbot answers and searchable FAQs for customer questions.",
    "Product-tagged videos and shoppable storefront video widgets.",
  ],
  [
    "Best-fit merchant",
    "Stores with growing catalogs, many product attributes, or hard-to-find products.",
    "Stores that answer repeated product, shipping, returns, sizing, or policy questions.",
    "Stores with demos, social clips, tutorials, styling content, or UGC-style product videos.",
  ],
  [
    "Primary customer problem",
    "The shopper cannot find the right item or receives weak search results.",
    "The shopper has a purchase question and does not get an answer fast enough.",
    "The shopper watches content but does not have a clear next step to the product.",
  ],
  [
    "Key capabilities",
    "Search suggestions, filters, synonyms, typo tolerance, merchandising rules, and analytics.",
    "AI chat, searchable FAQs, approved store content, chat history, branding, and analytics.",
    "Product tags, shoppable widgets, social-style content, add-to-cart paths where supported, and analytics.",
  ],
  [
    "Setup requirements",
    "Install the Shopify app, enable the app embed, and configure search and filters.",
    "Install the Shopify app, add approved content, and configure chat and FAQ settings.",
    "Install the Shopify app, upload or import videos, tag products, and place widgets.",
  ],
  [
    "Shopify compatibility",
    "The product page confirms Online Store 2.0 theme support and no-code app embed setup.",
    "Built for Shopify stores; theme-specific setup should be checked on the product page or with support.",
    "Built for Shopify storefronts; widget placement depends on the selected plan and store setup.",
  ],
  [
    "Pricing or free-plan availability",
    "Free, Starter, Professional, and Enterprise plans are listed on the product page.",
    "Check the product page for current plan and pricing details.",
    "A free plan and paid tiers are listed on the product page.",
  ],
  [
    "Primary metric to track",
    "Search usage, zero-result searches, filter use, and product clicks from search.",
    "Answered questions, FAQ usage, repeated topics, and support conversations avoided.",
    "Video engagement, product interactions, add-to-cart paths where supported, and product clicks.",
  ],
] as const;
const compatibility = [
  [
    "Theme compatibility",
    "Hyper Search & Product Filters lists support for Shopify Online Store 2.0 themes on its product page. For chat and video widgets, confirm theme-specific placement on the product page or with support.",
  ],
  [
    "Installation requirements",
    "Each app is installed through Shopify. Standard setup uses app embeds or storefront widgets, then merchant-controlled settings inside the app.",
  ],
  [
    "Coding required",
    "The search product page states that standard installation requires no Liquid code changes. For custom themes or unusual layouts, ask support before launch.",
  ],
  [
    "Catalog-size suitability",
    "Hyper Search & Product Filters lists plan-based catalog limits up to 200,000 products on Enterprise. For chat and video, check the product pages for current plan limits.",
  ],
  [
    "Merchant support",
    "Support is available through Hyper Apps by NiagaraT at support@niagarat.com and through the contact page.",
  ],
  [
    "Setup time and integrations",
    "Setup time depends on catalog size, content readiness, theme setup, and how many widgets or rules you configure. Shopify is the verified platform integration across the suite.",
  ],
] as const;
const journey = [
  "A shopper searches for a product",
  "Hyper Search helps them find the right item",
  "Hyper AI Chat answers purchase questions",
  "Hyper Shoppable Video provides additional product discovery and social proof",
  "The shopper proceeds to purchase",
];
const faqs = [
  [
    "Which Hyper app should I install first?",
    "Start with the app that matches your biggest leak. Choose Hyper Search & Product Filters if shoppers struggle to find products, Hyper AI Chat & FAQs if questions block purchases, or Hyper Shoppable Videos if product content gets attention but does not move shoppers to products.",
  ],
  [
    "Can I use all three Hyper apps together?",
    "Yes. The apps solve different parts of the buying journey. You can use one app on its own or combine search, chat, and shoppable video when your store needs all three.",
  ],
  [
    "Do the apps work with Shopify Online Store 2.0 themes?",
    "Hyper Search & Product Filters lists Shopify Online Store 2.0 theme support on its product page. For chat and video placements, check the product pages or contact support to confirm details for your theme.",
  ],
  [
    "Is coding required?",
    "The search app product page states that standard setup uses Shopify app embeds and does not require Liquid code changes. Custom themes or custom placements may need extra review from support.",
  ],
  [
    "Will the apps slow down my Shopify store?",
    "The search app product page states that its storefront widget loads asynchronously. For chat and video, review the product pages and test your live theme because performance depends on placement, media size, and store setup.",
  ],
  [
    "Is there a free plan?",
    "Hyper Search & Product Filters and Hyper Shoppable Videos list free plans on their product pages. For Hyper AI Chat & FAQs, check the product page for current pricing before installing.",
  ],
  [
    "How long does setup take?",
    "Setup depends on your store. Search setup depends on catalog size and filter rules. Chat setup depends on your approved content. Video setup depends on how many videos you upload, tag, and place.",
  ],
  [
    "What support is available?",
    "You can contact Hyper Apps by NiagaraT through the contact page or email support@niagarat.com. Product pages also list plan-specific support details where available.",
  ],
  [
    "Can the AI chatbot use my store policies and product information?",
    "Yes. The AI chatbot product page says the app can use store content such as FAQs, product information, policies, and support guidance when that content is approved and available.",
  ],
  [
    "Can shoppable videos link directly to product pages?",
    "Hyper Shoppable Videos supports product-tagged videos so shoppers can explore featured products. Add-to-cart paths and placements depend on the selected plan and widget setup.",
  ],
] as const;

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}#webpage`,
  name: title,
  description,
  url: siteUrl,
  isPartOf: { "@id": `${siteUrl}#website` },
  about: { "@id": `${siteUrl}#hyper-apps-suite` },
  publisher: { "@id": `${siteUrl}#organization` },
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}#homepage-faq`,
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

type TrackLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
  event: string;
  label: string;
};
function TrackLink({ href, children, className, event, label }: TrackLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      data-analytics-event={event}
      data-analytics-label={label}
    >
      {children}
    </Link>
  );
}
function Primary({ href, children, event, label }: Omit<TrackLinkProps, "className">) {
  return (
    <TrackLink
      href={href}
      event={event}
      label={label}
      className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_16px_34px_-18px_hsl(var(--primary)/0.85)] transition hover:bg-primary/90 hover:shadow-[0_18px_34px_-20px_hsl(var(--primary)/0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
    </TrackLink>
  );
}
function Secondary({ href, children, event, label }: Omit<TrackLinkProps, "className">) {
  return (
    <TrackLink
      href={href}
      event={event}
      label={label}
      className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-surface px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary/30 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
    </TrackLink>
  );
}
function Header({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-black tracking-normal text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{text}</p>
    </header>
  );
}
function CaseStudyTemplate({ hasCaseStudy = false }: { hasCaseStudy?: boolean }) {
  if (!hasCaseStudy) return null;
  return (
    <article
      className="mt-8 rounded-[10px] border border-border bg-surface p-6"
      aria-label="CMS-ready case study template"
    >
      <h3>Customer case study</h3>
    </article>
  );
}
export default function HomePage() {
  return (
    <>
      {[webpageSchema, faqSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(schema) }}
        />
      ))}
      <section className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8">
          <header>
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Hyper Apps by NiagaraT
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              AI Apps That Help Shopify Stores Convert More Shoppers
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Help shoppers find the right products, get instant answers, and purchase directly from
              engaging product videos. Hyper Apps gives Shopify merchants AI-powered search,
              customer support, and shoppable video tools in one conversion-focused suite.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Primary
                href="#choose-hyper-app"
                event="hero_primary_cta_click"
                label="Explore Hyper Apps"
              >
                Explore Hyper Apps
              </Primary>
              <Secondary href="/contact" event="demo_booking_click" label="Book a Demo">
                Book a Demo
              </Secondary>
            </div>
            <p className="mt-6 max-w-2xl text-sm font-medium leading-6 text-foreground">
              Built for Shopify merchants who want better product discovery, faster customer
              support, and more engaging shopping experiences.
            </p>
          </header>
          <div className="rounded-[10px] border border-border bg-surface p-3 shadow-[0_24px_70px_-44px_hsl(var(--shadow)/0.9)]">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Image
                  src="/search-banner.png"
                  alt="Hyper Search interface showing Shopify product discovery tools"
                  width={1200}
                  height={820}
                  priority
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="aspect-[16/9] w-full rounded-[8px] object-cover object-top"
                />
              </div>
              <Image
                src="/aichat-banner.png"
                alt="Hyper AI Chat interface for Shopify customer support questions"
                width={900}
                height={700}
                loading="lazy"
                sizes="(min-width: 1024px) 250px, 50vw"
                className="aspect-[4/3] w-full rounded-[8px] object-cover object-top"
              />
              <Image
                src="/shoppable-banner.png"
                alt="Hyper Shoppable Videos interface for product-tagged Shopify videos"
                width={900}
                height={700}
                loading="lazy"
                sizes="(min-width: 1024px) 250px, 50vw"
                className="aspect-[4/3] w-full rounded-[8px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="choose-hyper-app"
        className="border-b border-border bg-background py-14 sm:py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header
            eyebrow="Choose the problem you want to solve"
            title="Start With the Buying Friction You Can See"
            text="Each Hyper app solves a different Shopify customer-experience problem. Pick one app first, or combine them when your store needs a fuller journey."
          />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {problems.map(([h, d, c, href, event]) => (
              <article
                key={h}
                className="flex h-full flex-col rounded-[8px] border border-border bg-surface p-6 shadow-[0_18px_48px_-42px_hsl(var(--shadow)/0.75)]"
              >
                <h3 className="text-xl font-black leading-tight text-foreground">{h}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{d}</p>
                <TrackLink
                  href={href}
                  event="product_card_click"
                  label={h}
                  className="mt-6 inline-flex text-sm font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {c}
                </TrackLink>
                <TrackLink href={href} event={event} label={c} className="sr-only">
                  {c}
                </TrackLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/35 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header
            eyebrow="Shopify app use cases"
            title="Match Each Customer Problem to the Right Shopify AI App"
            text="Compare how Hyper Apps by NiagaraT improves product discovery, answers pre-purchase questions, and turns product videos into shopping paths. Each example shows the problem, the workflow, and the features to review before you install."
          />
          <div className="mt-10 space-y-8">
            {demos.map((demo, index) => (
              <article
                key={demo.name}
                className="grid gap-7 rounded-[10px] border border-border bg-surface p-5 shadow-[0_18px_54px_-42px_hsl(var(--shadow)/0.82)] md:grid-cols-[0.95fr_1.05fr] md:items-center md:p-7"
              >
                <div className={index % 2 ? "md:order-2" : ""}>
                  <Image
                    src={demo.img}
                    alt={demo.alt}
                    width={1200}
                    height={820}
                    loading="lazy"
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="aspect-[16/10] w-full rounded-[8px] border border-border object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {demo.name}
                  </p>
                  <h3 className="mt-3 text-2xl font-black leading-tight text-foreground">
                    {demo.problem}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{demo.solution}</p>
                  <ul className="mt-5 space-y-3">
                    {demo.caps.map((cap) => (
                      <li key={cap} className="flex gap-3 text-sm leading-6 text-foreground">
                        <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                  <TrackLink
                    href={demo.href}
                    event={demo.event}
                    label={demo.name}
                    className="mt-6 inline-flex text-sm font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {demo.cta}
                  </TrackLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header
            eyebrow="Proof-safe product value"
            title="Built to Remove Friction From the Shopify Buying Journey"
            text="Hyper Apps by NiagaraT focuses on practical moments where shoppers need help before they buy. Public proof such as named case studies or verified metrics should be added here only after the source exists."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((p) => (
              <div key={p} className="rounded-[8px] border border-border bg-surface p-5">
                <p className="text-sm font-bold leading-6 text-foreground">{p}</p>
              </div>
            ))}
          </div>
          <CaseStudyTemplate />
        </div>
      </section>
      <section className="border-b border-border bg-muted/35 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header
            eyebrow="Compare the apps"
            title="Decide Which Hyper App to Install First"
            text="Use this table to match your first install to the customer problem you want to solve now."
          />
          <div className="mt-9 overflow-x-auto rounded-[8px] border border-border bg-surface">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of Hyper Apps by NiagaraT for Shopify search, AI chat, and shoppable
                video use cases.
              </caption>
              <thead>
                <tr className="border-b border-border bg-background">
                  <th scope="col" className="w-48 p-4 font-black text-foreground">
                    Decision point
                  </th>
                  <th scope="col" className="p-4 font-black text-foreground">
                    Hyper Search & Product Filters
                  </th>
                  <th scope="col" className="p-4 font-black text-foreground">
                    Hyper AI Chat & FAQs
                  </th>
                  <th scope="col" className="p-4 font-black text-foreground">
                    Hyper Shoppable Videos
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, search, chat, video]) => (
                  <tr key={label} className="border-b border-border last:border-b-0">
                    <th scope="row" className="p-4 align-top font-bold text-foreground">
                      {label}
                    </th>
                    <td className="p-4 align-top leading-6 text-muted-foreground">{search}</td>
                    <td className="p-4 align-top leading-6 text-muted-foreground">{chat}</td>
                    <td className="p-4 align-top leading-6 text-muted-foreground">{video}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="p-4 align-top font-bold text-foreground">
                    Product-page CTA
                  </th>
                  <td className="p-4">
                    <TrackLink
                      href={`${links.search}#pricing`}
                      event="pricing_click"
                      label="Search pricing"
                      className="font-bold text-primary underline underline-offset-4"
                    >
                      See search app pricing and install options
                    </TrackLink>
                  </td>
                  <td className="p-4">
                    <TrackLink
                      href={`${links.chat}#pricing`}
                      event="pricing_click"
                      label="Chat pricing"
                      className="font-bold text-primary underline underline-offset-4"
                    >
                      See AI chatbot pricing and install options
                    </TrackLink>
                  </td>
                  <td className="p-4">
                    <TrackLink
                      href={`${links.video}#pricing`}
                      event="pricing_click"
                      label="Video pricing"
                      className="font-bold text-primary underline underline-offset-4"
                    >
                      See shoppable video pricing and install options
                    </TrackLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header
            eyebrow="Shopify compatibility"
            title="Built for Real Shopify Stores"
            text="These notes use information visible in the current product pages and avoid claims that still need owner confirmation."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {compatibility.map(([h, t]) => (
              <article key={h} className="rounded-[8px] border border-border bg-surface p-5">
                <h3 className="text-base font-black text-foreground">{h}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{t}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 text-center text-sm leading-6 text-muted-foreground">
            Review the{" "}
            <Link
              href={links.search}
              className="font-bold text-primary underline underline-offset-4"
            >
              Shopify search app details
            </Link>
            ,{" "}
            <Link href={links.chat} className="font-bold text-primary underline underline-offset-4">
              AI chatbot app details
            </Link>
            , and{" "}
            <Link
              href={links.video}
              className="font-bold text-primary underline underline-offset-4"
            >
              shoppable video app details
            </Link>
            , or{" "}
            <Link
              href="/contact"
              className="font-bold text-primary underline underline-offset-4"
              data-analytics-event="demo_booking_click"
              data-analytics-label="Compatibility contact"
            >
              book a demo
            </Link>{" "}
            for store-specific guidance.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/35 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header
            eyebrow="How the apps work together"
            title="Turn More Store Visits Into Buying Journeys"
            text="Merchants can use one Hyper app independently or combine the apps when discovery, support, and product content all need attention."
          />
          <ol className="mt-9 grid gap-4 md:grid-cols-5">
            {journey.map((step, i) => (
              <li key={step} className="rounded-[8px] border border-border bg-surface p-5">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm font-bold leading-6 text-foreground">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm">
            <TrackLink
              href={links.search}
              event="search_app_page_click"
              label="Journey search"
              className="font-bold text-primary underline underline-offset-4"
            >
              Explore the Shopify search app
            </TrackLink>
            <TrackLink
              href={links.chat}
              event="chat_app_page_click"
              label="Journey chat"
              className="font-bold text-primary underline underline-offset-4"
            >
              Explore the Shopify AI chatbot
            </TrackLink>
            <TrackLink
              href={links.video}
              event="video_app_page_click"
              label="Journey video"
              className="font-bold text-primary underline underline-offset-4"
            >
              Explore Shopify shoppable videos
            </TrackLink>
          </div>
        </div>
      </section>

      <section id="faqs" className="border-b border-border bg-background py-14 sm:py-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Header
            eyebrow="Frequently asked questions"
            title="Questions Shopify Merchants Ask Before Installing"
            text="Answers are cautious where plan, theme, or setup details can change."
          />
          <div className="mt-9 divide-y divide-border rounded-[8px] border border-border bg-surface">
            {faqs.map(([q, a]) => (
              <details
                key={q}
                className="group p-5"
                data-analytics-event="faq_interaction"
                data-analytics-label={q}
              >
                <summary className="cursor-pointer list-none text-base font-black text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {q}
                    <span aria-hidden="true" className="text-primary">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-7 text-center text-sm text-muted-foreground">
            Need store-specific help?{" "}
            <Link
              href="/contact"
              className="font-bold text-primary underline underline-offset-4"
              data-analytics-event="demo_booking_click"
              data-analytics-label="FAQ contact"
            >
              Contact Hyper Apps by NiagaraT support
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-normal text-foreground sm:text-4xl">
            Start With the Biggest Conversion Leak in Your Store
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Choose the Hyper app that solves your most urgent customer-experience problem, or book a
            demo to find the best starting point.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Primary
              href="#choose-hyper-app"
              event="hero_primary_cta_click"
              label="Final Explore Hyper Apps"
            >
              Explore Hyper Apps
            </Primary>
            <Secondary href="/contact" event="demo_booking_click" label="Final Book a Demo">
              Book a Demo
            </Secondary>
          </div>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            Learn more about{" "}
            <Link href="/about" className="font-bold text-primary underline underline-offset-4">
              Hyper Apps by NiagaraT
            </Link>
            , browse{" "}
            <Link href="/resources" className="font-bold text-primary underline underline-offset-4">
              Shopify ecommerce resources
            </Link>
            , read the{" "}
            <Link
              href="/blog/how-to-increase-conversions-and-turn-more-visitors-into-customers"
              className="font-bold text-primary underline underline-offset-4"
            >
              Shopify conversion guide
            </Link>
            , or compare options in the{" "}
            <Link
              href="/comparisons"
              className="font-bold text-primary underline underline-offset-4"
            >
              Shopify app comparisons
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
