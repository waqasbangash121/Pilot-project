export type HyperAppId = "search" | "chat" | "video";

export type HyperPlan = {
  name: string;
  price: string;
  annual?: string;
  trial?: string;
  limits: string[];
};

export type HyperApp = {
  id: HyperAppId;
  marketingName: string;
  officialName: string;
  listedAs: string;
  shortName: string;
  slug: string;
  internalHref: string;
  installHref: string;
  demoHref: string;
  icon: string;
  screenshot: string;
  screenshotAlt: string;
  outcome: string;
  bestFit: string;
  primaryPurpose: string;
  mainProblem: string;
  capabilities: string[];
  coreFeatures: string;
  freePlan: string;
  freeTrial: string;
  entryPaidPlan: string;
  usageLimit: string;
  setupMethod: string;
  codingRequired: string;
  analyticsIncluded: string;
  integrations: string;
  setupNote: string;
  plans: HyperPlan[];
};

export const hyperAppsUpdatedAt = "2026-07-13";

export const hyperApps: HyperApp[] = [
  {
    id: "search",
    marketingName: "Hyper Search & Product Filters",
    officialName: "Hyper Search & Filter",
    listedAs: "listed on Shopify as Hyper Search & Filter",
    shortName: "Hyper Search",
    slug: "hyper-search-filter",
    internalHref: "/apps/hyper-search-filter",
    installHref: "https://apps.shopify.com/hyper-search-product-filters",
    demoHref: "https://searchfilter-2.myshopify.com",
    icon: "/hyper-search.svg",
    screenshot: "/search-banner.png",
    screenshotAlt: "Hyper Search and product filter interface preview",
    outcome:
      "Help shoppers find relevant products using AI search, instant suggestions, typo tolerance, filters, merchandising controls, and search analytics.",
    bestFit:
      "Stores with larger catalogs, technical product names, many variants, detailed attributes, or frequent zero-result searches.",
    primaryPurpose: "Product search, filtering, and catalog discovery",
    mainProblem: "Shoppers cannot find relevant products or narrow a catalog quickly.",
    capabilities: [
      "Instant AI search suggestions with typo-tolerant results",
      "Filters by collection, vendor, variant, size, color, and metafields",
      "Search query and filter usage analytics",
      "Real-time product sync",
      "Custom filters, styling, sorting, and search results pages",
      "Synonyms, stop words, and zero-result reporting on supported plans",
    ],
    coreFeatures:
      "AI search, typo tolerance, suggestions, multi-filter, custom filters, search analytics, real-time sync",
    freePlan: "Yes - up to 50 products",
    freeTrial: "14-day free trial on paid plans",
    entryPaidPlan: "Starter - $15/month or $150/year",
    usageLimit: "Free: 50 products. Starter: 5,000 products.",
    setupMethod: "Install from Shopify, sync products, configure search templates and filters.",
    codingRequired: "No coding expected for standard setup; custom CSS is supported.",
    analyticsIncluded: "Search queries, behavior insights, custom dashboards, conversion tracking",
    integrations: "No third-party integration listed on Shopify App Store.",
    setupNote:
      "Install through Shopify, allow product sync, then configure filter trees, search templates, synonyms, styling, and analytics review. The listing confirms access to products, collections, Online Store theme/script tags, orders, and metaobjects.",
    plans: [
      {
        name: "Free",
        price: "$0",
        limits: [
          "Up to 50 products",
          "Unlimited search queries",
          "Up to 15 filters and 2 filter trees",
          "7-day analytics history",
        ],
      },
      {
        name: "Starter",
        price: "$15/month",
        annual: "$150/year",
        trial: "14-day free trial",
        limits: ["Up to 5,000 products", "Unlimited filters and trees", "50 synonyms"],
      },
      {
        name: "Professional",
        price: "$29/month",
        annual: "$289/year",
        trial: "14-day free trial",
        limits: ["Up to 50,000 products", "Unlimited synonyms", "1-year analytics history"],
      },
      {
        name: "Enterprise",
        price: "$99/month",
        annual: "$986/year",
        trial: "14-day free trial",
        limits: ["Up to 200,000 products", "Unlimited analytics history", "Zero results report"],
      },
    ],
  },
  {
    id: "chat",
    marketingName: "Hyper AI Chat & FAQs",
    officialName: "Hyper AI Chat and FAQs",
    listedAs: "listed on Shopify as Hyper AI Chat and FAQs",
    shortName: "Hyper AI Chat",
    slug: "hyper-ai-chat-faq",
    internalHref: "/apps/hyper-ai-chat-faq",
    installHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
    demoHref: "https://aichat-3.myshopify.com",
    icon: "/hyper-aichat.svg",
    screenshot: "/aichat-banner.png",
    screenshotAlt: "Hyper AI Chat and FAQ dashboard preview",
    outcome:
      "Answer common product and store questions through a Shopify chatbot and searchable FAQ experience.",
    bestFit:
      "Stores receiving repeated questions about products, sizing, shipping, returns, availability, policies, or order information.",
    primaryPurpose: "AI chatbot, FAQs, and customer question handling",
    mainProblem:
      "Shoppers leave because product, policy, shipping, or order questions are unanswered.",
    capabilities: [
      "AI chatbot for common customer questions",
      "Searchable FAQ page for products, shipping, returns, and policies",
      "Training with store products, FAQs, and support content",
      "Chat history review",
      "Widget customization and branding controls",
      "Support activity analytics",
    ],
    coreFeatures:
      "AI chatbots, FAQs, quick replies, greetings, product recommendations, chat history, support analytics",
    freePlan: "Yes - 50 AI conversations/month",
    freeTrial: "14-day free trial on paid plans",
    entryPaidPlan: "Starter - $19/month",
    usageLimit: "Free: 50 AI conversations/month. Starter: 500 AI conversations/month.",
    setupMethod: "Install from Shopify, train with products, FAQs, and store support content.",
    codingRequired: "No coding stated for standard chatbot and FAQ setup.",
    analyticsIncluded: "Basic analytics on Free, advanced analytics on paid plans",
    integrations: "No third-party integration listed on Shopify App Store.",
    setupNote:
      "Install through Shopify, train answers with products, FAQs, policies, and support content, then customize the chat widget and FAQ experience. The listing confirms chat history, analytics, product training, and FAQ limits by plan.",
    plans: [
      {
        name: "Free",
        price: "$0",
        limits: [
          "50 AI conversations/month",
          "Unlimited products for AI training",
          "10 FAQs",
          "30-day chat history",
        ],
      },
      {
        name: "Starter",
        price: "$19/month",
        trial: "14-day free trial",
        limits: ["500 AI conversations/month", "25 FAQs", "180-day chat history"],
      },
      {
        name: "Growth",
        price: "$49/month",
        trial: "14-day free trial",
        limits: ["2,500 AI conversations/month", "Unlimited FAQs", "365-day chat history"],
      },
      {
        name: "Pro",
        price: "$99/month",
        trial: "14-day free trial",
        limits: ["10,000 AI conversations/month", "Unlimited FAQs", "Unlimited chat history"],
      },
    ],
  },
  {
    id: "video",
    marketingName: "Hyper Shoppable Videos",
    officialName: "Hyper - Shoppable Videos",
    listedAs: "listed on Shopify as Hyper - Shoppable Videos",
    shortName: "Hyper Shoppable Videos",
    slug: "hyper-shoppable-videos",
    internalHref: "/apps/hyper-shoppable-videos",
    installHref: "https://apps.shopify.com/hyper-shopable-videos",
    demoHref: "https://shoppablevideos-2.myshopify.com",
    icon: "/hyper-videos.svg",
    screenshot: "/shoppable-banner.png",
    screenshotAlt: "Hyper Shoppable Videos storefront widget preview",
    outcome:
      "Turn product videos, short-form social content, and UGC into Shopify video widgets with tagged products and shopping actions.",
    bestFit:
      "Stores with product demonstrations, visual products, tutorials, social videos, influencer content, or UGC.",
    primaryPurpose: "Shoppable video widgets and product-tagged video experiences",
    mainProblem:
      "Visitors watch product videos but cannot shop directly from the video experience.",
    capabilities: [
      "Product tags and hotspots inside videos",
      "Add-to-cart actions while shoppers watch",
      "Video carousels, mobile stories, and embedded widgets",
      "Manual upload and TikTok import",
      "TikTok and Instagram uploads on Growth and Pro plans",
      "Views, clicks, and add-to-cart analytics",
    ],
    coreFeatures:
      "Shoppable videos, interactive video, video import, video widgets, carousels, mobile responsive analytics",
    freePlan: "Yes - 5 videos and 1 widget",
    freeTrial: "14-day free trial on paid plans",
    entryPaidPlan: "Starter - $19/month",
    usageLimit:
      "Free: 5 videos, 1 widget, 1,000 monthly views. Starter: 30 videos, 8,000 monthly views.",
    setupMethod: "Install from Shopify, upload or import videos, tag products, then place widgets.",
    codingRequired: "No coding stated for standard widget placement.",
    analyticsIncluded: "Basic, standard, or advanced video analytics depending on plan",
    integrations: "Works with HeyGen on the Shopify App Store listing.",
    setupNote:
      "Install through Shopify, upload or import video content, tag products, choose widget formats, and place them on storefront pages. The listing confirms theme access, product and order access, manual upload, TikTok import, and HeyGen support on Pro.",
    plans: [
      {
        name: "Free",
        price: "$0",
        limits: ["5 videos", "1 widget", "1 tag per video", "1,000 monthly views"],
      },
      {
        name: "Starter",
        price: "$19/month",
        trial: "14-day free trial",
        limits: ["30 videos", "5 widgets", "3 tags per video", "8,000 monthly views"],
      },
      {
        name: "Growth",
        price: "$49/month",
        trial: "14-day free trial",
        limits: ["200 videos", "15 widgets", "10 tags per video", "40,000 monthly views"],
      },
      {
        name: "Pro",
        price: "$119/month",
        trial: "14-day free trial",
        limits: ["500 videos", "Unlimited widgets", "Unlimited monthly views", "HeyGen import"],
      },
    ],
  },
];

export function getHyperApp(id: HyperAppId) {
  return hyperApps.find((app) => app.id === id);
}
