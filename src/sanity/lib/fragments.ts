import { SeoFields } from "@/types/content";

/** Reusable GROQ projections shared across queries. */

export const imageProjection = `{
  "src": asset->url,
  alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
}`;

export const seoProjection = `{
  metaTitle,
  metaDescription,
}`;

/**
 * Sanity's `seo` object is optional in the schema, so documents that were
 * never given SEO fields project as `null`. Downstream pages assume `seo`
 * is always present (e.g. `guide.seo.metaTitle` in generateMetadata), so
 * fill in sane defaults here rather than letting that crash the build.
 */
export function withSeoFallback(
  seo: SeoFields | null | undefined,
  fallbackTitle: string,
  fallbackDescription: string,
): SeoFields {
  return {
    metaTitle: seo?.metaTitle || fallbackTitle,
    metaDescription: seo?.metaDescription || fallbackDescription,
  };
}
