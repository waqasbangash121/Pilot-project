"use client";

import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { toJsonLd } from "@/lib/schema";

const normalizedSiteUrl = siteConfig.url.replace(/\/$/, "");

const labelBySegment: Record<string, string> = {
  about: "About",
  apps: "Apps",
  blog: "Blog",
  "case-studies": "Case Studies",
  comparisons: "Comparisons",
  contact: "Contact",
  "cookie-policy": "Cookie Policy",
  industries: "Industries",
  privacy: "Privacy",
  resources: "Resources",
  search: "Search",
  services: "Services",
  team: "Team",
  terms: "Terms",
  tools: "Tools",
  "hyper-ai-chat-faq": "Hyper AI Chat & FAQs",
  "hyper-search-filter": "Hyper Search & Product Filters",
  "hyper-shoppable-videos": "Hyper Shoppable Videos",
};

function absoluteUrl(path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = cleanPath === "/" ? "/" : cleanPath.replace(/\/+$/, "");

  return new URL(normalizedPath, `${normalizedSiteUrl}/`).toString();
}

function segmentToLabel(segment: string): string {
  return (
    labelBySegment[segment] ||
    segment
      .split("-")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function buildBreadcrumbSchema(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const items = [
    {
      name: "Home",
      item: absoluteUrl("/"),
    },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      return {
        name: segmentToLabel(segment),
        item: absoluteUrl(href),
      };
    }),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function BreadcrumbJsonLd() {
  const pathname = usePathname();

  if (!pathname || pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(buildBreadcrumbSchema(pathname)) }}
    />
  );
}
