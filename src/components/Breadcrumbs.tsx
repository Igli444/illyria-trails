import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  const full = [{ name: "Home", url: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 py-4 text-sm sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(full)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-soft">
        {full.map((item, i) => (
          <li key={item.url} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === full.length - 1 ? (
              <span className="font-medium text-ink">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-ink">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
