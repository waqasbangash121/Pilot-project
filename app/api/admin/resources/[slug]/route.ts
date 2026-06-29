import { NextResponse } from "next/server";

import { parseManagedContentInput } from "@/lib/content-admin";
import { currentEditor } from "@/lib/editor-session";
import { saveRemoteManagedContent } from "@/lib/editor-github";

export const runtime = "nodejs";

type ResourceUpdateRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function PATCH(request: Request, { params }: ResourceUpdateRouteProps) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const { slug } = await params;
    const item = parseManagedContentInput(await request.json(), "resource");
    const commit = await saveRemoteManagedContent(item, slug);
    return NextResponse.json({ slug: item.slug, commitSha: commit.sha });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "The resource could not be saved." },
      { status: 400 },
    );
  }
}
