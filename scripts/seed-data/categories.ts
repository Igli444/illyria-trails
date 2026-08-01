import { Category } from "@/types/content";

export interface SubCategory extends Category {
  parentSlug: string;
}

export const categories: Category[] = [
  {
    slug: "albanian-riviera",
    title: "Albanian Riviera",
    shortDescription: "Boat hopping between coves, beaches, and the Blue Eye spring.",
    introCopy: [
      "The coast road south from Vlorë runs along some of the clearest water in the Mediterranean, past beach towns like Himarë, Dhërmi, and Ksamil, where the Ionian Sea shifts between turquoise and deep blue depending on the light.",
      "Our Riviera routes mix boat access to coves you can't reach by road with a stop at the Blue Eye spring, a natural pool fed by an underground river a short drive inland.",
    ],
    heroImage: {
      src: "/images/riviera-coast.svg",
      alt: "Turquoise Ionian Sea framed by limestone cliffs along the Albanian Riviera",
      width: 1600,
      height: 900,
    },
    keywords: ["Albanian Riviera tour", "Ksamil boat trip", "Albania beach tour"],
    seo: {
      metaTitle: "Albanian Riviera Tours | Boat Trips & Beaches — Illyria Trails",
      metaDescription:
        "Small-group boat tours along the Albanian Riviera — hidden coves, Ksamil's islands, and the Blue Eye spring, run by guides who know the coastline.",
    },
  },
  {
    slug: "accursed-mountains",
    title: "Accursed Mountains",
    shortDescription: "Alpine treks through Theth and Valbona, on foot or by day hike.",
    introCopy: [
      "The Accursed Mountains (Bjeshkët e Namuna) rise sharply along Albania's northern border, cut through by the Theth and Valbona valleys — two of the country's most isolated villages until a paved road reached Theth in 2016.",
      "The classic route crosses between them on foot over a 1,800-metre pass, but shorter day hikes around Theth's waterfall and Blue Eye pool cover the same scenery without the overnight commitment.",
    ],
    heroImage: {
      src: "/images/accursed-mountains.svg",
      alt: "Jagged alpine peaks above the green Theth valley in Albania's Accursed Mountains",
      width: 1600,
      height: 900,
    },
    keywords: ["Theth hike", "Valbona trek", "Accursed Mountains Albania"],
    seo: {
      metaTitle: "Accursed Mountains Hiking Tours: Theth & Valbona — Illyria Trails",
      metaDescription:
        "Guided treks through Albania's Accursed Mountains, from the classic Theth-to-Valbona crossing to shorter day hikes around Theth's waterfall.",
    },
  },
  {
    slug: "historic-old-towns",
    title: "Historic Old Towns",
    shortDescription: "Berat and Gjirokastër, Albania's two UNESCO-listed old towns.",
    introCopy: [
      "Berat and Gjirokastër are both built the same way — houses stacked up a hillside beneath a hilltop castle — but they read completely differently on the ground. Berat's white Ottoman houses and stacked windows earned it the name 'town of a thousand windows'; Gjirokastër's stone-roofed houses and fortress feel far more austere.",
      "Both are compact enough to walk in half a day, and both reward slowing down over the old bazaar streets rather than just the castle viewpoint.",
    ],
    heroImage: {
      src: "/images/berat-old-town.svg",
      alt: "Stacked white Ottoman-era houses climbing the hillside in Berat's old town",
      width: 1600,
      height: 900,
    },
    keywords: ["Berat old town tour", "Gjirokastër tour", "Albania UNESCO towns"],
    seo: {
      metaTitle: "Berat & Gjirokastër Old Town Tours — Illyria Trails",
      metaDescription:
        "Guided walking tours of Albania's two UNESCO-listed old towns — Berat's stacked Ottoman houses and Gjirokastër's stone hilltop fortress.",
    },
  },
  {
    slug: "lake-komani",
    title: "Lake Komani",
    shortDescription: "A three-hour ferry through a flooded mountain gorge.",
    introCopy: [
      "Lake Komani formed when a dam flooded the Drin river gorge in the 1970s, and the ferry that now crosses it runs between cliff walls so steep in places that the water looks more like a fjord than a lake.",
      "There's no road alternative that shows the same scenery — this is a boat-only route, and the ferry itself, an old wooden-decked vessel, is part of the experience.",
    ],
    heroImage: {
      src: "/images/komani-lake.svg",
      alt: "A ferry crossing the narrow, steep-sided waters of Lake Komani",
      width: 1600,
      height: 900,
    },
    keywords: ["Lake Komani ferry", "Komani boat tour", "Albania fjord cruise"],
    seo: {
      metaTitle: "Lake Komani Ferry Tours — Illyria Trails",
      metaDescription:
        "Cross Albania's flooded mountain gorge on the Lake Komani ferry, a boat-only route between cliff walls with no road equivalent.",
    },
  },
  {
    slug: "tirana-city",
    title: "Tirana City",
    shortDescription: "Skanderbeg Square, Bunk'Art, and a cable car up Mount Dajti.",
    introCopy: [
      "Tirana doesn't have a single must-see monument so much as a set of layers — Ottoman-era streets, brutalist blocks painted in bright colors during the 2000s, and Cold War bunkers turned into museums.",
      "A half-day covers the center on foot and a cable car ride up Mount Dajti for a view over the whole city; a full day adds time inside Bunk'Art's tunnels.",
    ],
    heroImage: {
      src: "/images/tirana-skyline.svg",
      alt: "Tirana's brightly painted building facades against the Dajti mountain backdrop",
      width: 1600,
      height: 900,
    },
    keywords: ["Tirana city tour", "Bunk'Art tour", "Mount Dajti cable car"],
    seo: {
      metaTitle: "Tirana City Tours: Bunk'Art & Mount Dajti — Illyria Trails",
      metaDescription:
        "Walking tours of central Tirana plus the Dajti cable car and Bunk'Art's Cold War bunker museum, run in small groups.",
    },
  },
  {
    slug: "butrint-ruins",
    title: "Butrint & Ancient Ruins",
    shortDescription: "A layered archaeological site beside a coastal lagoon.",
    introCopy: [
      "Butrint has been rebuilt by whoever controlled this stretch of coast for the last 2,500 years — Greek colonists, Romans, Byzantines, Venetians — and the ruins sit stacked on top of each other inside a national park beside a quiet lagoon.",
      "It's a slower site than Berat or Gjirokastër, with more walking between structures and fewer crowds, which is part of why our guides rate it highly.",
    ],
    heroImage: {
      src: "/images/butrint-ruins.svg",
      alt: "Ancient stone columns and ruins beside the Butrint lagoon",
      width: 1600,
      height: 900,
    },
    keywords: ["Butrint tour", "Butrint national park", "Albania ancient ruins"],
    seo: {
      metaTitle: "Butrint & Ancient Ruins Tours — Illyria Trails",
      metaDescription:
        "Guided day trips to Butrint National Park, a layered 2,500-year-old archaeological site beside a coastal lagoon in southern Albania.",
    },
  },
];

export const subCategories: SubCategory[] = [
  {
    parentSlug: "accursed-mountains",
    slug: "theth-valbona-trek",
    title: "Theth to Valbona Trek",
    shortDescription: "The classic two-day crossing between Albania's two best-known alpine valleys.",
    introCopy: [
      "The trek from Theth to Valbona climbs to a pass at roughly 1,800 metres before dropping into the Valbona valley on the other side — a full day of walking, usually split with an overnight in Theth beforehand.",
      "The route is well-marked and doesn't require technical climbing, but the elevation gain and distance mean a reasonable fitness level matters more here than on most of our other hikes.",
    ],
    heroImage: {
      src: "/images/accursed-mountains.svg",
      alt: "The alpine pass between the Theth and Valbona valleys",
      width: 1600,
      height: 900,
    },
    keywords: ["Theth Valbona trek", "Theth to Valbona hike", "Albania alpine crossing"],
    seo: {
      metaTitle: "Theth to Valbona Trek — Illyria Trails",
      metaDescription:
        "The classic two-day trek between Albania's Theth and Valbona valleys, crossing an 1,800-metre alpine pass with a certified mountain guide.",
    },
  },
  {
    parentSlug: "accursed-mountains",
    slug: "theth-day-hikes",
    title: "Theth Day Hikes",
    shortDescription: "Waterfall and Blue Eye pool hikes around Theth village, no overnight required.",
    introCopy: [
      "Theth village sits at the head of its valley surrounded by peaks on three sides, and its two best-known short hikes — to the Grunas waterfall and to Theth's own Blue Eye pool — cover the valley's scenery in half a day each.",
      "Both routes are well-trodden and suit most fitness levels, making them a good option if the full Valbona crossing is more than your trip has time for.",
    ],
    heroImage: {
      src: "/images/blue-eye-spring.svg",
      alt: "A deep blue spring-fed pool in a forest clearing near Theth",
      width: 1600,
      height: 900,
    },
    keywords: ["Theth waterfall hike", "Theth Blue Eye", "Theth day hike"],
    seo: {
      metaTitle: "Theth Day Hikes: Waterfall & Blue Eye Pool — Illyria Trails",
      metaDescription:
        "Half-day hikes around Theth village to the Grunas waterfall and Theth's Blue Eye pool, no overnight stay required.",
    },
  },
];
