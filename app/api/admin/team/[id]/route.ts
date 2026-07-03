import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { currentEditor } from "@/lib/editor-session";
import { deleteTeamMember, parseTeamMemberInput, saveTeamMember, TeamInputError, TeamStoreError } from "@/lib/team";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

function validId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ error: "Choose a valid team member." }, { status: 400 });

    const member = parseTeamMemberInput(await request.json());
    const saved = await saveTeamMember(member, id);

    revalidatePath("/team");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ id: saved.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The team member could not be saved.";
    const status = error instanceof TeamInputError || error instanceof TeamStoreError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    const { id } = await params;
    if (!validId(id)) return NextResponse.json({ error: "Choose a valid team member." }, { status: 400 });

    const deleted = await deleteTeamMember(id);

    revalidatePath("/team");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ deleted: true, name: deleted.name });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The team member could not be deleted.";
    const status = error instanceof TeamStoreError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
