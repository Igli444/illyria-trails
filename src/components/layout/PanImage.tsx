import Image from "next/image";

/** Image that pans left-right on hover instead of scaling — the image is
 * rendered wider than its frame so there's room to slide across it. Plain
 * CSS group-hover (not Framer Motion) so it fires on the browser's own
 * :hover state instead of a separate JS gesture listener. */
export function PanImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div
      className="absolute inset-y-0 transition-transform duration-700 ease-in-out group-hover:-translate-x-[12%]"
      style={{ left: "-16%", width: "132%" }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
