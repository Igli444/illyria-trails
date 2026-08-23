import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { SupportRequestForm } from "@/components/SupportRequestForm";
import { getSiteSettings } from "@/data/site-settings";
import { transferFaqs } from "@/data/transfers";
import { faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Customer Support & FAQ",
  description:
    "Get in touch with Illyria Trails and find answers to common questions about booking, cancellations, weather policy, group sizes, accessibility, and airport transfers.",
  alternates: { canonical: "/customer-support-and-faq" },
};

const contactCards = [
  {
    label: "Hours",
    icon: (
      <path
        d="M12 8v4l2.5 2.5M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Phone",
    icon: (
      <path
        d="M4 5c0-1.1.9-2 2-2h1.5a1 1 0 0 1 1 .8l1 4a1 1 0 0 1-.5 1.1L7.5 10c1 2.4 3.1 4.5 5.5 5.5l1.1-1.5a1 1 0 0 1 1.1-.5l4 1a1 1 0 0 1 .8 1V18a2 2 0 0 1-2 2h-1C10.4 20 4 13.6 4 6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Email",
    icon: (
      <path
        d="M4 6h16v12H4zM4 6l8 7 8-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Address",
    icon: (
      <path
        d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
];

export default async function FaqPage() {
  const settings = await getSiteSettings();
  const faqCategories = settings.faqCategories;

  const allFaqItems = [...faqCategories.flatMap((c) => c.items), ...transferFaqs];

  return (
    <>
      <JsonLd data={faqPageSchema(allFaqItems)} />
      <Breadcrumbs items={[{ name: "Customer Support & FAQ", url: "/customer-support-and-faq" }]} />

      <section className="bg-fjord-900 text-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Customer Support &amp; FAQ</h1>
          <p className="mt-4 max-w-2xl text-paper/80">
            From your first booking to the ride back to the airport, we&apos;re here to make travel across Albania
            feel easy. Browse answers below, or reach the Illyria Trails team directly and we&apos;ll get back to
            you within one business day.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="-mt-8 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { ...contactCards[0], value: settings.supportHours },
            { ...contactCards[1], value: settings.supportPhone, href: `tel:${settings.supportPhone.replace(/\s+/g, "")}` },
            { ...contactCards[2], value: settings.supportEmail, href: `mailto:${settings.supportEmail}` },
            { ...contactCards[3], value: settings.supportAddress },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-line bg-white p-6">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="text-fjord-600">
                {card.icon}
              </svg>
              <h2 className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">{card.label}</h2>
              {"href" in card && card.href ? (
                <a href={card.href} className="mt-1 block text-sm font-medium text-fjord-600 hover:text-fjord-900">
                  {card.value}
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-ink">{card.value}</p>
              )}
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Send Us a Request</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Have a specific question about a booking, a pickup, or anything else? Fill out the form below and our
            team will follow up by email.
          </p>
          <div className="mt-6 max-w-2xl">
            <SupportRequestForm />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            FAQ &mdash; Everything You Need to Know
          </h2>
          <div className="mt-6 max-w-3xl space-y-10">
            {faqCategories.map((category) => (
              <div key={category.title}>
                <h3 className="font-display text-xl font-semibold text-ink">{category.title}</h3>
                <div className="mt-4">
                  <FaqAccordion items={category.items} />
                </div>
              </div>
            ))}
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">Airport Transfer</h3>
              <div className="mt-4">
                <FaqAccordion items={transferFaqs} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
