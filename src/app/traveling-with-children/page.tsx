import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Traveling with Children",
  description: "What families should know before booking an Illyria Trails tour with kids.",
  alternates: { canonical: "/traveling-with-children" },
};

export default function TravelingWithChildrenPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Traveling with Children", url: "/traveling-with-children" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Traveling with Children</h1>
        <p className="mt-3 text-ink-soft">
          Many of our tours work well for families — here&apos;s what to know before booking.
        </p>

        <div className="mt-8 space-y-8 text-ink-soft">
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Which Tours Suit Kids Best</h2>
            <p className="mt-2">
              Tours marked{" "}
              <Link href="/difficulty-levels" className="font-medium text-fjord-600 hover:text-fjord-900">
                Easy
              </Link>{" "}
              — like the Albanian Riviera Boat Day Trip, Berat Old Town Walking Tour, and Blue Eye Spring & Sarandë
              Day Trip — are the most family-friendly, with short walking distances and frequent stops. Multi-day
              treks like Theth to Valbona are better suited to older children who already hike comfortably.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Age Guidance</h2>
            <p className="mt-2">
              Boat and walking-tour days are generally suitable for all ages when accompanied by an adult. Day hikes
              are best from around age 8 and up, and multi-day mountain treks are best from around age 12 and up,
              depending on the child&apos;s fitness and hiking experience.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Pricing for Children</h2>
            <p className="mt-2">
              Every traveler — child or adult — occupies a seat or spot on the tour, so children are counted in the
              traveler total when checking availability and pricing. Contact{" "}
              <Link href="/customer-support-and-faq" className="font-medium text-fjord-600 hover:text-fjord-900">
                Customer Support
              </Link>{" "}
              if you have questions about a specific age.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">What to Pack</h2>
            <p className="mt-2">
              Sun protection, water, and snacks for boat and walking days; sturdy shoes, layers, and rain protection
              for any hike in the mountains — mountain weather changes quickly, even in summer.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
