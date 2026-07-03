import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { parseTeamMemberInput, saveTeamMember, TeamInputError, TeamStoreError } from "@/lib/team";
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
    const member = parseTeamMemberInput(await request.json());
    const saved = await saveTeamMember(member);

    revalidatePath("/team");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ id: saved.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The team member could not be saved.";
    const status = error instanceof TeamInputError || error instanceof TeamStoreError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
