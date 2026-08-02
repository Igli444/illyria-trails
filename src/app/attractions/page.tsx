import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AttractionsExplorer } from "@/components/AttractionsExplorer";
import { getAllAttractions } from "@/data/attractions";

export const metadata: Metadata = {
  title: "Attractions",
  description:
    "Explore Albania's beaches, mountains, lakes, UNESCO old towns, castles, and national parks — a directory of the country's landmark sights.",
  alternates: { canonical: "/attractions" },
};

export default async function AttractionsPage() {
  const attractions = await getAllAttractions();

  return (
    <>
      <Breadcrumbs items={[{ name: "Attractions", url: "/attractions" }]} />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Attractions</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          From the turquoise coves of the Riviera to the stone-roofed old towns and remote mountain valleys of the
          north, here&apos;s our directory of Albania&apos;s landmark sights — independent of any specific tour.
        </p>

        <div className="mt-8">
          <AttractionsExplorer attractions={attractions} />
        </div>
      </div>
    </>
  );
}
