import { SiteSettings } from "@/types/content";

export const siteSettings: SiteSettings = {
  brandName: "Illyria Trails",
  tagline: "Original adventures across Albania's coast and highlands.",
  description:
    "Illyria Trails runs small-group tours across Albania's coastline and mountains — Riviera boat trips, Accursed Mountains treks, Berat and Gjirokastër old-town tours, the Lake Komani ferry, and Butrint's ancient ruins, booked directly with real-time availability.",
  domain: "illyriatrails.example",
  // TODO: replace with a real site inbox once one exists — using the
  // founder's personal address as a stand-in for now.
  supportEmail: "iglimaksuti15@gmail.com",
  supportPhone: "+355 69 555 0148",
  supportHours: "Daily 08:00–20:00 (Europe/Tirane)",
  supportAddress: "Rruga e Kavajës, Tirana 1001, Albania",
  faqCategories: [
    {
      title: "Tour Booking & Modifications",
      items: [
        {
          question: "How do I book a tour?",
          answer:
            "Choose a tour, pick a date and traveler count, and check availability directly on the tour page. You'll receive a confirmation email with your meeting point and any last-minute updates.",
        },
        {
          question: "Can I change my tour date after booking?",
          answer:
            "Yes — email or call us with your booking reference and the new date you'd like. We'll confirm availability and move your booking at no extra charge, provided the change is requested more than 24 hours before your original tour.",
        },
        {
          question: "Can I book for a large group?",
          answer:
            "Our scheduled small-group tours can usually accommodate up to 8–10 travelers per booking. For larger groups, contact us before booking so we can confirm space or arrange an additional departure.",
        },
        {
          question: "Do you offer private or custom tours?",
          answer:
            "Not currently — all tours run as small scheduled groups. If demand changes, we'll list private options here first.",
        },
      ],
    },
    {
      title: "Policies & Procedures",
      items: [
        {
          question: "What is your cancellation policy?",
          answer:
            "Free cancellation up to 24 hours before the tour starts. Cancellations inside that window are non-refundable, except where we cancel the tour for weather or safety reasons.",
        },
        {
          question: "How do refunds work?",
          answer:
            "Refunds for eligible cancellations are issued to your original payment method and typically appear within 5–10 business days. Weather-cancelled tours are refunded in full or rebooked, whichever you prefer.",
        },
        {
          question: "What happens if a tour is cancelled for weather?",
          answer:
            "You'll be offered a free rebooking on another available date, or a full refund if no suitable date works for your trip.",
        },
        {
          question: "Are your tours accessible for travelers with mobility needs?",
          answer:
            "It depends on the tour. Boat trips and old-town walking tours are generally accessible; Accursed Mountains hikes involve steep, uneven terrain that may not be suitable for all mobility levels. Contact us before booking if you have specific questions.",
        },
      ],
    },
    {
      title: "Practical Information",
      items: [
        {
          question: "What's included in the tour price?",
          answer:
            "Every listed tour includes a licensed guide, transport during the itinerary, and any entrance fees called out on the tour page. Meals and drinks are included only where the tour description says so.",
        },
        {
          question: "What should I wear or bring?",
          answer:
            "Comfortable walking shoes and weather-appropriate layers for most tours; sturdy hiking boots, a warm layer, and rain protection for Accursed Mountains treks. Bring sun protection, a refillable water bottle, and a valid photo ID.",
        },
        {
          question: "Is there a baggage limit?",
          answer:
            "Day tours don't require luggage beyond a small daypack. For the Tirana airport transfer, standard checked and carry-on luggage per traveler is fine — let us know in advance if you have oversized sports or hiking equipment.",
        },
        {
          question: "How do you handle safety on treks and boat trips?",
          answer:
            "All guides carry first-aid training and a satellite communicator on mountain routes; boat trips use licensed operators with certified life vests for every passenger. Tours are adjusted or postponed whenever conditions don't meet our safety thresholds.",
        },
      ],
    },
    {
      title: "Seasonal Travel Guidance",
      items: [
        {
          question: "When is the best time to visit the Albanian coast?",
          answer:
            "Late May through September for warm, swimmable water on the Albanian Riviera, with July–August as peak season. June and September (shoulder season) offer similar weather with smaller crowds and better availability.",
        },
        {
          question: "When is the best time for mountain treks?",
          answer:
            "June through early October, once high-altitude snow has cleared from the Accursed Mountains trails. Late June and September are the sweet spot — stable weather without peak-season crowds on the trailheads.",
        },
        {
          question: "What is peak season like?",
          answer:
            "July and August bring the highest demand for both coastal and mountain tours. Book at least 2–3 weeks ahead during this window, since popular departures sell out.",
        },
        {
          question: "Do tours run outside the summer months?",
          answer:
            "Yes — city and old-town tours (Berat, Gjirokastër, Tirana) run year-round. Boat trips and high-altitude treks are seasonal and pause when weather or ferry schedules make them unsafe.",
        },
      ],
    },
    {
      title: "Tour Operations",
      items: [
        {
          question: "What languages do your guides speak?",
          answer:
            "All guides lead tours in English and Albanian; many also speak Italian or German. Let us know at booking if you need a specific language and we'll confirm guide availability.",
        },
        {
          question: "Where do tours pick up and drop off?",
          answer:
            "Each tour page lists a specific meeting point, usually a central, easy-to-find landmark in Tirana or the relevant departure town. The Tirana airport transfer picks up directly from arrivals.",
        },
        {
          question: "What is the maximum group size?",
          answer:
            "Our tours run in small groups — typically under 20 travelers, and often far fewer on the Accursed Mountains treks where trail conditions limit group size.",
        },
      ],
    },
  ],
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
