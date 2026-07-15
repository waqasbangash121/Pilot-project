"use client";

import { useEffect } from "react";

type EventParams = {
  event_label?: string;
  link_url?: string;
  app_name?: string;
  section_name?: string;
  cta_text?: string;
  destination?: string;
  device_type?: "desktop" | "mobile";
};

function deviceType(): EventParams["device_type"] {
  if (typeof window === "undefined") return undefined;
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

function isAdminUrl(value: string | undefined): boolean {
  if (!value) return false;

  try {
    const pathname = value.startsWith("http://") || value.startsWith("https://") ? new URL(value).pathname : value;
    return pathname === "/admin" || pathname.startsWith("/admin/");
  } catch {
    return false;
  }
}

function shouldTrackAnalytics(): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  if (typeof window === "undefined") return false;

  const pathname = window.location.pathname;
  return pathname !== "/admin" && !pathname.startsWith("/admin/");
}

function sendEvent(eventName: string, params: EventParams) {
  if (!shouldTrackAnalytics()) return;
  if (isAdminUrl(params.link_url) || isAdminUrl(params.destination)) return;

  const payload = { ...params, device_type: params.device_type || deviceType() };
  window.gtag?.("event", eventName, payload);
  window.va?.("event", { name: eventName, ...payload });
  window.dataLayer?.push({ event: eventName, ...payload });
}

export function AnalyticsEventTracker() {
  useEffect(() => {
    if (!shouldTrackAnalytics()) return;

    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const tracked = target?.closest<HTMLElement>("[data-analytics-event]");
      if (tracked) {
        const link = tracked.closest<HTMLAnchorElement>("a[href]");
        const destination = tracked.dataset.analyticsDestination || link?.href;
        sendEvent(tracked.dataset.analyticsEvent || "site_interaction", {
          event_label: tracked.dataset.analyticsLabel || tracked.textContent?.trim() || undefined,
          link_url: link?.href || destination,
          app_name: tracked.dataset.analyticsApp,
          section_name: tracked.dataset.analyticsSection,
          cta_text: tracked.dataset.analyticsCta || tracked.textContent?.trim() || undefined,
          destination,
        });
        return;
      }

      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      if (link.href.includes("apps.shopify.com")) {
        sendEvent("outbound_shopify_app_store_click", {
          event_label: link.textContent?.trim() || undefined,
          link_url: link.href,
          cta_text: link.textContent?.trim() || undefined,
          destination: link.href,
        });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
