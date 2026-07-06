import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX();

const ONE_YEAR_SECONDS = 31536000;
const ONE_DAY_SECONDS = 86400;
const ONE_HOUR_SECONDS = 3600;
const PUBLIC_PAGE_BROWSER_SECONDS = 3600;

const immutableAssetHeaders = [
  {
    key: "Cache-Control",
    value: `public, max-age=${ONE_YEAR_SECONDS}, immutable`,
  },
  {
    key: "Expires",
    value: "Thu, 31 Dec 2037 23:55:55 GMT",
  },
];

const optimizedImageHeaders = [
  {
    key: "Cache-Control",
    value: `public, max-age=${ONE_DAY_SECONDS}, s-maxage=${ONE_YEAR_SECONDS}, stale-while-revalidate=${ONE_DAY_SECONDS}`,
  },
];

const publicPageHeaders = [
  {
    key: "Cache-Control",
    value: `public, max-age=${PUBLIC_PAGE_BROWSER_SECONDS}, s-maxage=${ONE_DAY_SECONDS}, stale-while-revalidate=${ONE_DAY_SECONDS}`,
  },
];

const noStoreHeaders = [
  {
    key: "Cache-Control",
    value: "private, no-store, max-age=0, must-revalidate",
  },
];

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  generateEtags: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: noStoreHeaders,
      },
      {
        source: "/api/:path*",
        headers: noStoreHeaders,
      },
      {
        source: "/_next/static/:path*",
        headers: immutableAssetHeaders,
      },
      {
        source: "/_next/image",
        headers: optimizedImageHeaders,
      },
      {
        source: "/_next/image/:path*",
        headers: optimizedImageHeaders,
      },
      {
        source: "/:path*.(avif|css|gif|ico|jpg|jpeg|js|map|mjs|png|svg|webp|woff|woff2)",
        headers: immutableAssetHeaders,
      },
      {
        source: "/:path*.(txt|xml|json|webmanifest)",
        headers: publicPageHeaders,
      },
      {
        source: "/((?!admin|api|_next/static|_next/image).*)",
        headers: publicPageHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
