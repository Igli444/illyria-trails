import { SiteSettings } from "@/types/content";

export function TrustBadges({ trustBadges }: { trustBadges: SiteSettings["trustBadges"] }) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {trustBadges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3">
          <div className="flex text-amber-dark">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l2.9 6 6.6.8-4.8 4.6 1.2 6.5L12 16.7 6.1 19.9l1.2-6.5-4.8-4.6 6.6-.8z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">{badge.rating} / 5</p>
            <p className="text-xs text-ink-soft">
              {badge.label} &middot; {badge.reviewCount.toLocaleString()} reviews
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
