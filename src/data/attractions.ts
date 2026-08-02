import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { imageProjection } from "@/sanity/lib/fragments";
import { Attraction } from "@/types/content";

interface RawAttraction {
  title: string;
  slug: string;
  category: string;
  region: string;
  coordinates: { lat: number; lng: number } | null;
  description: string;
  image: Attraction["image"];
  relatedTourSlugs: string[];
}

const ATTRACTION_PROJECTION = `{
  title,
  "slug": slug.current,
  category,
  region,
  coordinates,
  description,
  image ${imageProjection},
  "relatedTourSlugs": relatedTours[]->slug.current,
}`;

const ALL_ATTRACTIONS_QUERY = defineQuery(`*[_type == "attraction"] | order(title asc) ${ATTRACTION_PROJECTION}`);

const ATTRACTION_BY_SLUG_QUERY = defineQuery(
  `*[_type == "attraction" && slug.current == $slug][0] ${ATTRACTION_PROJECTION}`,
);

function toAttraction(raw: RawAttraction): Attraction {
  return {
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    region: raw.region,
    coordinates: raw.coordinates ?? { lat: 0, lng: 0 },
    description: raw.description,
    image: raw.image,
    relatedTourSlugs: raw.relatedTourSlugs?.filter(Boolean) ?? [],
  };
}

export async function getAllAttractions(): Promise<Attraction[]> {
  const raw = await client.fetch<RawAttraction[]>(ALL_ATTRACTIONS_QUERY);
  return raw.map(toAttraction);
}

export async function getAttractionBySlug(slug: string): Promise<Attraction | undefined> {
  const raw = await client.fetch<RawAttraction | null>(ATTRACTION_BY_SLUG_QUERY, { slug });
  return raw ? toAttraction(raw) : undefined;
}
