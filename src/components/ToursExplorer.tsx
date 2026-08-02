"use client";

import { useMemo, useState } from "react";
import { TourCard } from "@/components/TourCard";
import { Category, Tour } from "@/types/content";

const difficulties = ["All", "Easy", "Moderate", "Challenging"] as const;
type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

export function ToursExplorer({
  tours,
  categories,
  initialQuery = "",
}: {
  tours: Tour[];
  categories: Category[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<(typeof difficulties)[number]>("All");
  const [sort, setSort] = useState<SortKey>("recommended");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = tours.filter((tour) => {
      const matchesCategory = categoryFilter === "All" || tour.categorySlugs.includes(categoryFilter);
      const matchesDifficulty = difficultyFilter === "All" || tour.difficulty === difficultyFilter;
      const matchesQuery =
        !q || tour.title.toLowerCase().includes(q) || tour.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesDifficulty && matchesQuery;
    });

    result = [...result];
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [tours, categoryFilter, difficultyFilter, sort, query]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 rounded-2xl border border-line bg-white p-4">
        <div className="min-w-[180px] flex-1">
          <label htmlFor="filter-query" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Search
          </label>
          <input
            id="filter-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tours..."
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-fjord-500"
          />
        </div>
        <div>
          <label htmlFor="filter-category" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Category
          </label>
          <select
            id="filter-category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="mt-1 rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-fjord-500"
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-difficulty" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Difficulty
          </label>
          <select
            id="filter-difficulty"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as (typeof difficulties)[number])}
            className="mt-1 rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-fjord-500"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-sort" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Sort by
          </label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="mt-1 rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-fjord-500"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        {filtered.length} tour{filtered.length === 1 ? "" : "s"} found
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tour) => (
          <TourCard key={tour.slug} tour={tour} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-soft">No tours match those filters — try widening your search.</p>
      )}
    </div>
  );
}
