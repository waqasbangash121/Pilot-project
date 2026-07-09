import { NextResponse, type NextRequest } from "next/server";

import { recordContentAnalyticsEvent, type RecordContentAnalyticsInput } from "@/lib/content-analytics";

export const runtime = "nodejs";

type JsonBody = Record<string, unknown>;

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function readJson(request: NextRequest): Promise<JsonBody | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body as JsonBody : null;
  } catch {
    return null;
  }
}

function toAnalyticsInput(body: JsonBody): RecordContentAnalyticsInput {
  return {
    contentType: body.contentType,
    slug: body.slug,
    eventType: body.eventType,
    visitorId: body.visitorId,
    sessionId: body.sessionId,
    path: body.path,
    targetUrl: body.targetUrl,
    targetText: body.targetText,
    referrer: body.referrer,
  };
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ ok: true, recorded: false });
  }

  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const result = await recordContentAnalyticsEvent(toAnalyticsInput(body), request);
    return NextResponse.json({ ok: true, recorded: result.recorded });
  } catch (error) {
    console.error("Failed to record content analytics event", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
