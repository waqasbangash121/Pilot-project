import { canonicalUrl } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { toJsonLd } from "@/lib/schema";

const organizationId = `${canonicalUrl("/")}#organization`;
const brandId = `${canonicalUrl("/")}#hyper-apps-suite`;
const websiteId = `${canonicalUrl("/")}#website`;
const vocabularyId = `${canonicalUrl("/")}#entity-vocabulary`;

const productEntityRefs = [
  { "@id": `${canonicalUrl("/apps/hyper-search-filter")}#software` },
  { "@id": `${canonicalUrl("/apps/hyper-ai-chat-faq")}#software` },
  { "@id": `${canonicalUrl("/apps/hyper-shoppable-videos")}#software` },
];

const entityGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Hyper Apps by NiagaraT",
      alternateName: ["NiagaraT", "Hyper Apps"],
      url: canonicalUrl("/"),
      logo: canonicalUrl("/icon.svg"),
      description:
        "NiagaraT develops Hyper Apps for Shopify merchants, with products focused on storefront product discovery, AI-assisted customer support, searchable FAQs, and shoppable video commerce.",
      slogan: "Practical Shopify apps for product discovery, support, and shoppable content.",
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "customer support",
      },
      about: [
        {
          "@type": "Thing",
          name: "Mission",
          description:
            "Help Shopify merchants reduce friction in the buying journey by making products easier to find, shopper questions easier to answer, and product content easier to shop.",
        },
        {
          "@type": "Thing",
          name: "Product focus",
          description:
            "NiagaraT's Hyper Apps suite covers Shopify search and product filters, AI chat and FAQs, and product-tagged shoppable video widgets.",
        },
        {
          "@type": "Thing",
          name: "Operating principles",
          description:
            "The Hyper Apps site emphasizes verified Shopify App Store information, transparent plan limits, qualified product claims, and practical implementation guidance for merchants.",
        },
      ],
      subjectOf: [
        { "@type": "WebPage", name: "About NiagaraT and Hyper Apps", url: canonicalUrl("/about") },
        { "@type": "WebPage", name: "Compare Hyper Apps", url: canonicalUrl("/apps") },
      ],
      brand: { "@id": brandId },
      makesOffer: productEntityRefs.map((product) => ({
        "@type": "Offer",
        itemOffered: product,
      })),
      knowsAbout: [
        "Hyper Apps",
        "Shopify",
        "Shopify Conversion Stack",
        "Shopify product discovery",
        "Shopify AI chatbot",
        "customer support",
        "video commerce",
        "e-commerce",
        "Shopify webhooks",
        "Shopify metafields",
      ],
      "@reverse": {
        publisher: productEntityRefs,
        provider: productEntityRefs,
        creator: productEntityRefs,
        parentOrganization: { "@id": brandId },
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      url: canonicalUrl("/"),
      publisher: { "@id": organizationId },
      about: { "@id": brandId },
    },
    {
      "@type": "Brand",
      "@id": brandId,
      name: "Hyper Apps",
      alternateName: "Shopify Conversion Stack",
      url: canonicalUrl("/apps"),
      description: siteConfig.description,
      parentOrganization: { "@id": organizationId },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Hyper Apps Shopify Conversion Stack",
        itemListElement: productEntityRefs.map((product) => ({
          "@type": "Offer",
          itemOffered: product,
        })),
      },
      keywords:
        "Hyper Apps, Shopify, NiagaraT, Shopify Conversion Stack, e-commerce, product discovery, customer support, AI chatbot, video commerce",
      "@reverse": {
        brand: productEntityRefs,
        isPartOf: productEntityRefs,
        about: { "@id": websiteId },
      },
    },
    {
      "@type": "DefinedTermSet",
      "@id": vocabularyId,
      name: "Hyper Apps entity vocabulary",
      hasDefinedTerm: [
        "Hyper Apps",
        "Shopify",
        "NiagaraT",
        "Hyper Search & Product Filters",
        "Hyper AI Chat & FAQs",
        "Hyper Shoppable Videos",
        "Shopify Conversion Stack",
        "AI chatbot",
        "e-commerce",
        "customer support",
        "product discovery",
        "video commerce",
        "Shopify webhooks",
        "Shopify metafields",
      ].map((name) => ({
        "@type": "DefinedTerm",
        name,
        inDefinedTermSet: { "@id": vocabularyId },
      })),
      "@reverse": {
        knowsAbout: { "@id": organizationId },
      },
    },  ],
};

export function HyperEntityGraph() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(entityGraphSchema) }}
    />
  );
}

