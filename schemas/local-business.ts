import { siteConfig } from "@/config/site";

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/contact#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImagePath}`,
    logo: `${siteConfig.url}${siteConfig.iconPath}`,
    description: siteConfig.description,
    email: siteConfig.email,
    priceRange: "$$",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      url: `${siteConfig.url}/contact`,
      availableLanguage: "en",
    },
    sameAs: [siteConfig.url],
  };
}
