import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/content";

export function CategoryCard({ category, href }: { category: Category; href: string }) {
  return (
    <Link
      href={href}
      className="group relative flex aspect-[16/10] items-end overflow-hidden rounded-2xl"
    >
      <Image
        src={category.heroImage.src}
        alt={category.heroImage.alt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="relative p-5">
        <h3 className="font-display text-lg font-semibold text-paper">{category.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-paper/80">{category.shortDescription}</p>
      </div>
    </Link>
  );
}
