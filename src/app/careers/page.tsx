import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getSiteSettings } from "@/data/site-settings";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Illyria Trails — guiding, operations, and support positions based in Albania.",
  alternates: { canonical: "/careers" },
};

const openRoles = [
  {
    title: "Mountain Guide — Accursed Mountains",
    location: "Theth / Valbona",
    type: "Full-time, seasonal",
    description:
      "Certified mountain guides to lead the Theth-to-Valbona trek and shorter day hikes. Requires current mountain guiding certification and at least one season of lead-guide experience.",
  },
  {
    title: "Boat Guide — Riviera & Komani Ferry",
    location: "Sarandë",
    type: "Full-time, seasonal",
    description:
      "Run Riviera boat day trips and support the Lake Komani ferry route. Boat handling license and English fluency required.",
  },
  {
    title: "Operations Coordinator",
    location: "Tirana (hybrid)",
    type: "Full-time",
    description:
      "Own day-to-day scheduling across guides, vehicles, and booking availability. Comfortable working across spreadsheets and our internal booking system.",
  },
  {
    title: "Customer Support Specialist",
    location: "Remote (Albania-based)",
    type: "Full-time",
    description: "Handle booking questions, cancellations, and pre-trip support across email and phone.",
  },
];

export default async function CareersPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ name: "Careers", url: "/careers" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Careers</h1>
        <p className="mt-2 text-ink-soft">
          We hire guides and support staff who work these routes year-round. If nothing below fits but you think you&apos;d
          be a good addition, email us at{" "}
          <a href={`mailto:${settings.supportEmail}`} className="font-medium text-fjord-600 hover:text-fjord-900">
            {settings.supportEmail}
          </a>
          .
        </p>

        <div className="mt-8 space-y-4">
          {openRoles.map((role) => (
            <div key={role.title} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-lg font-semibold text-ink">{role.title}</h2>
                <span className="rounded-full bg-paper-dim px-3 py-1 text-xs font-medium text-ink-soft">{role.type}</span>
              </div>
              <p className="mt-1 text-sm text-ink-soft">{role.location}</p>
              <p className="mt-3 text-sm text-ink-soft">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
