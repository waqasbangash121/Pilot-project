import "server-only";

import { randomUUID } from "node:crypto";

import { getSql } from "@/db";
import {
  contentAnalyticsEventTypes,
  contentTypes,
  type ContentAnalyticsEventType,
  type ContentType,
} from "@/db/schema";
import { CONTENT_WORKSPACE_ID } from "@/lib/content-store";

export type AnalyticsContentType = ContentType;
export type AnalyticsEventType = ContentAnalyticsEventType;

export type ContentAnalyticsTarget = {
  targetUrl: string;
  targetText: string;
  clicks: number;
  lastClickedAt: string | null;
};

export type ContentAnalyticsStats = {
  contentType: AnalyticsContentType;
  slug: string;
  title: string;
  views: number;
  clicks: number;
  visitors: number;
  sessions: number;
  lastViewedAt: string | null;
  topTargets: ContentAnalyticsTarget[];
};

export type ContentAnalyticsOverview = {
  views: number;
  clicks: number;
  visitors: number;
  sessions: number;
  trackedContent: number;
  rows: ContentAnalyticsStats[];
};

export type RecordContentAnalyticsInput = {
  contentType: unknown;
  slug: unknown;
  eventType: unknown;
  visitorId: unknown;
  sessionId: unknown;
  path: unknown;
  targetUrl?: unknown;
  targetText?: unknown;
  referrer?: unknown;
};

type CountValue = number | string | bigint | null | undefined;

type SummaryRow = {
  content_type: AnalyticsContentType;
  content_slug: string;
  title: string | null;
  views: CountValue;
  clicks: CountValue;
  visitors: CountValue;
  sessions: CountValue;
  last_viewed_at: Date | string | null;
};

type TargetRow = {
  target_url: string | null;
  target_text: string | null;
  clicks: CountValue;
  last_clicked_at: Date | string | null;
};

type OverviewRow = {
  views: CountValue;
  clicks: CountValue;
  visitors: CountValue;
  sessions: CountValue;
  tracked_content: CountValue;
};

const CONTENT_TYPE_VALUES = new Set<string>(contentTypes);
const EVENT_TYPE_VALUES = new Set<string>(contentAnalyticsEventTypes);

const CONTENT_PATH_PREFIXES: Record<AnalyticsContentType, string> = {
  blog: "blog",
  comparison: "comparisons",
  resource: "resources",
  "case-study": "case-studies",
  tool: "tools",
};

export function isAnalyticsContentType(value: unknown): value is AnalyticsContentType {
  return typeof value === "string" && CONTENT_TYPE_VALUES.has(value);
}

export function isAnalyticsEventType(value: unknown): value is AnalyticsEventType {
  return typeof value === "string" && EVENT_TYPE_VALUES.has(value);
}

function toCount(value: CountValue): number {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") return Number.parseInt(value, 10) || 0;
  return 0;
}

function toIsoDate(value: Date | string | null): string | null {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function limitText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  return trimmed.slice(0, maxLength);
}

function normalizePath(value: unknown, fallback: string): string {
  const path = limitText(value, 500);
  if (!path) return fallback;

  if (path.startsWith("/")) return path;

  try {
    return new URL(path).pathname;
  } catch {
    return fallback;
  }
}

function analyticsStorageUnavailable(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    (message.includes("content_analytics_events") && message.includes("does not exist")) ||
    message.includes("fetch failed") ||
    message.includes("Error connecting to database") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ENOTFOUND") ||
    message.includes("ETIMEDOUT")
  );
}

function emptyStats(contentType: AnalyticsContentType, slug: string, title = slug): ContentAnalyticsStats {
  return {
    contentType,
    slug,
    title,
    views: 0,
    clicks: 0,
    visitors: 0,
    sessions: 0,
    lastViewedAt: null,
    topTargets: [],
  };
}

function toSummary(row: SummaryRow): ContentAnalyticsStats {
  return {
    contentType: row.content_type,
    slug: row.content_slug,
    title: row.title || row.content_slug,
    views: toCount(row.views),
    clicks: toCount(row.clicks),
    visitors: toCount(row.visitors),
    sessions: toCount(row.sessions),
    lastViewedAt: toIsoDate(row.last_viewed_at),
    topTargets: [],
  };
}

async function querySummaryRows(
  contentType: AnalyticsContentType | null,
  slug: string | null,
  limit: number,
): Promise<ContentAnalyticsStats[]> {
  const sql = getSql();
  const typeParam = contentType ?? null;
  const slugParam = slug ?? null;
  const safeLimit = Math.max(1, Math.min(limit, 200));

  const rows = await sql`
    select
      events."content_type",
      events."content_slug",
      max(items."title") as "title",
      count(*) filter (where events."event_type" = ${"view"})::int as "views",
      count(*) filter (where events."event_type" = ${"click"})::int as "clicks",
      count(distinct events."visitor_id")::int as "visitors",
      count(distinct events."session_id")::int as "sessions",
      max(events."created_at") filter (where events."event_type" = ${"view"}) as "last_viewed_at"
    from "content_analytics_events" events
    left join "content_items" items
      on items."workspace_id" = events."workspace_id"
      and items."type" = events."content_type"
      and items."slug" = events."content_slug"
    where events."workspace_id" = ${CONTENT_WORKSPACE_ID}
      and (${typeParam}::text is null or events."content_type" = ${typeParam})
      and (${slugParam}::text is null or events."content_slug" = ${slugParam})
    group by events."content_type", events."content_slug"
    order by "views" desc, "clicks" desc, "last_viewed_at" desc nulls last
    limit ${safeLimit}
  ` as SummaryRow[];

  return rows.map(toSummary);
}

async function queryTopTargets(
  contentType: AnalyticsContentType,
  slug: string,
  limit: number,
): Promise<ContentAnalyticsTarget[]> {
  const sql = getSql();
  const safeLimit = Math.max(1, Math.min(limit, 25));

  const rows = await sql`
    select
      "target_url",
      max("target_text") as "target_text",
      count(*)::int as "clicks",
      max("created_at") as "last_clicked_at"
    from "content_analytics_events"
    where "workspace_id" = ${CONTENT_WORKSPACE_ID}
      and "content_type" = ${contentType}
      and "content_slug" = ${slug}
      and "event_type" = ${"click"}
      and "target_url" is not null
    group by "target_url"
    order by "clicks" desc, "last_clicked_at" desc
    limit ${safeLimit}
  ` as TargetRow[];

  return rows
    .filter((row) => Boolean(row.target_url))
    .map((row) => ({
      targetUrl: row.target_url || "",
      targetText: row.target_text || row.target_url || "Link",
      clicks: toCount(row.clicks),
      lastClickedAt: toIsoDate(row.last_clicked_at),
    }));
}

export async function recordContentAnalyticsEvent(
  input: RecordContentAnalyticsInput,
  request: { headers: Headers },
): Promise<{ recorded: boolean }> {
  const contentType = isAnalyticsContentType(input.contentType) ? input.contentType : null;
  const eventType = isAnalyticsEventType(input.eventType) ? input.eventType : null;
  const slug = limitText(input.slug, 160);
  const visitorId = limitText(input.visitorId, 100);
  const sessionId = limitText(input.sessionId, 100);

  if (!contentType || !eventType || !slug || !visitorId || !sessionId) {
    return { recorded: false };
  }

  const fallbackPath = `/${CONTENT_PATH_PREFIXES[contentType]}/${slug}`;
  const path = normalizePath(input.path, fallbackPath);
  const targetUrl = eventType === "click" ? limitText(input.targetUrl, 700) : null;
  const targetText = eventType === "click" ? limitText(input.targetText, 180) : null;
  const referrer = limitText(input.referrer, 700) ?? limitText(request.headers.get("referer"), 700);
  const sql = getSql();

  try {
    const itemRows = await sql`
      select "id"
      from "content_items"
      where "workspace_id" = ${CONTENT_WORKSPACE_ID}
        and "type" = ${contentType}
        and "slug" = ${slug}
        and "status" = ${"published"}
      limit 1
    ` as { id: string }[];

    const item = itemRows[0];
    if (!item) {
      return { recorded: false };
    }

    await sql`
      insert into "content_analytics_events" (
        "id",
        "workspace_id",
        "content_item_id",
        "content_type",
        "content_slug",
        "event_type",
        "visitor_id",
        "session_id",
        "path",
        "target_url",
        "target_text",
        "referrer"
      ) values (
        ${randomUUID()},
        ${CONTENT_WORKSPACE_ID},
        ${item.id},
        ${contentType},
        ${slug},
        ${eventType},
        ${visitorId},
        ${sessionId},
        ${path},
        ${targetUrl},
        ${targetText},
        ${referrer}
      )
    `;

    return { recorded: true };
  } catch (error) {
    if (analyticsStorageUnavailable(error)) return { recorded: false };
    throw error;
  }
}

export async function getContentAnalyticsForContent(
  contentType: AnalyticsContentType,
  slug: string,
): Promise<ContentAnalyticsStats> {
  try {
    const rows = await querySummaryRows(contentType, slug, 1);
    const stats = rows[0] ?? emptyStats(contentType, slug);
    return {
      ...stats,
      topTargets: await queryTopTargets(contentType, slug, 5),
    };
  } catch (error) {
    if (analyticsStorageUnavailable(error)) return emptyStats(contentType, slug);
    throw error;
  }
}

export async function getContentAnalyticsByType(
  contentType: AnalyticsContentType,
): Promise<Map<string, ContentAnalyticsStats>> {
  try {
    const rows = await querySummaryRows(contentType, null, 200);
    return new Map(rows.map((row) => [row.slug, row]));
  } catch (error) {
    if (analyticsStorageUnavailable(error)) return new Map();
    throw error;
  }
}

export async function getContentAnalyticsOverview(limit = 8): Promise<ContentAnalyticsOverview> {
  const sql = getSql();

  try {
    const totals = await sql`
      select
        count(*) filter (where "event_type" = ${"view"})::int as "views",
        count(*) filter (where "event_type" = ${"click"})::int as "clicks",
        count(distinct "visitor_id")::int as "visitors",
        count(distinct "session_id")::int as "sessions",
        count(distinct ("content_type" || ':' || "content_slug"))::int as "tracked_content"
      from "content_analytics_events"
      where "workspace_id" = ${CONTENT_WORKSPACE_ID}
    ` as OverviewRow[];

    const row = totals[0];
    return {
      views: toCount(row?.views),
      clicks: toCount(row?.clicks),
      visitors: toCount(row?.visitors),
      sessions: toCount(row?.sessions),
      trackedContent: toCount(row?.tracked_content),
      rows: await querySummaryRows(null, null, limit),
    };
  } catch (error) {
    if (analyticsStorageUnavailable(error)) {
      return { views: 0, clicks: 0, visitors: 0, sessions: 0, trackedContent: 0, rows: [] };
    }
    throw error;
  }
}





