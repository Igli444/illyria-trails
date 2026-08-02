"use client";

import Link from "next/link";
import { useState } from "react";
import { Tour } from "@/types/content";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import type { AvailabilityResponse } from "@/app/api/availability/route";

export function BookingWidget({ tour }: { tour: Tour }) {
  const { display } = useCurrency();
  const { addItem } = useCart();
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  async function checkAvailability(e: React.FormEvent) {
    e.preventDefault();
    if (!date) {
      setError("Choose a date to check availability.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    setAdded(false);
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourSlug: tour.slug, date, travelers }),
      });
      if (!res.ok) throw new Error("Could not check availability");
      const data: AvailabilityResponse = await res.json();
      setResult(data);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    addItem({
      type: "tour",
      slug: tour.slug,
      title: tour.title,
      date,
      travelers,
      unitPriceEur: tour.price,
      meta: tour.duration,
    });
    setAdded(true);
  }

  return (
    <div className="sticky top-24 rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-baseline gap-2">
        {tour.originalPrice && (
          <span className="text-sm text-ink-soft line-through">{display(tour.originalPrice)}</span>
        )}
        <span className="font-display text-2xl font-semibold text-fjord-600">{display(tour.price)}</span>
        <span className="text-sm text-ink-soft">/ person</span>
      </div>

      <form onSubmit={checkAvailability} className="mt-4 space-y-3">
        <div>
          <label htmlFor="booking-date" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          />
        </div>
        <div>
          <label htmlFor="booking-travelers" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Travelers
          </label>
          <input
            id="booking-travelers"
            type="number"
            min={1}
            max={20}
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-fjord-500 px-4 py-3 text-sm font-semibold text-white hover:bg-fjord-600 disabled:opacity-60"
        >
          {loading ? "Checking..." : "Check Availability"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 rounded-lg border border-line bg-paper-dim p-3 text-sm">
          {result.available ? (
            <>
              <p className="font-medium text-fjord-600">
                Available — {result.spotsRemaining} spot{result.spotsRemaining === 1 ? "" : "s"} left
              </p>
              <p className="mt-1 text-ink-soft">
                Total for {travelers} traveler{travelers === 1 ? "" : "s"}:{" "}
                <span className="font-semibold text-ink">{display(result.totalPrice)}</span>
              </p>
              {added ? (
                <p className="mt-3 flex items-center justify-between rounded-lg bg-fjord-50 px-3 py-2 text-sm font-medium text-fjord-600">
                  Added to cart
                  <Link href="/cart" className="underline hover:no-underline">
                    View cart &rarr;
                  </Link>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-3 w-full rounded-lg border border-fjord-500 px-4 py-2.5 text-sm font-semibold text-fjord-600 hover:bg-fjord-50"
                >
                  Add to Cart
                </button>
              )}
            </>
          ) : (
            <p className="font-medium text-amber-dark">
              Not enough spots for {travelers} traveler{travelers === 1 ? "" : "s"} on this date — try another date or fewer travelers.
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-ink-soft">Free cancellation up to 24 hours before the tour starts.</p>
    </div>
  );
}
