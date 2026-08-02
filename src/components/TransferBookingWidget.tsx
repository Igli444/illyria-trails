"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { transferRoutes } from "@/data/transfers";

export function TransferBookingWidget() {
  const { display } = useCurrency();
  const { addItem } = useCart();
  const [routeSlug, setRouteSlug] = useState(transferRoutes[0].slug);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [added, setAdded] = useState(false);

  const route = transferRoutes.find((r) => r.slug === routeSlug) ?? transferRoutes[0];
  const total = route.priceEur * travelers;

  function handleAddToCart(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time) return;
    addItem({
      type: "transfer",
      slug: `airport-transfer-${route.slug}`,
      title: `Airport Transfer: Tirana Airport → ${route.destination}`,
      date: `${date} ${time}`,
      travelers,
      unitPriceEur: route.priceEur,
      meta: `${route.durationMinutes} min`,
    });
    setAdded(true);
  }

  return (
    <div className="sticky top-24 rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold text-fjord-600">{display(route.priceEur)}</span>
        <span className="text-sm text-ink-soft">/ person</span>
      </div>

      <form onSubmit={handleAddToCart} className="mt-4 space-y-3">
        <div>
          <label htmlFor="transfer-route" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            To
          </label>
          <select
            id="transfer-route"
            value={routeSlug}
            onChange={(e) => {
              setRouteSlug(e.target.value);
              setAdded(false);
            }}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          >
            {transferRoutes.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.destination} ({r.durationMinutes >= 60 ? `${(r.durationMinutes / 60).toFixed(1)}h` : `${r.durationMinutes} min`})
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="transfer-date" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Date
            </label>
            <input
              id="transfer-date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setAdded(false);
              }}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
            />
          </div>
          <div>
            <label htmlFor="transfer-time" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Time
            </label>
            <input
              id="transfer-time"
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                setAdded(false);
              }}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="transfer-travelers" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Travelers
          </label>
          <input
            id="transfer-travelers"
            type="number"
            min={1}
            max={20}
            value={travelers}
            onChange={(e) => {
              setTravelers(Number(e.target.value));
              setAdded(false);
            }}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          />
        </div>

        <p className="text-sm text-ink-soft">
          Total for {travelers} traveler{travelers === 1 ? "" : "s"}:{" "}
          <span className="font-semibold text-ink">{display(total)}</span>
        </p>

        {added ? (
          <p className="flex items-center justify-between rounded-lg bg-fjord-50 px-3 py-2 text-sm font-medium text-fjord-600">
            Added to cart
            <Link href="/cart" className="underline hover:no-underline">
              View cart &rarr;
            </Link>
          </p>
        ) : (
          <button
            type="submit"
            className="w-full rounded-lg bg-fjord-500 px-4 py-3 text-sm font-semibold text-white hover:bg-fjord-600"
          >
            Add to Cart
          </button>
        )}
      </form>

      <p className="mt-3 text-xs text-ink-soft">Free cancellation up to 24 hours before pick-up.</p>
    </div>
  );
}
