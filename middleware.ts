import { NextResponse, type NextRequest } from "next/server";

import { isLocale, localeCookieName, type Locale } from "@/lib/i18n/config";
import { isLocalizedStaticRoute, localizePath, stripLocale } from "@/lib/i18n/paths";

const ONE_YEAR_SECONDS = 31536000;
const ONE_DAY_SECONDS = 86400;
const ONE_HOUR_SECONDS = 3600;

const IMMUTABLE_ASSET_CACHE = `public, max-age=${ONE_YEAR_SECONDS}, immutable`;
const OPTIMIZED_IMAGE_CACHE = `public, max-age=${ONE_DAY_SECONDS}, s-maxage=${ONE_YEAR_SECONDS}, stale-while-revalidate=${ONE_DAY_SECONDS}`;
const PUBLIC_PAGE_CACHE = `public, max-age=${ONE_HOUR_SECONDS}, s-maxage=${ONE_DAY_SECONDS}, stale-while-revalidate=${ONE_DAY_SECONDS}`;
const PRIVATE_CACHE = "private, no-store, max-age=0, must-revalidate";
const CANONICAL_HOST = "niagarat.com";
const WWW_HOST = `www.${CANONICAL_HOST}`;

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

function isPublicPageRequest(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname;

  if (request.method !== "GET" && request.method !== "HEAD") return false;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api") || pathname.startsWith("/_next")) return false;
  if (staticAssetPattern.test(pathname) || metadataAssetPattern.test(pathname)) return false;

  return isLocalizedStaticRoute(pathname);
}

function preferredLocaleFromAcceptLanguage(header: string | null): Locale {
  const languages = (header ?? "")
    .split(",")
    .map((part) => {
      const [tag = "", qValue] = part.trim().split(";q=");
      const quality = qValue ? Number.parseFloat(qValue) : 1;

      return { tag: tag.toLowerCase(), quality: Number.isFinite(quality) ? quality : 0 };
    })
    .filter((item) => item.tag && item.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of languages) {
    const language = tag.split("-")[0];
    if (language === "es") return "es";
    if (language === "en") return "en";
  }

  return "en";
}

function localePreference(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;

  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return preferredLocaleFromAcceptLanguage(request.headers.get("accept-language"));
}

function shouldRedirectToPreferredLocale(request: NextRequest, preferredLocale: Locale): boolean {
  const pathname = request.nextUrl.pathname;
  const currentLocale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";

  if (currentLocale === preferredLocale) return false;
  if (pathname === "/es" || pathname.startsWith("/es/")) return false;

  return preferredLocale === "es" && isPublicPageRequest(request);
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  const locale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";

  requestHeaders.set("x-hyper-locale", locale);

  if (host === WWW_HOST) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https:";
    redirectUrl.hostname = CANONICAL_HOST;
    redirectUrl.port = "";
    const response = NextResponse.redirect(redirectUrl, 308);
    response.headers.set("Cache-Control", PUBLIC_PAGE_CACHE);
    return response;
  }

  const preferredLocale = localePreference(request);

  if (shouldRedirectToPreferredLocale(request, preferredLocale)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizePath(stripLocale(pathname), preferredLocale);
    const response = NextResponse.redirect(redirectUrl, 307);

    response.headers.set("Cache-Control", PRIVATE_CACHE);
    response.headers.set("Vary", "Accept-Language, Cookie");
    response.cookies.set(localeCookieName, preferredLocale, {
      maxAge: ONE_YEAR_SECONDS,
      path: "/",
      sameSite: "lax",
    });

    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  const cacheControl = cacheValueForPath(pathname);

  response.headers.set("Cache-Control", cacheControl);

  if (cacheControl === IMMUTABLE_ASSET_CACHE) {
    response.headers.set("Expires", "Thu, 31 Dec 2037 23:55:55 GMT");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/data).*)"],
};