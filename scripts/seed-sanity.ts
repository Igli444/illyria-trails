/**
 * One-time migration: pushes the static fixtures in scripts/seed-data/*.ts
 * into the real Sanity dataset, so Studio isn't empty after the schema is
 * deployed. These fixtures are a frozen snapshot of the original mock
 * content — kept separate from src/data/*.ts, which now fetches live from
 * Sanity instead of exporting static arrays.
 *
 * Usage (run from the TourProject root, reads .env.local automatically):
 *   npx tsx scripts/seed-sanity.ts
 *
 * Safe to re-run: each document is matched by _type + slug.current first;
 * if found it's updated in place, otherwise a new document is created with
 * a Sanity-generated _id. Running it twice updates rather than duplicates.
 */
process.loadEnvFile(new URL("../.env.local", import.meta.url));

import { createClient } from "next-sanity";
import { categories, subCategories } from "./seed-data/categories";
import { tours } from "./seed-data/tours";
import { guides } from "./seed-data/guides";
import { attractions } from "./seed-data/attractions";
import { siteSettings } from "./seed-data/site-settings";
import type { ContentImage } from "../src/types/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in the environment.");
}
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create one at https://www.sanity.io/manage/project/" +
      projectId +
      "/api (Editor permissions) and re-run with SANITY_API_WRITE_TOKEN=... set.",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-01",
  token,
  useCdn: false,
});

// --- helpers ---------------------------------------------------------------

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

function withKeys<T extends object>(items: T[]): (T & { _key: string })[] {
  return items.map((item) => ({ ...item, _key: randomKey() }));
}

function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: randomKey(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: randomKey(), text, marks: [] }],
  }));
}

const assetCache = new Map<string, string>(); // public path -> asset _id

async function uploadImage(image: ContentImage) {
  const cached = assetCache.get(image.src);
  if (cached) {
    return { _type: "image" as const, asset: { _type: "reference" as const, _ref: cached }, alt: image.alt };
  }

  const filePath = new URL(`../public${image.src}`, import.meta.url);
  const fs = await import("node:fs");
  const buffer = fs.readFileSync(filePath);
  const filename = image.src.split("/").pop() ?? "image.svg";

  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/svg+xml",
  });

  assetCache.set(image.src, asset._id);
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id }, alt: image.alt };
}

/** Create-or-update a document by slug, without inventing IDs for new docs. */
async function upsertBySlug(type: string, slug: string, doc: Record<string, unknown>): Promise<string> {
  const existingId = await client.fetch<string | null>(`*[_type == $type && slug.current == $slug][0]._id`, {
    type,
    slug,
  });

  if (existingId) {
    const result = await client.createOrReplace({ ...doc, _id: existingId, _type: type });
    return result._id;
  }

  const result = await client.create({ ...doc, _type: type });
  return result._id;
}

// --- seed --------------------------------------------------------------

async function run() {
  console.log("Seeding categories...");
  const categoryIdBySlug = new Map<string, string>();

  for (const category of categories) {
    const id = await upsertBySlug("category", category.slug, {
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      shortDescription: category.shortDescription,
      introCopy: toPortableText(category.introCopy),
      heroImage: await uploadImage(category.heroImage),
      keywords: category.keywords,
      seo: category.seo,
    });
    categoryIdBySlug.set(category.slug, id);
    console.log(`  category: ${category.title}`);
  }

  console.log("Seeding sub-categories...");
  for (const sub of subCategories) {
    const parentId = categoryIdBySlug.get(sub.parentSlug);
    const id = await upsertBySlug("category", sub.slug, {
      title: sub.title,
      slug: { _type: "slug", current: sub.slug },
      shortDescription: sub.shortDescription,
      introCopy: toPortableText(sub.introCopy),
      heroImage: await uploadImage(sub.heroImage),
      keywords: sub.keywords,
      seo: sub.seo,
      ...(parentId ? { parentCategory: { _type: "reference", _ref: parentId } } : {}),
    });
    categoryIdBySlug.set(sub.slug, id);
    console.log(`  sub-category: ${sub.title}`);
  }

  console.log("Seeding tours...");
  const tourIdBySlug = new Map<string, string>();
  for (const tour of tours) {
    const gallery = await Promise.all(tour.gallery.map((img) => uploadImage(img)));
    const id = await upsertBySlug("tour", tour.slug, {
      title: tour.title,
      slug: { _type: "slug", current: tour.slug },
      shortDescription: tour.shortDescription,
      description: toPortableText(tour.description),
      heroImage: await uploadImage(tour.heroImage),
      gallery,
      duration: tour.duration,
      difficulty: tour.difficulty,
      price: tour.price,
      originalPrice: tour.originalPrice,
      currency: tour.currency,
      badges: tour.badges,
      categories: tour.categorySlugs
        .map((slug) => categoryIdBySlug.get(slug))
        .filter((catId): catId is string => Boolean(catId))
        .map((catId) => ({ _type: "reference", _ref: catId, _key: randomKey() })),
      rating: tour.rating,
      reviewCount: tour.reviewCount,
      meetingPoint: tour.meetingPoint,
      itinerary: withKeys(tour.itinerary),
      included: tour.included,
      excluded: tour.excluded,
      whatToBring: tour.whatToBring,
      faqs: withKeys(tour.faqs),
      seo: tour.seo,
    });
    tourIdBySlug.set(tour.slug, id);
    console.log(`  tour: ${tour.title}`);
  }

  console.log("Seeding guides...");
  for (const guide of guides) {
    const id = await upsertBySlug("guide", guide.slug, {
      title: guide.title,
      slug: { _type: "slug", current: guide.slug },
      excerpt: guide.excerpt,
      author: guide.author,
      publishDate: new Date(guide.publishDate).toISOString(),
      coverImage: await uploadImage(guide.coverImage),
      tags: guide.tags,
      body: toPortableText(guide.body),
      relatedTours: guide.relatedTourSlugs
        .map((slug) => tourIdBySlug.get(slug))
        .filter((tourId): tourId is string => Boolean(tourId))
        .map((tourId) => ({ _type: "reference", _ref: tourId, _key: randomKey() })),
      seo: guide.seo,
    });
    console.log(`  guide: ${guide.title} -> ${id}`);
  }

  console.log("Seeding attractions...");
  for (const attraction of attractions) {
    const id = await upsertBySlug("attraction", attraction.slug, {
      title: attraction.title,
      slug: { _type: "slug", current: attraction.slug },
      category: attraction.category,
      region: attraction.region,
      coordinates: attraction.coordinates,
      description: attraction.description,
      image: await uploadImage(attraction.image),
      relatedTours: attraction.relatedTourSlugs
        .map((slug) => tourIdBySlug.get(slug))
        .filter((tourId): tourId is string => Boolean(tourId))
        .map((tourId) => ({ _type: "reference", _ref: tourId, _key: randomKey() })),
    });
    console.log(`  attraction: ${attraction.title} -> ${id}`);
  }

  console.log("Seeding site settings singleton...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: siteSettings.brandName,
    tagline: siteSettings.tagline,
    description: siteSettings.description,
    supportEmail: siteSettings.supportEmail,
    supportPhone: siteSettings.supportPhone,
    certifications: siteSettings.certifications,
    trustBadges: withKeys(siteSettings.trustBadges),
    socials: withKeys(siteSettings.socials),
    footerColumns: withKeys(
      siteSettings.footerColumns.map((col) => ({ ...col, links: withKeys(col.links) })),
    ),
  });

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
