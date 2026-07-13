import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type ProductVisual = {
  src: string;
  alt: string;
  title: string;
  body: string;
};

type ProductVisualGalleryProps = {
  eyebrow: string;
  title: string;
  body: string;
  visuals: ProductVisual[];
};

export function ProductVisualGallery({ eyebrow, title, body, visuals }: ProductVisualGalleryProps) {
  const [featured, ...supporting] = visuals;

  return (
    <Section spacing="lg">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">{title}</h2>
            <p className="mt-4 text-muted-foreground">{body}</p>
          </div>
          {featured ? (
            <figure className="overflow-hidden rounded-[8px] border border-border bg-surface shadow-sm">
              <div className="aspect-video bg-background">
                <Image
                  src={featured.src}
                  alt={featured.alt}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="border-t border-border p-4">
                <p className="font-bold">{featured.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{featured.body}</p>
              </figcaption>
            </figure>
          ) : null}
        </div>
        {supporting.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supporting.map((visual) => (
              <figure key={visual.src} className="overflow-hidden rounded-[8px] border border-border bg-surface shadow-sm">
                <div className="aspect-video bg-background">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="border-t border-border p-4">
                  <p className="font-bold">{visual.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{visual.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
