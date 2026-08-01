import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { getSiteSettings } from "@/data/site-settings";
import { faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Customer Support & FAQ",
  description:
    "Answers to common questions about booking, cancellations, weather policy, group sizes, and accessibility for Illyria Trails tours.",
  alternates: { canonical: "/customer-support-and-faq" },
};

const generalFaqs = [
  {
    question: "How do I book a tour?",
    answer:
      "Choose a tour, pick a date and traveler count, and check availability directly on the tour page. You'll receive a confirmation email with your meeting point and any last-minute updates.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Free cancellation up to 24 hours before the tour starts. Cancellations inside that window are non-refundable, except where we cancel the tour for weather or safety reasons.",
  },
  {
    question: "What happens if a tour is cancelled for weather?",
    answer:
      "You'll be offered a free rebooking on another available date, or a full refund if no suitable date works for your trip.",
  },
  {
    question: "What is the maximum group size?",
    answer:
      "Our tours run in small groups — typically under 20 travelers, and often far fewer on the Accursed Mountains treks where trail conditions limit group size.",
  },
  {
    question: "Are your tours accessible for travelers with mobility needs?",
    answer:
      "It depends on the tour. Boat trips and old-town walking tours are generally accessible; Accursed Mountains hikes involve steep, uneven terrain that may not be suitable for all mobility levels. Contact us before booking if you have specific questions.",
  },
  {
    question: "Do you offer private or custom tours?",
    answer:
      "Not currently — all tours run as small scheduled groups. If demand changes, we'll list private options here first.",
  },
];

export default async function FaqPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd data={faqPageSchema(generalFaqs)} />
      <Breadcrumbs items={[{ name: "Customer Support & FAQ", url: "/customer-support-and-faq" }]} />

      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Customer Support &amp; FAQ</h1>
        <p className="mt-2 text-ink-soft">
          Can&apos;t find your answer here? Email{" "}
          <a href={`mailto:${settings.supportEmail}`} className="font-medium text-fjord-600 hover:text-fjord-900">
            {settings.supportEmail}
          </a>{" "}
          or call {settings.supportPhone}.
        </p>
        <div className="mt-8">
          <FaqAccordion items={generalFaqs} />
        </div>
      </div>
    </>
  );
}
