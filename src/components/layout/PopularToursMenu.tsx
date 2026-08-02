"use client";

import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Category, Tour } from "@/types/content";
import { PanImage } from "@/components/layout/PanImage";
import { cn } from "@/lib/utils";
import { useHasMounted } from "@/hooks/useHasMounted";

const PROMO = {
  href: "/airport-transfer",
  title: "Book Airport Transfer",
  cta: "See transfer options",
  image: "/images/tirana-skyline.svg",
  alt: "Tirana skyline, the start and end point of every airport transfer",
};

const CARD_WIDTH = 280;
const GAP = 20;
const STEP = CARD_WIDTH + GAP;
const CARDS_PER_PAGE = 3;
// The visible track is pinned to exactly this many card-widths so there's
// never a partially cut-off card peeking in at the right edge.
const TRACK_WIDTH = CARDS_PER_PAGE * CARD_WIDTH + (CARDS_PER_PAGE - 1) * GAP;
const DRAG_THRESHOLD = 60;
// Images shift a little extra in the travel direction while the track
// slides, then settle slightly after the cards — a light parallax accent.
const PARALLAX_FACTOR = 0.06;
const PARALLAX_MAX = 22;

function parallaxOffset(trackX: number) {
  return Math.max(-PARALLAX_MAX, Math.min(PARALLAX_MAX, trackX * PARALLAX_FACTOR));
}

/** A category "collection" card — the count (top-left) and label (bottom-right)
 * are both fully invisible until hover, then slide in from opposite sides. */
function CollectionCard({
  category,
  count,
  imageStyle,
  onNavigate,
}: {
  category: Category;
  count: number;
  imageStyle: React.CSSProperties;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={`/things-to-do/${category.slug}`}
      onClick={onNavigate}
      className="group shrink-0"
      style={{ width: CARD_WIDTH }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl" style={imageStyle}>
        <PanImage src={category.heroImage.src} alt={category.heroImage.alt} sizes={`${CARD_WIDTH}px`} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
        <span className="absolute left-4 top-4 -translate-x-6 font-display text-5xl font-bold leading-none text-paper opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          {count}
        </span>
        <span className="absolute bottom-4 right-4 translate-x-6 text-sm font-semibold uppercase tracking-wide text-paper opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          Tours
        </span>
      </div>
      <p className="mt-2.5 text-sm font-medium text-paper">{category.title}</p>
      <p className="mt-0.5 text-xs text-paper/60">Collection</p>
    </Link>
  );
}

export function PopularToursMenu({
  categories,
  tours,
  topOffset,
  open,
  onNavigate,
}: {
  categories: Category[];
  tours: Tour[];
  topOffset: number;
  open: boolean;
  onNavigate: () => void;
}) {
  const [page, setPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [kick, setKick] = useState(0);
  const [kickSettling, setKickSettling] = useState(false);
  const dragStartX = useRef(0);
  const kickTimeoutRef = useRef<number | undefined>(undefined);

  // A brief same-direction "dart" applied to card images whenever the page
  // changes, then eased back to rest — so the parallax only shows while the
  // track is actually sliding, never as a permanent offset once it settles.
  function triggerKick(direction: 1 | -1) {
    window.clearTimeout(kickTimeoutRef.current);
    setKickSettling(false);
    setKick(-direction * PARALLAX_MAX);
    kickTimeoutRef.current = window.setTimeout(() => {
      setKickSettling(true);
      setKick(0);
    }, 160);
  }

  const popular = useMemo(() => {
    const bestsellers = tours.filter((t) => t.badges.includes("Bestseller"));
    const rest = tours
      .filter((t) => !t.badges.includes("Bestseller"))
      .sort((a, b) => b.rating - a.rating);
    return [...bestsellers, ...rest].slice(0, 9);
  }, [tours]);

  const collections = useMemo(
    () =>
      categories
        .map((c) => ({ category: c, count: tours.filter((t) => t.categorySlugs.includes(c.slug)).length }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 3),
    [categories, tours]
  );

  function primaryCategoryTitle(tour: Tour): string {
    const match = categories.find((c) => tour.categorySlugs.includes(c.slug));
    return match?.title ?? "Illyria Trails";
  }

  const cardCount = collections.length + popular.length;
  const maxPage = Math.max(0, Math.ceil(cardCount / CARDS_PER_PAGE) - 1);

  function goToPage(direction: 1 | -1) {
    setPage((p) => {
      const next = Math.min(maxPage, Math.max(0, p + direction));
      if (next !== p) triggerKick(direction);
      return next;
    });
  }

  function handlePointerDown(e: React.PointerEvent) {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  }
  function endDrag() {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset <= -DRAG_THRESHOLD && page < maxPage) {
      setPage((p) => p + 1);
      triggerKick(1);
    } else if (dragOffset >= DRAG_THRESHOLD && page > 0) {
      setPage((p) => p - 1);
      triggerKick(-1);
    }
    setDragOffset(0);
  }

  const trackX = -page * CARDS_PER_PAGE * STEP + dragOffset;
  const imageShift = isDragging ? parallaxOffset(dragOffset) : kick;
  const imageStyle: React.CSSProperties = {
    transform: `translateX(${imageShift}px)`,
    transition: isDragging
      ? "none"
      : `transform ${kickSettling ? 520 : 180}ms cubic-bezier(0.22,1,0.36,1)`,
  };

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
          <h2 className="font-display text-xl font-semibold text-paper">Popular Tours</h2>
          <Link
            href="/tours"
            onClick={onNavigate}
            className="mt-1 inline-flex items-center gap-1 text-sm text-paper/70 hover:text-paper"
          >
            See all popular tours
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <Link
            href={PROMO.href}
            onClick={onNavigate}
            className="group mt-8 block overflow-hidden rounded-xl border border-paper/10 bg-paper/5 hover:border-paper/20"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <PanImage src={PROMO.image} alt={PROMO.alt} sizes="260px" />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-paper">{PROMO.title}</p>
              <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-paper/60">
                {PROMO.cta} <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </Link>
        </div>

        <div className="relative min-w-0">
          <div className="overflow-hidden" style={{ width: TRACK_WIDTH, maxWidth: "100%" }}>
            <div
              className="flex gap-5 pb-1 select-none"
              style={{
                transform: `translateX(${trackX}px)`,
                transition: isDragging ? "none" : "transform 400ms cubic-bezier(0.22,1,0.36,1)",
                touchAction: "pan-y",
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onDragStart={(e) => e.preventDefault()}
            >
              {collections.map(({ category, count }) => (
                <CollectionCard
                  key={category.slug}
                  category={category}
                  count={count}
                  imageStyle={imageStyle}
                  onNavigate={onNavigate}
                />
              ))}
              {popular.map((tour) => (
                <Link
                  key={tour.slug}
                  href={`/tours/${tour.slug}`}
                  onClick={onNavigate}
                  className="group shrink-0"
                  style={{ width: CARD_WIDTH }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl" style={imageStyle}>
                    <PanImage src={tour.heroImage.src} alt={tour.heroImage.alt} sizes={`${CARD_WIDTH}px`} />
                    <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-medium text-paper">
                      {tour.duration}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm font-medium text-paper">{tour.title}</p>
                  <p className="mt-0.5 text-xs text-paper/60">{primaryCategoryTitle(tour)}</p>
                </Link>
              ))}
            </div>
          </div>

          {page > 0 && (
            <button
              type="button"
              onClick={() => goToPage(-1)}
              aria-label="Previous popular tours"
              className="absolute -left-4 top-[38%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-md hover:bg-paper/90 md:flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {page < maxPage && (
            <button
              type="button"
              onClick={() => goToPage(1)}
              aria-label="Next popular tours"
              className="absolute -right-4 top-[38%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-md hover:bg-paper/90 md:flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
