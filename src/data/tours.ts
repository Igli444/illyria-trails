import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { imageProjection, seoProjection, withSeoFallback } from "@/sanity/lib/fragments";
import { portableTextToParagraphs } from "@/sanity/lib/portableText";
import { Tour } from "@/types/content";

interface RawTour {
  title: string;
  slug: string;
  shortDescription: string;
  description: Parameters<typeof portableTextToParagraphs>[0];
  heroImage: Tour["heroImage"];
  gallery: Tour["gallery"];
  duration: string;
  difficulty: Tour["difficulty"];
  price: number;
  originalPrice: number | null;
  currency: string;
  badges: string[];
  categorySlugs: string[];
  rating: number;
  reviewCount: number;
  meetingPoint: string;
  itinerary: Tour["itinerary"];
  included: string[];
  excluded: string[];
  whatToBring: string[];
  faqs: Tour["faqs"];
  seo: Tour["seo"];
}

const TOUR_PROJECTION = `{
  title,
  "slug": slug.current,
  shortDescription,
  description,
  heroImage ${imageProjection},
  gallery[] ${imageProjection},
  duration,
  difficulty,
  price,
  originalPrice,
  currency,
  badges,
  "categorySlugs": categories[]->slug.current,
  rating,
  reviewCount,
  meetingPoint,
  itinerary,
  included,
  excluded,
  whatToBring,
  faqs,
  seo ${seoProjection},
}`;

const ALL_TOURS_QUERY = defineQuery(`*[_type == "tour"] | order(title asc) ${TOUR_PROJECTION}`);

const TOUR_BY_SLUG_QUERY = defineQuery(`*[_type == "tour" && slug.current == $slug][0] ${TOUR_PROJECTION}`);

function toTour(raw: RawTour): Tour {
  return {
    slug: raw.slug,
    title: raw.title,
    shortDescription: raw.shortDescription,
    description: portableTextToParagraphs(raw.description),
    heroImage: raw.heroImage,
    gallery: raw.gallery ?? [],
    duration: raw.duration,
    difficulty: raw.difficulty,
    price: raw.price,
    originalPrice: raw.originalPrice ?? undefined,
    currency: raw.currency,
    badges: raw.badges ?? [],
    categorySlugs: (raw.categorySlugs ?? []).filter(Boolean),
    rating: raw.rating,
    reviewCount: raw.reviewCount,
    meetingPoint: raw.meetingPoint,
    itinerary: raw.itinerary ?? [],
    included: raw.included ?? [],
    excluded: raw.excluded ?? [],
    whatToBring: raw.whatToBring ?? [],
    faqs: raw.faqs ?? [],
    seo: withSeoFallback(raw.seo, raw.title, raw.shortDescription),
  };
}

export async function getAllTours(): Promise<Tour[]> {
  const raw = await client.fetch<RawTour[]>(ALL_TOURS_QUERY);
  return raw.map(toTour);
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  const raw = await client.fetch<RawTour | null>(TOUR_BY_SLUG_QUERY, { slug });
  return raw ? toTour(raw) : undefined;
}

export async function getToursByCategory(categorySlug: string): Promise<Tour[]> {
  const all = await getAllTours();
  return all.filter((t) => t.categorySlugs.includes(categorySlug));
}

export async function getRelatedTours(tour: Tour, count = 3): Promise<Tour[]> {
  const all = await getAllTours();
  return all
    .filter((t) => t.slug !== tour.slug && t.categorySlugs.some((c) => tour.categorySlugs.includes(c)))
    .slice(0, count);
}

export async function getBestsellerTours(): Promise<Tour[]> {
  const all = await getAllTours();
  return all.filter((t) => t.badges.length > 0);
}
