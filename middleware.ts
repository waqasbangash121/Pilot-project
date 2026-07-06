import { NextResponse, type NextRequest } from "next/server";

const ONE_YEAR_SECONDS = 31536000;
const ONE_DAY_SECONDS = 86400;
const ONE_HOUR_SECONDS = 3600;

const IMMUTABLE_ASSET_CACHE = `public, max-age=${ONE_YEAR_SECONDS}, immutable`;
const OPTIMIZED_IMAGE_CACHE = `public, max-age=${ONE_DAY_SECONDS}, s-maxage=${ONE_YEAR_SECONDS}, stale-while-revalidate=${ONE_DAY_SECONDS}`;
const PUBLIC_PAGE_CACHE = `public, max-age=${ONE_HOUR_SECONDS}, s-maxage=${ONE_DAY_SECONDS}, stale-while-revalidate=${ONE_DAY_SECONDS}`;
const PRIVATE_CACHE = "private, no-store, max-age=0, must-revalidate";

const staticAssetPattern = /\.(?:avif|css|gif|ico|jpg|jpeg|js|map|mjs|png|svg|webp|woff|woff2)$/i;
const metadataAssetPattern = /\.(?:json|txt|webmanifest|xml)$/i;

function cacheValueForPath(pathname: string): string {
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return PRIVATE_CACHE;
  }

  if (pathname.startsWith("/_next/static") || staticAssetPattern.test(pathname)) {
    return IMMUTABLE_ASSET_CACHE;
  }

  if (pathname.startsWith("/_next/image")) {
    return OPTIMIZED_IMAGE_CACHE;
  }

  if (metadataAssetPattern.test(pathname)) {
    return PUBLIC_PAGE_CACHE;
  }

  return PUBLIC_PAGE_CACHE;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cacheControl = cacheValueForPath(request.nextUrl.pathname);

  response.headers.set("Cache-Control", cacheControl);

  if (cacheControl === IMMUTABLE_ASSET_CACHE) {
    response.headers.set("Expires", "Thu, 31 Dec 2037 23:55:55 GMT");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/data).*)"],
};
