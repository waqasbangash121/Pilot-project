import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import TrackLink from "@/components/TrackLink";
import PricingComponent from "@/components/PricingComponent";
import dynamic from "next/dynamic";

const CardStack = dynamic(
  () => import("@/components/CardStack").then((m) => m.CardStack),
  {
    loading: () => (
      <div className="h-[420px] w-full max-w-3xl animate-pulse rounded-2xl bg-surface" />
    ),
  }
);

export const metadata = createPageMetadata({
  title: "Hyper AI Chat & FAQs for Shopify Customer Support",
  description:
    "Hyper AI Chat & FAQs is a Shopify AI chatbot and FAQ app from NiagaraT that helps merchants answer common customer questions, support self-service help, review chat history, and use support analytics.",
  path: "/apps/hyper-ai-chat-faq",
});

const features = [
  "Shopify AI chatbot for customer support",
  "Searchable FAQ page and responses",
  "Self-service customer answers",
  "Reduces support workload",
  "Product and policy question support",
  "Supports purchase confidence",
];

const seoBenefits = [
  {
    icon: "💬",
    title: "Instant AI Responses",
    desc: "Provide quick answers to common customer questions before a support team needs to step in.",
  },
  {
    icon: "🧠",
    title: "AI-Powered FAQs",
    desc: "Create and manage FAQ answers that support common shopper questions.",
  },
  {
    icon: "⚡",
    title: "24/7 Support",
    desc: "Offer self-service help for shoppers who need answers outside normal support hours.",
  },
  {
    icon: "📈",
    title: "Purchase Confidence",
    desc: "Faster answers can reduce hesitation and help customers make more confident purchase decisions.",
  },
];

const benefits = [
  {
    id: 1,
    title: "Instant Customer Support",
    description:
      "Provide real-time answers to customer questions without delays or manual support.",
    imageSrc: "/aichat-benefit-1.png",
  },
  {
    id: 2,
    title: "Reduce Support Costs",
    description: "Automate repetitive questions and reduce support workload for common requests.",
    imageSrc: "/aichat-benefit-2.png",
  },
  {
    id: 3,
    title: "Increase Conversions",
    description:
      "Help customers make faster buying decisions with instant product and policy answers.",
    imageSrc: "/aichat-benefit-3.png",
  },
  {
    id: 4,
    title: "Faster Issue Resolution",
    description: "Resolve customer issues quickly with AI-powered support and instant answers.",
    imageSrc: "/aichat-benefit-4.png",
  },
  {
    id: 5,
    title: "Store-Specific Intelligence",
    description:
      "Use store-specific content such as FAQs, product information, policies, and support guidance to answer with better context.",
    imageSrc: "/aichat-benefit-5.png",
  },
];

const pricingTiers = [
  {
    name: "Free",
    subtitle: "Free",
    price: "Free",
    description:
      "Add a Shopify AI chatbot and searchable FAQs to answer customer questions instantly.",
    features: [
      { text: "Up to 50 AI replies/month", included: true },
      { text: "AI training", included: true },
      { text: "10 FAQs", included: true },
      { text: "Chat history(30 days)", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: true },
    ],
    buttonText: "Install Free",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
  },
  {
    name: "Starter",
    subtitle: "Starter",
    price: "$19",
    period: "/mo",
    description: "Automate customer support and product discovery with AI-powered Shopify chat.",
    features: [
      { text: "500 AI replies/month", included: true },
      { text: "AI training", included: true },
      { text: "25 FAQs", included: true },
      { text: "Chat history(180 days)", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom branding", included: true },
      { text: "Basic support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
  },
  {
    name: "Growth",
    subtitle: "GROWTH",
    price: "$49",
    period: "/mo",
    description: "Improve customer experience with advanced chatbot analytics and FAQ automation.",
    badge: { text: "Most Popular" },
    features: [
      { text: "2500 AI replies/month", included: true },
      { text: "AI training", included: true },
      { text: "Unlimited FAQs", included: true },
      { text: "Chat history(365 days)", included: true },
      { text: "Custom branding", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Premium support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
    highlighted: true,
  },
  {
    name: "Pro",
    subtitle: "PRO",
    price: "$99",
    period: "/mo",
    description: "Complete AI customer support solution for high-volume Shopify stores and brands.",
    features: [
      { text: "10,000 AI replies/month", included: true },
      { text: "AI training", included: true },
      { text: "Unlimited FAQs", included: true },
      { text: "Chat history(unlimited)", included: true },
      { text: "White label branding", included: true },
      { text: "Enterprise analytics", included: true },
      { text: "Priority support", included: true },
    ],
    buttonText: "Install on Shopify",
    buttonVariant: "secondary" as const,
    buttonHref: "https://apps.shopify.com/hyper-chatbot-and-faqs",
  },
];

const faqs = [
  {
    q: "What is AI chat for Shopify?",
    a: "It is an automated support system that answers customer questions using artificial intelligence trained on your store data.",
  },
  {
    q: "Can Hyper AI Chat & FAQs reduce repetitive support work?",
    a: "It can handle repetitive questions and reduce workload, but complex or sensitive cases should still be reviewed by a human support team.",
  },
  {
    q: "How can Hyper AI Chat & FAQs support conversions?",
    a: "Faster answers can improve purchase confidence by helping shoppers understand products, policies, shipping, returns, and availability before they leave the store.",
  },
  {
    q: "Can Hyper AI Chat & FAQs answer questions outside business hours?",
    a: "Yes. Hyper AI Chat & FAQs can provide self-service answers when support staff are not immediately available.",
  },
  {
    q: "Does Hyper AI Chat & FAQs work with Shopify themes?",
    a: "Yes. The app integrates seamlessly with Shopify stores and is designed to work across modern Shopify themes.",
  },
  {
    q: "Is coding required to use Hyper AI Chat & FAQs?",
    a: "No. Hyper AI Chat & FAQs is designed as a plug-and-play Shopify app with an easy setup process.",
  },
  {
    q: "What store data can Hyper AI Chat & FAQs use to answer customers?",
    a: "Hyper AI Chat & FAQs can use store-specific content such as FAQs, product information, policies, and support guidance to answer questions with context that matches your Shopify store.",
  },
  {
    q: "Can Hyper AI Chat & FAQs answer product and policy questions?",
    a: "Yes. The assistant can respond to common product, shipping, return, sizing, availability, and policy questions so customers can keep moving toward purchase.",
  },
  {
    q: "How does Hyper AI Chat & FAQs reduce support tickets?",
    a: "It handles repetitive questions instantly, gives customers self-service answers, and keeps common requests out of the support queue so teams can focus on higher-value conversations.",
  },
  {
    q: "Is Hyper AI Chat & FAQs useful for small Shopify stores?",
    a: "Yes. Smaller Shopify stores can use it to answer common questions without immediately adding more support staff, while growing stores can scale self-service support as order volume increases.",
  },
];

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://niagarat.com/apps/hyper-ai-chat-faq#software",
  name: "Hyper AI Chat & FAQs",
  url: "https://niagarat.com/apps/hyper-ai-chat-faq",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Customer support and conversational commerce",
  operatingSystem: "Shopify",
  description:
    "AI customer support and FAQ automation for Shopify stores. Hyper AI Chat & FAQs uses store-specific product information, policies, and support guidance to answer shopper questions around the clock, reduce repetitive tickets, and support purchase decisions.",
  image: "https://niagarat.com/aichat-banner.png",
  installUrl: "https://apps.shopify.com/hyper-chatbot-and-faqs",
  publisher: {
    "@type": "Organization",
    name: "NiagaraT",
    url: "https://niagarat.com",
  },
  offers: pricingTiers.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    price: tier.price === "Free" ? "0" : tier.price.replace("$", ""),
    priceCurrency: "USD",
    url: tier.buttonHref,
  })),
  featureList: [
    "AI-powered Shopify customer support chat",
    "Store-specific AI training",
    "Automated and searchable FAQs",
    "Product information assistance",
    "Shipping, return, sizing, and policy answers",
    "Self-service customer responses",
    "Conversation history",
    "Customer support analytics",
    "Custom chatbot branding",
    "Support ticket deflection",
  ],
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HyperAIChatFAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* HERO */}
      <Section className="pt-24 sm:pt-28 lg:pt-32 pb-14">
        <Container className="max-w-5xl text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2 shadow-sm">
              <Image
                src="/hyper-search.svg"
                alt="Hyper AI Chat & FAQs app"
                width={28}
                height={28}
                className="h-7 w-7 rounded-md object-contain"
              />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Hyper AI Chat & FAQs
              </span>
            </div>
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            AI Chat & Smart FAQs for Shopify Customer Support
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-7">
            Automate customer support with intelligent AI chat and FAQ systems. Hyper AI Chat & FAQs is developed by NiagaraT under the Hyper brand for Shopify merchants. It helps answer product, shipping, return, sizing, availability, and policy questions with an AI chatbot and searchable FAQ page.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackLink
              href="https://apps.shopify.com/hyper-chatbot-and-faqs"
              eventName="click_install_button"
              className="w-full sm:w-auto rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Install on Shopify
            </TrackLink>

            <Link href="#features" className="text-sm font-medium text-primary underline">
              Explore Features
            </Link>
          </div>
        </Container>
      </Section>

      {/* FEATURES (MATCHED TEMPLATE STYLE) */}
      <Section id="features" className="py-20 lg:py-28">
        <Container className="max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center border border-border rounded-2xl bg-surface p-6 sm:p-10">
            {/* LEFT */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  Core Features
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold">
                  AI Support Built for Shopify Stores
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg leading-7 max-w-xl">
                  Hyper AI Chat & FAQs uses store-specific content such as FAQs, product information, policies, and support guidance to answer common customer questions.
                </p>
              </div>

              <div className="flex flex-col gap-6 pt-2">
                {features.map((feature) => (
                  <div key={feature} className="flex gap-4 items-start">
                    <Check className="w-5 h-5 mt-1 text-primary shrink-0" />

                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm sm:text-base">{feature}</p>
                      <p className="text-sm text-muted-foreground leading-6">
                        Intelligent automation improves response quality and speed.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative">
              <div className="aspect-rectangle rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-border flex items-center justify-center overflow-hidden">
                <Image
                  src="/aichat-banner.png"
                  alt="AI Chat Dashboard"
                  width={1200}
                  height={900}
                  className="opacity-80"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">💬 Chat → Solve → Convert</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container className="max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              AI Customer Support Intelligence
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Automate Shopify Customer Support with AI Chat and FAQs
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground leading-7">
              Explore how an AI chatbot, FAQ management, chat history, branding controls, and support analytics help Shopify merchants answer repeated questions and give shoppers clearer self-service support.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <CardStack
              items={benefits.map((b) => ({
                id: b.id,
                title: b.title,
                imageSrc: b.imageSrc,
              }))}
              cardHeight={420}
              autoAdvance={true}
              intervalMs={3500}
            />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seoBenefits.map((item) => (
              <div
                key={item.title}
                className="
        rounded-3xl
        border
        border-border
        bg-surface
        p-8
        transition-all
        duration-300
        hover:border-primary/30
        hover:shadow-xl
      "
              >
                <div className="text-4xl">{item.icon}</div>

                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="py-20 lg:py-24">
        <Container className="max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              How It Works
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              How AI Chat Automates Support
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Hyper AI Chat & FAQs helps Shopify merchants automate common support conversations. Customers can ask product, shipping, return, sizing, availability, and policy questions and receive self-service answers from the chat and FAQ experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: "💬",
                title: "Customer Asks a Question",
                description:
                  "Shoppers submit product, order, or policy questions through the AI chat widget directly on your Shopify store.",
              },
              {
                step: "02",
                icon: "🧠",
                title: "AI Understands Intent",
                description:
                  "The app uses store content such as FAQs, product information, policies, and support guidance to provide a relevant answer when available.",
              },
              {
                step: "03",
                icon: "⚡",
                title: "Instant Response Delivered",
                description:
                  "Customers receive quick self-service answers, reducing wait times for common questions and helping them make more confident purchase decisions.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="
            group relative overflow-hidden rounded-3xl
            border border-border
            bg-linear-to-b from-background to-surface
            p-8
            transition-all duration-300
            hover:-translate-y-1
            hover:border-primary/40
            hover:shadow-xl
          "
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Step {item.step}</span>

                  <span className="text-3xl">{item.icon}</span>
                </div>

                <h3 className="relative z-10 mt-6 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="relative z-10 mt-4 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-surface p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight">
              Why Hyper AI Chat & FAQs Matters for Shopify Brands
            </h3>

            <p className="mt-5 text-muted-foreground leading-8">
              Automated customer support combines AI chat, searchable FAQs, chat history, branding controls, and analytics. Hyper AI Chat & FAQs helps Shopify merchants reduce repetitive questions, improve self-service support, and give shoppers clearer information before purchase.
            </p>
          </div>
        </Container>
      </Section>
      <PricingComponent
        productName="Hyper AI Chat & FAQs"
        title="Pricing for Hyper AI Chat & FAQs"
        subtitle="Plans for Shopify merchants who want to answer customer questions with AI chat, searchable FAQs, chat history, custom branding, and support analytics."
        tiers={pricingTiers}
      />
      {/* FAQ */}
      <Section className="py-20 lg:py-24">
        <Container className="max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              FAQ
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Frequently Asked Questions About Shopify AI Chat & FAQs
            </h2>

            <p className="mt-5 text-muted-foreground leading-7">
              Learn how Hyper AI Chat & FAQs helps Shopify merchants automate customer support,
              reduce ticket volume, and improve customer satisfaction.
            </p>
          </div>

          <div className="mt-14 space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="
            group rounded-3xl
            border border-border
            bg-surface
            p-6 sm:p-8
            transition-all duration-300
            hover:border-primary/30
            hover:shadow-lg
          "
              >
                <div className="flex items-start gap-5">
                  <div
                    className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-primary/10
              text-sm font-semibold text-primary
            "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{faq.q}</h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 text-center">
            <h3 className="text-2xl font-semibold">
              Why Shopify Merchants Choose Hyper AI Chat & FAQs
            </h3>

            <p className="mt-5 text-muted-foreground leading-8 max-w-3xl mx-auto">
              Hyper AI Chat & FAQs helps Shopify businesses answer repeated support questions with an AI chatbot and searchable FAQ page. By combining store-specific content, chat history, branding controls, and analytics, merchants can improve self-service support and purchase confidence.
            </p>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="pb-24 pt-8">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-surface p-8 sm:p-12 lg:p-16">
            {/* Background Effects (IMPORTANT) */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex justify-center">
                <span className="inline-flex rounded-full border border-border px-4 py-1 text-xs font-medium text-muted-foreground">
                  AI Customer Support Automation
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Turn Shopify Customer Questions Into Clear Answers
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-3xl text-center text-base sm:text-lg leading-8 text-muted-foreground">
                Hyper AI Chat & FAQs helps Shopify merchants automate common customer support questions with an AI chatbot, searchable FAQ page, chat history, branding controls, and analytics.
              </p>

              {/* Benefits Pills (IMPORTANT PART YOU WERE MISSING) */}
              <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="rounded-full border border-border px-4 py-2">
                  💬 Instant AI Replies
                </div>

                <div className="rounded-full border border-border px-4 py-2">Self-Service Support</div>

                <div className="rounded-full border border-border px-4 py-2">
                  🧠 Smart FAQ Automation
                </div>

                <div className="rounded-full border border-border px-4 py-2">
                  Purchase Confidence
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <TrackLink
                  href="https://apps.shopify.com/hyper-chatbot-and-faqs"
                  className="
              inline-flex items-center justify-center
              rounded-full
              bg-primary
              px-8 py-4
              text-sm font-medium
              text-white
              transition
              hover:opacity-90
            "
                  eventName="click_install_button"
                >
                  Install on Shopify
                </TrackLink>

                <Link
                  href="#features"
                  className="
              inline-flex items-center justify-center
              rounded-full
              border border-border
              px-8 py-4
              text-sm font-medium
              hover:bg-surface
              transition
            "
                >
                  Explore Features
                </Link>
              </div>

              {/* Trust Text */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Built by NiagaraT for Shopify stores that want scalable self-service support for common customer questions.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
