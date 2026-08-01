import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { imageProjection, seoProjection } from "@/sanity/lib/fragments";
import { portableTextToParagraphs } from "@/sanity/lib/portableText";
import { Category } from "@/types/content";

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
    seo: raw.seo,
  };
}

function toSubCategory(raw: RawCategory): SubCategory {
  return { ...toCategory(raw), parentSlug: raw.parentSlug ?? "" };
}

export async function getAllCategories(): Promise<Category[]> {
  const raw = await client.fetch<RawCategory[]>(ALL_CATEGORIES_QUERY);
  return raw.map(toCategory);
}

export async function getAllSubCategories(): Promise<SubCategory[]> {
  const raw = await client.fetch<RawCategory[]>(ALL_SUBCATEGORIES_QUERY);
  return raw.map(toSubCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const raw = await client.fetch<RawCategory | null>(CATEGORY_BY_SLUG_QUERY, { slug });
  return raw ? toCategory(raw) : undefined;
}

export async function getSubCategory(parentSlug: string, slug: string): Promise<SubCategory | undefined> {
  const raw = await client.fetch<RawCategory | null>(CATEGORY_BY_SLUG_QUERY, { slug });
  if (!raw || raw.parentSlug !== parentSlug) return undefined;
  return toSubCategory(raw);
}

export async function getSubCategoriesForParent(parentSlug: string): Promise<SubCategory[]> {
  const all = await getAllSubCategories();
  return all.filter((s) => s.parentSlug === parentSlug);
}
