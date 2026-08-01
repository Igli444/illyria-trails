import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TrustBadges } from "@/components/TrustBadges";
import { getSiteSettings } from "@/data/site-settings";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Illyria Trails runs small-group tours across Albania's coast and mountains, guided by people who work the Riviera, the Accursed Mountains, and the old towns year-round.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd data={organizationSchema(settings)} />
      <JsonLd data={localBusinessSchema(settings)} />
      <Breadcrumbs items={[{ name: "About Us", url: "/about" }]} />

      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">About {settings.brandName}</h1>
        <div className="mt-6 space-y-5 text-ink-soft">
          <p>
            {settings.brandName} started as a small group of mountain and boat guides who were tired of watching
            visitors get shuffled along the coast road on 50-seat buses with ten minutes at each stop. We run smaller
            groups, fewer stops per day, and routes chosen the same morning based on actual conditions — not a
            printed itinerary.
          </p>
          <p>
            Every guide on our roster works these routes year-round, not seasonally. That matters most on the
            Accursed Mountains treks, where trail and weather conditions can change week to week and a guide who
            hasn&apos;t been out recently is guessing instead of knowing.
          </p>
          <p>
            We keep our tour count deliberately small. Rather than covering every corner of the country, we run a
            focused set of routes across the Riviera, the Accursed Mountains, Berat and Gjirokastër, and Lake
            Komani — and we try to run each one better than a company covering fifty routes ever could.
          </p>
        </div>

        <h2 className="mt-12 font-display text-xl font-semibold text-ink">Certifications &amp; Standards</h2>
        <ul className="mt-4 space-y-2 text-ink-soft">
          {settings.certifications.map((cert) => (
            <li key={cert} className="flex gap-2">
              <span className="text-fjord-500" aria-hidden="true">
                &#10003;
              </span>
              {cert}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-xl font-semibold text-ink">What Travelers Say</h2>
        <div className="mt-4">
          <TrustBadges trustBadges={settings.trustBadges} />
        </div>

        <h2 className="mt-12 font-display text-xl font-semibold text-ink">Get in Touch</h2>
        <p className="mt-3 text-ink-soft">
          Email us at{" "}
          <a href={`mailto:${settings.supportEmail}`} className="font-medium text-fjord-600 hover:text-fjord-900">
            {settings.supportEmail}
          </a>{" "}
          or call {settings.supportPhone}. For booking questions, see our{" "}
          <a href="/customer-support-and-faq" className="font-medium text-fjord-600 hover:text-fjord-900">
            Customer Support &amp; FAQ
          </a>{" "}
          page first — most answers are there.
        </p>
      </div>
    </>
  );
}
