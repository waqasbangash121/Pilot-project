import type { MetadataRoute } from "next";

import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllComparisons } from "@/lib/comparisons";
import { getAllResources } from "@/lib/resources";
import { getAllTools } from "@/lib/tools";

const appPages = [
  "/apps",
  "/apps/hyper-search-product-filters",
  "/apps/hyper-shoppable-videos",
  "/apps/hyper-chatbot-and-faqs",
];

const legalPages = ["/privacy", "/terms", "/cookie-policy"];
const standardPages = [
  "/",
  "/about",
  "/services",
  "/search",
  "/blog",
  "/comparisons",
  "/resources",
  "/case-studies",
  "/tools",
  "/team",
];

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, comparisons, resources, caseStudies, tools] = await Promise.all([
    getAllBlogPosts(),
    getAllComparisons(),
    getAllResources(),
    getAllCaseStudies(),
    getAllTools(),
  ]);

  const routes = [
    ...new Set([
      ...primaryNavigation.map((item) => item.href),
      ...standardPages,
      ...appPages,
      ...legalPages,
    ]),
  ];

  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => {
    const isHome = route === "/";
    const isApp = appPages.includes(route);
    const isLegal = legalPages.includes(route);

    return {
      url: new URL(route, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: isHome || isApp ? "weekly" : isLegal ? "yearly" : "monthly",
      priority: isHome ? 1 : isApp ? 0.95 : isLegal ? 0.3 : 0.8,
    };
  });

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${post.updatedAt || post.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: new URL(`/comparisons/${comparison.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${comparison.updatedAt || comparison.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: new URL(`/resources/${resource.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${resource.updatedAt || resource.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: new URL(`/case-studies/${caseStudy.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${caseStudy.updatedAt || caseStudy.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: new URL(`/tools/${tool.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${tool.updatedAt || tool.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.68,
  }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...comparisonEntries,
    ...resourceEntries,
    ...caseStudyEntries,
    ...toolEntries,
  ];
}

