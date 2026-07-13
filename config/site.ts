import type { SiteConfig } from "@/types";

const canonicalSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://niagarat.com")
  .replace("://www.", "://")
  .replace(/\/$/, "");

export const siteConfig: SiteConfig = {
  name: "Hyper Apps by NiagaraT",
  shortName: "Hyper Apps by NiagaraT",
  description:
    "Hyper Apps by NiagaraT helps Shopify merchants improve product discovery, answer customer questions, and turn product videos into shoppable experiences.",

  url: canonicalSiteUrl,
  email: "support@niagarat.com",
  locale: "en_US",

  keywords: [
    // Core brand category
    "Shopify AI apps",
    "AI commerce suite",
    "Shopify automation tools",
    "ecommerce AI tools",
    "Shopify conversion optimization",

    // AI Search / Product Discovery (Hyper Search)
    "AI product search Shopify",
    "Shopify search and filter app",
    "Shopify product search",
    "product discovery",
    "Shopify smart filters",
    "AI-powered product discovery",
    "Shopify search optimization",

    // AI Chat / Support (Hyper Chat)
    "Shopify AI chatbot",
    "AI customer support Shopify",
    "automated FAQ chatbot",
    "24/7 customer support automation",
    "Shopify support automation",
    "AI helpdesk for Shopify stores",

    // Shoppable Video (Hyper Video)
    "shoppable video Shopify",
    "video commerce platform",
    "interactive product videos",
    "Shopify video marketing app",
    "in-video checkout Shopify",
    "video-driven conversion optimization",

    // Conversion + Growth Layer
    "Shopify CRO tools",
    "increase Shopify conversion rate",
    "reduce cart abandonment Shopify",
    "shopper experience",
    "revenue growth Shopify",
  ],

  iconPath: "/icon.svg",
  ogImagePath: "/og-image.svg",
};
