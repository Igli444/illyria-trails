import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { imageProjection, seoProjection, withSeoFallback } from "@/sanity/lib/fragments";
import { portableTextToParagraphs } from "@/sanity/lib/portableText";
import { Guide } from "@/types/content";

interface RawGuide {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishDate: string;
  coverImage: Guide["coverImage"];
  tags: string[];
  body: Parameters<typeof portableTextToParagraphs>[0];
  relatedTourSlugs: string[];
  seo: Guide["seo"];
}

const GUIDE_PROJECTION = `{
  title,
  "slug": slug.current,
  excerpt,
  author,
  publishDate,
  coverImage ${imageProjection},
  tags,
  body,
  "relatedTourSlugs": relatedTours[]->slug.current,
  seo ${seoProjection},
}`;

const ALL_GUIDES_QUERY = defineQuery(`*[_type == "guide"] | order(publishDate desc) ${GUIDE_PROJECTION}`);

const GUIDE_BY_SLUG_QUERY = defineQuery(`*[_type == "guide" && slug.current == $slug][0] ${GUIDE_PROJECTION}`);

function toGuide(raw: RawGuide): Guide {
  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    author: raw.author,
    publishDate: raw.publishDate,
    coverImage: raw.coverImage,
    tags: raw.tags ?? [],
    relatedTourSlugs: (raw.relatedTourSlugs ?? []).filter(Boolean),
    body: portableTextToParagraphs(raw.body),
    seo: withSeoFallback(raw.seo, raw.title, raw.excerpt),
  };
}

export async function getAllGuides(): Promise<Guide[]> {
  const raw = await client.fetch<RawGuide[]>(ALL_GUIDES_QUERY);
  return raw.map(toGuide);
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const raw = await client.fetch<RawGuide | null>(GUIDE_BY_SLUG_QUERY, { slug });
  return raw ? toGuide(raw) : undefined;
}

export async function getLatestGuides(count = 6): Promise<Guide[]> {
  const all = await getAllGuides();
  return all.slice(0, count);
}
