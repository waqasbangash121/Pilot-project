import { NextResponse } from "next/server";

import { runBlogAudit } from "@/lib/blog-audit";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";
export const maxDuration = 30;

const auditCooldownMs = 45_000;
const lastAuditAt = new Map<string, number>();

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export async function POST(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  const now = Date.now();
  const lastRun = lastAuditAt.get(editor.login) ?? 0;
  const waitMs = auditCooldownMs - (now - lastRun);

  if (waitMs > 0) {
    return NextResponse.json(
      { error: `Please wait ${Math.ceil(waitMs / 1000)} seconds before running another site audit.` },
      { status: 429 },
    );
  }

  try {
    const input = await request.json();
    lastAuditAt.set(editor.login, now);
    return NextResponse.json(await runBlogAudit(input));
  } catch (error) {
    const message = error instanceof Error ? error.message : "The article audit could not be completed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
