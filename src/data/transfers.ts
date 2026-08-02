import { FaqItem } from "@/types/content";

export interface TransferRoute {
  slug: string;
  destination: string;
  region: string;
  durationMinutes: number;
  priceEur: number;
  description: string;
}

// A single fixed product line (Illyria Trails' own airport shuttle), not
// editorial content — kept as a static module rather than a Sanity type.
export const transferRoutes: TransferRoute[] = [
  {
    slug: "tirana-city-center",
    destination: "Tirana City Center",
    region: "Tirana",
    durationMinutes: 25,
    priceEur: 12,
    description: "The most popular route — direct to Skanderbeg Square, with drop-offs at central hotels.",
  },
  {
    slug: "durres",
    destination: "Durrës",
    region: "Coast",
    durationMinutes: 45,
    priceEur: 18,
    description: "Albania's main port city and beach resort area, 45 minutes from the terminal.",
  },
  {
    slug: "shkoder",
    destination: "Shkodër",
    region: "North",
    durationMinutes: 95,
    priceEur: 28,
    description: "Gateway to the Accursed Mountains, Theth, and Lake Komani — ideal if you're heading north.",
  },
  {
    slug: "vlore-sarande",
    destination: "Vlorë / Sarandë (Riviera)",
    region: "Riviera",
    durationMinutes: 240,
    priceEur: 45,
    description: "Direct long-distance transfer to the Albanian Riviera, with a rest stop along the Llogara Pass.",
  },
];

export function getTransferRoute(slug: string): TransferRoute | undefined {
  return transferRoutes.find((r) => r.slug === slug);
}

export const transferFaqs: FaqItem[] = [
  {
    question: "Where do I meet the transfer at Tirana Airport?",
    answer:
      "Look for the Illyria Trails desk in the arrivals hall, just past customs. A driver holding a sign with your name will be waiting from 15 minutes after your flight's scheduled landing time.",
  },
  {
    question: "What if my flight is delayed?",
    answer:
      "We track flight arrival times, so your driver will already know if you're delayed — no need to contact us unless the delay is more than 3 hours.",
  },
  {
    question: "Is there a luggage allowance?",
    answer: "One large suitcase and one carry-on per traveler is included. Let us know in advance if you have extra sports or hiking gear.",
  },
  {
    question: "Can I book a return transfer?",
    answer:
      "Yes — add both an arrival and departure transfer to your cart, choosing the destination and time that matches each leg of your trip.",
  },
  {
    question: "Is the vehicle wheelchair accessible?",
    answer: "Wheelchair-accessible vehicles are available on the Tirana City Center and Durrës routes — mention this when you check out and we'll confirm by email.",
  },
];
