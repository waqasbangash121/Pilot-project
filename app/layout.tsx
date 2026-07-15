import type { ReactNode } from "react";
import { headers } from "next/headers";
import { HyperEntityGraph } from "@/components/seo/hyper-entity-graph";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { defaultMetadata, defaultViewport } from "@/config/metadata";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";
import { SiteAnalytics } from "@/components/site-analytics";

import "./globals.css";

export const metadata = defaultMetadata;
export const viewport = defaultViewport;

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-hyper-locale") === "es" ? "es" : "en";

  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <SiteShell footer={<SiteFooter />}>{children}</SiteShell>

        <BreadcrumbJsonLd />
        <HyperEntityGraph />
        <SiteAnalytics />
      </body>
    </html>
  );
}


