import { SiteSettings } from "@/types/content";

export const siteSettings: SiteSettings = {
  brandName: "Illyria Trails",
  tagline: "Original adventures across Albania's coast and highlands.",
  description:
    "Illyria Trails runs small-group tours across Albania's coastline and mountains — Riviera boat trips, Accursed Mountains treks, Berat and Gjirokastër old-town tours, the Lake Komani ferry, and Butrint's ancient ruins, booked directly with real-time availability.",
  domain: "illyriatrails.example",
  supportEmail: "hello@illyriatrails.example",
  supportPhone: "+355 69 555 0148",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  certifications: [
    "Licensed Tour Operator — National Tourism Agency of Albania",
    "ISO 14001 Environmental Management",
    "Adventure Travel Trade Association Member",
    "Carbon-Neutral Operations Certified",
  ],
  trustBadges: [
    { label: "Traveler Review Platform", rating: 4.8, reviewCount: 2140 },
    { label: "Independent Review Aggregator", rating: 4.7, reviewCount: 960 },
  ],
  footerColumns: [
    {
      title: "Explore",
      links: [
        { label: "All Tours", href: "/tours" },
        { label: "Attractions", href: "/attractions" },
        { label: "Airport Transfer", href: "/airport-transfer" },
        { label: "Albanian Riviera", href: "/things-to-do/albanian-riviera" },
        { label: "Accursed Mountains", href: "/things-to-do/accursed-mountains" },
        { label: "Historic Old Towns", href: "/things-to-do/historic-old-towns" },
        { label: "Lake Komani", href: "/things-to-do/lake-komani" },
        { label: "Tirana City", href: "/things-to-do/tirana-city" },
        { label: "Butrint & Ancient Ruins", href: "/things-to-do/butrint-ruins" },
      ],
    },
    {
      title: "Inspiration",
      links: [
        { label: "Guides & Articles", href: "/inspiration" },
      ],
    },
    {
      title: "Good to Know",
      links: [
        { label: "Difficulty Levels", href: "/difficulty-levels" },
        { label: "Traveling with Children", href: "/traveling-with-children" },
        { label: "Meeting Points", href: "/meeting-points" },
        { label: "Live Tour Status", href: "/tour-status" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Support & Legal",
      links: [
        { label: "Customer Support & FAQ", href: "/customer-support-and-faq" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Environmental Policy", href: "/environmental-policy" },
        { label: "Equal Pay Policy", href: "/equal-pay-policy" },
      ],
    },
  ],
};
