import { NextResponse } from "next/server";

import { BlogInputError, parseBlogPostInput } from "@/lib/blog-admin";
import { revalidateContentRoutes } from "@/lib/content-revalidation";
import { ContentStoreError, saveBlogPost } from "@/lib/content-store";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });

  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const { slug } = await params;
    const article = parseBlogPostInput(await request.json());
    const saved = await saveBlogPost(article, editor.login, slug);

    revalidateContentRoutes("blog", saved.slug, slug);
    return NextResponse.json({ slug: saved.slug });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The article could not be saved.";
    const status = error instanceof BlogInputError || error instanceof ContentStoreError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}