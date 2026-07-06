import type { MetadataRoute } from "next";

import { appsMegaMenu, footerNavigation, primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllComparisons } from "@/lib/comparisons";
import { getAllResources } from "@/lib/resources";
import { getAllTools } from "@/lib/tools";

const publicStaticRoutes = [
  "/",
  "/about",
  "/apps",
  "/apps/hyper-search-filter",
  "/apps/hyper-ai-chat-faq",
  "/apps/hyper-shoppable-videos",
  "/blog",
  "/case-studies",
  "/comparisons",
  "/contact",
  "/cookie-policy",
  "/industries",
  "/privacy",
  "/resources",
  "/search",
  "/services",
  "/team",
  "/terms",
  "/tools",
];

const legalRoutes = new Set(["/privacy", "/terms", "/cookie-policy"]);
const appRoutes = new Set(["/apps", "/apps/hyper-search-filter", "/apps/hyper-ai-chat-faq", "/apps/hyper-shoppable-videos"]);

export const revalidate = 60;

function isInternalRoute(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("/admin") && !href.startsWith("/api");
}

function navigationRoutes(): string[] {
  return [
    ...primaryNavigation.map((item) => item.href),
    ...appsMegaMenu.flatMap((column) => column.links.map((link) => link.href)),
    ...footerNavigation.flatMap((group) => group.links.map((link) => link.href)),
  ].filter(isInternalRoute);
}

function routePriority(route: string): number {
  if (route === "/") return 1;
  if (appRoutes.has(route)) return route === "/apps" ? 0.92 : 0.9;
  if (legalRoutes.has(route)) return 0.3;
  if (["/blog", "/resources", "/comparisons", "/case-studies", "/tools"].includes(route)) return 0.82;
  return 0.75;
}

function routeChangeFrequency(route: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route === "/" || appRoutes.has(route)) return "weekly";
  if (legalRoutes.has(route)) return "yearly";
  return "monthly";
}

function contentDate(updatedAt: string | undefined, publishedAt: string): Date {
  return new Date(`${updatedAt || publishedAt}T12:00:00.000Z`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, comparisons, resources, caseStudies, tools] = await Promise.all([
    getAllBlogPosts(),
    getAllComparisons(),
    getAllResources(),
    getAllCaseStudies(),
    getAllTools(),
  ]);

  const now = new Date();
  const routes = [...new Set([...publicStaticRoutes, ...navigationRoutes()])].sort((left, right) => {
    if (left === "/") return -1;
    if (right === "/") return 1;
    return left.localeCompare(right);
  });

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: routeChangeFrequency(route),
    priority: routePriority(route),
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastModified: contentDate(post.updatedAt, post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: new URL(`/comparisons/${comparison.slug}`, siteConfig.url).toString(),
    lastModified: contentDate(comparison.updatedAt, comparison.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: new URL(`/resources/${resource.slug}`, siteConfig.url).toString(),
    lastModified: contentDate(resource.updatedAt, resource.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: new URL(`/case-studies/${caseStudy.slug}`, siteConfig.url).toString(),
    lastModified: contentDate(caseStudy.updatedAt, caseStudy.publishedAt),
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: new URL(`/tools/${tool.slug}`, siteConfig.url).toString(),
    lastModified: contentDate(tool.updatedAt, tool.publishedAt),
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
