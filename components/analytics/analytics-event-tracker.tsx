"use client";

import { useEffect } from "react";

function sendEvent(eventName: string, label?: string, href?: string) {
  const params = { event_label: label, link_url: href };
  window.gtag?.("event", eventName, params);
  window.va?.("event", { name: eventName, ...params });
  window.dataLayer?.push({ event: eventName, event_label: label, link_url: href });
}

export function AnalyticsEventTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const tracked = target?.closest<HTMLElement>("[data-analytics-event]");
      if (tracked) {
        sendEvent(
          tracked.dataset.analyticsEvent || "site_interaction",
          tracked.dataset.analyticsLabel || tracked.textContent?.trim(),
          tracked instanceof HTMLAnchorElement ? tracked.href : undefined,
        );
        return;
      }

      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      if (link.href.includes("apps.shopify.com")) {
        sendEvent("outbound_shopify_app_store_click", link.textContent?.trim(), link.href);
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
