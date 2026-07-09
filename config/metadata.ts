import type { Metadata, Viewport } from "next";

import { siteConfig } from "./site";

const normalizedSiteUrl = siteConfig.url.replace(/\/$/, "");

export function canonicalUrl(path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const [pathname] = cleanPath.split(/[?#]/);
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  return new URL(normalizedPath, `${normalizedSiteUrl}/`).toString();
}

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(`${normalizedSiteUrl}/`),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: canonicalUrl("/"),
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImagePath],
  },
  icons: {
    icon: siteConfig.iconPath,
    shortcut: siteConfig.iconPath,
    apple: siteConfig.iconPath,
  },
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

const MAX_PAGE_TITLE_LENGTH = 62;

export function compactPageTitle(title: string): string {
  if (title.length <= MAX_PAGE_TITLE_LENGTH) return title;

  const candidate = title.slice(0, MAX_PAGE_TITLE_LENGTH + 1);
  const lastWordBoundary = candidate.lastIndexOf(" ");
  return candidate.slice(0, lastWordBoundary > 0 ? lastWordBoundary : MAX_PAGE_TITLE_LENGTH);
}

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const compactTitle = compactPageTitle(title);

  return {
    ...defaultMetadata,
    title: compactTitle,
    description,
    alternates: {
      canonical: canonicalUrl(path),
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: compactTitle,
      description,
      url: canonicalUrl(path),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: compactTitle,
      description,
    },
  };
}
