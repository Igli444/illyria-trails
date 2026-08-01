import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getSiteSettings } from "@/data/site-settings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Illyria Trails collects, uses, and protects your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy-policy" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Placeholder policy for demonstration purposes — review with legal counsel before publishing a live site.
        </p>

        <div className="mt-8 space-y-8 text-ink-soft">
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Data We Collect</h2>
            <p className="mt-2">
              When you book a tour or subscribe to our newsletter, we collect your name, email address, and travel
              details needed to fulfill the booking. Our website also collects standard analytics data (pages
              visited, device type, approximate location) via GA4 and Vercel Analytics.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">How We Use Your Data</h2>
            <p className="mt-2">
              We use booking data to schedule and staff your tour, and to send trip-related communications (meeting
              point, weather updates, cancellations). Newsletter subscribers only receive marketing email if they
              opt in via the consent checkbox at signup.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Cookies</h2>
            <p className="mt-2">
              We use cookies for essential site function and, with consent, for analytics. See our{" "}
              <a href="/cookies" className="font-medium text-fjord-600 hover:text-fjord-900">
                Cookie Policy
              </a>{" "}
              for details and how to manage your preferences.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Your Rights</h2>
            <p className="mt-2">
              Under GDPR, you can request access to, correction of, or deletion of your personal data at any time by
              emailing{" "}
              <a href={`mailto:${settings.supportEmail}`} className="font-medium text-fjord-600 hover:text-fjord-900">
                {settings.supportEmail}
              </a>
              . You can unsubscribe from marketing email at any time using the link in any newsletter.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Data Retention</h2>
            <p className="mt-2">
              Booking records are retained for the period required by Albanian tax and consumer protection law.
              Newsletter data is retained until you unsubscribe.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
