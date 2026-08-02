import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TourCard } from "@/components/TourCard";
import { getAllAttractions, getAttractionBySlug } from "@/data/attractions";
import { getAllTours } from "@/data/tours";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const attractions = await getAllAttractions();
  return attractions.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const attraction = await getAttractionBySlug(slug);
  if (!attraction) return {};

  return {
    title: attraction.title,
    description: attraction.description,
    alternates: { canonical: `/attractions/${attraction.slug}` },
    openGraph: {
      title: attraction.title,
      description: attraction.description,
      images: [{ url: attraction.image.src }],
    },
  };
}

export default async function AttractionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const attraction = await getAttractionBySlug(slug);
  if (!attraction) notFound();

  const allTours = await getAllTours();
  const relatedTours = allTours.filter((t) => attraction.relatedTourSlugs.includes(t.slug));

  const { lat, lng } = attraction.coordinates;
  const delta = 0.03;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Attractions", url: "/attractions" },
          { name: attraction.title, url: `/attractions/${attraction.slug}` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-fjord-500">
          {attraction.category} &middot; {attraction.region}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">{attraction.title}</h1>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image src={attraction.image.src} alt={attraction.image.alt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>

        <p className="mt-6 text-base leading-relaxed text-ink-soft">{attraction.description}</p>

        <h2 className="mt-10 font-display text-lg font-semibold text-ink">Location</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <iframe
            title={`Map showing ${attraction.title}`}
            src={mapSrc}
            className="h-80 w-full"
            loading="lazy"
          />
        </div>

        {relatedTours.length > 0 && (
          <div className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-xl font-semibold text-ink">Tours that visit here</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
