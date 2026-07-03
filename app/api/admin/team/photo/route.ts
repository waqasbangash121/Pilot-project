import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";

import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";

const maxPhotoBytes = 1_000_000;
const allowedImageTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/avif"]);

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export async function POST(request: Request) {
  const editor = await currentEditor();
  if (!editor) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  try {
    const formData = await request.formData();
    const file = formData.get("photo");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose a photo to upload." }, { status: 400 });
    }

    if (!allowedImageTypes.has(file.type)) {
      return NextResponse.json({ error: "Photo must be a PNG, JPG, WebP, or AVIF image." }, { status: 400 });
    }

    if (file.size > maxPhotoBytes) {
      return NextResponse.json({ error: "Photo upload must be 1 MB or smaller." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const photoUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

    return NextResponse.json({ photoUrl });
  } catch {
    return NextResponse.json({ error: "The photo could not be uploaded." }, { status: 500 });
  }
}
