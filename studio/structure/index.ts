import { CogIcon } from "@sanity/icons/Cog";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { TagIcon } from "@sanity/icons/Tag";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["siteSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site Settings")),

      S.divider(),

      S.documentTypeListItem("tour").title("Tours").icon(EarthGlobeIcon),
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
      S.documentTypeListItem("guide").title("Guides").icon(DocumentTextIcon),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(listItem.getId() as string) &&
          !["tour", "category", "guide"].includes(listItem.getId() as string),
      ),
    ]);
