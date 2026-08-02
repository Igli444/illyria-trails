import type { MetadataRoute } from "next";
import { getAllAttractions } from "@/data/attractions";
import { getAllCategories, getAllSubCategories } from "@/data/categories";
import { getAllGuides } from "@/data/guides";
import { SITE_DOMAIN } from "@/data/site-settings";
import { getAllTours } from "@/data/tours";

const siteUrl = `https://${SITE_DOMAIN}`;

const staticRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/tours", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/attractions", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/airport-transfer", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/inspiration", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/customer-support-and-faq", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/tour-status", changeFrequency: "daily" as const, priority: 0.4 },
  { path: "/careers", changeFrequency: "monthly" as const, priority: 0.3 },
  { path: "/difficulty-levels", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/traveling-with-children", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/meeting-points", changeFrequency: "monthly" as const, priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly" as const, priority: 0.2 },
  { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.2 },
  { path: "/cookies", changeFrequency: "yearly" as const, priority: 0.2 },
  { path: "/environmental-policy", changeFrequency: "yearly" as const, priority: 0.2 },
  { path: "/equal-pay-policy", changeFrequency: "yearly" as const, priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [categories, subCategories, tours, guides, attractions] = await Promise.all([
    getAllCategories(),
    getAllSubCategories(),
    getAllTours(),
    getAllGuides(),
    getAllAttractions(),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...categories.map((category) => ({
      url: `${siteUrl}/things-to-do/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...subCategories.map((sub) => ({
      url: `${siteUrl}/things-to-do/${sub.parentSlug}/${sub.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...tours.map((tour) => ({
      url: `${siteUrl}/tours/${tour.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...guides.map((guide) => ({
      url: `${siteUrl}/inspiration/${guide.slug}`,
      lastModified: guide.publishDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...attractions.map((attraction) => ({
      url: `${siteUrl}/attractions/${attraction.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
