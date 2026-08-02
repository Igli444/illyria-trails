"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";

export default function CartPage() {
  const { items, totalEur, removeItem } = useCart();
  const { display } = useCurrency();

  return (
    <>
      <Breadcrumbs items={[{ name: "Cart", url: "/cart" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-line bg-white p-8 text-center">
            <p className="text-ink-soft">Your cart is empty.</p>
            <Link
              href="/tours"
              className="mt-4 inline-block rounded-full bg-fjord-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fjord-600"
            >
              Browse Tours
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-fjord-500">
                      {item.type === "tour" ? "Tour" : "Airport Transfer"}
                    </p>
                    <p className="mt-1 font-medium text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">
                      {item.date} &middot; {item.travelers} traveler{item.travelers === 1 ? "" : "s"}
                      {item.meta ? ` · ${item.meta}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="font-semibold text-ink">{display(item.unitPriceEur * item.travelers)}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs font-medium text-ink-soft underline hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-line bg-paper-dim p-5">
              <span className="font-medium text-ink">Total</span>
              <span className="font-display text-xl font-semibold text-ink">{display(totalEur)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-fjord-500 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-fjord-600"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </>
  );
}
