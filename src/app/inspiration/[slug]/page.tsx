import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ParallaxImage } from "@/components/ParallaxImage";
import { TourCard } from "@/components/TourCard";
import { getAllGuides, getGuideBySlug } from "@/data/guides";
import { getAllTours } from "@/data/tours";
import { getSiteSettings } from "@/data/site-settings";
import { articleSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: { absolute: guide.seo.metaTitle },
    description: guide.seo.metaDescription,
    alternates: { canonical: `/inspiration/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.seo.metaTitle,
      description: guide.seo.metaDescription,
      images: [{ url: guide.coverImage.src }],
      publishedTime: guide.publishDate,
    },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const [allTours, settings] = await Promise.all([getAllTours(), getSiteSettings()]);
  const relatedTours = allTours.filter((t) => guide.relatedTourSlugs.includes(t.slug));
  const date = new Date(guide.publishDate);

  return (
    <>
      <JsonLd data={articleSchema(guide, settings.brandName)} />
      <Breadcrumbs items={[{ name: "Inspiration", url: "/inspiration" }, { name: guide.title, url: `/inspiration/${guide.slug}` }]} />

      <article className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-fjord-500">
          {guide.tags.join(" · ")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">{guide.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
          <span>{guide.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={guide.publishDate}>
            {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </time>
        </div>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <ParallaxImage src={guide.coverImage.src} alt={guide.coverImage.alt} priority sizes="(min-width: 768px) 768px, 100vw" />
        </div>

        <div className="prose-content mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
          {guide.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {relatedTours.length > 0 && (
          <div className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-xl font-semibold text-ink">Tours mentioned in this guide</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link href="/inspiration" className="text-sm font-semibold text-fjord-600 hover:text-fjord-900">
            &larr; Back to all guides
          </Link>
        </div>
      </article>
    </>
  );
}
