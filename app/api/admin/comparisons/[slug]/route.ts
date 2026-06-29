import { NextResponse } from "next/server";

import { ManagedContentInputError, parseManagedContentInput } from "@/lib/content-admin";
import { currentEditor } from "@/lib/editor-session";
import { githubCommitUrl, saveRemoteManagedContent } from "@/lib/editor-github";

export const runtime = "nodejs";

type ComparisonUpdateRouteProps = {
  params: Promise<{ slug: string }>;
};

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export async function PATCH(request: Request, { params }: ComparisonUpdateRouteProps) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    const { slug } = await params;
    const item = parseManagedContentInput(await request.json(), "comparison");
    const commit = await saveRemoteManagedContent(item, slug);
    return NextResponse.json({ slug: item.slug, commitUrl: githubCommitUrl(commit.sha) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The comparison could not be saved.";
    return NextResponse.json({ error: message }, { status: error instanceof ManagedContentInputError ? 400 : 500 });
  }
}
