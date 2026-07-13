import type { ReactNode } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import { HyperEntityGraph } from "@/components/seo/hyper-entity-graph";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { defaultMetadata, defaultViewport } from "@/config/metadata";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";

import "./globals.css";

export const metadata = defaultMetadata;
export const viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SiteShell footer={<SiteFooter />}>{children}</SiteShell>

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

