import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getSiteSettings } from "@/data/site-settings";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for booking and joining Illyria Trails tours.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ name: "Terms & Conditions", url: "/terms-and-conditions" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Placeholder terms for demonstration purposes — review with legal counsel before publishing a live site.
        </p>

        <div className="mt-8 space-y-8 text-ink-soft">
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">1. Bookings</h2>
            <p className="mt-2">
              A booking is confirmed once you receive a confirmation email from {settings.brandName}. Prices are
              quoted per person and include the items listed under &quot;Included&quot; on each tour page.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">2. Cancellations &amp; Refunds</h2>
            <p className="mt-2">
              Cancellations made at least 24 hours before the scheduled start time are eligible for a full refund.
              Cancellations inside that window are non-refundable, except where {settings.brandName} cancels the
              tour due to weather or safety conditions, in which case a rebooking or full refund is offered.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">3. Assumption of Risk</h2>
            <p className="mt-2">
              Outdoor tours involving mountain terrain, historic sites, and open water carry inherent risk. Travelers must
              follow guide instructions at all times and disclose any relevant medical conditions before departure.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">4. Liability</h2>
            <p className="mt-2">
              {settings.brandName} maintains operator liability coverage as required by Albanian tourism
              regulation. Liability is limited to the extent permitted by applicable law.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">5. Changes to These Terms</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of our booking services after an update
              constitutes acceptance of the revised terms.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">6. Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${settings.supportEmail}`} className="font-medium text-fjord-600 hover:text-fjord-900">
                {settings.supportEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
