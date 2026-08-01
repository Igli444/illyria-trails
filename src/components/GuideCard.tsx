import Image from "next/image";
import Link from "next/link";
import { Guide } from "@/types/content";

export function GuideCard({ guide }: { guide: Guide }) {
  const date = new Date(guide.publishDate);
  return (
    <Link
      href={`/inspiration/${guide.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-dim">
        <Image
          src={guide.coverImage.src}
          alt={guide.coverImage.alt}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <time dateTime={guide.publishDate} className="text-xs font-medium uppercase tracking-wide text-fjord-500">
          {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </time>
        <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-ink">{guide.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{guide.excerpt}</p>
      </div>
    </Link>
  );
}
