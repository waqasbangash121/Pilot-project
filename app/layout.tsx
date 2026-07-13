import type { ReactNode } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import { HyperEntityGraph } from "@/components/seo/hyper-entity-graph";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { canonicalUrl, defaultMetadata, defaultViewport } from "@/config/metadata";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/config/site";
import { toJsonLd } from "@/lib/schema";

import "./globals.css";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${canonicalUrl("/")}#website`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: canonicalUrl("/"),
  description: siteConfig.description,
  inLanguage: siteConfig.locale.replace("_", "-"),
  potentialAction: {
    "@type": "SearchAction",
    target: `${canonicalUrl("/search")}?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
export const metadata = defaultMetadata;
export const viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell footer={<SiteFooter />}>{children}</SiteShell>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(websiteSchema) }}
        />
        <BreadcrumbJsonLd />
        <HyperEntityGraph />
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-ZC5XNC1VDY"
              strategy="lazyOnload"
              defer
            />
            <Script id="gtag-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                gtag('js', new Date());
                gtag('config', 'G-ZC5XNC1VDY', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
            <GoogleAnalytics />

            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}

