import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import {
  FooterSocialSettingsError,
  getFooterSocialSettingsSummary,
  saveFooterSocialSettings,
} from "@/lib/footer-social-settings";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

function errorResponse(error: unknown, fallback: string) {
  if (error instanceof FooterSocialSettingsError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }

  return NextResponse.json({ error: fallback }, { status: 500 });
}

async function requireAuthenticatedEditor() {
  const editor = await currentEditor();
  if (!editor) {
    return null;
  }

  return editor;
}

export async function GET() {
  const editor = await requireAuthenticatedEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });

  try {
    return NextResponse.json({ settings: await getFooterSocialSettingsSummary() });
  } catch (error) {
    return errorResponse(error, "Footer social settings could not be loaded.");
  }
}

export async function PUT(request: Request) {
  const editor = await requireAuthenticatedEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    const settings = await saveFooterSocialSettings(await request.json());
    revalidatePath("/", "layout");
    return NextResponse.json({ settings });
  } catch (error) {
    return errorResponse(error, "Footer social settings could not be saved.");
  }
}
