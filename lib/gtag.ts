declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = "G-ZC5XNC1VDY";

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

// Event tracking
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>,
) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", eventName, {
    event_category: "engagement",
    ...params,
  });
};
