import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToursExplorer } from "@/components/ToursExplorer";
import { getAllCategories } from "@/data/categories";
import { getAllTours } from "@/data/tours";

export const metadata: Metadata = {
  title: "All Tours",
  description:
    "Browse every Illyria Trails tour: Riviera boat trips, Accursed Mountains treks, Berat and Gjirokastër old towns, the Lake Komani ferry, Tirana city tours, and Butrint's ruins.",
  alternates: { canonical: "/tours" },
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ToursPage({ searchParams }: PageProps) {
  const [tours, categories, { q }] = await Promise.all([getAllTours(), getAllCategories(), searchParams]);

  return (
    <>
      <Breadcrumbs items={[{ name: "All Tours", url: "/tours" }]} />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">All Tours</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          {tours.length}{" "}
          small-group tours across Albania&apos;s coast, mountains, and old towns. Filter by category or
          difficulty to find the right pace for your trip.
        </p>
        <div className="mt-8">
          <ToursExplorer tours={tours} categories={categories} initialQuery={q ?? ""} />
        </div>
      </div>
    </>
  );
}
