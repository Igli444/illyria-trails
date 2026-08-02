import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ParallaxImage } from "@/components/ParallaxImage";
import { TourCard } from "@/components/TourCard";
import { getAllCategories, getCategoryBySlug, getSubCategoriesForParent } from "@/data/categories";
import { getToursByCategory } from "@/data/tours";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: { absolute: category.seo.metaTitle },
    description: category.seo.metaDescription,
    alternates: { canonical: `/things-to-do/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [categoryTours, subCategories] = await Promise.all([
    getToursByCategory(category.slug),
    getSubCategoriesForParent(category.slug),
  ]);

  return (
    <>
      <Breadcrumbs items={[{ name: "Things to Do", url: "/tours" }, { name: category.title, url: `/things-to-do/${category.slug}` }]} />

      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <ParallaxImage src={category.heroImage.src} alt={category.heroImage.alt} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">{category.title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 text-ink-soft">
          {category.introCopy.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {subCategories.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {subCategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/things-to-do/${category.slug}/${sub.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper-dim"
              >
                {sub.title} &rarr;
              </Link>
            ))}
          </div>
        )}

        <h2 className="mt-12 font-display text-2xl font-semibold text-ink">
          {category.title} ({categoryTours.length})
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
        {categoryTours.length === 0 && <p className="mt-6 text-ink-soft">No tours are currently listed in this category.</p>}
      </div>
    </>
  );
}
