import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getSiteSettings } from "@/data/site-settings";

export const metadata: Metadata = {
  title: "Environmental Policy",
  description: "How Illyria Trails minimizes its environmental impact across Albania's coast and highlands.",
  alternates: { canonical: "/environmental-policy" },
};

export default async function EnvironmentalPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ name: "Environmental Policy", url: "/environmental-policy" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Environmental Policy</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Placeholder policy for demonstration purposes — review with an environmental consultant before publishing a
          live site.
        </p>

        <div className="mt-8 space-y-8 text-ink-soft">
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Small Groups by Design</h2>
            <p className="mt-2">
              Every tour we run is capped at a small group size. Smaller groups mean lighter footprints on trails in
              the Accursed Mountains, less strain on fragile sites like Butrint&apos;s ruins, and less crowding for the
              communities we visit along the way.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Transport & Emissions</h2>
            <p className="mt-2">
              Our vehicles are routed to minimize empty return trips, and we favor boat and ferry routes — like the
              Lake Komani ferry — that already serve local communities rather than chartering exclusive transport
              where a shared option exists.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Protecting Natural & Historic Sites</h2>
            <p className="mt-2">
              Guides brief every group on Leave No Trace practices before hikes in Theth and Valbona, and we follow
              posted conservation guidance at UNESCO-listed sites in Berat and Gjirokastër and at the Butrint
              archaeological park.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Supporting Local Economies</h2>
            <p className="mt-2">
              We work with local guides, family-run guesthouses, and small boat operators rather than large
              third-party subcontractors wherever a local option exists, keeping tourism revenue closer to the
              regions we operate in.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Questions</h2>
            <p className="mt-2">
              For details on a specific tour&apos;s environmental practices, contact{" "}
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
