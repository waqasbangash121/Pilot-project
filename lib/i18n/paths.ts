import { defaultLocale, type Locale } from "@/lib/i18n/config";

const localizedStaticRoutes = new Set([
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
  "/pricing",
  "/privacy",
  "/resources",
  "/search",
  "/team",
  "/terms",
  "/tools",
]);

export function stripLocale(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizePath(pathname: string, locale: Locale): string {
  const cleanPath = stripLocale(pathname);

  if (locale === defaultLocale) {
    return cleanPath;
  }

  if (cleanPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${cleanPath}`;
}

export function spanishPathFor(pathname: string): string | null {
  const cleanPath = stripLocale(pathname);

  if (!localizedStaticRoutes.has(cleanPath)) {
    return null;
  }

  return localizePath(cleanPath, "es");
}

export function englishPathFor(pathname: string): string {
  return localizePath(pathname, defaultLocale);
}

export function isLocalizedStaticRoute(pathname: string): boolean {
  return localizedStaticRoutes.has(stripLocale(pathname));
}


