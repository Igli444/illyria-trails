import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { imageProjection, seoProjection, withSeoFallback } from "@/sanity/lib/fragments";
import { portableTextToParagraphs } from "@/sanity/lib/portableText";
import { Category } from "@/types/content";
import { categories as fallbackCategories, subCategories as fallbackSubCategories } from "../../scripts/seed-data/categories";

export interface SubCategory extends Category {
  parentSlug: string;
}

interface RawCategory {
  title: string;
  slug: string;
  shortDescription: string;
  introCopy: Parameters<typeof portableTextToParagraphs>[0];
  heroImage: Category["heroImage"];
  keywords: string[];
  seo: Category["seo"];
  parentSlug: string | null;
}

const CATEGORY_PROJECTION = `{
  title,
  "slug": slug.current,
  shortDescription,
  introCopy,
  heroImage ${imageProjection},
  keywords,
  seo ${seoProjection},
  "parentSlug": parentCategory->slug.current,
}`;

const ALL_CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && !defined(parentCategory)] | order(title asc) ${CATEGORY_PROJECTION}`,
);

const ALL_SUBCATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && defined(parentCategory)] | order(title asc) ${CATEGORY_PROJECTION}`,
);

const CATEGORY_BY_SLUG_QUERY = defineQuery(
  `*[_type == "category" && slug.current == $slug][0] ${CATEGORY_PROJECTION}`,
);

function toCategory(raw: RawCategory): Category {
  return {
    slug: raw.slug,
    title: raw.title,
    shortDescription: raw.shortDescription,
    introCopy: portableTextToParagraphs(raw.introCopy),
    heroImage: raw.heroImage,
    keywords: raw.keywords ?? [],
    seo: withSeoFallback(raw.seo, raw.title, raw.shortDescription),
  };
}

function toSubCategory(raw: RawCategory): SubCategory {
  return { ...toCategory(raw), parentSlug: raw.parentSlug ?? "" };
}

// Fallback used only if no categories have been created in Sanity yet, so
// the site still renders something sensible instead of an empty list.
export async function getAllCategories(): Promise<Category[]> {
  const raw = await client.fetch<RawCategory[]>(ALL_CATEGORIES_QUERY);
  if (raw.length === 0) {
    console.warn("getAllCategories: Sanity returned no categories, serving fallback seed data");
    return fallbackCategories;
  }
  return raw.map(toCategory);
}

export async function getAllSubCategories(): Promise<SubCategory[]> {
  const raw = await client.fetch<RawCategory[]>(ALL_SUBCATEGORIES_QUERY);
  if (raw.length === 0) {
    console.warn("getAllSubCategories: Sanity returned no sub-categories, serving fallback seed data");
    return fallbackSubCategories;
  }
  return raw.map(toSubCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const raw = await client.fetch<RawCategory | null>(CATEGORY_BY_SLUG_QUERY, { slug });
  if (raw) return toCategory(raw);
  // Sanity has no document for this slug — but only treat that as "not
  // seeded yet" (and serve fallback content) if Sanity is truly empty.
  // Deferring to getAllCategories() here means a category that's since
  // been deleted or renamed in an otherwise-populated Sanity correctly
  // 404s instead of silently keeping its old seed-data page alive forever.
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug);
}

export async function getSubCategory(parentSlug: string, slug: string): Promise<SubCategory | undefined> {
  const raw = await client.fetch<RawCategory | null>(CATEGORY_BY_SLUG_QUERY, { slug });
  if (raw) {
    if (raw.parentSlug !== parentSlug) return undefined;
    return toSubCategory(raw);
  }
  // Same reasoning as getCategoryBySlug: only fall back when Sanity is
  // genuinely unseeded, not merely missing this one sub-category.
  const all = await getAllSubCategories();
  return all.find((s) => s.slug === slug && s.parentSlug === parentSlug);
}

export async function getSubCategoriesForParent(parentSlug: string): Promise<SubCategory[]> {
  const all = await getAllSubCategories();
  return all.filter((s) => s.parentSlug === parentSlug);
}
