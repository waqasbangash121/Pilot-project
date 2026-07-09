"use client";

import { useEffect } from "react";

type AnalyticsContentType = "blog" | "comparison" | "resource" | "case-study" | "tool";
type AnalyticsEventType = "view" | "click";

type ContentAnalyticsTrackerProps = {
  contentType: AnalyticsContentType;
  slug: string;
  path: string;
};

const VISITOR_COOKIE = "hyper_content_visitor_id";
const SESSION_COOKIE = "hyper_content_session_id";
const VISITOR_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const SESSION_MAX_AGE_SECONDS = 60 * 30;

function createId(): string {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function readCookie(name: string): string | null {
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
}

function getOrCreateCookie(name: string, maxAgeSeconds: number): string {
  const existing = readCookie(name);
  if (existing) {
    writeCookie(name, existing, maxAgeSeconds);
    return existing;
  }

  const next = createId();
  writeCookie(name, next, maxAgeSeconds);
  return next;
}

function clippedText(value: string | null | undefined, maxLength: number): string | undefined {
  const text = value?.replace(/\s+/g, " ").trim();
  return text ? text.slice(0, maxLength) : undefined;
}

function postEvent(payload: Record<string, unknown>): void {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(
      "/api/content-analytics",
      new Blob([body], { type: "application/json" }),
    );
    if (sent) return;
  }

  void fetch("/api/content-analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function ContentAnalyticsTracker({ contentType, slug, path }: ContentAnalyticsTrackerProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const visitorId = getOrCreateCookie(VISITOR_COOKIE, VISITOR_MAX_AGE_SECONDS);
    const sessionId = getOrCreateCookie(SESSION_COOKIE, SESSION_MAX_AGE_SECONDS);

    function send(eventType: AnalyticsEventType, details?: { targetUrl?: string; targetText?: string }) {
      writeCookie(SESSION_COOKIE, sessionId, SESSION_MAX_AGE_SECONDS);

      postEvent({
        contentType,
        slug,
        eventType,
        visitorId,
        sessionId,
        path,
        referrer: document.referrer || undefined,
        ...details,
      });
    }

    const viewKey = `hyper_content_view:${contentType}:${slug}:${sessionId}`;
    if (!window.sessionStorage.getItem(viewKey)) {
      window.sessionStorage.setItem(viewKey, "1");
      send("view");
    }

    function handleClick(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      if (!link.closest('[data-content-analytics-root="true"]')) return;

      const href = link.href;
      if (!href) return;

      send("click", {
        targetUrl: href,
        targetText: clippedText(link.textContent, 180),
      });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [contentType, slug, path]);

  return null;
}
