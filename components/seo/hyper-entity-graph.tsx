import { canonicalUrl } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { toJsonLd } from "@/lib/schema";

const organizationId = `${canonicalUrl("/")}#organization`;
const brandId = `${canonicalUrl("/")}#hyper-apps-suite`;
const websiteId = `${canonicalUrl("/")}#website`;
const vocabularyId = `${canonicalUrl("/")}#entity-vocabulary`;

const productEntities = [
  {
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl("/apps/hyper-search-filter")}#software`,
    name: "Hyper Search & Product Filters",
    alternateName: ["Hyper Search", "Shopify search and filter app"],
    url: canonicalUrl("/apps/hyper-search-filter"),
    sameAs: "https://apps.shopify.com/hyper-search-product-filters",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Shopify product discovery, storefront search, and product filtering",
    operatingSystem: "Shopify",
    description:
      "Hyper Search & Product Filters is a Shopify product discovery app from NiagaraT for storefront search, smart filters, Shopify metafields, Shopify webhooks, merchandising, synonyms, typo tolerance, analytics, and catalog navigation.",
    isPartOf: { "@id": brandId },
    brand: { "@id": brandId },
    publisher: { "@id": organizationId },
    provider: { "@id": organizationId },
    creator: { "@id": organizationId },
    mainEntityOfPage: { "@id": `${canonicalUrl("/apps/hyper-search-filter")}#webpage` },
    keywords:
      "Hyper Search & Product Filters, Shopify product discovery, Shopify search and filter app, Shopify metafields, Shopify webhooks, product search, smart filters, merchandising controls",
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl("/apps/hyper-ai-chat-faq")}#software`,
    name: "Hyper AI Chat & FAQs",
    alternateName: ["Hyper AI Chat", "Shopify AI chatbot", "Shopify FAQ app"],
    url: canonicalUrl("/apps/hyper-ai-chat-faq"),
    sameAs: "https://apps.shopify.com/hyper-chatbot-and-faqs",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Shopify AI chatbot, FAQ automation, and customer support",
    operatingSystem: "Shopify",
    description:
      "Hyper AI Chat & FAQs is a Shopify AI chatbot and customer support app from NiagaraT for AI chatbot answers, searchable FAQs, support automation, customer support, product questions, policy questions, and self-service help.",
    isPartOf: { "@id": brandId },
    brand: { "@id": brandId },
    publisher: { "@id": organizationId },
    provider: { "@id": organizationId },
    creator: { "@id": organizationId },
    mainEntityOfPage: { "@id": `${canonicalUrl("/apps/hyper-ai-chat-faq")}#webpage` },
    keywords:
      "Hyper AI Chat & FAQs, Shopify AI chatbot, AI chatbot, customer support, support automation, searchable FAQs, e-commerce support, self-service support",
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl("/apps/hyper-shoppable-videos")}#software`,
    name: "Hyper Shoppable Videos",
    alternateName: ["Hyper Video", "Shopify shoppable video app", "video commerce app"],
    url: canonicalUrl("/apps/hyper-shoppable-videos"),
    sameAs: "https://apps.shopify.com/hyper-shopable-videos",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Shopify video commerce and shoppable video",
    operatingSystem: "Shopify",
    description:
      "Hyper Shoppable Videos is a Shopify video commerce app from NiagaraT for product-tagged videos, shoppable video widgets, social-style content, video analytics, product discovery, and e-commerce engagement.",
    isPartOf: { "@id": brandId },
    brand: { "@id": brandId },
    publisher: { "@id": organizationId },
    provider: { "@id": organizationId },
    creator: { "@id": organizationId },
    mainEntityOfPage: { "@id": `${canonicalUrl("/apps/hyper-shoppable-videos")}#webpage` },
    keywords:
      "Hyper Shoppable Videos, Shopify shoppable video, video commerce, product-tagged videos, e-commerce video, product discovery, shoppable widgets",
  },
];

const productEntityRefs = productEntities.map((product) => ({ "@id": product["@id"] }));

const entityGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Hyper Apps by NiagaraT",
      url: canonicalUrl("/"),
      logo: canonicalUrl("/icon.svg"),
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "customer support",
      },
      brand: { "@id": brandId },
      makesOffer: productEntities.map((product) => ({
        "@type": "Offer",
        itemOffered: { "@id": product["@id"] },
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
        itemListElement: productEntities.map((product) => ({
          "@type": "Offer",
          itemOffered: { "@id": product["@id"] },
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
    },
    ...productEntities,
  ],
};

export function HyperEntityGraph() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(entityGraphSchema) }}
    />
  );
}
