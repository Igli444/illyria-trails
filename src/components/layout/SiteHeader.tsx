"use client";

import Link from "next/link";
import { useState } from "react";
import { Category } from "@/types/content";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "Tours", href: "/tours" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "About", href: "/about" },
];

export function SiteHeader({ brandName, categories }: { brandName: string; categories: Category[] }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            {brandName}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink hover:bg-paper-dim"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => setMegaOpen((v) => !v)}
            >
              Things to Do
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={cn("transition-transform", megaOpen && "rotate-180")}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {megaOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-paper p-4 shadow-xl shadow-ink/5">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/things-to-do/${c.slug}`}
                      className="rounded-xl px-4 py-3 hover:bg-paper-dim"
                      onClick={() => setMegaOpen(false)}
                    >
                      <span className="block text-sm font-semibold text-ink">{c.title}</span>
                      <span className="mt-0.5 block text-xs text-ink-soft line-clamp-1">{c.shortDescription}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink hover:bg-paper-dim"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/tours"
            className="rounded-full bg-fjord-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fjord-600"
          >
            Find a Tour
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden rounded-full p-2 text-ink hover:bg-paper-dim"
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

      {mobileOpen && (
        <div className="border-t border-line bg-paper px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
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
  );
}
