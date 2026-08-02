import { defineType, defineField, defineArrayMember } from "sanity";
import { PinIcon } from "@sanity/icons/Pin";

export const attraction = defineType({
  name: "attraction",
  title: "Attraction",
  type: "document",
  icon: PinIcon,
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Beaches",
          "Mountains & Hiking",
          "Lakes",
          "UNESCO Old Towns",
          "Castles & Fortresses",
          "Archaeological Sites",
          "Caves",
          "Waterfalls",
          "National Parks",
          "Cities & Towns",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      description: "e.g. Riviera, North, Central, South",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number", validation: (rule) => rule.required() }),
        defineField({ name: "lng", title: "Longitude", type: "number", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedTours",
      title: "Related Tours",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tour" }] })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
