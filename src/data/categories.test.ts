import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { categories as seedCategories, subCategories as seedSubCategories } from "../../scripts/seed-data/categories";

vi.mock("@/sanity/client", () => ({
  client: { fetch: vi.fn() },
}));

async function mockedFetch(): Promise<Mock> {
  const { client } = await import("@/sanity/client");
  return client.fetch as unknown as Mock;
}

describe("getAllCategories", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("maps real Sanity category documents through untouched when client.fetch resolves a non-empty array", async () => {
    const fetch = await mockedFetch();
    const sanityDoc = {
      title: "Accursed Mountains",
      slug: "accursed-mountains",
      shortDescription: "Alpine treks through Theth and Valbona, on foot or by day hike.",
      introCopy: [
        {
          _type: "block",
          children: [{ _type: "span", text: "The Accursed Mountains rise sharply along Albania's northern border." }],
        },
      ],
      heroImage: { src: "/images/accursed-mountains.svg", alt: "Accursed Mountains", width: 1600, height: 900 },
      keywords: ["Theth hike", "Valbona trek", "Accursed Mountains Albania"],
      seo: { metaTitle: "Accursed Mountains Hiking Tours", metaDescription: "Guided treks." },
      parentSlug: null,
    };
    fetch.mockResolvedValue([sanityDoc]);

    const { getAllCategories } = await import("./categories");
    const categories = await getAllCategories();

    expect(categories).toHaveLength(1);
    expect(categories[0].slug).toBe(sanityDoc.slug);
    expect(categories[0].title).toBe(sanityDoc.title);
    expect(categories[0].keywords).toEqual(sanityDoc.keywords);
    expect(categories[0].introCopy).toEqual(["The Accursed Mountains rise sharply along Albania's northern border."]);
  });

  it("returns the real fallback categories (from scripts/seed-data/categories) when client.fetch resolves an empty array", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue([]);

    const { getAllCategories } = await import("./categories");
    const categories = await getAllCategories();

    expect(categories).toEqual(seedCategories);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories.some((c) => c.slug === "accursed-mountains")).toBe(true);
  });

  it("warns when serving the fallback categories list", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue([]);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { getAllCategories } = await import("./categories");
    await getAllCategories();

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe("getCategoryBySlug", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("maps a real Sanity category document through untouched when client.fetch resolves a document", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue({
      title: "Accursed Mountains",
      slug: "accursed-mountains",
      shortDescription: "Alpine treks.",
      introCopy: [],
      heroImage: { src: "/images/accursed-mountains.svg", alt: "Accursed Mountains", width: 1600, height: 900 },
      keywords: [],
      seo: null,
      parentSlug: null,
    });

    const { getCategoryBySlug } = await import("./categories");
    const category = await getCategoryBySlug("accursed-mountains");

    expect(category?.slug).toBe("accursed-mountains");
  });

  it("falls back to the real seed category when Sanity is completely empty (not just missing this slug)", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null); // single-doc query: no document for this slug
    fetch.mockResolvedValueOnce([]); // getAllCategories() fallback check: Sanity has nothing at all

    const { getCategoryBySlug } = await import("./categories");
    const category = await getCategoryBySlug("accursed-mountains");

    expect(category).toEqual(seedCategories.find((c) => c.slug === "accursed-mountains"));
  });

  it("warns when falling back to a seed category for an individual slug lookup", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null);
    fetch.mockResolvedValueOnce([]);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { getCategoryBySlug } = await import("./categories");
    await getCategoryBySlug("accursed-mountains");

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("returns undefined (does not invent data) when Sanity is empty and the slug doesn't exist in fallback either", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null);
    fetch.mockResolvedValueOnce([]);

    const { getCategoryBySlug } = await import("./categories");
    const category = await getCategoryBySlug("this-slug-does-not-exist-anywhere");

    expect(category).toBeUndefined();
  });

  it("returns undefined — NOT stale fallback content — when Sanity has real categories but this specific slug was deleted or renamed", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null); // single-doc query: this slug is genuinely gone
    fetch.mockResolvedValueOnce([
      // Sanity is NOT empty — it has other real (raw-shaped) category docs.
      {
        title: "Some Other Real Category",
        slug: "some-other-real-category",
        shortDescription: "A different category entirely.",
        introCopy: [],
        heroImage: { src: "/images/other.svg", alt: "Other category", width: 1600, height: 900 },
        keywords: [],
        seo: null,
        parentSlug: null,
      },
    ]);

    const { getCategoryBySlug } = await import("./categories");
    // "accursed-mountains" still exists in the fallback seed data, but since
    // Sanity is actively populated (just missing this one slug), it must
    // 404 rather than silently resurrect old seed content.
    const category = await getCategoryBySlug("accursed-mountains");

    expect(category).toBeUndefined();
  });
});

describe("getAllSubCategories", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("maps real Sanity sub-category documents through untouched when client.fetch resolves a non-empty array", async () => {
    const fetch = await mockedFetch();
    const sanityDoc = {
      title: "Theth Day Hikes",
      slug: "theth-day-hikes",
      shortDescription: "Waterfall and Blue Eye pool hikes around Theth village, no overnight required.",
      introCopy: [],
      heroImage: { src: "/images/blue-eye-spring.svg", alt: "Theth day hikes", width: 1600, height: 900 },
      keywords: ["Theth waterfall hike", "Theth Blue Eye", "Theth day hike"],
      seo: { metaTitle: "Theth Day Hikes", metaDescription: "Half-day hikes around Theth village." },
      parentSlug: "accursed-mountains",
    };
    fetch.mockResolvedValue([sanityDoc]);

    const { getAllSubCategories } = await import("./categories");
    const subCategories = await getAllSubCategories();

    expect(subCategories).toHaveLength(1);
    expect(subCategories[0].slug).toBe(sanityDoc.slug);
    expect(subCategories[0].parentSlug).toBe(sanityDoc.parentSlug);
    expect(subCategories[0].keywords).toEqual(sanityDoc.keywords);
  });

  it("returns the real fallback sub-categories (from scripts/seed-data/categories) when client.fetch resolves an empty array", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue([]);

    const { getAllSubCategories } = await import("./categories");
    const subCategories = await getAllSubCategories();

    expect(subCategories).toEqual(seedSubCategories);
    expect(subCategories.length).toBeGreaterThan(0);
    expect(subCategories.some((s) => s.slug === "theth-day-hikes")).toBe(true);
  });

  it("warns when serving the fallback sub-categories list", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue([]);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { getAllSubCategories } = await import("./categories");
    await getAllSubCategories();

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe("getSubCategory", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("maps a real Sanity sub-category document through untouched when client.fetch resolves a document", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue({
      title: "Theth to Valbona Trek",
      slug: "theth-valbona-trek",
      shortDescription: "The classic two-day crossing.",
      introCopy: [],
      heroImage: { src: "/images/accursed-mountains.svg", alt: "Theth to Valbona", width: 1600, height: 900 },
      keywords: [],
      seo: null,
      parentSlug: "accursed-mountains",
    });

    const { getSubCategory } = await import("./categories");
    const subCategory = await getSubCategory("accursed-mountains", "theth-valbona-trek");

    expect(subCategory?.slug).toBe("theth-valbona-trek");
  });

  it("falls back to the real seed sub-category when Sanity is completely empty (not just missing this slug)", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null); // single-doc query: no document for this slug
    fetch.mockResolvedValueOnce([]); // getAllSubCategories() fallback check: Sanity has nothing at all

    const { getSubCategory } = await import("./categories");
    const subCategory = await getSubCategory("accursed-mountains", "theth-valbona-trek");

    expect(subCategory).toEqual(
      seedSubCategories.find((s) => s.slug === "theth-valbona-trek" && s.parentSlug === "accursed-mountains"),
    );
  });

  it("warns when falling back to a seed sub-category for an individual slug lookup", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null);
    fetch.mockResolvedValueOnce([]);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { getSubCategory } = await import("./categories");
    await getSubCategory("accursed-mountains", "theth-valbona-trek");

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("returns undefined (does not invent data) when Sanity is empty and the slug doesn't exist in fallback either", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null);
    fetch.mockResolvedValueOnce([]);

    const { getSubCategory } = await import("./categories");
    const subCategory = await getSubCategory("accursed-mountains", "this-slug-does-not-exist-anywhere");

    expect(subCategory).toBeUndefined();
  });

  it("returns undefined when the slug exists in fallback data but under a different parent", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null);
    fetch.mockResolvedValueOnce([]);

    const { getSubCategory } = await import("./categories");
    const subCategory = await getSubCategory("wrong-parent-slug", "theth-valbona-trek");

    expect(subCategory).toBeUndefined();
  });

  it("returns undefined — NOT stale fallback content — when Sanity has real sub-categories but this specific slug was deleted or renamed", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValueOnce(null); // single-doc query: this slug is genuinely gone
    fetch.mockResolvedValueOnce([
      // Sanity is NOT empty — it has other real (raw-shaped) sub-category docs.
      {
        title: "Some Other Real Sub-Category",
        slug: "some-other-real-subcategory",
        shortDescription: "A different sub-category entirely.",
        introCopy: [],
        heroImage: { src: "/images/other.svg", alt: "Other sub-category", width: 1600, height: 900 },
        keywords: [],
        seo: null,
        parentSlug: "accursed-mountains",
      },
    ]);

    const { getSubCategory } = await import("./categories");
    // "theth-valbona-trek" under "accursed-mountains" still exists in the
    // fallback seed data, but since Sanity is actively populated (just
    // missing this one slug), it must 404 rather than silently resurrect
    // old seed content.
    const subCategory = await getSubCategory("accursed-mountains", "theth-valbona-trek");

    expect(subCategory).toBeUndefined();
  });
});
