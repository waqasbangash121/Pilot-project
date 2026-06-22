import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Learn how Hyper uses cookies, analytics, and similar technologies across our website and services.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <Section spacing="lg">
      <Container className="max-w-4xl">
        <div className="space-y-12">
          <header className="space-y-4">
            <h1 className="type-display">Cookie Policy</h1>

            <p className="type-body text-muted-foreground">Last updated: June 2026</p>

            <p className="type-body">
              This Cookie Policy explains how Hyper uses cookies and similar technologies when you
              visit our website, use our Shopify applications, or interact with our services.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What Are Cookies?</h2>

            <p>
              Cookies are small text files stored on your device when you visit a website. They help
              websites remember information about your visit, improve functionality, analyze usage,
              and provide a better user experience.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How We Use Cookies</h2>

            <p>
              We use cookies and similar technologies to operate, secure, improve, and analyze our
              website and services.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain website functionality and performance.</li>
              <li>Remember user preferences and settings.</li>
              <li>Analyze traffic and visitor behavior.</li>
              <li>Measure marketing and campaign effectiveness.</li>
              <li>Detect security threats and prevent abuse.</li>
              <li>Improve user experience and site performance.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly and cannot be
                  disabled in our systems.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Analytics Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website so we can
                  improve performance and usability.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Functional Cookies</h3>
                <p>
                  These cookies remember preferences and provide enhanced functionality and
                  personalization.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Marketing Cookies</h3>
                <p>
                  These cookies may be used to measure advertising performance and improve marketing
                  campaigns.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Third-Party Services</h2>

            <p>
              We may use trusted third-party services for analytics, performance monitoring,
              customer support, and marketing. These providers may set cookies or similar
              technologies according to their own privacy policies.
            </p>

            <p>
              Examples may include analytics platforms, hosting providers, customer support tools,
              and advertising partners.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Managing Cookies</h2>

            <p>
              Most web browsers allow you to control cookies through browser settings. You may
              choose to block, delete, or limit cookies.
            </p>

            <p>
              Please note that disabling certain cookies may affect website functionality and user
              experience.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Do Not Track Signals</h2>

            <p>
              Some browsers offer a &quot;Do Not Track&quot; feature. Because there is currently no
              universal standard for responding to these signals, our website may not respond to all
              Do Not Track requests.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to This Policy</h2>

            <p>
              We may update this Cookie Policy from time to time. Any changes will be posted on this
              page with an updated revision date.
            </p>
          </section>

          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-semibold">Contact Us</h2>

            <p>If you have questions about this Cookie Policy, please contact us at:</p>

            <p>
              <a href="mailto:waqas@niagarat.com">waqas@niagarat.com</a>
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
