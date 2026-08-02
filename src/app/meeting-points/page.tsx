import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllTours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Meeting Points & Pick-Up",
  description: "Where to meet your guide for each Illyria Trails tour, region by region.",
  alternates: { canonical: "/meeting-points" },
};

export default async function MeetingPointsPage() {
  const tours = await getAllTours();
  const grouped = new Map<string, typeof tours>();
  for (const tour of tours) {
    const list = grouped.get(tour.meetingPoint) ?? [];
    list.push(tour);
    grouped.set(tour.meetingPoint, list);
  }

  return (
    <>
      <Breadcrumbs items={[{ name: "Meeting Points", url: "/meeting-points" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Meeting Points &amp; Pick-Up</h1>
        <p className="mt-3 text-ink-soft">
          Every tour has a fixed meeting point, listed on its own tour page. Here&apos;s a quick reference by
          location — arrive 10–15 minutes early so your guide can check everyone in before departure.
        </p>

        <div className="mt-8 space-y-6">
          {Array.from(grouped.entries()).map(([meetingPoint, toursHere]) => (
            <div key={meetingPoint} className="rounded-2xl border border-line bg-white p-5">
              <h2 className="font-display text-lg font-semibold text-ink">{meetingPoint}</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                {toursHere.map((tour) => (
                  <li key={tour.slug}>
                    <Link href={`/tours/${tour.slug}`} className="font-medium text-fjord-600 hover:text-fjord-900">
                      {tour.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink-soft">
          Running late or can&apos;t find your guide? Contact{" "}
          <Link href="/customer-support-and-faq" className="font-medium text-fjord-600 hover:text-fjord-900">
            Customer Support
          </Link>{" "}
          — the phone number is also on your booking confirmation.
        </p>
      </div>
    </>
  );
}
