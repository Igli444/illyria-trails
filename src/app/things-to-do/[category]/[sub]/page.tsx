import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TourCard } from "@/components/TourCard";
import { getAllSubCategories, getCategoryBySlug, getSubCategory } from "@/data/categories";
import { getToursByCategory } from "@/data/tours";

interface PageProps {
  params: Promise<{ category: string; sub: string }>;
}

export async function generateStaticParams() {
  const subCategories = await getAllSubCategories();
  return subCategories.map((s) => ({ category: s.parentSlug, sub: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, sub } = await params;
  const subCategory = await getSubCategory(category, sub);
  if (!subCategory) return {};

  return {
    title: { absolute: subCategory.seo.metaTitle },
    description: subCategory.seo.metaDescription,
    alternates: { canonical: `/things-to-do/${category}/${sub}` },
  };
}

export default async function SubCategoryPage({ params }: PageProps) {
  const { category: categorySlug, sub: subSlug } = await params;
  const [parentCategory, subCategory] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getSubCategory(categorySlug, subSlug),
  ]);
  if (!parentCategory || !subCategory) notFound();

  const subCategoryTours = await getToursByCategory(subCategory.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Things to Do", url: "/tours" },
          { name: parentCategory.title, url: `/things-to-do/${parentCategory.slug}` },
          { name: subCategory.title, url: `/things-to-do/${parentCategory.slug}/${subCategory.slug}` },
        ]}
      />

      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <Image src={subCategory.heroImage.src} alt={subCategory.heroImage.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">{subCategory.title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 text-ink-soft">
          {subCategory.introCopy.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-semibold text-ink">
          {subCategory.title} ({subCategoryTours.length})
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subCategoryTours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
        {subCategoryTours.length === 0 && <p className="mt-6 text-ink-soft">No tours are currently listed in this category.</p>}
      </div>
    </>
  );
}
