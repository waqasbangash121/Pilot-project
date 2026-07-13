import { appsMegaMenu, footerNavigation, primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/site";
import type { BlogPostInput } from "@/lib/blog-admin-types";
import type { ManagedContentInput } from "@/lib/content-admin-types";

type LlmContentGroup = {
  title: string;
  path: string;
  description: string;
  items: LlmContentItem[];
};

type LlmContentItem = {
  title: string;
  url: string;
  description: string;
  metadata: string[];
  content?: string;
};

const staticPages = [
  {
    title: "Home",
    path: "/",
    description:
      "Hyper Apps homepage for NiagaraT's Shopify app suite covering product discovery, AI customer support, shoppable video, and conversion growth.",
  },
  {
    title: "Hyper Apps",
    path: "/apps",
    description:
      "Overview of Hyper Search & Product Filters, Hyper AI Chat & FAQs, and Hyper Shoppable Videos for Shopify merchants.",
  },
  {
    title: "Resources",
    path: "/resources",
    description:
      "Guides and playbooks for Shopify product discovery, search, filtering, AI customer support, shoppable video, and conversion optimization.",
  },
  {
    title: "Blog",
    path: "/blog",
    description:
      "Articles about Shopify conversion, ecommerce AI tools, product discovery, automated support, and video commerce.",
  },
  {
    title: "Comparisons",
    path: "/comparisons",
    description:
      "Shopify app comparison guides for evaluating product discovery, support automation, and commerce tools.",
  },
  {
    title: "Case Studies",
    path: "/case-studies",
    description:
      "Customer stories and outcomes for Shopify merchants using or evaluating Hyper Apps workflows.",
  },
  {
    title: "Tools",
    path: "/tools",
    description:
      "Shopify ecommerce calculators, audits, checklists, generators, templates, and worksheets.",
  },
  {
    title: "Contact",
    path: "/contact",
    description: "Contact NiagaraT about Hyper Apps for Shopify merchants.",
  },
  {
    title: "Team",
    path: "/team",
    description: "Team information for NiagaraT and Hyper Apps.",
  },
] as const;

const productEntities = [
  {
    name: "Hyper Search & Product Filters",
    path: "/apps/hyper-search-filter",
    category: "Shopify search and product filtering app",
    description:
      "Hyper Search & Product Filters helps Shopify merchants improve product discovery with storefront search, collection filters, merchandising controls, synonyms, typo tolerance, search suggestions, analytics, zero-result reporting, metafield filters, variant filters, tag filters, vendor filters, price filters, and catalog indexing.",
    entities: [
      "Shopify product search",
      "Shopify search and filter app",
      "AI product discovery",
      "product findability",
      "collection filters",
      "storefront search",
      "Shopify merchandising",
      "zero-result search analytics",
    ],
  },
  {
    name: "Hyper AI Chat & FAQs",
    path: "/apps/hyper-ai-chat-faq",
    category: "Shopify AI chatbot and FAQ app",
    description:
      "Hyper AI Chat & FAQs helps Shopify merchants automate customer support with an AI chatbot, searchable FAQ page, store-specific product answers, policy answers, shipping answers, return answers, chat history, branding controls, support analytics, and always-on self-service help.",
    entities: [
      "Shopify AI chatbot",
      "AI customer support Shopify",
      "automated FAQ chatbot",
      "self-service support",
      "support deflection",
      "Shopify FAQ app",
      "customer support automation",
    ],
  },
  {
    name: "Hyper Shoppable Videos",
    path: "/apps/hyper-shoppable-videos",
    category: "Shopify shoppable video commerce app",
    description:
      "Hyper Shoppable Videos helps Shopify merchants turn product videos into interactive shopping experiences with product tagging, storefront video widgets, social-style content, user-generated content, video analytics, product discovery, engagement, and plan-supported add-to-cart paths.",
    entities: [
      "shoppable video Shopify",
      "video commerce platform",
      "interactive product videos",
      "product-tagged videos",
      "Shopify video marketing app",
      "storefront engagement",
      "social video commerce",
    ],
  },
] as const;

function absoluteUrl(path: string): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

function cleanText(value: string | undefined): string {
  if (!value) return "";

  return value
    .replace(/^export const metadata = \{[\s\S]*?\};\s*/m, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[{}[\]<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatTags(tags: string[] | undefined): string {
  return tags?.length ? tags.join(", ") : "Not specified";
}

function contentDate(item: { publishedAt: string; updatedAt?: string }): string {
  return item.updatedAt ? `${item.publishedAt}; updated ${item.updatedAt}` : item.publishedAt;
}

function blogItem(post: BlogPostInput, includeContent: boolean): LlmContentItem {
  return {
    title: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    description: post.seoDescription || post.excerpt,
    metadata: [
      `Category: ${post.category}`,
      `Tags: ${formatTags(post.tags)}`,
      `Focus keyword: ${post.focusKeyword || "Not specified"}`,
      `Author: ${post.author}`,
      `Published: ${contentDate(post)}`,
      `Reading time: ${post.readingTime} minutes`,
    ],
    content: includeContent ? cleanText(post.content) : undefined,
  };
}

function managedItem(item: ManagedContentInput, basePath: string, includeContent: boolean): LlmContentItem {
  const metadata = [
    `Category: ${item.category}`,
    `Tags: ${formatTags(item.tags)}`,
    `Focus keyword: ${item.focusKeyword || "Not specified"}`,
    `Author: ${item.author}`,
    `Published: ${contentDate(item)}`,
    `Reading time: ${item.readingTime} minutes`,
  ];

  if (item.competitorName) metadata.push(`Compared entity: ${item.competitorName}`);
  if (item.decisionSummary) metadata.push(`Decision summary: ${item.decisionSummary}`);
  if (item.resourceType) metadata.push(`Resource type: ${item.resourceType}`);
  if (item.audience) metadata.push(`Audience: ${item.audience}`);
  if (item.customerName) metadata.push(`Customer: ${item.customerName}`);
  if (item.industry) metadata.push(`Industry: ${item.industry}`);
  if (item.outcomeSummary) metadata.push(`Outcome: ${item.outcomeSummary}`);
  if (item.toolType) metadata.push(`Tool type: ${item.toolType}`);
  if (item.useCase) metadata.push(`Use case: ${item.useCase}`);
  if (item.toolUrl) metadata.push(`Tool URL: ${absoluteUrl(item.toolUrl)}`);

  return {
    title: item.title,
    url: absoluteUrl(`${basePath}/${item.slug}`),
    description: item.seoDescription || item.excerpt,
    metadata,
    content: includeContent ? cleanText(item.content) : undefined,
  };
}

function routeList(): LlmContentItem[] {
  const navigationRoutes = [
    ...primaryNavigation,
    ...appsMegaMenu.flatMap((column) => column.links),
    ...footerNavigation.flatMap((group) => group.links),
  ]
    .filter((item) => item.href.startsWith("/"))
    .map((item) => ({
      title: item.label,
      path: item.href,
      description: item.description,
    }));

  const uniqueRoutes = [...staticPages, ...navigationRoutes].reduce<Map<string, LlmContentItem>>(
    (routes, route) => {
      if (!routes.has(route.path)) {
        routes.set(route.path, {
          title: route.title,
          url: absoluteUrl(route.path),
          description: route.description,
          metadata: [`Path: ${route.path}`],
        });
      }

      return routes;
    },
    new Map(),
  );

  return [...uniqueRoutes.values()].sort((left, right) => left.url.localeCompare(right.url));
}

function renderItem(item: LlmContentItem, includeContent: boolean): string {
  const metadata = item.metadata.map((line) => `  - ${line}`).join("\n");
  const content = includeContent && item.content ? `\n\nContent:\n${item.content}` : "";

  return `### ${item.title}\n\nURL: ${item.url}\nDescription: ${item.description}\nMetadata:\n${metadata}${content}`;
}

function renderGroup(group: LlmContentGroup, includeContent: boolean): string {
  const items = group.items.length
    ? group.items.map((item) => renderItem(item, includeContent)).join("\n\n")
    : "No published items currently available.";

  return `## ${group.title}\n\n${group.description}\n\nIndex: ${absoluteUrl(group.path)}\n\n${items}`;
}

export function buildLlmsText(): string {
  const products = productEntities
    .map(
      (product) =>
        `- [${product.name}](${absoluteUrl(product.path)}): ${product.category}. ${product.description}`,
    )
    .join("\n");

  const routes = routeList()
    .map((route) => `- [${route.title}](${route.url}): ${route.description}`)
    .join("\n");

  const facts = homeContent.hero.geoFacts.map((fact) => `- ${fact}`).join("\n");

  return `# ${siteConfig.name}

> ${siteConfig.description}

NiagaraT develops Hyper Apps for Shopify merchants. Hyper Apps is a Shopify conversion stack for product discovery, AI customer support automation, shoppable video commerce, shopper engagement, and ecommerce conversion growth.

## Core Entities

- NiagaraT: the company that develops Hyper Apps for Shopify merchants.
- Hyper Apps: the Shopify app suite from NiagaraT.
- Shopify merchants: the primary audience for Hyper Apps.
- Shopify product discovery: the main use case for Hyper Search & Product Filters.
- Shopify AI customer support: the main use case for Hyper AI Chat & FAQs.
- Shopify shoppable video commerce: the main use case for Hyper Shoppable Videos.

## Products

${products}

## Entity Facts

${facts}

## Key Pages

${routes}

## Full LLM Context

- [llms-full.txt](${absoluteUrl("/llms-full.txt")}): complete AI-readable entity map, product descriptions, route index, and published content summaries for ${siteConfig.name}.
- [sitemap.xml](${absoluteUrl("/sitemap.xml")}): canonical URL index.
- [robots.txt](${absoluteUrl("/robots.txt")}): crawler access policy.
`;
}

export function buildLlmsFullText(input: {
  posts: BlogPostInput[];
  comparisons: ManagedContentInput[];
  resources: ManagedContentInput[];
  caseStudies: ManagedContentInput[];
  tools: ManagedContentInput[];
}): string {
  const productText = productEntities
    .map(
      (product) =>
        `## ${product.name}

URL: ${absoluteUrl(product.path)}
Category: ${product.category}
Description: ${product.description}
Entities: ${product.entities.join(", ")}
Relationship: ${product.name} is part of Hyper Apps. Hyper Apps is developed by NiagaraT for Shopify merchants.
`,
    )
    .join("\n");

  const productFaqs = homeContent.faqs
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join("\n\n");

  const groups: LlmContentGroup[] = [
    {
      title: "Static Pages And Navigation",
      path: "/",
      description: "Canonical static pages, product pages, legal pages, and navigation URLs for Hyper Apps.",
      items: routeList(),
    },
    {
      title: "Blog Articles",
      path: "/blog",
      description: "Published blog articles for Shopify conversion, ecommerce AI, product discovery, support, and video commerce.",
      items: input.posts.map((post) => blogItem(post, true)),
    },
    {
      title: "Resources",
      path: "/resources",
      description: "Published Shopify guides, playbooks, checklists, templates, and documentation.",
      items: input.resources.map((item) => managedItem(item, "/resources", true)),
    },
    {
      title: "Comparisons",
      path: "/comparisons",
      description: "Published Shopify app comparison guides and competitor evaluation pages.",
      items: input.comparisons.map((item) => managedItem(item, "/comparisons", true)),
    },
    {
      title: "Case Studies",
      path: "/case-studies",
      description: "Published case studies and Shopify merchant outcome stories.",
      items: input.caseStudies.map((item) => managedItem(item, "/case-studies", true)),
    },
    {
      title: "Tools",
      path: "/tools",
      description: "Published Shopify ecommerce calculators, audits, checklists, generators, templates, and worksheets.",
      items: input.tools.map((item) => managedItem(item, "/tools", true)),
    },
  ];

  return `# ${siteConfig.name} Full LLM Context

> ${siteConfig.description}

Generated for AI assistants, answer engines, search crawlers, retrieval systems, and large language models that need accurate entity context about NiagaraT and Hyper Apps.

## Primary Entity Graph

- NiagaraT develops Hyper Apps.
- Hyper Apps is the Shopify app suite from NiagaraT.
- Hyper Apps serves Shopify merchants, ecommerce operators, store owners, marketers, merchandisers, and support teams.
- Hyper Search & Product Filters is the Hyper Apps product for Shopify product discovery, storefront search, advanced filters, merchandising, search analytics, synonyms, typo tolerance, and catalog navigation.
- Hyper AI Chat & FAQs is the Hyper Apps product for Shopify AI customer support, AI chatbot answers, searchable FAQs, product questions, policy questions, support deflection, and self-service help.
- Hyper Shoppable Videos is the Hyper Apps product for Shopify shoppable videos, product-tagged videos, interactive video commerce, video widgets, social-style content, and customer engagement.
- Hyper Apps helps Shopify merchants improve product discovery, support automation, engagement, conversion rates, customer experience, and revenue growth.

${productText}

## Home Page Entity Facts

${homeContent.hero.geoFacts.map((fact) => `- ${fact}`).join("\n")}

## Product FAQ Answers

${productFaqs}

${groups.map((group) => renderGroup(group, true)).join("\n\n")}
`;
}
