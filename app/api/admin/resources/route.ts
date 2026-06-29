import { NextResponse } from "next/server";

import { parseManagedContentInput } from "@/lib/content-admin";
import { currentEditor } from "@/lib/editor-session";
import { saveRemoteManagedContent } from "@/lib/editor-github";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const item = parseManagedContentInput(await request.json(), "resource");
    const commit = await saveRemoteManagedContent(item);
    return NextResponse.json({ slug: item.slug, commitSha: commit.sha });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "The resource could not be saved." },
      { status: 400 },
    );
  }
}
