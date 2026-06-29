import { NextResponse } from "next/server";

import { runBlogAudit } from "@/lib/blog-audit";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export async function POST(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    return NextResponse.json(await runBlogAudit(await request.json()));
  } catch (error) {
    const message = error instanceof Error ? error.message : "The content review could not be completed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
