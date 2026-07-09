import {
  BenefitsSection,
  CtaSection,
  CustomerLogosSection,
  FaqSection,
  HeroSection,
  MerchantProblemsSection,
  StatisticsSection,
  ThreeProductsSection,
} from "@/components/home/home-sections";
import { createPageMetadata } from "@/config/metadata";
import { homeContent } from "@/content";
import { toJsonLd } from "@/lib/schema";

export const metadata = createPageMetadata({
  title: "Shopify Conversion Stack for AI Search and Revenue Growth",
  description: homeContent.hero.description,
  path: "/",
});

const siteUrl = "https://niagarat.com";

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Shopify Conversion Stack for AI Search and Revenue Growth",
  description: homeContent.hero.description,
  url: siteUrl,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Niagarat",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Shopify Conversion Stack",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: homeContent.hero.description,
  provider: {
    "@type": "Organization",
    name: "Niagarat",
  },
  url: siteUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeContent.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const structuredData = [webpageSchema, organizationSchema, softwareApplicationSchema, faqSchema];

export default function HomePage() {
  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLd(schema),
          }}
        />
      ))}

      <HeroSection content={homeContent.hero} />

      <ThreeProductsSection products={homeContent.products} />

      <MerchantProblemsSection problems={homeContent.problems} />

      <StatisticsSection items={homeContent.statistics} />

      <CustomerLogosSection logos={homeContent.logos} />

      <BenefitsSection benefits={homeContent.benefits} />

      <FaqSection faqs={homeContent.faqs} />

      <CtaSection
        title={homeContent.cta.title}
        detail={homeContent.cta.detail}
        primaryHref={homeContent.cta.primaryHref}
        primaryLabel={homeContent.cta.primaryLabel}
      />
    </>
  );
}
