import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, CheckCircle2, ExternalLink, Filter, Search, Settings2, SlidersHorizontal, Sparkles, Zap } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AppPageLinkSection } from "@/components/app-page-link-section";
import { ProductVisualGallery } from "@/components/product-visual-gallery";
import { canonicalUrl } from "@/config/metadata";
import { languageAlternates } from "@/lib/i18n/metadata";
import { getHyperApp, hyperAppsUpdatedAt } from "@/data/hyper-apps";
import { toJsonLd } from "@/lib/schema";

const searchApp = getHyperApp("search");
if (!searchApp) throw new Error("Search app data is missing");

const productName = "Hyper Search & Filter";
const installUrl = searchApp.installHref;
const demoUrl = searchApp.demoHref;
const pageUrl = canonicalUrl(searchApp.internalHref);
const softwareId = `${pageUrl}#software`;
const webPageId = `${pageUrl}#webpage`;
const breadcrumbId = `${pageUrl}#breadcrumb`;
const faqId = `${pageUrl}#faq`;
const organizationId = `${canonicalUrl("/")}#organization`;
const websiteId = `${canonicalUrl("/")}#website`;
const pricingNote = "Plans and limits may change. The Shopify App Store listing is the source of truth for current billing information.";

export const metadata = {
  title: { absolute: "Shopify AI Search & Product Filter App | Hyper" },
  description: "Add AI search, instant suggestions, typo tolerance, collection filters and search analytics to Shopify. Install Hyper Search & Filter free.",
  alternates: languageAlternates(searchApp.internalHref),
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "AI Search and Product Filters for Shopify | Hyper",
    description: "Help Shopify shoppers find the right products with instant AI search, flexible filters, synonyms, typo tolerance and product-discovery analytics.",
    images: [{ url: canonicalUrl(searchApp.screenshot), width: 1200, height: 630, alt: searchApp.screenshotAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Search and Product Filters for Shopify | Hyper",
    description: "Help Shopify shoppers find the right products with instant AI search, flexible filters, synonyms, typo tolerance and product-discovery analytics.",
    images: [canonicalUrl(searchApp.screenshot)],
  },
};

const trustItems = ["Free plan available", "14-day trial on paid plans", "Up to 200,000 products", "Real-time product synchronization", "Install through Shopify"];
const productVisuals = [
  { src: "/search-banner.png", alt: "Hyper Search storefront search and product filter interface showing sneaker results", title: "Search and filter storefront experience", body: "Show shoppers searchable product results, filters, swatches, sorting, and relevant product cards in one discovery flow." },
  { src: "/search-benefit-1.png", alt: "Hyper Search instant search suggestions interface", title: "Instant search suggestions", body: "Help shoppers move from query to relevant products without waiting for a full collection-page reload." },
  { src: "/search-benefit-2.png", alt: "Hyper Search filter controls for Shopify collections", title: "Collection and product filters", body: "Let merchants organize catalog browsing with filters that match product attributes and shopper intent." },
  { src: "/search-benefit-3.png", alt: "Hyper Search analytics dashboard for shopper search behavior", title: "Search behavior analytics", body: "Review search and filter activity to find missed language, zero-result queries, and merchandising opportunities." },
];
const problems = ["Searches returning no useful result", "Misspellings and alternative wording", "Catalog terminology differing from customer language", "Large collections being difficult to browse", "Too many variants and attributes", "Limited filtering options", "Merchants not knowing what shoppers search for", "Important products appearing too low in results"];

const demoSteps = [
  ["A shopper begins typing", "Instant search suggestions appear while the query is still being entered."],
  ["Relevant products and collections appear", "The storefront can show product matches, collections, and search suggestions in one discovery path."],
  ["A misspelled search still helps", "Typo tolerance supports useful results when a shopper enters a close variation of a catalog term."],
  ["Filters narrow the result set", "Shoppers can refine products by collection, vendor, variants, size, color, price, tags, and metafields."],
  ["The merchant reviews analytics", "Search queries, filter usage, and zero-result reports help reveal where product discovery needs attention."],
];

const capabilities = [
  { icon: Sparkles, title: "Instant AI Search", body: "Show products, collections, and search suggestions as shoppers type. Help customers move from a query to relevant products with fewer steps.", note: "Verified listing features include instant search, AI search, search suggestions, search bar, and product recommendations." },
  { icon: Zap, title: "Typo-Tolerant Results", body: "Return useful products when shoppers misspell a word or use a close variation of a catalog term.", note: "Typo tolerance is included on the Free plan and above." },
  { icon: Settings2, title: "Synonym Management", body: "Connect customer language with catalog terminology. Map terms such as trainers, sneakers, and running shoes to relevant products.", note: "Starter includes 50 synonyms. Professional and Enterprise include unlimited synonyms." },
  { icon: Filter, title: "Advanced Product Filters", body: "Let shoppers refine collections and search results using verified attributes such as collection, vendor, variant, size, color, price, tags, and metafields.", note: "Free includes up to 15 filters and two filter trees. Paid plans expand filter and filter-tree limits." },
  { icon: SlidersHorizontal, title: "Merchandising Controls", body: "Control search relevance with verified listing capabilities such as custom ranking and exclude results, then use synonyms and filters to guide important discovery paths.", note: "Use plan-specific controls only after confirming the setting is available in your store." },
  { icon: BarChart3, title: "Search and Filter Analytics", body: "Review search queries, filter usage, and zero-result searches to understand what shoppers want and where product discovery breaks down.", note: "Analytics-history limits vary by plan from seven days to unlimited history." },
  { icon: Search, title: "Real-Time Catalog Synchronization", body: "Keep search results and filters current when Shopify products, collections, variants, or inventory change.", note: "The Shopify listing states real-time product sync." },
  { icon: Settings2, title: "Storefront Customization", body: "Adjust the search experience, filtering layout, and storefront styling to fit the store theme.", note: "Custom CSS starts on Starter. Color and size swatches are listed on Enterprise." },
];

const workSteps = [
  ["Step 1", "Install the Shopify App", "Install through Shopify and connect the app to the store catalog."],
  ["Step 2", "Index Products and Collections", "Synchronize the product information required for search and filtering."],
  ["Step 3", "Configure Search and Filters", "Set synonyms, filter attributes, display settings, and relevant merchandising options."],
  ["Step 4", "Measure Shopper Behavior", "Review search queries, filter activity, and zero-result reports to improve product discovery over time."],
];

const bestFit = [
  "Stores with large or growing catalogs",
  "Stores with many product variants",
  "Stores using metafields and detailed attributes",
  "Stores with technical product terminology",
  "Fashion, automotive, parts, electronics, home, beauty, wholesale, and similar filter-heavy catalogs",
  "Merchants receiving frequent I cannot find it questions",
  "Stores with significant search traffic",
];
const simplerFit = ["The catalog has very few products", "Customers rarely use storefront search", "Shopify native filtering already covers every requirement", "The merchant does not need advanced analytics, synonyms, or merchandising controls"];
const comparisonRows = [
  ["Product limit", "Native limits depend on Shopify catalog and theme setup", "Free up to 50 products; paid plans up to 200,000 products"],
  ["Instant suggestions", "Basic storefront behavior depends on theme and Shopify configuration", "Listed support for instant search, suggestions, and search bar"],
  ["Typo tolerance", "Not positioned as a dedicated typo-tolerant search layer", "Typo tolerance is listed and included from Free"],
  ["Synonym controls", "Useful for basic synonym needs", "50 synonyms on Starter; unlimited synonyms on Professional and Enterprise"],
  ["Filter-tree controls", "Native filters can be enough for straightforward catalogs", "Free includes two filter trees; paid plans list unlimited filter trees"],
  ["Metafield filters", "Supported by Shopify when configured", "Listed filtering by metafields, variants, collection, vendor, size, color, and more"],
  ["Search templates", "Theme-dependent", "Four search templates on Free"],
  ["Merchandising controls", "Useful native controls for many stores", "Listing includes custom ranking and exclude results"],
  ["Search-query analytics", "Limited native visibility", "Search queries and behavior insights are listed"],
  ["Filter-usage analytics", "Limited native visibility", "Professional and Enterprise list filter-usage analytics"],
  ["Zero-result reporting", "Limited native visibility", "Enterprise lists zero-result reports"],
  ["Analytics-history duration", "Varies by Shopify analytics surface", "7 days, 30 days, 1 year, or unlimited by plan"],
  ["Custom CSS", "Theme-dependent", "Starter and above list Custom CSS"],
  ["Branding removal", "Not applicable", "Professional lists removing powered by branding"],
  ["Support level", "Shopify support plus theme/app support as applicable", "Basic, Priority, or Dedicated priority support by plan"],
];
const diagnosisQuestions = ["What percentage of searches return zero results?", "Which queries produce irrelevant products?", "What terms do shoppers use that are missing from the catalog?", "Which filters are used most often?", "Which collection pages have high exit rates?", "Which searches lead to product clicks?", "Are shoppers finding products on mobile?"];
const compatibilityItems = [
  ["Installation method", "Install through the official Shopify App Store listing."],
  ["Theme app embeds", "The listing confirms Online Store theme and script-tag access. Verify placement in your theme before publishing changes."],
  ["Shopify Online Store 2.0", "Use Shopify theme testing to confirm the final widget behavior on the active theme."],
  ["Liquid changes", "Standard installation is handled through Shopify. Confirm custom Liquid needs with support if your theme is heavily customized."],
  ["Product synchronization", "The listing states real-time product sync for products and collections."],
  ["Metafield support", "The listing states filters can use metafields."],
  ["Mobile behavior", "The listing includes mobile responsive display customization. Test the live storefront on mobile after installation."],
  ["Supported languages", "The Shopify listing shows English."],
  ["Data access", "The listing states access to device and activity data, store owner and blog contributor data, products, orders from the last 60 days, Online Store data, and metaobjects."],
  ["Performance", "Test the implementation on your theme and monitor Core Web Vitals after installation."],
];
const faqs = [
  ["What does Hyper Search & Filter replace?", "It improves storefront product search, autocomplete, collection filtering, synonym handling, and discovery analytics. It does not replace Shopify admin search."],
  ["How is it different from Shopify Search & Discovery?", "Shopify Search & Discovery may be sufficient for smaller stores with straightforward filtering needs. Hyper Search & Filter is intended for merchants who need additional control, analytics, catalog scale, or search customization."],
  ["Does it support typo tolerance?", "Yes. Typo tolerance is listed by Shopify and is included from the Free plan."],
  ["Can I create filters from Shopify metafields?", "Yes. The Shopify listing says filters can use metafields, along with collection, vendor, variant, size, color, and more."],
  ["Can I filter by variants, size, color, vendor, and collection?", "Yes. The listing names collection, vendor, variants, size, color, and metafields as supported filtering attributes."],
  ["Can I add synonyms?", "Yes. Starter includes 50 synonyms. Professional and Enterprise include unlimited synonyms."],
  ["Does it show products as shoppers type?", "Yes. The listing includes instant search, AI search, search suggestions, product recommendations, and search bar features."],
  ["Can I review zero-result searches?", "Zero-result reports are listed on the Enterprise plan."],
  ["How quickly do product updates synchronize?", "The listing states real-time product sync. Test the behavior in your catalog before relying on exact timing for operational workflows."],
  ["Does it work on mobile?", "The listing includes mobile responsive display customization. Review the demo store and test your own theme on mobile after installation."],
  ["Does installation require code?", "Installation starts through Shopify. If your theme is customized, confirm whether any theme-specific adjustment is needed before publishing."],
  ["Is there a free plan?", "Yes. The Free plan is listed at $0 for stores with up to 50 products."],
  ["How long is the paid-plan trial?", "Starter, Professional, and Enterprise each list a 14-day free trial."],
  ["Which plan is right for my catalog size?", "Use Free up to 50 products, Starter up to 5,000, Professional up to 50,000, and Enterprise up to 200,000 products."],
  ["Can I see a live demo before installing?", "Yes. Use the demo store linked from this page and the official Shopify listing."],
  ["What store data does the app access?", "The Shopify listing states access to device and activity data, store owner and contributor data, products, orders from the last 60 days, Online Store data, and metaobjects."],
];
const resources = [
  ["Compare Hyper Apps", "/apps", "Choose between search, AI chat, and shoppable video tools."],
  ["Shopify app comparisons", "/comparisons", "Review app alternatives and product-discovery options."],
  ["Shopify tools", "/tools", "Use calculators and utilities for Shopify planning."],
  ["Shopify resources", "/resources", "Read implementation guides for Shopify merchants."],
  ["Hyper Apps by NiagaraT", "/", "See the parent Hyper Apps product family."],
];
const otherApps = [
  ["Shopify AI chatbot", "/apps/hyper-ai-chat-faq", "Answer repeated customer questions with Hyper AI Chat & FAQs."],
  ["Shopify shoppable video app", "/apps/hyper-shoppable-videos", "Turn product videos into product-tagged shopping moments."],
  ["Compare Hyper Apps", "/apps", "Compare the full Hyper Apps suite."],
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": breadcrumbId,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
    { "@type": "ListItem", position: 2, name: "Apps", item: canonicalUrl("/apps") },
    { "@type": "ListItem", position: 3, name: productName, item: pageUrl },
  ],
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": webPageId, name: "Shopify AI Search & Product Filter App | Hyper", url: pageUrl, isPartOf: { "@id": websiteId }, breadcrumb: { "@id": breadcrumbId }, about: { "@id": softwareId }, mainEntity: { "@id": softwareId }, description: metadata.description },
    {
      "@type": "SoftwareApplication",
      "@id": softwareId,
      name: productName,
      alternateName: "Hyper Search & Product Filters",
      applicationCategory: "Shopify application",
      applicationSubCategory: "Search and filters",
      operatingSystem: "Shopify",
      url: pageUrl,
      sameAs: installUrl,
      installUrl,
      screenshot: canonicalUrl(searchApp.screenshot),
      image: canonicalUrl(searchApp.screenshot),
      datePublished: "2026-05-12",
      publisher: { "@id": organizationId },
      developer: { "@id": organizationId },
      description: "Hyper Search & Filter adds AI search, instant suggestions, typo tolerance, advanced product filters, search analytics, and real-time product sync to Shopify storefronts.",
      offers: searchApp.plans.map((plan) => ({ "@type": "Offer", name: plan.name, price: plan.price === "$0" ? "0" : plan.price.replace(/[^0-9.]/g, ""), priceCurrency: "USD", url: installUrl, description: [plan.productLimit, plan.annual, plan.trial, ...plan.limits].filter(Boolean).join("; ") })),
      featureList: ["Instant search", "AI search", "Typo tolerance", "Search suggestions", "Multi-filter", "Custom ranking", "Exclude results", "Mobile responsive", "Custom CSS", "Custom filters", "Search results page", "Sorting", "AI insights", "Conversion tracking", "Custom dashboards", "Behavior insights", "Search queries"],
    },
  ],
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "@id": faqId, mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

function analyticsAttrs(event: string, sectionName: string, ctaText: string, destination: string, extra?: Record<string, string>) {
  return { "data-analytics-event": event, "data-analytics-section": sectionName, "data-analytics-cta": ctaText, "data-analytics-destination": destination, ...extra };
}
function ExternalCta({ href, children, sectionName, event = "search_app_install_click", className, ctaText, planName }: { href: string; children: ReactNode; sectionName: string; event?: string; className: string; ctaText: string; planName?: string }) {
  return <Link href={href} className={className} aria-label={`${ctaText} for ${productName}`} {...analyticsAttrs(event, sectionName, ctaText, href, planName ? { "data-analytics-plan-name": planName } : undefined)}>{children}</Link>;
}

export default function HyperSearchFilterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }} />

      <Section className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))] pb-14 pt-16 sm:pt-20 lg:pt-24">
        <Container>

          <div className="max-w-4xl">
            <div>
              <div className="inline-flex items-center gap-3 rounded-[8px] border border-border bg-background px-4 py-2 shadow-sm"><Image src={searchApp.icon} alt="" width={28} height={28} aria-hidden="true" className="rounded-[6px]" /><span className="text-sm font-bold text-muted-foreground">Hyper Search & Filter for Shopify</span></div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-6xl">AI Search and Product Filters for Shopify Stores</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Help shoppers find the right products with instant search suggestions, typo tolerance, synonyms, flexible collection filters, merchandising controls, and search analytics.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ExternalCta href={installUrl} sectionName="hero" ctaText="Install Free on Shopify" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Install Free on Shopify <ExternalLink aria-hidden="true" className="size-4" /></ExternalCta>
                <ExternalCta href={demoUrl} sectionName="hero" event="search_app_demo_click" ctaText="View Demo Store" className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-background px-6 py-3 text-sm font-bold text-foreground transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">View Demo Store</ExternalCta>
                <Link href="#pricing" className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-bold text-primary underline-offset-4 hover:underline">Compare Plans</Link>
              </div>
              <p className="mt-5 text-sm font-semibold text-foreground">Free for stores with up to 50 products. Paid plans include a 14-day trial.</p>
              <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
                {trustItems.map((item) => <div key={item} className="flex min-h-12 items-center gap-2 rounded-[8px] border border-border bg-background px-4 py-3 text-muted-foreground shadow-sm"><CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-primary" /><span>{item}</span></div>)}
              </dl>
            </div>

          </div>
        </Container>
      </Section>

      <ProductVisualGallery eyebrow="Product visuals" title="See the Search and Filter Experience" body="See the shopper-facing search results, collection filter controls, and merchant analytics screens that support typo-tolerant discovery, filter refinement, and query review." visuals={productVisuals} />
      <Section spacing="lg"><Container><div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]"><div><h2 className="text-3xl font-black tracking-normal">When Shopify Shoppers Cannot Find Products, They Cannot Buy Them</h2><p className="mt-4 text-muted-foreground">Product discovery breaks when storefront language, catalog structure, and shopper intent do not line up. A shopper searches for trainers, while the catalog uses running shoes. Synonym rules can connect both terms so the shopper sees relevant products.</p></div><div className="grid gap-3 sm:grid-cols-2">{problems.map((problem) => <div key={problem} className="rounded-[8px] border border-border bg-surface p-4 text-sm text-muted-foreground">{problem}</div>)}</div></div></Container></Section>

                  <Section spacing="lg" className="bg-surface"><Container><div className="max-w-3xl"><h2 className="text-3xl font-black tracking-normal">See Hyper Search Working on a Shopify Store</h2><p className="mt-4 text-muted-foreground">Use the live demo to inspect the real storefront experience. The steps below summarize the search journey without adding another large screenshot or fake product mockup.</p></div><ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{demoSteps.map(([title, body], index) => <li key={title} className="rounded-[8px] border border-border bg-background p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 font-bold leading-6">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></li>)}</ol><div className="mt-8 flex flex-col gap-3 sm:flex-row"><ExternalCta href={demoUrl} sectionName="demo" event="search_app_demo_click" ctaText="View Live Demo" className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:border-primary/60">View Live Demo</ExternalCta><ExternalCta href={installUrl} sectionName="demo" ctaText="Install Free on Shopify" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">Install Free on Shopify <ExternalLink aria-hidden="true" className="size-4" /></ExternalCta></div></Container></Section>

      <Section id="features" spacing="lg"><Container><div className="max-w-3xl"><h2 className="text-3xl font-black tracking-normal">Everything You Need to Improve Shopify Product Discovery</h2><p className="mt-4 text-muted-foreground">Each capability below is tied to Shopify listing data or softened where plan-level behavior should be confirmed inside the app before publishing a production theme change.</p></div><div className="mt-8 grid gap-6 md:grid-cols-2">{capabilities.map((feature) => { const Icon = feature.icon; return <article key={feature.title} className="rounded-[8px] border border-border bg-surface p-6" {...analyticsAttrs("search_app_feature_view", "core_capabilities", feature.title, `#${feature.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)}><Icon aria-hidden="true" className="size-6 text-primary" /><h3 className="mt-4 text-xl font-black tracking-normal">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.body}</p><p className="mt-4 rounded-[6px] bg-background p-3 text-xs leading-5 text-muted-foreground">{feature.note}</p></article>; })}</div></Container></Section>

      <Section spacing="lg" className="bg-surface"><Container><h2 className="text-3xl font-black tracking-normal">How Hyper Search & Filter Works</h2><div className="mt-8 grid gap-5 lg:grid-cols-4">{workSteps.map(([step, title, body]) => <article key={title} className="rounded-[8px] border border-border bg-background p-5"><p className="text-sm font-bold text-primary">{step}</p><h3 className="mt-3 font-black tracking-normal">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p></article>)}</div></Container></Section>

      <Section spacing="lg"><Container><h2 className="text-3xl font-black tracking-normal">Is Hyper Search & Filter Right for Your Store?</h2><div className="mt-8 grid gap-6 lg:grid-cols-2"><FitList title="Best suited for" items={bestFit} /><FitList title="A simpler solution may be enough when" items={simplerFit} muted /></div></Container></Section>

      <Section spacing="lg" className="bg-surface"><Container><div className="max-w-3xl"><h2 className="text-3xl font-black tracking-normal">Hyper Search & Filter vs Shopify Search & Discovery</h2><p className="mt-4 text-muted-foreground">Shopify Search & Discovery may be sufficient for smaller stores with straightforward filtering needs. Hyper Search & Filter is intended for merchants who need additional control, analytics, catalog scale, or search customization.</p></div><div className="mt-8 overflow-x-auto rounded-[8px] border border-border" tabIndex={0} aria-label="Scrollable comparison table" {...analyticsAttrs("search_app_feature_view", "native_comparison", "Comparison table", "#comparison")}><table className="min-w-[920px] w-full border-collapse bg-background text-left text-sm"><caption className="sr-only">Factual comparison between Shopify Search and Discovery and Hyper Search and Filter</caption><thead className="bg-surface"><tr><th scope="col" className="w-56 border-b border-border p-4 font-bold">Capability</th><th scope="col" className="border-b border-border p-4 font-bold">Shopify Search & Discovery</th><th scope="col" className="border-b border-border p-4 font-bold">Hyper Search & Filter</th></tr></thead><tbody>{comparisonRows.map(([capability, shopify, hyper]) => <tr key={capability} className="border-b border-border last:border-b-0"><th scope="row" className="bg-surface/70 p-4 align-top font-bold">{capability}</th><td className="p-4 align-top text-muted-foreground">{shopify}</td><td className="p-4 align-top text-muted-foreground">{hyper}</td></tr>)}</tbody></table></div><p className="mt-5 text-sm text-muted-foreground">A dedicated comparison article should be owner-verified before publishing competitive claims beyond this factual table.</p></Container></Section>

      <Section id="pricing" spacing="lg"><Container><div className="max-w-3xl"><h2 className="text-3xl font-black tracking-normal">Choose a Plan Based on Catalog Size and Search Needs</h2><p className="mt-4 text-muted-foreground">Pricing is managed from the shared Hyper app data object and verified against the Shopify App Store listing on {hyperAppsUpdatedAt}.</p></div><div className="mt-8 grid gap-5 lg:grid-cols-4">{searchApp.plans.map((plan) => <article key={plan.name} className="flex min-h-[34rem] flex-col rounded-[8px] border border-border bg-surface p-5" {...analyticsAttrs("search_app_pricing_view", "pricing", plan.name, "#pricing", { "data-analytics-plan-name": plan.name })}><h3 className="text-xl font-black tracking-normal">{plan.name}</h3><p className="mt-3 text-3xl font-black tracking-normal">{plan.price}</p>{plan.annual ? <p className="mt-1 text-sm text-muted-foreground">or {plan.annual}</p> : <p className="mt-1 text-sm text-muted-foreground">No monthly charge listed</p>}{plan.trial ? <p className="mt-3 text-sm font-semibold text-primary">{plan.trial}</p> : null}<p className="mt-4 min-h-12 text-sm leading-6 text-muted-foreground">{plan.description}</p><dl className="mt-5 grid gap-3 text-sm"><div><dt className="font-bold">Product limit</dt><dd className="text-muted-foreground">{plan.productLimit}</dd></div><div><dt className="font-bold">Analytics</dt><dd className="text-muted-foreground">{plan.analyticsHistory}</dd></div><div><dt className="font-bold">Support</dt><dd className="text-muted-foreground">{plan.support}</dd></div></dl><ul className="mt-5 space-y-2">{plan.limits.map((item) => <li key={item} className="flex gap-2 text-sm leading-5 text-muted-foreground"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>{item}</span></li>)}</ul><div className="mt-auto pt-6"><ExternalCta href={installUrl} sectionName="pricing" event="search_app_plan_select" ctaText={plan.cta ?? "Install on Shopify"} planName={plan.name} className="inline-flex min-h-11 w-full items-center justify-center rounded-[6px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">{plan.cta ?? "Install on Shopify"}</ExternalCta></div></article>)}</div><p className="mt-5 text-sm text-muted-foreground">{pricingNote}</p><details className="mt-6 rounded-[8px] border border-border bg-surface p-5"><summary className="cursor-pointer text-base font-bold">Full plan feature list</summary><div className="mt-4 grid gap-4 lg:grid-cols-4">{searchApp.plans.map((plan) => <div key={plan.name}><h3 className="font-bold">{plan.name}</h3><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{plan.limits.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></details></Container></Section>

      <Section spacing="lg" className="bg-surface"><Container><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><h2 className="text-3xl font-black tracking-normal">Know Where Product Discovery Is Breaking</h2><p className="mt-4 text-muted-foreground">Use search and filter analytics as a decision tool. The goal is not just to collect reports, but to identify language gaps, collection friction, irrelevant results, and mobile discovery issues.</p></div><ul className="grid gap-3 sm:grid-cols-2">{diagnosisQuestions.map((question) => <li key={question} className="rounded-[8px] border border-border bg-background p-4 text-sm text-muted-foreground">{question}</li>)}</ul></div></Container></Section>

      <Section spacing="lg"><Container><h2 className="text-3xl font-black tracking-normal">Setup and Shopify Compatibility</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{compatibilityItems.map(([title, body]) => <article key={title} className="rounded-[8px] border border-border bg-surface p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></article>)}</div></Container></Section>

      <Section spacing="lg" className="bg-surface"><Container size="md"><header className="text-center"><h2 className="text-3xl font-black tracking-normal">Frequently Asked Questions About Shopify Search and Filters</h2><p className="mx-auto mt-4 max-w-3xl text-muted-foreground">FAQ schema is generated only from the visible questions below.</p></header><div className="mt-8 divide-y divide-border rounded-[8px] border border-border bg-background">{faqs.map(([question, answer]) => <details key={question} className="group p-5" {...analyticsAttrs("search_app_faq_open", "faq", question, "#faq")}><summary className="cursor-pointer list-none text-base font-black text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"><span className="flex items-center justify-between gap-4">{question}<span aria-hidden="true" className="text-primary">+</span></span></summary><p className="mt-4 text-sm leading-7 text-muted-foreground">{answer}</p></details>)}</div></Container></Section>

            <AppPageLinkSection resourceTitle="Improve Shopify Product Discovery" resources={resources} otherApps={otherApps} analyticsEvent="search_app_resource_click" />
      <Section spacing="lg" className="bg-primary/10"><Container><div className="mx-auto max-w-3xl text-center"><h2 className="text-3xl font-black tracking-normal sm:text-4xl">Help More Shopify Shoppers Find the Right Products</h2><p className="mt-4 text-muted-foreground">Install Hyper Search & Filter free for stores with up to 50 products, or start a 14-day trial of a paid plan.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><ExternalCta href={installUrl} sectionName="final_cta" event="search_app_install_click" ctaText="Install Free on Shopify" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">Install Free on Shopify <ExternalLink aria-hidden="true" className="size-4" /></ExternalCta><ExternalCta href={demoUrl} sectionName="final_cta" event="search_app_demo_click" ctaText="View Demo Store" className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:border-primary/60">View Demo Store</ExternalCta><Link href="#pricing" className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-bold text-primary underline-offset-4 hover:underline">Compare Plans</Link></div></div></Container></Section>
    </>
  );
}

function FitList({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return <article className="rounded-[8px] border border-border bg-surface p-6"><h3 className="text-xl font-black tracking-normal">{title}</h3><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${muted ? "text-muted-foreground" : "text-primary"}`} /><span>{item}</span></li>)}</ul></article>;
}














