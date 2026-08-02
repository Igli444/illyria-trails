"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { Category, Guide, Tour } from "@/types/content";
import { SubCategory } from "@/data/categories";
import { cn } from "@/lib/utils";
import { useHasMounted } from "@/hooks/useHasMounted";

export function CategoryMegaMenu({
  categories,
  subCategories,
  tours,
  guides,
  topOffset,
  open,
  onNavigate,
}: {
  categories: Category[];
  subCategories: SubCategory[];
  tours: Tour[];
  guides: Guide[];
  topOffset: number;
  open: boolean;
  onNavigate: () => void;
}) {
  // Portaled straight to <body> so it's a true sibling of <header> in the root
  // stacking context — nested inside header, its z-index would only compete
  // *within* header's own stacking context (header's z-50 creates one),
  // never above page content outside it.
  const mounted = useHasMounted();
  if (!mounted) return null;

  return createPortal(
    <div
      data-mega-menu
      style={{
        top: topOffset,
        clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        maxHeight: `calc(100vh - ${topOffset}px - 2.5rem)`,
        // Leads on close (no delay); on open it waits for the header's own
        // dark-theme transition to mostly finish first — one CSS timeline
        // off a single `open` flip, rather than two JS-staggered states.
        transitionDelay: open ? "140ms" : "0ms",
      }}
      aria-hidden={!open}
      className={cn(
        "fixed inset-x-0 z-[60] overflow-y-auto bg-fjord-900 shadow-2xl shadow-fjord-900/40",
        "transition-[clip-path] duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
        !open && "pointer-events-none"
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[260px_1fr] gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="border-r border-paper/10 pr-8">
          <h2 className="font-display text-xl font-semibold text-paper">Things to Do</h2>
          <Link
            href="/tours"
            onClick={onNavigate}
            className="mt-1 inline-flex items-center gap-1 text-sm text-paper/70 hover:text-paper"
          >
            See all tours
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/attractions"
            onClick={onNavigate}
            className="mt-8 block text-sm font-semibold text-amber hover:text-amber-dark"
          >
            Attractions Directory
          </Link>
          <p className="mt-2 text-sm text-paper/60">
            Browse Albania&apos;s landmark sights independent of any specific tour.
          </p>
          <Link
            href="/airport-transfer"
            onClick={onNavigate}
            className="mt-6 block text-sm font-semibold text-amber hover:text-amber-dark"
          >
            Tirana Airport Transfer
          </Link>
          <p className="mt-2 text-sm text-paper/60">Direct transfers to the coast, north, and Tirana.</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
          {categories.map((category) => {
            const categoryTours = tours.filter((t) => t.categorySlugs.includes(category.slug));
            const childSubCategories = subCategories.filter((s) => s.parentSlug === category.slug);
            return (
              <div key={category.slug}>
                <Link
                  href={`/things-to-do/${category.slug}`}
                  onClick={onNavigate}
                  className="text-sm font-semibold text-amber hover:text-amber-dark"
                >
                  {category.title}
                </Link>
                <ul className="mt-3 space-y-2.5">
                  {childSubCategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/things-to-do/${category.slug}/${sub.slug}`}
                        onClick={onNavigate}
                        className="text-sm font-medium text-paper/90 hover:text-paper"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                  {categoryTours.map((tour) => (
                    <li key={tour.slug}>
                      <Link
                        href={`/tours/${tour.slug}`}
                        onClick={onNavigate}
                        className="text-sm text-paper/70 hover:text-paper"
                      >
                        {tour.title}
                      </Link>
                    </li>
                  ))}
                  {categoryTours.length === 0 && childSubCategories.length === 0 && (
                    <li>
                      <Link
                        href={`/things-to-do/${category.slug}`}
                        onClick={onNavigate}
                        className="text-sm text-paper/70 hover:text-paper"
                      >
                        Explore {category.title}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}

          <div>
            <Link
              href="/inspiration"
              onClick={onNavigate}
              className="text-sm font-semibold text-amber hover:text-amber-dark"
            >
              Guides &amp; Inspiration
            </Link>
            <ul className="mt-3 space-y-2.5">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/inspiration/${guide.slug}`}
                    onClick={onNavigate}
                    className="text-sm text-paper/70 hover:text-paper"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
