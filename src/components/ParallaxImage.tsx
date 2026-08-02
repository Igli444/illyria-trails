"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/**
 * Drop-in replacement for a full-bleed background `<Image fill />`. Must be
 * placed inside a `relative overflow-hidden` container with a defined
 * height — it fills that container and drifts vertically as it scrolls
 * through the viewport, oversized so the drift never reveals an edge.
 */
export function ParallaxImage({
  src,
  alt,
  priority,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, position: "absolute", inset: 0, top: "-8%", height: "116%" }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
