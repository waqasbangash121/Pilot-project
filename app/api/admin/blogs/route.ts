import { NextResponse } from "next/server";

import { BlogInputError, parseBlogPostInput } from "@/lib/blog-admin";
import { currentEditor } from "@/lib/editor-session";
import { githubCommitUrl, saveRemotePost } from "@/lib/editor-github";

export const runtime = "nodejs";

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin;
}

export async function POST(request: Request) {
  const editor = await currentEditor();

  if (!editor) {
    return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  }

  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const post = parseBlogPostInput(await request.json());
    const commit = await saveRemotePost(post);

    return NextResponse.json({
      slug: post.slug,
      commitUrl: githubCommitUrl(commit.sha),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The article could not be saved.";
    const status = error instanceof BlogInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
