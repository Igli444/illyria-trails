"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { cn } from "@/lib/utils";

export function CartIcon({ inverted = false }: { inverted?: boolean }) {
  const { items } = useCart();
  const count = items.length;

  return (
    <Link
      href="/cart"
      className={cn(
        "relative rounded-full p-2 transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
        inverted ? "text-paper hover:bg-paper/10" : "text-ink hover:bg-paper-dim"
      )}
      aria-label={`Cart (${count} items)`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 4h2l1.2 12.2a2 2 0 0 0 2 1.8h9.6a2 2 0 0 0 2-1.8L21 8H6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="21" r="1.4" fill="currentColor" />
        <circle cx="17.5" cy="21" r="1.4" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-fjord-500 px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
