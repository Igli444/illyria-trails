import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Difficulty Levels",
  description: "What Easy, Moderate, and Challenging mean on Illyria Trails tours, so you can pick the right pace.",
  alternates: { canonical: "/difficulty-levels" },
};

const levels = [
  {
    label: "Easy",
    summary: "Suitable for almost everyone, including most children and travelers with limited mobility.",
    details: [
      "Mostly flat or gently sloped terrain, on roads, boardwalks, or well-maintained paths.",
      "Little to no walking beyond short distances between stops — think boat trips, old-town walking tours, and scenic drives.",
      "No prior fitness or hiking experience needed.",
    ],
    examples: ["Albanian Riviera Boat Day Trip", "Berat Old Town Walking Tour", "Blue Eye Spring & Sarandë Day Trip"],
  },
  {
    label: "Moderate",
    summary: "For travelers with average fitness who are comfortable walking for a few hours.",
    details: [
      "Some uneven ground, stairs, or gradual elevation gain — castle grounds, hillside old towns, or day hikes with rest stops.",
      "Total walking distance typically 3–8 km over the day.",
      "Comfortable closed-toe shoes recommended.",
    ],
    examples: ["Gjirokastër Castle & Old Bazaar Tour", "Theth Waterfall & Blue Eye Day Hike"],
  },
  {
    label: "Challenging",
    summary: "For travelers who hike regularly and are prepared for a full day of sustained physical effort.",
    details: [
      "Significant elevation gain on mountain trails, sometimes over multiple days with overnight stays in mountain guesthouses.",
      "Uneven, rocky, or exposed terrain that requires sturdy hiking boots and trekking poles.",
      "Weather-dependent — routes can be adjusted or postponed for safety.",
    ],
    examples: ["Theth to Valbona Trek, 2 Days"],
  },
];

export default function DifficultyLevelsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Difficulty Levels", url: "/difficulty-levels" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Difficulty Levels</h1>
        <p className="mt-3 text-ink-soft">
          Every tour on Illyria Trails is tagged Easy, Moderate, or Challenging so you can match the trip to your own
          pace — whether that&apos;s a relaxed boat ride along the Riviera or a two-day trek across the Accursed
          Mountains.
        </p>

        <div className="mt-10 space-y-8">
          {levels.map((level) => (
            <section key={level.label} className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-display text-xl font-semibold text-ink">{level.label}</h2>
              <p className="mt-1.5 text-ink-soft">{level.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {level.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-fjord-500" aria-hidden="true">
                      &bull;
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Example tours: {level.examples.join(", ")}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink-soft">
          Not sure which level is right for you? Browse{" "}
          <Link href="/tours" className="font-medium text-fjord-600 hover:text-fjord-900">
            all tours
          </Link>{" "}
          and filter by difficulty, or contact{" "}
          <Link href="/customer-support-and-faq" className="font-medium text-fjord-600 hover:text-fjord-900">
            Customer Support
          </Link>{" "}
          before booking.
        </p>
      </div>
    </>
  );
}
