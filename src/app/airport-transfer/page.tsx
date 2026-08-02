import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { TransferBookingWidget } from "@/components/TransferBookingWidget";
import { transferFaqs, transferRoutes } from "@/data/transfers";

export const metadata: Metadata = {
  title: "Tirana Airport Transfer",
  description:
    "Direct airport transfers from Tirana International Airport to Tirana city center, Durrës, Shkodër, and the Albanian Riviera.",
  alternates: { canonical: "/airport-transfer" },
};

const features = [
  {
    title: "Flight Tracking",
    description: "We track your flight, so delays don't cost you a missed pickup.",
  },
  {
    title: "Fixed Prices",
    description: "One price per route, per person — no surge pricing, no hidden fees.",
  },
  {
    title: "Meet & Greet",
    description: "Your driver waits in the arrivals hall with a name sign.",
  },
  {
    title: "Free Wi-Fi",
    description: "Stay connected on every route, even the 4-hour Riviera transfer.",
  },
];

export default function AirportTransferPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Airport Transfer", url: "/airport-transfer" }]} />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Tirana Airport Transfer</h1>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Landing at Tirana International Airport and need a ride onward? Our direct transfers connect the
              airport to Tirana city center, Durrës, Shkodër, and the Albanian Riviera — booked in advance, at a
              fixed price per person.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {features.map((f) => (
                <div key={f.title}>
                  <p className="font-semibold text-ink">{f.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{f.description}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 font-display text-xl font-semibold text-ink">Routes &amp; Prices</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-paper-dim text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="px-4 py-3">Destination</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Price / person</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {transferRoutes.map((r) => (
                    <tr key={r.slug}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink">{r.destination}</p>
                        <p className="text-ink-soft">{r.description}</p>
                      </td>
                      <td className="px-4 py-3 text-ink-soft">
                        {r.durationMinutes >= 60 ? `${(r.durationMinutes / 60).toFixed(1)} hours` : `${r.durationMinutes} min`}
                      </td>
                      <td className="px-4 py-3 font-medium text-ink">€{r.priceEur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 font-display text-xl font-semibold text-ink">Frequently Asked Questions</h2>
            <div className="mt-4">
              <FaqAccordion items={transferFaqs} />
            </div>
          </div>

          <div>
            <TransferBookingWidget />
          </div>
        </div>
      </div>
    </>
  );
}
