export const defaultLocale = "en";
export const supportedLocales = ["en", "es"] as const;
export const localeCookieName = "hyper-locale";

export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

export function isLocale(value: string | undefined): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function localeFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isLocale(firstSegment) && firstSegment !== defaultLocale ? firstSegment : defaultLocale;
}