import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type LinkItem = readonly string[];

type AppPageLinkSectionProps = {
  resourceTitle: string;
  resources: readonly LinkItem[];
  otherApps: readonly LinkItem[];
  analyticsEvent: string;
};

export function AppPageLinkSection({ resourceTitle, resources, otherApps, analyticsEvent }: AppPageLinkSectionProps) {
  return (
    <Section spacing="lg" className="bg-surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Explore next</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">{resourceTitle}</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {resources.map(([title, href, body]) => (
                <Link
                  key={title}
                  href={href}
                  className="group grid min-h-36 gap-5 rounded-[8px] border border-border bg-background p-5 transition hover:border-primary/60 hover:shadow-sm"
                  data-analytics-event={analyticsEvent}
                  data-analytics-section="related_resources"
                  data-analytics-cta={title}
                  data-analytics-destination={href}
                >
                  <span>
                    <span className="block font-bold leading-6">{title}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{body}</span>
                  </span>
                  <span className="inline-flex size-8 items-center justify-center rounded-[6px] border border-border text-primary transition group-hover:border-primary/60 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Recommended apps</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Solve the Next Storefront Bottleneck</h2>
            <div className="mt-7 grid gap-4">
              {otherApps.map(([title, href, body], index) => (
                <Link
                  key={title}
                  href={href}
                  className="group flex min-h-28 items-start gap-4 rounded-[8px] border border-border bg-background p-5 transition hover:border-primary/60 hover:shadow-sm"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[6px] bg-primary/10 text-sm font-black text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-6">{title}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{body}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
