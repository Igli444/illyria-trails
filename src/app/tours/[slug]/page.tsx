import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingWidget } from "@/components/BookingWidget";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { ParallaxImage } from "@/components/ParallaxImage";
import { TourCard } from "@/components/TourCard";
import { getCategoryBySlug } from "@/data/categories";
import { getAllTours, getRelatedTours, getTourBySlug } from "@/data/tours";
import { faqPageSchema, touristTripSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tours = await getAllTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};

  return {
    title: { absolute: tour.seo.metaTitle },
    description: tour.seo.metaDescription,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: tour.seo.metaTitle,
      description: tour.seo.metaDescription,
      images: [{ url: tour.heroImage.src }],
    },
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const [primaryCategory, relatedTours] = await Promise.all([
    getCategoryBySlug(tour.categorySlugs[0]),
    getRelatedTours(tour),
  ]);

  return (
    <>
      <JsonLd data={touristTripSchema(tour)} />
      <JsonLd data={faqPageSchema(tour.faqs)} />
      <Breadcrumbs
        items={[
          { name: "Tours", url: "/tours" },
          ...(primaryCategory ? [{ name: primaryCategory.title, url: `/things-to-do/${primaryCategory.slug}` }] : []),
          { name: tour.title, url: `/tours/${tour.slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:grid-rows-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2 sm:aspect-auto">
            <ParallaxImage src={tour.heroImage.src} alt={tour.heroImage.alt} priority sizes="(min-width: 640px) 50vw, 100vw" />
          </div>
          {tour.gallery.slice(0, 2).map((img, i) => (
            <div key={i} className="relative hidden aspect-[16/10] overflow-hidden rounded-2xl sm:block">
              <Image src={img.src} alt={img.alt} fill sizes="25vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {tour.badges.map((badge) => (
                <span key={badge} className="rounded-full bg-amber px-3 py-1 text-xs font-semibold text-ink">
                  {badge}
                </span>
              ))}
              <span className="rounded-full bg-paper-dim px-3 py-1 text-xs font-medium text-ink-soft">{tour.duration}</span>
              <span className="rounded-full bg-paper-dim px-3 py-1 text-xs font-medium text-ink-soft">{tour.difficulty}</span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">{tour.title}</h1>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" className="text-amber-dark">
                <path d="M12 2l2.9 6 6.6.8-4.8 4.6 1.2 6.5L12 16.7 6.1 19.9l1.2-6.5-4.8-4.6 6.6-.8z" fill="currentColor" />
              </svg>
              <span className="font-medium text-ink">{tour.rating}</span>
              <span>({tour.reviewCount.toLocaleString()} reviews)</span>
              <span aria-hidden="true">&middot;</span>
              <span>Meets at {tour.meetingPoint}</span>
            </div>

            <div className="mt-6 space-y-4 text-ink-soft">
              {tour.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold text-ink">Itinerary</h2>
            <ol className="mt-4 space-y-6 border-l-2 border-line pl-6">
              {tour.itinerary.map((step, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-fjord-500" aria-hidden="true" />
                  <p className="font-semibold text-ink">
                    {step.title}
                    {step.duration && <span className="ml-2 font-normal text-ink-soft">({step.duration})</span>}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{step.description}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold text-ink">Included</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {tour.included.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-fjord-500" aria-hidden="true">
                        &#10003;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ink">Not Included</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {tour.excluded.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-ink-soft/60" aria-hidden="true">
                        &#10005;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ink">What to Bring</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {tour.whatToBring.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-fjord-500" aria-hidden="true">
                        &bull;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="mt-12 font-display text-xl font-semibold text-ink">Frequently Asked Questions</h2>
            <div className="mt-4">
              <FaqAccordion items={tour.faqs} />
            </div>
          </div>

          <div>
            <BookingWidget tour={tour} />
          </div>
        </div>

        {relatedTours.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-ink">You Might Also Like</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((related) => (
                <TourCard key={related.slug} tour={related} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link href="/tours" className="text-sm font-semibold text-fjord-600 hover:text-fjord-900">
            &larr; Back to all tours
          </Link>
        </div>
      </div>
    </>
  );
}
