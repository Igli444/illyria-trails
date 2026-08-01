import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideCard } from "@/components/GuideCard";
import { getAllGuides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides & Inspiration",
  description:
    "Practical planning guides from Illyria Trails: the Theth-Valbona trek, Berat and Gjirokastër's old towns, the Lake Komani ferry, and Albania's Riviera beaches.",
  alternates: { canonical: "/inspiration" },
};

export default async function InspirationPage() {
  const sorted = await getAllGuides();

  return (
    <>
      <Breadcrumbs items={[{ name: "Inspiration", url: "/inspiration" }]} />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Guides &amp; Inspiration</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Practical planning notes from our own guides — what actually affects your trip, not just the highlights.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    </>
  );
}
