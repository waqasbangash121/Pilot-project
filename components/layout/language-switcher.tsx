"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeCookieName, localeLabels, type Locale } from "@/lib/i18n/config";
import { englishPathFor, spanishPathFor } from "@/lib/i18n/paths";

function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const spanishPath = spanishPathFor(pathname);
  const englishPath = englishPathFor(pathname);

  if (!spanishPath) return null;

  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const nextLocale = isSpanish ? "en" : "es";
  const nextHref = isSpanish ? englishPath : spanishPath;
  const label = isSpanish ? localeLabels.en : localeLabels.es;

  return (
    <Link
      href={nextHref}
      hrefLang={nextLocale}
      onClick={() => rememberLocale(nextLocale)}
      className="inline-flex h-10 items-center justify-center rounded-[6px] border border-border bg-background px-3 text-sm font-bold text-foreground transition hover:border-primary/35 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={isSpanish ? "Switch to English" : "Cambiar a español"}
    >
      {label}
    </Link>
  );
}