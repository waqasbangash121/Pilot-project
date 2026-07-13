import { buildLlmsText } from "@/lib/llms";

export const revalidate = 3600;

export function GET(): Response {
  return new Response(buildLlmsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}