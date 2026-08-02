import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getSiteSettings } from "@/data/site-settings";

export const metadata: Metadata = {
  title: "Equal Pay Policy",
  description: "Illyria Trails' commitment to equal pay for equal work across our guiding and operations teams.",
  alternates: { canonical: "/equal-pay-policy" },
};

export default async function EqualPayPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ name: "Equal Pay Policy", url: "/equal-pay-policy" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Equal Pay Policy</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Placeholder policy for demonstration purposes — review with legal/HR counsel before publishing a live site.
        </p>

        <div className="mt-8 space-y-8 text-ink-soft">
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Our Commitment</h2>
            <p className="mt-2">
              Illyria Trails pays guides, drivers, and office staff equally for equal work, regardless of gender,
              ethnicity, age, or any other characteristic unrelated to role, experience, or performance.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">How Pay Is Set</h2>
            <p className="mt-2">
              Pay bands are set per role — lead guide, assistant guide, driver, office staff — based on
              responsibility, required certifications (first aid, mountain guiding, boat licensing), and years of
              experience. Bands are reviewed annually.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Reporting a Concern</h2>
            <p className="mt-2">
              Any team member who believes they are not being paid equitably can raise it confidentially with
              management by emailing{" "}
              <a href={`mailto:${settings.supportEmail}`} className="font-medium text-fjord-600 hover:text-fjord-900">
                {settings.supportEmail}
              </a>
              . Concerns are reviewed and addressed without retaliation.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
