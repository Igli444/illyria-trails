import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { tours as seedTours } from "../../scripts/seed-data/tours";

vi.mock("@/sanity/client", () => ({
  client: { fetch: vi.fn() },
}));

async function mockedFetch(): Promise<Mock> {
  const { client } = await import("@/sanity/client");
  return client.fetch as unknown as Mock;
}

describe("getAllTours", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("maps real Sanity tour documents through untouched when client.fetch resolves a non-empty array", async () => {
    const fetch = await mockedFetch();
    const sanityDoc = {
      title: "Berat Old Town Walking Tour",
      slug: "berat-old-town-walking-tour",
      shortDescription: "A guided walk through Berat's 'town of a thousand windows,' castle included.",
      description: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Berat's old town climbs a hillside in tiers of white houses." }],
        },
      ],
      heroImage: { src: "/images/berat-old-town.svg", alt: "Berat old town", width: 1600, height: 900 },
      gallery: [],
      duration: "4 hours",
      difficulty: "Easy",
      price: 30,
      originalPrice: 38,
      currency: "EUR",
      badges: ["Bestseller"],
      categorySlugs: ["historic-old-towns"],
      rating: 4.8,
      reviewCount: 720,
      meetingPoint: "Berat old town square",
      itinerary: [{ title: "Old town streets", description: "Walk the riverside quarter's cobbled lanes." }],
      included: ["English-speaking local guide", "Castle entrance fee"],
      excluded: ["Transfer to Berat"],
      whatToBring: ["Comfortable walking shoes"],
      faqs: [{ question: "Is transfer from Tirana included?", answer: "No, this tour meets in Berat itself." }],
      seo: { metaTitle: "Berat Old Town Walking Tour | Illyria Trails", metaDescription: "Guided walk." },
    };
    fetch.mockResolvedValue([sanityDoc]);

    const { getAllTours } = await import("./tours");
    const tours = await getAllTours();

    expect(tours).toHaveLength(1);
    expect(tours[0].slug).toBe(sanityDoc.slug);
    expect(tours[0].title).toBe(sanityDoc.title);
    expect(tours[0].price).toBe(sanityDoc.price);
    expect(tours[0].originalPrice).toBe(sanityDoc.originalPrice);
    expect(tours[0].categorySlugs).toEqual(sanityDoc.categorySlugs);
    expect(tours[0].included).toEqual(sanityDoc.included);
    expect(tours[0].excluded).toEqual(sanityDoc.excluded);
    expect(tours[0].whatToBring).toEqual(sanityDoc.whatToBring);
    expect(tours[0].faqs).toEqual(sanityDoc.faqs);
    expect(tours[0].itinerary).toEqual(sanityDoc.itinerary);
    // Portable Text description is flattened to plain paragraph strings.
    expect(tours[0].description).toEqual(["Berat's old town climbs a hillside in tiers of white houses."]);
  });

  it("returns the real fallback tours (from scripts/seed-data/tours) when client.fetch resolves an empty array", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue([]);

    const { getAllTours } = await import("./tours");
    const tours = await getAllTours();

    expect(tours).toEqual(seedTours);
    expect(tours.length).toBeGreaterThan(0);
    expect(tours.some((t) => t.slug === "albanian-riviera-boat-day-trip")).toBe(true);
  });

  it("warns when serving the fallback tours list", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue([]);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { getAllTours } = await import("./tours");
    await getAllTours();

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe("getTourBySlug", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("maps a real Sanity tour document through untouched when client.fetch resolves a document", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue({
      title: "Berat Old Town Walking Tour",
      slug: "berat-old-town-walking-tour",
      shortDescription: "A guided walk.",
      description: [],
      heroImage: { src: "/images/berat-old-town.svg", alt: "Berat old town", width: 1600, height: 900 },
      gallery: [],
      duration: "4 hours",
      difficulty: "Easy",
      price: 30,
      originalPrice: null,
      currency: "EUR",
      badges: [],
      categorySlugs: [],
      rating: 4.8,
      reviewCount: 720,
      meetingPoint: "Berat old town square",
      itinerary: [],
      included: [],
      excluded: [],
      whatToBring: [],
      faqs: [],
      seo: null,
    });

    const { getTourBySlug } = await import("./tours");
    const tour = await getTourBySlug("berat-old-town-walking-tour");

    expect(tour?.slug).toBe("berat-old-town-walking-tour");
  });

  it("falls back to the real seed tour when Sanity is completely empty (not just missing this slug)", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null); // single-doc query: no document for this slug
    fetch.mockResolvedValueOnce([]); // getAllTours() fallback check: Sanity has nothing at all

    const { getTourBySlug } = await import("./tours");
    const tour = await getTourBySlug("albanian-riviera-boat-day-trip");

    expect(tour).toEqual(seedTours.find((t) => t.slug === "albanian-riviera-boat-day-trip"));
  });

  it("warns when falling back to a seed tour for an individual slug lookup", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null);
    fetch.mockResolvedValueOnce([]);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { getTourBySlug } = await import("./tours");
    await getTourBySlug("albanian-riviera-boat-day-trip");

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("returns undefined (does not invent data) when Sanity is empty and the slug doesn't exist in fallback either", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null);
    fetch.mockResolvedValueOnce([]);

    const { getTourBySlug } = await import("./tours");
    const tour = await getTourBySlug("this-slug-does-not-exist-anywhere");

    expect(tour).toBeUndefined();
  });

  it("returns undefined — NOT stale fallback content — when Sanity has real tours but this specific slug was deleted or renamed", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null); // single-doc query: this slug is genuinely gone
    fetch.mockResolvedValueOnce([
      // Sanity is NOT empty — it has other real (raw-shaped) tour docs,
      // just not this one.
      {
        title: "Some Other Real Tour",
        slug: "some-other-real-tour",
        shortDescription: "A different tour entirely.",
        description: [],
        heroImage: { src: "/images/other.svg", alt: "Other tour", width: 1600, height: 900 },
        gallery: [],
        duration: "3 hours",
        difficulty: "Easy",
        price: 20,
        originalPrice: null,
        currency: "EUR",
        badges: [],
        categorySlugs: [],
        rating: 4.5,
        reviewCount: 10,
        meetingPoint: "Somewhere",
        itinerary: [],
        included: [],
        excluded: [],
        whatToBring: [],
        faqs: [],
        seo: null,
      },
    ]);

    const { getTourBySlug } = await import("./tours");
    // "albanian-riviera-boat-day-trip" still exists in the fallback seed
    // data, but since Sanity is actively populated (just missing this one
    // slug), it must 404 rather than silently resurrect old seed content.
    const tour = await getTourBySlug("albanian-riviera-boat-day-trip");

    expect(tour).toBeUndefined();
  });
});
