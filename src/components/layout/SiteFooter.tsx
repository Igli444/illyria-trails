import Link from "next/link";
import { SiteSettings } from "@/types/content";
import { NewsletterForm } from "@/components/NewsletterForm";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-2xl font-semibold">{settings.brandName}</p>
            <p className="mt-3 max-w-sm text-sm text-paper/70">{settings.description}</p>
            <div className="mt-6 max-w-sm">
              <NewsletterForm variant="dark" brandName={settings.brandName} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {settings.footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-paper">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-paper/70 hover:text-paper">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-paper/10 pt-8 text-xs text-paper/60">
          {settings.certifications.map((cert) => (
            <span key={cert} className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
                <path
                  d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3l-4.8 2.6.9-5.4-3.9-3.8 5.4-.8L12 2z"
                  fill="currentColor"
                />
              </svg>
              {cert}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/60">
            &copy; {year} {settings.brandName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {settings.socials.map((s) => (
              <a key={s.label} href={s.href} className="text-xs text-paper/60 hover:text-paper">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
