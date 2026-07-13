import type { FooterNavigationGroup, MegaMenuColumn, RouteItem } from "@/types";

export const primaryNavigation: RouteItem[] = [
  { label: "Apps", href: "/apps", description: "Hyper Apps for Shopify merchants" },
  { label: "Resources", href: "/resources", description: "Shopify guides and playbooks" },
  { label: "Pricing", href: "/pricing", description: "Compare app plans and install options" },
  { label: "About", href: "/about", description: "About Hyper Apps by NiagaraT" },
  {
    label: "Book a Demo",
    href: "/contact",
    description: "Book a demo with Hyper Apps by NiagaraT",
  },
];

export const appsMegaMenu: MegaMenuColumn[] = [
  {
    title: "Hyper Apps",
    links: [
      {
        label: "Shopify Search",
        href: "/apps/hyper-search-filter",
        description: "AI search, filters, synonyms, merchandising, and analytics",
      },
      {
        label: "AI Chat",
        href: "/apps/hyper-ai-chat-faq",
        description: "AI chatbot and searchable FAQs for customer questions",
      },
      {
        label: "Shoppable Video",
        href: "/apps/hyper-shoppable-videos",
        description: "Product-tagged videos and storefront video widgets",
      },
    ],
  },
];

export const footerNavigation: FooterNavigationGroup[] = [
  {
    title: "Products",
    links: [
      { label: "All Apps", href: "/apps", description: "Hyper Apps by NiagaraT product suite" },
      {
        label: "Shopify Search",
        href: "/apps/hyper-search-filter",
        description: "Search and filters app",
      },
      { label: "AI Chat", href: "/apps/hyper-ai-chat-faq", description: "AI chatbot and FAQ app" },
      {
        label: "Shoppable Video",
        href: "/apps/hyper-shoppable-videos",
        description: "Shoppable video app",
      },
      { label: "Pricing", href: "/pricing", description: "Compare app plans and install options" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Resources", href: "/resources", description: "Guides and playbooks" },
      { label: "Blog", href: "/blog", description: "Articles and updates" },
      { label: "Comparisons", href: "/comparisons", description: "Shopify app comparison pages" },
      { label: "Tools", href: "/tools", description: "Shopify ecommerce tools" },
      { label: "Search", href: "/search", description: "Search Hyper Apps content" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/", description: "Hyper Apps by NiagaraT homepage" },
      { label: "About", href: "/about", description: "Learn about Hyper Apps by NiagaraT" },
      { label: "Team", href: "/team", description: "Meet the team behind Hyper Apps" },
      { label: "Contact", href: "/contact", description: "Contact Hyper Apps by NiagaraT" },
      { label: "Book a Demo", href: "/contact", description: "Book a product demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy", description: "How we handle data" },
      { label: "Terms", href: "/terms", description: "Terms of service" },
      { label: "Cookie Policy", href: "/cookie-policy", description: "Cookie usage details" },
    ],
  },
  {
    title: "Social",
    links: [],
  },
];

export const siteRoutes: RouteItem[] = primaryNavigation;
