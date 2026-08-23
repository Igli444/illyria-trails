export type Difficulty = "Easy" | "Moderate" | "Challenging";

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ItineraryStep {
  title: string;
  description: string;
  duration?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export interface SeoFields {
  metaTitle: string;
  metaDescription: string;
}

export interface Category {
  slug: string;
  title: string;
  shortDescription: string;
  introCopy: string[];
  heroImage: ContentImage;
  keywords: string[];
  seo: SeoFields;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  coverImage: ContentImage;
  tags: string[];
  relatedTourSlugs: string[];
  body: string[];
  seo: SeoFields;
}

export interface Tour {
  slug: string;
  title: string;
  shortDescription: string;
  description: string[];
  heroImage: ContentImage;
  gallery: ContentImage[];
  duration: string;
  difficulty: Difficulty;
  price: number;
  currency: string;
  originalPrice?: number;
  badges: string[];
  categorySlugs: string[];
  rating: number;
  reviewCount: number;
  meetingPoint: string;
  itinerary: ItineraryStep[];
  included: string[];
  excluded: string[];
  whatToBring: string[];
  faqs: FaqItem[];
  seo: SeoFields;
}

export interface Attraction {
  slug: string;
  title: string;
  category: string;
  region: string;
  coordinates: { lat: number; lng: number };
  description: string;
  image: ContentImage;
  relatedTourSlugs: string[];
}

export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  description: string;
  domain: string;
  supportEmail: string;
  supportPhone: string;
  socials: { label: string; href: string }[];
  certifications: string[];
  trustBadges: { label: string; rating: number; reviewCount: number }[];
  footerColumns: FooterLinkColumn[];
  supportHours: string;
  supportAddress: string;
  faqCategories: FaqCategory[];
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}
