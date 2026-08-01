interface PortableTextSpan {
  _type: string;
  text?: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextSpan[];
}

/**
 * Flattens Portable Text blocks into plain paragraph strings. This keeps the
 * existing components (which render `description.map(p => <p>{p}</p>)`)
 * unchanged; swap this out for a real `<PortableText />` renderer later if
 * rich formatting (bold, links) is needed in the copy.
 */
export function portableTextToParagraphs(blocks: PortableTextBlock[] | undefined): string[] {
  if (!blocks) return [];
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => (block.children ?? []).map((span) => span.text ?? "").join(""))
    .filter((paragraph) => paragraph.length > 0);
}
