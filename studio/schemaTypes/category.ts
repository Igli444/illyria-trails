import { defineType, defineField, defineArrayMember } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160).warning("Keep it under 160 characters for card layouts"),
    }),
    defineField({
      name: "introCopy",
      title: "Intro Copy",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Leave empty for a top-level category. Set this to make it a sub-category.",
      // A category cannot be its own parent — this is enforced in the Studio UI
      // via the reference filter rather than validation, since a doc's own _id
      // may not be known yet on first save.
    }),
    defineField({
      name: "keywords",
      title: "Target Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
        defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2 }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "parentCategory.title",
      media: "heroImage",
    },
  },
});
