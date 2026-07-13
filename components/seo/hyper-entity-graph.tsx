import { canonicalUrl } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { toJsonLd } from "@/lib/schema";

const productEntities = [
  {
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl("/apps/hyper-search-filter")}#software`,
    name: "Hyper Search & Product Filters",
    alternateName: ["Hyper Search", "Shopify search and filter app"],
    url: canonicalUrl("/apps/hyper-search-filter"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Shopify product discovery, storefront search, and product filtering",
    operatingSystem: "Shopify",
    description:
      "Hyper Search & Product Filters is a Shopify product discovery app from NiagaraT for storefront search, smart filters, Shopify metafields, Shopify webhooks, merchandising, synonyms, typo tolerance, analytics, and catalog navigation.",
    isPartOf: { "@id": `${canonicalUrl("/")}#hyper-apps-suite` },
    publisher: { "@id": `${canonicalUrl("/")}#organization` },
    keywords:
      "Hyper Search & Product Filters, Shopify product discovery, Shopify search and filter app, Shopify metafields, Shopify webhooks, product search, smart filters, merchandising controls",
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl("/apps/hyper-ai-chat-faq")}#software`,
    name: "Hyper AI Chat & FAQs",
    alternateName: ["Hyper AI Chat", "Shopify AI chatbot", "Shopify FAQ app"],
    url: canonicalUrl("/apps/hyper-ai-chat-faq"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Shopify AI chatbot, FAQ automation, and customer support",
    operatingSystem: "Shopify",
    description:
      "Hyper AI Chat & FAQs is a Shopify AI chatbot and customer support app from NiagaraT for AI chatbot answers, searchable FAQs, support automation, customer support, product questions, policy questions, and self-service help.",
    isPartOf: { "@id": `${canonicalUrl("/")}#hyper-apps-suite` },
    publisher: { "@id": `${canonicalUrl("/")}#organization` },
    keywords:
      "Hyper AI Chat & FAQs, Shopify AI chatbot, AI chatbot, customer support, support automation, searchable FAQs, e-commerce support, self-service support",
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl("/apps/hyper-shoppable-videos")}#software`,
    name: "Hyper Shoppable Videos",
    alternateName: ["Hyper Video", "Shopify shoppable video app", "video commerce app"],
    url: canonicalUrl("/apps/hyper-shoppable-videos"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Shopify video commerce and shoppable video",
    operatingSystem: "Shopify",
    description:
      "Hyper Shoppable Videos is a Shopify video commerce app from NiagaraT for product-tagged videos, shoppable video widgets, social-style content, video analytics, product discovery, and e-commerce engagement.",
    isPartOf: { "@id": `${canonicalUrl("/")}#hyper-apps-suite` },
    publisher: { "@id": `${canonicalUrl("/")}#organization` },
    keywords:
      "Hyper Shoppable Videos, Shopify shoppable video, video commerce, product-tagged videos, e-commerce video, product discovery, shoppable widgets",
  },
];

const entityGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${canonicalUrl("/")}#organization`,
      name: "NiagaraT",
      url: canonicalUrl("/"),
      brand: { "@id": `${canonicalUrl("/")}#hyper-apps-suite` },
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
    },
    {
      "@type": "Brand",
      "@id": `${canonicalUrl("/")}#hyper-apps-suite`,
      name: "Hyper Apps",
      alternateName: "Shopify Conversion Stack",
      url: canonicalUrl("/apps"),
      description: siteConfig.description,
      parentOrganization: { "@id": `${canonicalUrl("/")}#organization` },
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
    },
    {
      "@type": "DefinedTermSet",
      "@id": `${canonicalUrl("/")}#entity-vocabulary`,
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
        inDefinedTermSet: `${canonicalUrl("/")}#entity-vocabulary`,
      })),
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
