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
