import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/types/content";
import { formatPrice } from "@/lib/utils";

export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-dim">
        <Image
          src={tour.heroImage.src}
          alt={tour.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-medium text-paper backdrop-blur">
          {tour.duration}
        </span>
        {tour.badges[0] && (
          <span className="absolute right-3 top-3 rounded-full bg-amber px-2.5 py-1 text-xs font-semibold text-ink">
            {tour.badges[0]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink">{tour.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{tour.shortDescription}</p>
        <div className="mt-3 flex items-center gap-1 text-xs text-ink-soft">
          <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" className="text-amber-dark">
            <path d="M12 2l2.9 6 6.6.8-4.8 4.6 1.2 6.5L12 16.7 6.1 19.9l1.2-6.5-4.8-4.6 6.6-.8z" fill="currentColor" />
          </svg>
          <span className="font-medium text-ink">{tour.rating}</span>
          <span>({tour.reviewCount.toLocaleString()})</span>
        </div>
        <div className="mt-3 flex items-end justify-between pt-2">
          <div>
            {tour.originalPrice && (
              <span className="mr-1.5 text-xs text-ink-soft line-through">
                {formatPrice(tour.originalPrice, tour.currency)}
              </span>
            )}
            <span className="text-lg font-semibold text-fjord-600">{formatPrice(tour.price, tour.currency)}</span>
            <span className="text-xs text-ink-soft"> / person</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
