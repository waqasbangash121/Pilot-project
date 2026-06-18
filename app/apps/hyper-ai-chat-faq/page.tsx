import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { CardStack } from "@/components/CardStack";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Hyper AI Chat & FAQs – Shopify AI Customer Support Automation",
  description:
    "Automate Shopify customer support with Hyper AI Chat & FAQs. Provide instant answers, reduce support tickets, and improve conversions with AI-powered conversational support.",
  path: "/apps/hyper-ai-chat-faq",
});

const features = [
  "AI-powered customer support chat",
  "Automated FAQ generation and responses",
  "24/7 instant reply system",
  "Reduces support workload",
  "Smart product & order assistance",
  "Improves customer satisfaction",
];

const seoBenefits = [
  {
    icon: "💬",
    title: "Instant AI Responses",
    desc: "Provide real-time answers to customer queries without waiting for human support.",
  },
  {
    icon: "🧠",
    title: "AI-Powered FAQs",
    desc: "Automatically generate and optimize FAQ answers based on customer behavior.",
  },
  {
    icon: "⚡",
    title: "24/7 Support",
    desc: "Offer always-on support to improve customer trust and satisfaction.",
  },
  {
    icon: "📈",
    title: "Higher Conversions",
    desc: "Faster answers reduce drop-offs and improve purchase decisions.",
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
    description: "Automate repetitive queries and significantly reduce support team workload.",
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
      "Leverage AI trained on your store data to provide personalized and accurate responses.",
    imageSrc: "/aichat-benefit-5.png",
  },
];

const faqs = [
  {
    q: "What is AI chat for Shopify?",
    a: "It is an automated support system that answers customer questions using artificial intelligence trained on your store data.",
  },
  {
    q: "Can it replace human support agents?",
    a: "It handles most repetitive queries, reducing workload, but complex cases can still be escalated to humans.",
  },
  {
    q: "Does it improve sales?",
    a: "Yes. Faster responses increase customer confidence and reduce cart abandonment.",
  },
  {
    q: "Is it available 24/7?",
    a: "Yes. AI Chat works around the clock to support customers anytime.",
  },
];

export default function HyperAIChatFAQPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-24 sm:pt-28 lg:pt-32 pb-14">
        <Container className="max-w-5xl text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2 shadow-sm">
              <Image
                src="/hyper-search.svg"
                alt="Hyper AI Shopify Apps"
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
            Automate customer support with intelligent AI chat and FAQ systems. Hyper helps Shopify
            stores deliver instant answers, reduce support tickets, and improve customer
            satisfaction 24/7.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://apps.shopify.com/hyper-chatbot-and-faqs"
              className="w-full sm:w-auto rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Install on Shopify
            </Link>

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
                <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  Core Features
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold">
                  AI Support Built for Shopify Stores
                </h2>

                <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-7 max-w-xl">
                  Hyper AI Chat understands customer questions and responds instantly using your
                  store data.
                </p>
              </div>

              <div className="flex flex-col gap-6 pt-2">
                {features.map((feature) => (
                  <div key={feature} className="flex gap-4 items-start">
                    <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">{feature}</p>
                      <p className="text-sm text-muted-foreground leading-6">
                        Intelligent automation improves response quality and speed.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="rounded-2xl border border-border overflow-hidden">
                <Image
                  src="/aichat-banner.png"
                  alt="AI Chat Dashboard"
                  width={1200}
                  height={900}
                  className="w-full h-auto"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">💬 Chat → Solve → Convert</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SEO / WHY SECTION */}
      <Section className="pb-20">
        <Container className="max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              AI Customer Support Intelligence
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Why Shopify Stores Need AI Support Automation
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-muted-foreground leading-7">
              Slow support kills conversions. Hyper AI Chat fixes this with instant AI responses
              trained on your store.
            </p>
          </div>
          {/* CARD STACK */}
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
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seoBenefits.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-surface p-8">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-7">{item.desc}</p>
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
              AI processes customer queries and responds instantly using store knowledge.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: "💬",
                title: "User asks question",
                description: "Customer submits query in chat.",
              },
              {
                step: "02",
                icon: "🧠",
                title: "AI understands intent",
                description: "System analyzes store data.",
              },
              {
                step: "03",
                icon: "⚡",
                title: "Instant answer",
                description: "AI responds immediately.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-3xl border border-border bg-surface p-8">
                <div className="flex justify-between">
                  <span className="text-primary text-sm font-medium">Step {item.step}</span>
                  <span className="text-2xl">{item.icon}</span>
                </div>

                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="py-20 lg:py-24">
        <Container className="max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
          </div>

          <div className="mt-12 space-y-5">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="rounded-3xl border border-border bg-surface p-6">
                <div className="flex gap-5">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="font-semibold">{faq.q}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-7">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA (MATCHED TEMPLATE STYLE) */}
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
                Turn Customer Questions Into Instant Conversions
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-3xl text-center text-base sm:text-lg leading-8 text-muted-foreground">
                Hyper AI Chat helps Shopify merchants automate customer support with intelligent AI
                responses, reduce ticket volume, and improve customer satisfaction with 24/7 instant
                assistance.
              </p>

              {/* Benefits Pills (IMPORTANT PART YOU WERE MISSING) */}
              <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="rounded-full border border-border px-4 py-2">
                  💬 Instant AI Replies
                </div>

                <div className="rounded-full border border-border px-4 py-2">⚡ 24/7 Support</div>

                <div className="rounded-full border border-border px-4 py-2">
                  🧠 Smart FAQ Automation
                </div>

                <div className="rounded-full border border-border px-4 py-2">
                  📈 Higher Conversions
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
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
                >
                  Install on Shopify
                </Link>

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
                Built for Shopify stores that want scalable AI-driven customer support without
                hiring extra agents.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
