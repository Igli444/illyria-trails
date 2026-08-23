"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Category, Guide, Tour } from "@/types/content";
import { SubCategory } from "@/data/categories";
import { cn } from "@/lib/utils";
import { CategoryMegaMenu } from "@/components/layout/CategoryMegaMenu";
import { PopularToursMenu } from "@/components/layout/PopularToursMenu";
import { CurrencySelector } from "@/components/CurrencySelector";
import { HeaderSearch } from "@/components/HeaderSearch";
import { CartIcon } from "@/components/CartIcon";

const primaryNav = [
  { label: "Tours", href: "/tours" },
  { label: "Airport Transfer", href: "/airport-transfer" },
  { label: "Attractions", href: "/attractions" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "About", href: "/about" },
];

export function SiteHeader({
  brandName,
  categories,
  subCategories,
  tours,
  guides,
}: {
  brandName: string;
  categories: Category[];
  subCategories: SubCategory[];
  tours: Tour[];
  guides: Guide[];
}) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [popularOpen, setPopularOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const anyMenuOpen = megaOpen || popularOpen;
  const navRef = useRef<HTMLElement>(null);

  // The header's dark theming and the dropdown panel stagger — header leads
  // on open, panel leads on close — but as a single CSS timeline driven by
  // one `anyMenuOpen` flip, not a JS-mediated two-phase state machine. A
  // JS setTimeout in between forces an extra React commit partway through,
  // which is exactly what read as two separate motions instead of one. Pure
  // `transition-delay`, applied conditionally by direction, lets the browser
  // schedule both animations in the same pass. See the curtain and the
  // panels' own `open` prop usage below for the actual delay values.
  const curtainOpen = anyMenuOpen;

  useEffect(() => {
    if (!anyMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [anyMenuOpen]);

  // Menus open only on click, so they need their own close triggers: a click
  // outside the nav, or Escape.
  useEffect(() => {
    if (!anyMenuOpen) return;

    function handlePointerDown(e: MouseEvent) {
      const target = e.target as Node;
      // The mega-menu panels are portaled to <body> (so their z-index isn't
      // trapped inside header's own stacking context), so "inside the nav"
      // alone isn't enough — also allow clicks landing on a portaled panel.
      const insideNav = navRef.current?.contains(target);
      const insidePanel = target instanceof Element && target.closest("[data-mega-menu]");
      if (!insideNav && !insidePanel) {
        setPopularOpen(false);
        setMegaOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPopularOpen(false);
        setMegaOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anyMenuOpen]);

  // Measured (not guessed) so the mega-menus always start exactly at the
  // header's real bottom edge, however tall the header ends up being.
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // A synchronous measurement right after layout, so the mega-menus have a
  // correct offset on the very first paint — ResizeObserver's own initial
  // callback is async and not guaranteed to land before that first paint.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (el) setHeaderHeight(el.getBoundingClientRect().height);
  }, []);

  // ResizeObserver only needs to catch *later* changes (nav wrapping,
  // window resize, font load reflow) — the initial value comes from above.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setHeaderHeight(entries[0].contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navItemClass = cn(
    "flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium xl:px-4 transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
    curtainOpen ? "text-paper hover:bg-paper/10" : "text-ink hover:bg-paper-dim"
  );

  return (
    <>
      {/* `backdrop-blur` lives on this decorative layer, not on <header> itself —
          a filter on the header would create a new containing block for its
          `position: fixed` mega-menu descendants, breaking their viewport-relative sizing. */}
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 relative border-b transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          curtainOpen ? "border-transparent" : "border-line"
        )}
      >
        {/* Base layer: the header's permanent light backdrop, always present
            behind scrolled content — unrelated to menu state. */}
        <div
          className="absolute inset-0 -z-10 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80"
          aria-hidden="true"
        />

        {/* The curtain: one solid, constant-colored surface that grows by
            *size* (never by color) to cover the utility bar, the nav row's
            own backdrop, and the promo bar all at once — a single geometric
            sweep from the header's real height down to 0. No element here
            ever fades a color, so there's nothing for two independently-
            animating colors to blend into a glitch. The nav row sits above
            this layer via z-index (with a transparent background of its
            own), so it's simply whatever is currently behind it — this
            curtain when open, the permanent light base layer when closed —
            never covered, never touched directly. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-0 overflow-hidden bg-fjord-900 transition-[height] duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{
            height: curtainOpen ? headerHeight : 0,
            // Leads on open (no delay); on close it waits for the panel's
            // own close transition to mostly finish first.
            transitionDelay: anyMenuOpen ? "0ms" : "140ms",
          }}
        />

        <div className="hidden border-b border-line lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Link
                href="/my-booking"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
                aria-hidden={curtainOpen}
                tabIndex={curtainOpen ? -1 : undefined}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20 8a2 2 0 0 0 2-2V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2a2 2 0 0 1 0 4v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a2 2 0 0 1 0-4z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                My Booking
              </Link>
              <Link
                href="/customer-support-and-faq"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
                aria-hidden={curtainOpen}
                tabIndex={curtainOpen ? -1 : undefined}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.85.503 3.583 1.379 5.07L2.5 21.5l4.43-.879A9.955 9.955 0 0 0 12 22z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M9 10h.01M12 10h.01M15 10h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Customer Support &amp; FAQ
              </Link>
            </div>
            <CurrencySelector hidden={curtainOpen} />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                "font-display text-xl font-semibold tracking-tight transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
                curtainOpen ? "text-paper" : "text-ink"
              )}
            >
              {brandName}
            </span>
          </Link>

          <nav ref={navRef} className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Primary">
            <div className="relative pb-[17px] -mb-[17px]">
              <button
                type="button"
                className={navItemClass}
                aria-expanded={popularOpen}
                aria-haspopup="true"
                onClick={() => {
                  setPopularOpen((v) => !v);
                  setMegaOpen(false);
                }}
              >
                Popular Tours
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={cn("shrink-0 transition-transform", popularOpen && "rotate-180")}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {headerHeight > 0 && (
                <PopularToursMenu
                  categories={categories}
                  tours={tours}
                  topOffset={headerHeight}
                  open={popularOpen}
                  onNavigate={() => setPopularOpen(false)}
                />
              )}
            </div>

            <div className="relative pb-[17px] -mb-[17px]">
              <button
                type="button"
                className={navItemClass}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onClick={() => {
                  setMegaOpen((v) => !v);
                  setPopularOpen(false);
                }}
              >
                Things to Do
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={cn("shrink-0 transition-transform", megaOpen && "rotate-180")}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {headerHeight > 0 && (
                <CategoryMegaMenu
                  categories={categories}
                  subCategories={subCategories}
                  tours={tours}
                  guides={guides}
                  topOffset={headerHeight}
                  open={megaOpen}
                  onNavigate={() => setMegaOpen(false)}
                />
              )}
            </div>

            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className={navItemClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <HeaderSearch tours={tours} inverted={curtainOpen} />

          <div className="hidden items-center gap-1 lg:flex">
            <CartIcon inverted={curtainOpen} />
          </div>

          <button
            type="button"
            className={cn(
              "lg:hidden rounded-full p-2 transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
              curtainOpen ? "text-paper hover:bg-paper/10" : "text-ink hover:bg-paper-dim"
            )}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <Link
          href="/airport-transfer"
          className="block border-t border-line bg-fjord-50 px-4 py-2.5 text-center text-sm font-medium text-fjord-900 hover:bg-fjord-100 sm:px-6 lg:px-8"
          aria-hidden={curtainOpen}
          tabIndex={curtainOpen ? -1 : undefined}
        >
          New: book your Tirana Airport Transfer online <span aria-hidden="true">&rarr;</span>
        </Link>

        {mobileOpen && (
          <div className="border-t border-line bg-paper px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Currency</span>
                <CurrencySelector />
              </div>
              <Link href="/my-booking" className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-paper-dim" onClick={() => setMobileOpen(false)}>
                My Booking
              </Link>
              <Link href="/cart" className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-paper-dim" onClick={() => setMobileOpen(false)}>
                Cart
              </Link>
              <Link href="/customer-support-and-faq" className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-paper-dim" onClick={() => setMobileOpen(false)}>
                Customer Support &amp; FAQ
              </Link>
              <div className="my-2 h-px bg-line" />
              <Link href="/tours" className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-paper-dim" onClick={() => setMobileOpen(false)}>
                All Tours
              </Link>
              <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">Things to Do</p>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/things-to-do/${c.slug}`}
                  className="rounded-lg px-3 py-2 text-sm text-ink hover:bg-paper-dim"
                  onClick={() => setMobileOpen(false)}
                >
                  {c.title}
                </Link>
              ))}
              <div className="my-2 h-px bg-line" />
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-paper-dim"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
