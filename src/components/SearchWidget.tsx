"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchWidget() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(2);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    params.set("travelers", String(travelers));
    router.push(`/tours?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-xl shadow-ink/10 backdrop-blur sm:flex-row sm:items-end"
      aria-label="Search tours"
    >
      <div className="flex-1">
        <label htmlFor="search-date" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
          When
        </label>
        <input
          id="search-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-fjord-500"
        />
      </div>
      <div className="flex-1">
        <label htmlFor="search-travelers" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Travelers
        </label>
        <input
          id="search-travelers"
          type="number"
          min={1}
          max={20}
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-fjord-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-fjord-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-fjord-600 sm:self-end"
      >
        Search Tours
      </button>
    </form>
  );
}
