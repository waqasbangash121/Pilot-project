import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { AiSettingsError, getOpenAiWorkspaceConfiguration } from "@/lib/ai-settings";
import { currentEditor } from "@/lib/editor-session";

export const runtime = "nodejs";
export const maxDuration = 60;

type CoverModule = "blog" | "comparison" | "resource" | "case-study" | "tool";

const modules = new Set<CoverModule>(["blog", "comparison", "resource", "case-study", "tool"]);
const cooldownMs = 30_000;
const lastRequestByEditor = new Map<string, number>();

function sameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin;
}

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function slugForFile(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "cover"
  );
}

function providerError(status: number): AiSettingsError {
  if (status === 401 || status === 403) {
    return new AiSettingsError(
      "The saved OpenAI API key was rejected. Replace it in Settings.",
      400,
    );
  }

  if (status === 429) {
    return new AiSettingsError(
      "OpenAI is rate-limiting image generation. Wait a moment and try again.",
      429,
    );
  }

  return new AiSettingsError(
    "The AI provider could not generate this cover. Try again shortly.",
    502,
  );
}

export async function POST(request: Request) {
  const editor = await currentEditor();

  if (!editor) {
    return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  }

  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const now = Date.now();
  const previous = lastRequestByEditor.get(editor.login) ?? 0;
  const remaining = cooldownMs - (now - previous);

  if (remaining > 0) {
    return NextResponse.json(
      { error: `Please wait ${Math.ceil(remaining / 1000)} seconds before generating again.` },
      { status: 429 },
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const module = body.module;
    const title = cleanString(body.title, 160);
    const focusKeyword = cleanString(body.focusKeyword, 120);
    const existingContent = cleanString(body.existingContent, 1_500);

    if (typeof module !== "string" || !modules.has(module as CoverModule)) {
      throw new AiSettingsError("Choose a valid content module.");
    }

    if (!title) {
      throw new AiSettingsError("Add a title before generating a cover image.");
    }

    lastRequestByEditor.set(editor.login, now);

    const { apiKey } = await getOpenAiWorkspaceConfiguration();
    const prompt = [
      "Create a polished editorial cover image for NiagaraT's Hyper Apps website.",
      `Content type: ${module}.`,
      `Working title: ${title}.`,
      `Focus keyword: ${focusKeyword || "not set"}.`,
      `Draft context: ${existingContent || "No draft context yet"}.`,
      "Style: modern ecommerce SaaS editorial, useful and professional, with clear visual metaphor, clean composition, balanced lighting, realistic product-discovery or ecommerce workflow cues when relevant.",
      "Important constraints: no text, no letters, no logos, no UI screenshots with readable text, no fake brand marks, no people with distorted hands, no unsupported performance claims.",
      "Image should work as a wide website cover crop.",
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "1536x1024",
        quality: "medium",
        n: 1,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw providerError(response.status);
    }

    const result = (await response.json()) as { data?: Array<{ b64_json?: string }> };
    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      throw new AiSettingsError("The AI provider returned no usable image. Please try again.", 502);
    }

    const outputDirectory = path.join(process.cwd(), "public", "images", "generated-covers");
    await mkdir(outputDirectory, { recursive: true });

    const filename = `${Date.now()}-${slugForFile(title)}.png`;
    await writeFile(path.join(outputDirectory, filename), Buffer.from(imageBase64, "base64"));

    return NextResponse.json({ imagePath: `/images/generated-covers/${filename}` });
  } catch (error) {
    if (error instanceof AiSettingsError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json(
      { error: "Cover image generation could not be completed." },
      { status: 500 },
    );
  }
}
