import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

vi.mock("@/sanity/client", () => ({
  client: { fetch: vi.fn() },
}));

async function mockedFetch(): Promise<Mock> {
  const { client } = await import("@/sanity/client");
  return client.fetch as unknown as Mock;
}

describe("getSiteSettings", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns Sanity data verbatim, including the new fields, when client.fetch resolves a document", async () => {
    const fetch = await mockedFetch();
    const sanityDoc = {
      brandName: "Illyria Trails",
      tagline: "From Sanity",
      description: "From Sanity description",
      supportEmail: "sanity@illyriatrails.example",
      supportPhone: "+355 69 000 0000",
      supportHours: "Mon-Fri 09:00-17:00",
      supportAddress: "123 Sanity Street, Tirana",
      certifications: ["Cert A"],
      trustBadges: [{ label: "Platform", rating: 4.9, reviewCount: 10 }],
      socials: [{ label: "Instagram", href: "https://instagram.com/x" }],
      footerColumns: [],
      faqCategories: [
        {
          title: "Tour Booking & Modifications",
          items: [{ question: "Q1?", answer: "A1." }],
        },
      ],
    };
    fetch.mockResolvedValue(sanityDoc);

    const { getSiteSettings, SITE_DOMAIN } = await import("./site-settings");
    const settings = await getSiteSettings();

    expect(settings).toEqual({ ...sanityDoc, domain: SITE_DOMAIN });
    expect(settings.supportHours).toBe("Mon-Fri 09:00-17:00");
    expect(settings.supportAddress).toBe("123 Sanity Street, Tirana");
    expect(settings.faqCategories).toEqual(sanityDoc.faqCategories);
  });

  it("returns fallbackSettings, including the new fields, when client.fetch resolves null", async () => {
    const fetch = await mockedFetch();
    fetch.mockResolvedValue(null);

    const { getSiteSettings } = await import("./site-settings");
    const settings = await getSiteSettings();

    expect(settings.supportHours).toBe("Daily 08:00–20:00 (Europe/Tirane)");
    expect(settings.supportAddress).toBe("Rruga e Kavajës, Tirana 1001, Albania");
    expect(settings.faqCategories.length).toBeGreaterThan(0);
    expect(settings.faqCategories[0]).toHaveProperty("title");
    expect(settings.faqCategories[0]).toHaveProperty("items");
  });

  it("falls back to per-field defaults when the Sanity document exists but has individual null fields", async () => {
    const fetch = await mockedFetch();
    const sanityDoc = {
      brandName: "Illyria Trails",
      tagline: "From Sanity",
      description: "From Sanity description",
      supportEmail: "sanity@illyriatrails.example",
      supportPhone: null,
      supportHours: "Mon-Fri 09:00-17:00",
      supportAddress: "123 Sanity Street, Tirana",
      certifications: ["Cert A"],
      trustBadges: [{ label: "Platform", rating: 4.9, reviewCount: 10 }],
      socials: [{ label: "Instagram", href: "https://instagram.com/x" }],
      footerColumns: [],
      faqCategories: null,
    };
    fetch.mockResolvedValue(sanityDoc);

    const { getSiteSettings, SITE_DOMAIN } = await import("./site-settings");
    const settings = await getSiteSettings();

    // Null fields fall back.
    expect(settings.supportPhone).toBe("+355 69 555 0148");
    expect(settings.faqCategories.length).toBeGreaterThan(0);
    expect(settings.faqCategories[0]).toHaveProperty("title");

    // Real Sanity values for non-null fields are preserved.
    expect(settings.brandName).toBe("Illyria Trails");
    expect(settings.tagline).toBe("From Sanity");
    expect(settings.description).toBe("From Sanity description");
    expect(settings.supportEmail).toBe("sanity@illyriatrails.example");
    expect(settings.supportHours).toBe("Mon-Fri 09:00-17:00");
    expect(settings.supportAddress).toBe("123 Sanity Street, Tirana");
    expect(settings.certifications).toEqual(["Cert A"]);
    expect(settings.trustBadges).toEqual([{ label: "Platform", rating: 4.9, reviewCount: 10 }]);
    expect(settings.socials).toEqual([{ label: "Instagram", href: "https://instagram.com/x" }]);
    expect(settings.domain).toBe(SITE_DOMAIN);
  });
});
