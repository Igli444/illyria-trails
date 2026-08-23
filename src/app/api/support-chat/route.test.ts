import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import type { SiteSettings, Tour } from "@/types/content";

const fakeSettings: SiteSettings = {
  brandName: "Illyria Trails",
  tagline: "Original adventures across Albania's coast and highlands.",
  description: "Illyria Trails runs small-group tours across Albania.",
  domain: "illyriatrails.example",
  supportEmail: "hello@illyriatrails.example",
  supportPhone: "+355 69 555 0148",
  supportHours: "Daily 08:00–20:00 (Europe/Tirane)",
  supportAddress: "Rruga e Kavajës, Tirana 1001, Albania",
  socials: [],
  certifications: [],
  trustBadges: [],
  footerColumns: [],
  // Deliberately mirrors the real corpus's shape rather than a minimal 2-item
  // set: "book"/"booking" shows up incidentally across several unrelated
  // items (as it does on the real site), while "cancel" only shows up where
  // it's actually the topic. That distribution is what IDF weighting needs
  // to correctly prefer the cancellation FAQ for a "cancel my booking?"
  // query — with only one FAQ per topic, both terms would be equally rare
  // and the match would be an arbitrary tie.
  faqCategories: [
    {
      title: "Tour Booking & Modifications",
      items: [
        {
          question: "How do I book a tour?",
          answer: "Choose a tour, pick a date, and check availability on the tour page.",
        },
        {
          question: "Can I change my tour date after booking?",
          answer: "Yes — email or call us with your booking reference and the new date.",
        },
        {
          question: "Do you offer private or custom tours?",
          answer: "Not currently — all tours run as small scheduled group bookings.",
        },
      ],
    },
    {
      title: "Policies",
      items: [
        {
          question: "What is your cancellation policy?",
          answer: "Free cancellation up to 24 hours before the tour starts.",
        },
      ],
    },
  ],
};

const fakeTours: Tour[] = [
  {
    slug: "berat-old-town-walking-tour",
    title: "Berat Old Town Walking Tour",
    shortDescription: "A guided walk through Berat's old town.",
    description: [],
    heroImage: { src: "/img.svg", alt: "", width: 10, height: 10 },
    gallery: [],
    duration: "4 hours",
    difficulty: "Easy",
    price: 30,
    currency: "EUR",
    badges: [],
    categorySlugs: [],
    rating: 4.8,
    reviewCount: 720,
    meetingPoint: "Berat main square",
    itinerary: [],
    included: [],
    excluded: [],
    whatToBring: [],
    faqs: [],
    seo: { metaTitle: "Berat Old Town Walking Tour", metaDescription: "..." },
  },
];

vi.mock("@/data/site-settings", () => ({
  getSiteSettings: vi.fn().mockResolvedValue(fakeSettings),
}));

vi.mock("@/data/tours", () => ({
  getAllTours: vi.fn().mockResolvedValue(fakeTours),
}));

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/support-chat", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("POST /api/support-chat", () => {
  it("matches a message against site FAQ content", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "How do I book a tour?" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.reply).toContain("Choose a tour");
  });

  it("matches a paraphrased question via loose stemming", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "What's the cancellation policy like?" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.reply).toContain("Free cancellation");
  });

  it("matches a short, low-token paraphrase (single strong overlap)", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "Can I cancel my booking?" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.reply).toContain("Free cancellation");
  });

  it("answers a greeting without touching the FAQ list", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "Hello there" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.reply).toContain(fakeSettings.supportEmail);
  });

  it("answers a contact question with the support email", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "What's your contact email?" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.reply).toContain(fakeSettings.supportEmail);
    expect(json.reply).toContain(fakeSettings.supportPhone);
  });

  it("lists tours when asked what's offered", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "What tours do you offer?" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.reply).toContain("Berat Old Town Walking Tour");
  });

  it("falls back to a contact deflection for an unmatched question", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "Do you sell branded socks?" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.reply).toContain(fakeSettings.supportEmail);
    expect(json.reply).toContain("don't have a confident answer");
  });

  it("returns 400 with zod error shape for an empty message", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
    expect(json.error.fieldErrors).toBeDefined();
  });

  it("returns 400 when message exceeds 2000 characters", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest({ message: "a".repeat(2001) }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });

  it("returns 400 when history contains an invalid role", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      makeRequest({
        message: "Hello",
        history: [{ role: "system", content: "not allowed" }],
      }),
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });
});
