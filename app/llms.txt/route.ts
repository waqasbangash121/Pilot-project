import { getAllBlogPosts } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllComparisons } from "@/lib/comparisons";
import { buildLlmsText } from "@/lib/llms";
import { getAllResources } from "@/lib/resources";
import { getAllTools } from "@/lib/tools";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const [posts, comparisons, resources, caseStudies, tools] = await Promise.all([
    getAllBlogPosts(),
    getAllComparisons(),
    getAllResources(),
    getAllCaseStudies(),
    getAllTools(),
  ]);

  return new Response(buildLlmsText({ posts, comparisons, resources, caseStudies, tools }), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}