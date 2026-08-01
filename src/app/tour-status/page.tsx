import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cn } from "@/lib/utils";
import { getAllTours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Live Tour Status",
  description: "Current operational status for every Illyria Trails tour, updated as conditions change.",
  alternates: { canonical: "/tour-status" },
};

type Status = "Operating normally" | "Delayed" | "Weather watch";

const statusOverrides: Partial<Record<string, Status>> = {
  "lake-komani-ferry-cruise": "Weather watch",
  "theth-to-valbona-two-day-trek": "Delayed",
};

const statusStyles: Record<Status, string> = {
  "Operating normally": "bg-fjord-100 text-fjord-900",
  Delayed: "bg-amber/30 text-amber-dark",
  "Weather watch": "bg-paper-dim text-ink-soft",
};

export default async function TourStatusPage() {
  const tours = await getAllTours();
  const lastUpdated = new Date();

  return (
    <>
      <Breadcrumbs items={[{ name: "Live Tour Status", url: "/tour-status" }]} />
      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Live Tour Status</h1>
        <p className="mt-2 text-ink-soft">
          Updated {lastUpdated.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. Booked
          travelers are notified directly by email if their tour&apos;s status changes.
        </p>

        <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
          {tours.map((tour) => {
            const status = statusOverrides[tour.slug] ?? "Operating normally";
            return (
              <div key={tour.slug} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-medium text-ink">{tour.title}</p>
                  <p className="text-sm text-ink-soft">{tour.duration}</p>
                </div>
                <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", statusStyles[status])}>
                  {status}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-ink-soft">
          This page reflects operational status only and is not a booking calendar — check individual tour pages for
          date availability.
        </p>
      </div>
    </>
  );
}
