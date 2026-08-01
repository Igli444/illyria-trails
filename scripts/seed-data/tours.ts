import { Tour } from "@/types/content";

export const tours: Tour[] = [
  {
    slug: "albanian-riviera-boat-day-trip",
    title: "Albanian Riviera Boat Day Trip",
    shortDescription:
      "A small-boat cruise along the Riviera coast, with stops at coves and Ksamil's islands you can't reach by road.",
    description: [
      "The coast between Himarë and Ksamil is lined with coves that have no road access at all — the only way in is by boat. This route works its way south along the cliffs, stopping to swim at two or three coves depending on the day's sea conditions, before finishing among Ksamil's small islands.",
      "Boats are capped at a small group size, which is what makes it possible to actually anchor at the quieter coves rather than the crowded main beaches.",
    ],
    heroImage: {
      src: "/images/riviera-coast.svg",
      alt: "Turquoise Ionian Sea framed by limestone cliffs along the Albanian Riviera",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/riviera-coast.svg", alt: "Boat cruising the Riviera coastline", width: 1600, height: 900 },
      { src: "/images/blue-eye-spring.svg", alt: "A blue spring pool inland from the coast", width: 1600, height: 900 },
    ],
    duration: "8 hours",
    difficulty: "Easy",
    price: 65,
    currency: "EUR",
    originalPrice: 79,
    badges: ["Bestseller"],
    categorySlugs: ["albanian-riviera"],
    rating: 4.9,
    reviewCount: 980,
    meetingPoint: "Saranda old port (pickup from Himarë and Ksamil available)",
    itinerary: [
      { title: "Boarding", description: "Board at Saranda old port and safety briefing.", duration: "20m" },
      { title: "First cove", description: "Cruise to the first swimming cove, anchor and swim.", duration: "1h" },
      { title: "Second cove", description: "Continue south along the cliffs to a second, quieter cove.", duration: "1h 30m" },
      { title: "Ksamil islands", description: "Anchor near Ksamil's small islands for a final swim.", duration: "1h" },
      { title: "Return cruise", description: "Cruise back to Saranda.", duration: "1h 15m" },
    ],
    included: ["Small-boat cruise", "Snorkeling gear", "Bottled water", "English-speaking guide"],
    excluded: ["Lunch (available to buy at Ksamil)", "Gratuities", "Hotel pickup outside Saranda/Himarë/Ksamil"],
    whatToBring: ["Swimwear and a towel", "Reef-safe sunscreen", "A dry bag for your phone"],
    faqs: [
      { question: "How many stops does the boat make?", answer: "Typically three swimming stops, adjusted for sea conditions on the day." },
      { question: "Is snorkeling gear provided?", answer: "Yes, masks and snorkels are included; wetsuits are not needed in summer water temperatures." },
      { question: "Can I join from Himarë instead of Saranda?", answer: "Yes, pickup is available at both — note this when booking." },
    ],
    seo: {
      metaTitle: "Albanian Riviera Boat Day Trip | Illyria Trails",
      metaDescription:
        "Small-boat day trip along the Albanian Riviera, with stops at road-free coves and Ksamil's islands. Rated 4.9 from 980 reviews.",
    },
  },
  {
    slug: "blue-eye-spring-and-saranda-day-trip",
    title: "Blue Eye Spring & Sarandë Day Trip",
    shortDescription:
      "A half-day trip to the Blue Eye's deep spring-fed pool, paired with free time in Sarandë.",
    description: [
      "The Blue Eye (Syri i Kaltër) is a spring where water rises from a depth divers have measured past 50 metres without finding the bottom, producing a pool that shifts from pale turquoise at the edges to near-black blue at its center.",
      "The site is a short walk from the parking area through shaded forest, and the trip pairs it with a couple of hours of free time back in Sarandë for lunch or a swim off the town promenade.",
    ],
    heroImage: {
      src: "/images/blue-eye-spring.svg",
      alt: "A deep blue spring-fed pool in a forest clearing",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/blue-eye-spring.svg", alt: "The Blue Eye spring pool", width: 1600, height: 900 },
      { src: "/images/riviera-coast.svg", alt: "Sarandë's coastline", width: 1600, height: 900 },
    ],
    duration: "6 hours",
    difficulty: "Easy",
    price: 45,
    currency: "EUR",
    badges: [],
    categorySlugs: ["albanian-riviera"],
    rating: 4.7,
    reviewCount: 540,
    meetingPoint: "Central Sarandë pickup points",
    itinerary: [
      { title: "Pickup", description: "Depart Sarandë by minibus.", duration: "30m" },
      { title: "Blue Eye spring", description: "Walk to the spring and free time at the pool.", duration: "1h 30m" },
      { title: "Return to Sarandë", description: "Drive back to town.", duration: "30m" },
      { title: "Free time in Sarandë", description: "Lunch or a swim off the promenade, on your own.", duration: "2h" },
    ],
    included: ["Minibus transfer", "English-speaking guide", "Blue Eye entrance fee"],
    excluded: ["Lunch", "Gratuities"],
    whatToBring: ["Swimwear (the pool is cold even in summer)", "Comfortable walking shoes", "Cash for lunch in Sarandë"],
    faqs: [
      { question: "Can you swim in the Blue Eye?", answer: "Wading at the shallow edge is allowed in most seasons; swimming out toward the center is restricted for safety." },
      { question: "How cold is the water?", answer: "Consistently cold year-round, since it comes from a deep underground spring rather than surface runoff." },
    ],
    seo: {
      metaTitle: "Blue Eye Spring & Sarandë Day Trip | Illyria Trails",
      metaDescription:
        "Half-day trip to Albania's Blue Eye spring paired with free time in Sarandë. Small-group minibus transfer included.",
    },
  },
  {
    slug: "theth-to-valbona-two-day-trek",
    title: "Theth to Valbona Trek, 2 Days",
    shortDescription:
      "The classic alpine crossing between Albania's two best-known mountain valleys, with an overnight in Theth.",
    description: [
      "This is the trek most hikers mean when they say they're doing 'the Albanian Alps' — an overnight in a Theth guesthouse followed by a full day climbing to a roughly 1,800-metre pass and down into the Valbona valley on the other side.",
      "The trail is well-marked and doesn't require technical climbing, but it's a long day — expect six to eight hours of walking with real elevation gain, so this one is graded for hikers in decent shape rather than absolute beginners.",
    ],
    heroImage: {
      src: "/images/accursed-mountains.svg",
      alt: "Jagged alpine peaks above the green Theth valley",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/accursed-mountains.svg", alt: "The pass between Theth and Valbona", width: 1600, height: 900 },
    ],
    duration: "2 days",
    difficulty: "Challenging",
    price: 165,
    currency: "EUR",
    badges: [],
    categorySlugs: ["accursed-mountains", "theth-valbona-trek"],
    rating: 4.8,
    reviewCount: 310,
    meetingPoint: "Theth village center (transfer from Shkodër available)",
    itinerary: [
      { title: "Day 1: Transfer to Theth", description: "Drive from Shkodër to Theth, afternoon free to explore the village.", duration: "3h drive" },
      { title: "Day 1: Overnight", description: "Stay in a family-run guesthouse in Theth.", duration: "Overnight" },
      { title: "Day 2: Ascent to the pass", description: "Early start, climbing steadily to the roughly 1,800-metre pass.", duration: "4h" },
      { title: "Day 2: Descent to Valbona", description: "Descend into the Valbona valley to the trailhead.", duration: "3h" },
      { title: "Day 2: Return transfer", description: "Drive back to Shkodër from Valbona.", duration: "2h 30m" },
    ],
    included: ["Certified mountain guide", "One night guesthouse accommodation with dinner and breakfast", "Transfers between Shkodër, Theth, and Valbona"],
    excluded: ["Lunch on both days", "Gratuities", "Personal hiking gear"],
    whatToBring: ["Sturdy hiking boots", "Layered clothing for changeable mountain weather", "A daypack and at least 2 liters of water capacity"],
    faqs: [
      { question: "Do I need previous trekking experience?", answer: "No technical experience is required, but you should be comfortable walking 6–8 hours over uneven terrain with elevation gain." },
      { question: "What are the guesthouses like?", answer: "Simple, family-run rooms with home-cooked meals — expect basic but comfortable, not hotel-standard." },
      { question: "When is this trek possible?", answer: "Typically late May through October; the pass can hold snow well into spring." },
    ],
    seo: {
      metaTitle: "Theth to Valbona Trek, 2 Days | Illyria Trails",
      metaDescription:
        "The classic two-day trek across Albania's Accursed Mountains, from Theth over an 1,800-metre pass into the Valbona valley.",
    },
  },
  {
    slug: "theth-waterfall-and-blue-eye-day-hike",
    title: "Theth Waterfall & Blue Eye Day Hike",
    shortDescription:
      "A half-day loop to Theth's Grunas waterfall and its own Blue Eye pool, no overnight required.",
    description: [
      "This route covers Theth's two best short walks in one day: the Grunas waterfall, reached along a marked trail through the valley, and Theth's own Blue Eye pool, a smaller and quieter relative of the coastal spring near Sarandë.",
      "It's a good option if the full Theth-to-Valbona crossing is more than your schedule allows — you get the valley's scenery without the overnight commitment.",
    ],
    heroImage: {
      src: "/images/blue-eye-spring.svg",
      alt: "A deep blue spring-fed pool in a forest clearing near Theth",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/blue-eye-spring.svg", alt: "Theth's Blue Eye pool", width: 1600, height: 900 },
      { src: "/images/accursed-mountains.svg", alt: "The Theth valley", width: 1600, height: 900 },
    ],
    duration: "5 hours",
    difficulty: "Moderate",
    price: 35,
    currency: "EUR",
    badges: [],
    categorySlugs: ["accursed-mountains", "theth-day-hikes"],
    rating: 4.7,
    reviewCount: 260,
    meetingPoint: "Theth village center",
    itinerary: [
      { title: "Trailhead departure", description: "Depart from central Theth on foot.", duration: "10m" },
      { title: "Grunas waterfall", description: "Hike to the waterfall and surrounding gorge.", duration: "2h" },
      { title: "Theth's Blue Eye", description: "Continue to the smaller Blue Eye pool.", duration: "1h 30m" },
      { title: "Return to village", description: "Walk back to central Theth.", duration: "1h 20m" },
    ],
    included: ["Local guide", "Trail map and route briefing"],
    excluded: ["Transfer to/from Theth", "Food and drinks", "Gratuities"],
    whatToBring: ["Hiking shoes", "Swimwear if you plan to wade at the Blue Eye", "Sun protection"],
    faqs: [
      { question: "Is this suitable for families?", answer: "Yes, the trails are well-marked and don't require technical skill, though there is some uneven ground." },
      { question: "How does this differ from the coastal Blue Eye near Sarandë?", answer: "Theth's Blue Eye is smaller and set in the mountains rather than lowland forest, with a colder, faster-moving spring." },
    ],
    seo: {
      metaTitle: "Theth Waterfall & Blue Eye Day Hike | Illyria Trails",
      metaDescription:
        "Half-day hike from Theth village to the Grunas waterfall and Theth's own Blue Eye pool, no overnight stay required.",
    },
  },
  {
    slug: "berat-old-town-walking-tour",
    title: "Berat Old Town Walking Tour",
    shortDescription:
      "A guided walk through Berat's 'town of a thousand windows,' castle included.",
    description: [
      "Berat's old town climbs a hillside in tiers of white Ottoman-era houses, each stacked slightly above and behind the next so their windows all catch the light — the origin of its nickname. A working castle still crowns the hill, with several churches inside its walls.",
      "The walk covers both riverside quarters and the castle grounds, with stops at an Onufri-era church and a viewpoint over the whole town.",
    ],
    heroImage: {
      src: "/images/berat-old-town.svg",
      alt: "Stacked white Ottoman-era houses climbing the hillside in Berat's old town",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/berat-old-town.svg", alt: "Berat's old town hillside", width: 1600, height: 900 },
    ],
    duration: "4 hours",
    difficulty: "Easy",
    price: 30,
    currency: "EUR",
    originalPrice: 38,
    badges: ["Bestseller"],
    categorySlugs: ["historic-old-towns"],
    rating: 4.8,
    reviewCount: 720,
    meetingPoint: "Berat old town square",
    itinerary: [
      { title: "Old town streets", description: "Walk the riverside quarter's cobbled lanes.", duration: "1h" },
      { title: "Castle ascent", description: "Climb to Berat Castle.", duration: "45m" },
      { title: "Castle grounds", description: "Visit the churches and viewpoint inside the castle walls.", duration: "1h" },
      { title: "Return descent", description: "Walk back down to the old town square.", duration: "45m" },
    ],
    included: ["English-speaking local guide", "Castle entrance fee"],
    excluded: ["Transfer to Berat", "Food and drinks", "Gratuities"],
    whatToBring: ["Comfortable walking shoes (the castle streets are steep and cobbled)", "Sun hat"],
    faqs: [
      { question: "How steep is the walk to the castle?", answer: "It's a steady uphill climb on cobblestone for about 15 minutes — manageable for most fitness levels at a relaxed pace." },
      { question: "Is transfer from Tirana included?", answer: "No, this tour meets in Berat itself; Berat is roughly a 2-hour drive from Tirana." },
    ],
    seo: {
      metaTitle: "Berat Old Town Walking Tour | Illyria Trails",
      metaDescription:
        "Guided walk through Berat's UNESCO-listed old town and hilltop castle, Albania's 'town of a thousand windows.'",
    },
  },
  {
    slug: "gjirokastra-castle-and-bazaar-tour",
    title: "Gjirokastër Castle & Old Bazaar Tour",
    shortDescription:
      "A walking tour of Gjirokastër's stone hilltop fortress and Ottoman-era bazaar.",
    description: [
      "Gjirokastër's old town is built almost entirely from local grey stone, from its steep-roofed houses to the fortress that dominates the skyline — a harder, more austere look than Berat's whitewashed hillside.",
      "The tour covers the castle, which houses a small arms museum and a captured US Air Force plane from the Cold War era, plus the Ottoman-era bazaar streets below.",
    ],
    heroImage: {
      src: "/images/gjirokastra-castle.svg",
      alt: "Gjirokastër's stone hilltop castle above traditional stone-roofed houses",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/gjirokastra-castle.svg", alt: "Gjirokastër castle and old town", width: 1600, height: 900 },
    ],
    duration: "4 hours",
    difficulty: "Easy",
    price: 32,
    currency: "EUR",
    badges: [],
    categorySlugs: ["historic-old-towns"],
    rating: 4.7,
    reviewCount: 410,
    meetingPoint: "Gjirokastër old bazaar",
    itinerary: [
      { title: "Old bazaar", description: "Walk the Ottoman-era bazaar streets.", duration: "1h" },
      { title: "Castle ascent", description: "Climb to Gjirokastër Castle.", duration: "30m" },
      { title: "Castle grounds", description: "Visit the arms museum and fortress walls.", duration: "1h 15m" },
      { title: "Old town streets", description: "Wander the stone-roofed residential streets on the way down.", duration: "1h 15m" },
    ],
    included: ["English-speaking local guide", "Castle entrance fee"],
    excluded: ["Transfer to Gjirokastër", "Food and drinks", "Gratuities"],
    whatToBring: ["Comfortable walking shoes", "Water bottle"],
    faqs: [
      { question: "Is Gjirokastër worth visiting alongside Berat?", answer: "Yes, most travelers do both — they're about an hour apart and show quite different sides of Ottoman-era Albania." },
      { question: "What's inside the castle?", answer: "A small arms and military history museum, cannon displays along the walls, and a preserved Cold War-era aircraft." },
    ],
    seo: {
      metaTitle: "Gjirokastër Castle & Old Bazaar Tour | Illyria Trails",
      metaDescription:
        "Guided walking tour of Gjirokastër's UNESCO-listed stone old town, hilltop fortress, and Ottoman-era bazaar.",
    },
  },
  {
    slug: "lake-komani-ferry-cruise",
    title: "Lake Komani Ferry Cruise",
    shortDescription:
      "A three-hour ferry crossing through a flooded mountain gorge, with transfer from Shkodër.",
    description: [
      "The ferry across Lake Komani runs between cliff walls that close in so tightly in places the lake reads more like a fjord than a reservoir. There's no equivalent road route — this crossing is the only way to see this stretch of the Drin river valley.",
      "The ferry itself is an old wooden-decked passenger boat rather than a tour vessel, shared with locals commuting between villages, which adds to rather than detracts from the trip.",
    ],
    heroImage: {
      src: "/images/komani-lake.svg",
      alt: "A ferry crossing the narrow, steep-sided waters of Lake Komani",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/komani-lake.svg", alt: "Lake Komani ferry crossing", width: 1600, height: 900 },
    ],
    duration: "8 hours",
    difficulty: "Easy",
    price: 40,
    currency: "EUR",
    badges: [],
    categorySlugs: ["lake-komani"],
    rating: 4.8,
    reviewCount: 650,
    meetingPoint: "Shkodër city center (ferry departs from Koman)",
    itinerary: [
      { title: "Pickup & drive to Koman", description: "Depart Shkodër toward the Koman ferry dock.", duration: "1h" },
      { title: "Ferry crossing", description: "Cross Lake Komani to Fierzë.", duration: "3h" },
      { title: "Free time at Fierzë", description: "Short break before the return leg.", duration: "30m" },
      { title: "Return crossing", description: "Ferry back across the lake to Koman.", duration: "3h" },
      { title: "Return drive", description: "Drive back to Shkodër.", duration: "1h" },
    ],
    included: ["Return ferry ticket", "Transfer between Shkodër and the Koman ferry dock", "English-speaking guide"],
    excluded: ["Food and drinks", "Gratuities"],
    whatToBring: ["Sun protection (most of the ferry's deck is uncovered)", "A light jacket for the breeze on open water", "Cash for snacks at Fierzë"],
    faqs: [
      { question: "Is the ferry covered or open-air?", answer: "Mixed — there's a covered lower deck and an open upper deck; most people spend the crossing upstairs for the views." },
      { question: "Can I do this as a one-way trip toward Valbona?", answer: "Yes, some travelers use the ferry one-way and continue on to Valbona — ask about this option when booking." },
    ],
    seo: {
      metaTitle: "Lake Komani Ferry Cruise | Illyria Trails",
      metaDescription:
        "Full-day Lake Komani ferry cruise through a flooded mountain gorge, with transfer from Shkodër included.",
    },
  },
  {
    slug: "tirana-city-and-mount-dajti-tour",
    title: "Tirana City & Mount Dajti Tour",
    shortDescription:
      "A half-day covering central Tirana on foot and a cable car ride up Mount Dajti.",
    description: [
      "Tirana's center is compact enough to walk in a morning — Skanderbeg Square, the pyramid-shaped former museum building, and blocks of brutalist apartment buildings repainted in bright colors in the 2000s.",
      "The cable car up Mount Dajti adds a different kind of view: the whole city laid out below, with the coast visible on a clear day.",
    ],
    heroImage: {
      src: "/images/tirana-skyline.svg",
      alt: "Tirana's brightly painted building facades against the Dajti mountain backdrop",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/tirana-skyline.svg", alt: "Central Tirana", width: 1600, height: 900 },
    ],
    duration: "5 hours",
    difficulty: "Easy",
    price: 25,
    currency: "EUR",
    badges: [],
    categorySlugs: ["tirana-city"],
    rating: 4.6,
    reviewCount: 480,
    meetingPoint: "Skanderbeg Square, Tirana",
    itinerary: [
      { title: "Skanderbeg Square & center", description: "Walking tour of the main square and surrounding streets.", duration: "1h 30m" },
      { title: "Transfer to cable car", description: "Short drive to the Dajti cable car station.", duration: "20m" },
      { title: "Mount Dajti cable car", description: "Round-trip cable car ride with time at the summit viewpoint.", duration: "2h" },
      { title: "Return transfer", description: "Drive back to central Tirana.", duration: "20m" },
    ],
    included: ["English-speaking guide", "Cable car round-trip ticket", "Transfer to/from the cable car station"],
    excluded: ["Bunk'Art entrance (optional add-on)", "Food and drinks", "Gratuities"],
    whatToBring: ["Comfortable walking shoes", "A light jacket (it's noticeably cooler on the summit)"],
    faqs: [
      { question: "Can I add Bunk'Art to this tour?", answer: "Yes, ask about combining this with a Bunk'Art visit — it adds roughly two hours and an extra entrance fee." },
      { question: "Is the cable car ride included or optional?", answer: "It's included in the price; the round-trip ticket is booked in advance to avoid queues." },
    ],
    seo: {
      metaTitle: "Tirana City & Mount Dajti Tour | Illyria Trails",
      metaDescription:
        "Half-day Tirana city walking tour plus a Mount Dajti cable car ride, covering Skanderbeg Square and the city's brutalist-era blocks.",
    },
  },
  {
    slug: "butrint-ancient-ruins-day-trip",
    title: "Butrint Ancient Ruins Day Trip",
    shortDescription:
      "A guided walk through Butrint's layered Greek, Roman, and Byzantine ruins beside a coastal lagoon.",
    description: [
      "Butrint has been resettled and rebuilt by a long list of rulers over roughly 2,500 years, and the ruins reflect it — a Greek theater, Roman baths, and a Byzantine baptistery all sit within a short walk of each other inside a national park beside a quiet lagoon.",
      "It's a slower, less crowded site than Albania's old towns, with as much time spent walking between structures under tree cover as looking at the ruins themselves.",
    ],
    heroImage: {
      src: "/images/butrint-ruins.svg",
      alt: "Ancient stone columns and ruins beside the Butrint lagoon",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/images/butrint-ruins.svg", alt: "Butrint's ancient ruins", width: 1600, height: 900 },
    ],
    duration: "6 hours",
    difficulty: "Easy",
    price: 35,
    currency: "EUR",
    originalPrice: 42,
    badges: ["Launch Offer"],
    categorySlugs: ["butrint-ruins"],
    rating: 4.6,
    reviewCount: 190,
    meetingPoint: "Central Sarandë pickup points",
    itinerary: [
      { title: "Pickup", description: "Depart Sarandë by minibus.", duration: "30m" },
      { title: "Butrint National Park", description: "Guided walk through the archaeological site.", duration: "2h 30m" },
      { title: "Lagoon viewpoint", description: "Free time at the lagoon-side viewpoint.", duration: "30m" },
      { title: "Return to Sarandë", description: "Drive back to town.", duration: "30m" },
    ],
    included: ["Minibus transfer", "English-speaking guide", "Butrint entrance fee"],
    excluded: ["Food and drinks", "Gratuities"],
    whatToBring: ["Comfortable walking shoes", "Sun protection", "Insect repellent (the lagoon area attracts mosquitoes at dusk)"],
    faqs: [
      { question: "How much walking is involved?", answer: "About 2 miles total across mostly flat, shaded paths within the park." },
      { question: "Is Butrint worth it if I've already seen Berat and Gjirokastër?", answer: "Yes — it's a different kind of site entirely, with Greek and Roman layers rather than Ottoman-era architecture." },
    ],
    seo: {
      metaTitle: "Butrint Ancient Ruins Day Trip | Illyria Trails",
      metaDescription:
        "Guided day trip to Butrint National Park's layered Greek, Roman, and Byzantine ruins beside a coastal lagoon in southern Albania.",
    },
  },
];
