declare global {
  interface Window {
    gtag?: (...args: (string | Record<string, unknown> | number | boolean | undefined)[]) => void;
  }
}

export const GA_ID = "G-ZC5XNC1VDY";

export const pageview = (url: string): void => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

type GtagParams = Record<string, string | number | boolean>;

export const trackEvent = (eventName: string, params?: GtagParams): void => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", eventName, {
    event_category: "engagement",
    ...params,
  });
};
