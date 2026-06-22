import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Hyper apps collects, uses, stores, and protects information when you use our website and Shopify applications.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section spacing="lg">
      <Container className="max-w-4xl">
        <div className="space-y-12">
          <header className="space-y-4">
            <h1 className="type-display">Privacy Policy</h1>
            <p className="type-body text-muted-foreground">Last updated: June 2026</p>
            <p className="type-body">
              {
                'Hyper ("we", "our", or "us") values your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, use our Shopify applications, or interact with our services.'
              }
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information We Collect</h2>

            <p>
              We may collect information from merchants, store administrators, website visitors, and
              customers as necessary to provide our services.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information such as name, email address, and company information.</li>
              <li>
                Shopify store information including store URL, plan details, installed applications,
                and configuration settings.
              </li>
              <li>
                Usage data such as feature interactions, analytics events, performance metrics, and
                diagnostic information.
              </li>
              <li>
                Technical information including browser type, device information, IP address, and
                operating system.
              </li>
              <li>
                Customer-facing data processed through our applications when required to provide app
                functionality.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How We Use Information</h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our products and services.</li>
              <li>Deliver app functionality and merchant-requested features.</li>
              <li>Provide customer support and technical assistance.</li>
              <li>Monitor application performance and reliability.</li>
              <li>Prevent fraud, abuse, unauthorized access, and misuse.</li>
              <li>Communicate important updates, service notices, and support information.</li>
              <li>Comply with legal obligations and Shopify platform requirements.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Shopify Platform Data</h2>

            <p>
              Our applications access Shopify store data only as necessary to provide requested
              functionality. The specific information accessed depends on the permissions granted
              during app installation.
            </p>

            <p>
              We do not sell merchant data or customer information. Data is processed solely for
              providing and improving our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Analytics and Cookies</h2>

            <p>
              We may use cookies, analytics tools, and similar technologies to understand website
              usage, improve user experience, measure performance, and maintain security.
            </p>

            <p>
              You may control cookie preferences through your browser settings, although certain
              features may not function properly if cookies are disabled.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Sharing</h2>

            <p>We do not sell personal information. We may share information only with:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Trusted service providers that help operate our business.</li>
              <li>Infrastructure, hosting, analytics, and support providers.</li>
              <li>Legal authorities when required by law or regulation.</li>
              <li>Successors in connection with a merger, acquisition, or business transfer.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Retention</h2>

            <p>
              We retain information only for as long as necessary to provide services, comply with
              legal obligations, resolve disputes, and enforce agreements.
            </p>

            <p>
              Upon app uninstallation or account closure, data may be deleted or anonymized
              according to operational and legal requirements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Security</h2>

            <p>
              We implement reasonable administrative, technical, and organizational safeguards
              designed to protect information against unauthorized access, disclosure, alteration,
              or destruction.
            </p>

            <p>
              No method of electronic transmission or storage can be guaranteed to be completely
              secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Privacy Rights</h2>

            <p>
              Depending on your location, you may have rights to access, correct, delete, restrict,
              or export your personal information.
            </p>

            <p>To exercise these rights, please contact us using the information below.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to This Policy</h2>

            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this
              page with a revised effective date.
            </p>
          </section>

          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-semibold">Contact Us</h2>

            <p>
              If you have questions regarding this Privacy Policy or our data practices, please
              contact us at:
            </p>

            <p>
              <a href="mailto:waqas@niagarat.com">waqas@niagarat.com</a>
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
