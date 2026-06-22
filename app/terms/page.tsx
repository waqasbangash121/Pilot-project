import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Read Hyper apps terms of service governing the use of our website, Shopify applications, and related services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section spacing="lg">
      <Container className="max-w-4xl">
        <div className="space-y-12">
          <header className="space-y-4">
            <h1 className="type-display">Terms of Service</h1>
            <p className="type-body text-muted-foreground">Last updated: June 2026</p>
            <p className="type-body">
              These Terms of Service govern your access to and use of Hyper&apos;s website, Shopify
              applications, products, and related services. By accessing or using our services, you
              agree to these terms.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>

            <p>
              By installing, accessing, or using any Hyper service, you agree to comply with these
              Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Services</h2>

            <p>
              Hyper provides software applications, tools, integrations, analytics, automation
              features, and related services for Shopify merchants and ecommerce businesses.
            </p>

            <p>
              We may modify, update, suspend, or discontinue features at any time without prior
              notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Account Responsibilities</h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain accurate account and store information.</li>
              <li>Protect account credentials and store access permissions.</li>
              <li>
                Ensure all activities conducted through your account comply with applicable laws and
                Shopify policies.
              </li>
              <li>Promptly notify us of unauthorized access or security concerns.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Acceptable Use</h2>

            <p>You agree not to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Use our services for unlawful, fraudulent, or abusive purposes.</li>
              <li>Attempt to interfere with service operation or security.</li>
              <li>Reverse engineer, copy, or exploit our software beyond permitted use.</li>
              <li>Violate intellectual property rights or third-party rights.</li>
              <li>Upload malicious code, malware, or harmful content.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Billing and Payments</h2>

            <p>
              Paid subscriptions are billed through Shopify or other approved payment providers
              according to your selected plan.
            </p>

            <p>
              Fees are generally non-refundable except where required by law or expressly stated
              otherwise.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>

            <p>
              All software, trademarks, branding, content, documentation, and technology provided by
              Hyper remain our exclusive property unless otherwise stated.
            </p>

            <p>These Terms do not grant ownership rights to any Hyper intellectual property.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data and Privacy</h2>

            <p>
              Your use of our services is also governed by our Privacy Policy, which explains how
              information is collected, used, and protected.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Service Availability</h2>

            <p>
              We strive to provide reliable services but do not guarantee uninterrupted
              availability, error-free operation, or compatibility with all third-party systems.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Limitation of Liability</h2>

            <p>
              To the maximum extent permitted by law, Hyper shall not be liable for indirect,
              incidental, consequential, special, or punitive damages arising from the use of our
              services.
            </p>

            <p>
              Our total liability shall not exceed the amount paid by you for the service during the
              twelve months preceding the claim.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Termination</h2>

            <p>
              We may suspend or terminate access to our services if these terms are violated or if
              required for operational, legal, or security reasons.
            </p>

            <p>
              You may discontinue use of our services at any time by uninstalling our applications
              or closing your account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to These Terms</h2>

            <p>
              We may update these Terms of Service periodically. Continued use of our services after
              updates constitutes acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-semibold">Contact Us</h2>

            <p>If you have questions regarding these Terms of Service, please contact us at:</p>

            <p>
              <a href="mailto:waqas@niagarat.com">waqas@niagarat.com</a>
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
