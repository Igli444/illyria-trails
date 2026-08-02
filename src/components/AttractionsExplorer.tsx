"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Attraction } from "@/types/content";

const CATEGORY_COLORS: Record<string, string> = {
  Beaches: "#2f8fb3",
  "Mountains & Hiking": "#4b6b4f",
  Lakes: "#1f6fa8",
  "UNESCO Old Towns": "#b9793f",
  "Castles & Fortresses": "#6b5c47",
  "Archaeological Sites": "#8a7150",
  Caves: "#4a4038",
  Waterfalls: "#3fa0c8",
  "National Parks": "#5b8a5e",
  "Cities & Towns": "#a4562f",
};

// Albania's approximate bounding box, used to project lat/lng onto the
// illustrative map — this is a stylized locator, not a precise survey map.
const BOUNDS = { latMin: 39.6, latMax: 42.7, lngMin: 19.25, lngMax: 21.05 };
const MAP_WIDTH = 520;
const MAP_HEIGHT = 760;

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * MAP_WIDTH;
  const y = ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * MAP_HEIGHT;
  return { x, y };
}

export function AttractionsExplorer({ attractions }: { attractions: Attraction[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(attractions.map((a) => a.category)))],
    [attractions]
  );
  const [category, setCategory] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? attractions : attractions.filter((a) => a.category === category)),
    [attractions, category]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              category === c
                ? "border-fjord-500 bg-fjord-500 text-white"
                : "border-line bg-white text-ink-soft hover:border-fjord-500 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        <div className="rounded-2xl border border-line bg-paper-dim p-4">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="w-full"
            role="img"
            aria-label="Map of Albania showing attraction locations"
          >
            <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} rx="16" fill="#dce9e6" />
            <path
              d={`M ${MAP_WIDTH * 0.55} ${MAP_HEIGHT * 0.03}
                  C ${MAP_WIDTH * 0.75} ${MAP_HEIGHT * 0.1} ${MAP_WIDTH * 0.7} ${MAP_HEIGHT * 0.22} ${MAP_WIDTH * 0.8} ${MAP_HEIGHT * 0.32}
                  C ${MAP_WIDTH * 0.88} ${MAP_HEIGHT * 0.42} ${MAP_WIDTH * 0.7} ${MAP_HEIGHT * 0.5} ${MAP_WIDTH * 0.72} ${MAP_HEIGHT * 0.6}
                  C ${MAP_WIDTH * 0.74} ${MAP_HEIGHT * 0.7} ${MAP_WIDTH * 0.55} ${MAP_HEIGHT * 0.8} ${MAP_WIDTH * 0.5} ${MAP_HEIGHT * 0.92}
                  C ${MAP_WIDTH * 0.46} ${MAP_HEIGHT * 0.98} ${MAP_WIDTH * 0.35} ${MAP_HEIGHT * 0.98} ${MAP_WIDTH * 0.32} ${MAP_HEIGHT * 0.9}
                  C ${MAP_WIDTH * 0.28} ${MAP_HEIGHT * 0.78} ${MAP_WIDTH * 0.35} ${MAP_HEIGHT * 0.68} ${MAP_WIDTH * 0.3} ${MAP_HEIGHT * 0.58}
                  C ${MAP_WIDTH * 0.24} ${MAP_HEIGHT * 0.46} ${MAP_WIDTH * 0.32} ${MAP_HEIGHT * 0.36} ${MAP_WIDTH * 0.28} ${MAP_HEIGHT * 0.24}
                  C ${MAP_WIDTH * 0.25} ${MAP_HEIGHT * 0.14} ${MAP_WIDTH * 0.38} ${MAP_HEIGHT * 0.06} ${MAP_WIDTH * 0.55} ${MAP_HEIGHT * 0.03}
                  Z`}
              fill="#b8d4c4"
              stroke="#8fb5a0"
              strokeWidth="2"
            />
            {filtered.map((a) => {
              const { x, y } = project(a.coordinates.lat, a.coordinates.lng);
              const color = CATEGORY_COLORS[a.category] ?? "#0f6e6b";
              const isHovered = hovered === a.slug;
              return (
                <g key={a.slug}>
                  <Link href={`/attractions/${a.slug}`} aria-label={a.title}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 8 : 5.5}
                      fill={color}
                      stroke="white"
                      strokeWidth="1.5"
                      onMouseEnter={() => setHovered(a.slug)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ cursor: "pointer", transition: "r 0.15s ease" }}
                    />
                  </Link>
                  {isHovered && (
                    <g pointerEvents="none">
                      <rect
                        x={x + 10}
                        y={y - 14}
                        width={Math.max(60, a.title.length * 6.2)}
                        height={24}
                        rx={5}
                        fill="#1a2e26"
                      />
                      <text x={x + 16} y={y + 2} fontSize="11" fill="white">
                        {a.title}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          <p className="mt-3 text-center text-xs text-ink-soft">
            Stylized locator map — not to scale. Click a pin to open that attraction.
          </p>
        </div>

        <div>
          <p className="text-sm text-ink-soft">
            {filtered.length} attraction{filtered.length === 1 ? "" : "s"}
            {category !== "All" ? ` in ${category}` : ""}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {filtered.map((a) => (
              <Link
                key={a.slug}
                href={`/attractions/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg hover:shadow-ink/5"
                onMouseEnter={() => setHovered(a.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-dim">
                  <Image
                    src={a.image.src}
                    alt={a.image.alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: CATEGORY_COLORS[a.category] ?? "#0f6e6b" }}
                  >
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-base font-semibold text-ink">{a.title}</h3>
                  <p className="mt-0.5 text-xs text-ink-soft">{a.region}</p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{a.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
