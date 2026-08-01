import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { GuideCard } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SearchWidget } from "@/components/SearchWidget";
import { TourCard } from "@/components/TourCard";
import { TrustBadges } from "@/components/TrustBadges";
import { getAllCategories } from "@/data/categories";
import { getLatestGuides } from "@/data/guides";
import { getAllTours, getBestsellerTours } from "@/data/tours";
import { getSiteSettings } from "@/data/site-settings";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";

export default async function Home() {
  const [categories, allTours, bestsellers, latestGuides, settings] = await Promise.all([
    getAllCategories(),
    getAllTours(),
    getBestsellerTours(),
    getLatestGuides(4),
    getSiteSettings(),
  ]);

  const popularTours = [...bestsellers, ...allTours]
    .filter((t, i, arr) => arr.findIndex((x) => x.slug === t.slug) === i)
    .slice(0, 6);

  return (
    <>
      <JsonLd data={organizationSchema(settings)} />
      <JsonLd data={localBusinessSchema(settings)} />

      <section className="relative flex min-h-[640px] items-center overflow-hidden">
        <Image
          src="/images/accursed-mountains.svg"
          alt="Jagged alpine peaks above a green valley in Albania's Accursed Mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-paper/80">Small-group tours, real availability</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-paper sm:text-5xl lg:text-6xl">
            Original adventures across Albania&apos;s coast and highlands
          </h1>
          <p className="mt-5 max-w-xl text-lg text-paper/90">
            Riviera boat trips, Accursed Mountains treks, the Lake Komani ferry, and Berat&apos;s old town — booked
            directly, guided by people who know the coast, the mountains, and the back roads between them.
          </p>
          <div className="mt-8 max-w-2xl">
            <SearchWidget />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Popular Tours</h2>
            <p className="mt-1 text-ink-soft">The routes travelers book first.</p>
          </div>
          <Link href="/tours" className="text-sm font-semibold text-fjord-600 hover:text-fjord-900">
            View all tours &rarr;
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularTours.map((tour, i) => (
            <TourCard key={tour.slug} tour={tour} priority={i < 3} />
          ))}
        </div>
      </section>

      <section className="bg-paper-dim py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Adventures for Every Traveler</h2>
          <p className="mt-1 max-w-2xl text-ink-soft">
            From an easy afternoon on the water to a two-day mountain crossing — find the pace that fits your trip.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} href={`/things-to-do/${category.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Trusted by Thousands of Travelers</h2>
        <div className="mt-6">
          <TrustBadges trustBadges={settings.trustBadges} />
        </div>
      </section>

      <section className="bg-paper-dim py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Guides &amp; Inspiration</h2>
              <p className="mt-1 text-ink-soft">Practical planning notes from our own guides.</p>
            </div>
            <Link href="/inspiration" className="text-sm font-semibold text-fjord-600 hover:text-fjord-900">
              Read more guides &rarr;
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Get Trip Ideas in Your Inbox</h2>
        <p className="mt-2 text-ink-soft">
          Seasonal guides, new tours, and the occasional launch offer — no spam, unsubscribe any time.
        </p>
        <div className="mx-auto mt-6 max-w-sm text-left">
          <NewsletterForm brandName={settings.brandName} />
        </div>
      </section>
    </>
  );
}
