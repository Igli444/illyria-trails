import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  // Singleton: pinned to a single document via the Studio structure (see structure.ts),
  // so there is exactly one "Site Settings" document rather than a list of them.
  fields: [
    defineField({ name: "brandName", title: "Brand Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Site Description", type: "text", rows: 2 }),
    defineField({ name: "supportEmail", title: "Support Email", type: "string", validation: (rule) => rule.email() }),
    defineField({ name: "supportPhone", title: "Support Phone", type: "string" }),
    defineField({
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerColumn",
          fields: [
            defineField({ name: "title", title: "Column Title", type: "string" }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "footerLink",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "href", title: "URL", type: "string" }),
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "trustBadges",
      title: "Trust Badges",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "trustBadge",
          fields: [
            defineField({ name: "label", title: "Platform Label", type: "string" }),
            defineField({ name: "rating", title: "Rating", type: "number", validation: (rule) => rule.min(0).max(5) }),
            defineField({ name: "reviewCount", title: "Review Count", type: "number", validation: (rule) => rule.min(0) }),
          ],
          preview: { select: { title: "label", subtitle: "rating" } },
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({ name: "label", title: "Platform", type: "string" }),
            defineField({ name: "href", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
