import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { SiteSettings } from "@/types/content";

// Deployment-level config, not editorial content — not a Sanity field.
export const SITE_DOMAIN = "illyriatrails.example";

const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  brandName,
  tagline,
  description,
  supportEmail,
  supportPhone,
  certifications,
  trustBadges,
  socials,
  footerColumns,
}`);

// Fallback used only if the singleton hasn't been created in Sanity yet, so
// the site still renders something sensible instead of crashing.
const fallbackSettings: SiteSettings = {
  brandName: "Illyria Trails",
  tagline: "Original adventures across Albania's coast and highlands.",
  description:
    "Illyria Trails runs small-group tours across Albania's coastline and mountains.",
  domain: SITE_DOMAIN,
  supportEmail: "hello@illyriatrails.example",
  supportPhone: "+355 69 555 0148",
  socials: [],
  certifications: [],
  trustBadges: [],
  footerColumns: [],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const raw = await client.fetch<Omit<SiteSettings, "domain"> | null>(SITE_SETTINGS_QUERY);
  if (!raw) return fallbackSettings;
  return { ...raw, domain: SITE_DOMAIN };
}
