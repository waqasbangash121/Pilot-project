import type { Metadata } from "next";

import { canonicalUrl, compactPageTitle } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { localizePath, stripLocale } from "@/lib/i18n/paths";

type LocalizedPageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function languageAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const cleanPath = stripLocale(path);

  return {
    canonical: canonicalUrl(path),
    languages: {
      en: canonicalUrl(cleanPath),
      es: canonicalUrl(localizePath(cleanPath, "es")),
      "x-default": canonicalUrl(cleanPath),
    },
  };
}

export function createSpanishPageMetadata({
  title,
  description,
  path,
}: LocalizedPageMetadataInput): Metadata {
  const compactTitle = compactPageTitle(title);
  const canonical = canonicalUrl(path);

  return {
    title: compactTitle,
    description,
    alternates: languageAlternates(path),
    openGraph: {
      type: "website",
      locale: "es_ES",
      alternateLocale: ["en_US"],
      url: canonical,
      siteName: siteConfig.name,
      title: compactTitle,
      description,
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
      title: compactTitle,
      description,
      images: [siteConfig.ogImagePath],
    },
  };
}
