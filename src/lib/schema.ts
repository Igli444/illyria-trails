import { Guide, SiteSettings, Tour } from "@/types/content";
import { SITE_DOMAIN } from "@/data/site-settings";

const siteUrl = `https://${SITE_DOMAIN}`;

export function organizationSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.brandName,
    url: siteUrl,
    description: settings.description,
    email: settings.supportEmail,
    telephone: settings.supportPhone,
    sameAs: settings.socials.map((s) => s.href).filter((href) => href !== "#"),
  };
}

export function localBusinessSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.brandName,
    url: siteUrl,
    description: settings.description,
    email: settings.supportEmail,
    telephone: settings.supportPhone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AL",
    },
    ...(settings.trustBadges[0]
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: settings.trustBadges[0].rating,
            reviewCount: settings.trustBadges[0].reviewCount,
          },
        }
      : {}),
  };
}

export function touristTripSchema(tour: Tour) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    image: tour.heroImage.src,
    touristType: tour.difficulty,
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.itinerary.map((step, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: step.title,
        description: step.description,
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: tour.currency,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/tours/${tour.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
    },
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function articleSchema(guide: Guide, brandName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    image: guide.coverImage.src,
    author: {
      "@type": "Organization",
      name: guide.author,
    },
    datePublished: guide.publishDate,
    publisher: {
      "@type": "Organization",
      name: brandName,
    },
  };
}
