import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const imageBuilder = createImageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source).auto("format").fit("max");
}
