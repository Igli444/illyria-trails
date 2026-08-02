"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { Tour } from "@/types/content";
import { cn } from "@/lib/utils";

function matches(tour: Tour, query: string) {
  const q = query.toLowerCase();
  return tour.title.toLowerCase().includes(q) || tour.shortDescription.toLowerCase().includes(q);
}

export function HeaderSearch({ tours, inverted = false }: { tours: Tour[]; inverted?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    return tours.filter((t) => matches(t, query)).slice(0, 5);
  }, [tours, query]);

  function goToResults(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/tours?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={containerRef} className="relative hidden 2xl:block">
      <form onSubmit={goToResults} role="search">
        <label htmlFor="header-search" className="sr-only">
          Search tours
        </label>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
            inverted ? "border-paper/20 bg-paper/10" : "border-line bg-paper-dim"
          )}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn(
              "shrink-0 transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
              inverted ? "text-paper/70" : "text-ink-soft"
            )}
          >
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            id="header-search"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            placeholder="Search tours"
            className={cn(
              "w-36 bg-transparent text-sm focus:w-48 focus:outline-none transition-[width,color] duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
              inverted ? "text-paper placeholder:text-paper/60" : "text-ink placeholder:text-ink-soft"
            )}
          />
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-line bg-white shadow-lg">
          {suggestions.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setOpen(false)}
              className="block border-b border-line px-4 py-2.5 text-sm text-ink last:border-b-0 hover:bg-paper-dim"
            >
              <span className="font-medium">{tour.title}</span>
              <span className="ml-2 text-xs text-ink-soft">{tour.duration}</span>
            </Link>
          ))}
          <Link
            href={`/tours?q=${encodeURIComponent(query.trim())}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setOpen(false)}
            className="block bg-paper-dim px-4 py-2 text-center text-xs font-semibold text-fjord-600 hover:text-fjord-900"
          >
            See all results for &ldquo;{query.trim()}&rdquo;
          </Link>
        </div>
      )}
    </div>
  );
}
