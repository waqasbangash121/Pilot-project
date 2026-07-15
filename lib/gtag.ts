declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = "G-ZC5XNC1VDY";

function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isAdminUrl(value: unknown): boolean {
  if (typeof value !== "string") return false;

  try {
    const pathname = value.startsWith("http://") || value.startsWith("https://") ? new URL(value).pathname : value;
    return isAdminPath(pathname);
  } catch {
    return false;
  }
}

function analyticsAllowed(pathname?: string): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  if (typeof window === "undefined") return false;

  return !isAdminUrl(pathname ?? window.location.pathname);
}

export const pageview = (url: string): void => {
  if (!analyticsAllowed(url)) return;
  if (!window.gtag) return;

  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

type GtagEventParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (eventName: string, params?: GtagEventParams): void => {
  if (!analyticsAllowed()) return;
  if (isAdminUrl(params?.link_url) || isAdminUrl(params?.destination) || isAdminUrl(params?.event_label)) return;
  if (!window.gtag) return;

  window.gtag("event", eventName, {
    event_category: "engagement",
    ...params,
  });
};
