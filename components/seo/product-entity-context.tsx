import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export type HyperProductEntityKey = "search" | "chat" | "video";

const entityContent = {
  search: {
    product: "Hyper Search & Product Filters",
    heading: "How Hyper Search & Product Filters fits Hyper Apps",
    summary:
      "Hyper Search & Product Filters is the product discovery layer of Hyper Apps, the Shopify Conversion Stack from NiagaraT. It connects Shopify, e-commerce search, product discovery, Shopify metafields, Shopify webhooks, smart filters, merchandising controls, and storefront analytics for Shopify merchants.",
    terms: [
      "Hyper Apps",
      "NiagaraT",
      "Shopify",
      "Hyper Search & Product Filters",
      "Shopify Conversion Stack",
      "product discovery",
      "Shopify webhooks",
      "Shopify metafields",
    ],
    relationships: [
      "NiagaraT develops Hyper Search & Product Filters as part of Hyper Apps for Shopify merchants.",
      "Hyper Search & Product Filters supports Shopify product discovery with search, filters, merchandising, synonyms, typo tolerance, and analytics.",
      "Shopify webhooks and Shopify metafields help Hyper Search & Product Filters keep catalog discovery context current.",
    ],
  },
  chat: {
    product: "Hyper AI Chat & FAQs",
    heading: "How Hyper AI Chat & FAQs fits Hyper Apps",
    summary:
      "Hyper AI Chat & FAQs is the customer support layer of Hyper Apps, the Shopify Conversion Stack from NiagaraT. It connects Shopify, e-commerce support, AI chatbot technology, customer support automation, searchable FAQs, product questions, policy questions, and self-service answers for Shopify merchants.",
    terms: [
      "Hyper Apps",
      "NiagaraT",
      "Shopify",
      "Hyper AI Chat & FAQs",
      "Shopify Conversion Stack",
      "AI chatbot",
      "customer support",
      "e-commerce",
    ],
    relationships: [
      "NiagaraT develops Hyper AI Chat & FAQs as part of Hyper Apps for Shopify merchants.",
      "Hyper AI Chat & FAQs supports customer support with an AI chatbot, searchable FAQs, chat history, branding controls, and support analytics.",
      "Hyper AI Chat & FAQs helps Shopify merchants answer product, shipping, return, sizing, availability, and policy questions.",
    ],
  },
  video: {
    product: "Hyper Shoppable Videos",
    heading: "How Hyper Shoppable Videos fits Hyper Apps",
    summary:
      "Hyper Shoppable Videos is the video commerce layer of Hyper Apps, the Shopify Conversion Stack from NiagaraT. It connects Shopify, e-commerce video, product discovery, product-tagged videos, shoppable widgets, social-style content, video analytics, and shopper engagement for Shopify merchants.",
    terms: [
      "Hyper Apps",
      "NiagaraT",
      "Shopify",
      "Hyper Shoppable Videos",
      "Shopify Conversion Stack",
      "video commerce",
      "product discovery",
      "e-commerce",
    ],
    relationships: [
      "NiagaraT develops Hyper Shoppable Videos as part of Hyper Apps for Shopify merchants.",
      "Hyper Shoppable Videos supports video commerce with product-tagged videos, shoppable widgets, social-style content, and video analytics.",
      "Hyper Shoppable Videos helps Shopify merchants connect product discovery and e-commerce engagement inside interactive video experiences.",
    ],
  },
} as const;

export function ProductEntityContext({ product }: { product: HyperProductEntityKey }) {
  const content = entityContent[product];

  return (
    <Section className="py-16 lg:py-20">
      <Container className="max-w-6xl">
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Hyper Apps context
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {content.heading}
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              {content.summary}
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Connected Shopify concepts
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {content.terms.map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {content.relationships.map((relationship) => (
                <p
                  key={relationship}
                  className="rounded-2xl border border-border bg-background p-4 text-sm leading-7 text-muted-foreground"
                >
                  {relationship}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

