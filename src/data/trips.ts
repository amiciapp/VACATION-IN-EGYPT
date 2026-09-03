// VACATION IN EGYPT - Trips Data
export interface Trip {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  currency: string;
  duration: string;
  category: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  location: string;
  highlights: string[];
  included: string[];
  groupSize: string;
  availability: string;
  discount?: number;
  hot?: boolean;
  videoUrl?: string;
}

export const cities = [
  "Alexandria",
  "Cairo",
  "Hurghada",
  "Luxor",
  "Aswan",
  "Sharm El Sheikh"
];

export const trips: Trip[] = [
  {
    id: "alexandria-citadel-catacombs-library-tour",
    title: "Alexandria VIP Day Tour: Citadel, Catacombs & Ancient Library",
    description: "Explore the Greco-Roman marvels of the Mediterranean coast — the medieval Qaitbay Citadel, Kom El Shoqafa Catacombs, and the world-renowned Bibliotheca Alexandrina.",
    longDescription: "Step into Egypt's legendary Mediterranean pearl with Vacation in Egypt on a private VIP day tour of Alexandria. Founded by Alexander the Great in 331 BC, Alexandria is a breathtaking fusion of Pharaonic, Greek, Roman, and Islamic heritage along the azure coast.\n\nYour day begins with comfortable private air-conditioned VIP transport. Descend into the mysterious 2nd-century Catacombs of Kom El Shoqafa, an underground necropolis blending Roman and Egyptian iconography. Visit Pompey's Pillar, then explore the formidable 15th-century Citadel of Qaitbay standing directly on the site of the ancient Pharos Lighthouse. Complete your journey at the stunning contemporary Bibliotheca Alexandrina, celebrating world knowledge with its vast open reading halls and rare manuscript museums, followed by fresh Mediterranean seafood overlooking the sea.",
    price: 85,
    currency: "EUR",
    duration: "Full Day (8-10 Hours)",
    category: "Historical",
    image: "/images/bibliotheca-alexandrina.jpg",
    gallery: ["/images/bibliotheca-alexandrina.jpg", "/images/qaitbay-citadel.jpg", "/images/kom-el-shoqafa-catacombs.jpg"],
    rating: 4.9,
    reviews: 168,
    location: "Alexandria",
    highlights: [
      "Guided tour of the world-famous Bibliotheca Alexandrina",
      "Citadel of Qaitbay built on the site of the ancient Lighthouse",
      "Kom El Shoqafa Catacombs — one of the Seven Wonders of the Middle Ages",
      "Pompey's Pillar and ancient Serapeum ruins",
      "Scenic Mediterranean Corniche drive with sunset photo stop",
      "Licensed multilingual Egyptologist guide",
      "Private VIP air-conditioned transport with hotel pickup & drop-off"
    ],
    included: [
      "Private hotel pickup and drop-off in Alexandria or Cairo",
      "All transfers in modern, air-conditioned VIP vehicle",
      "All entrance fees and admission tickets",
      "Licensed expert Egyptologist guide",
      "Fresh Mediterranean seafood lunch at seaside restaurant",
      "Bottled water throughout the day",
      "All taxes and service charges"
    ],
    groupSize: "Private / 2-8 people",
    availability: "Daily",
    hot: true,
    discount: 15
  },
  {
    id: "alexandria-mediterranean-coastal-heritage-escape",
    title: "Alexandria Coastal Heritage & Stanley Bridge Scenic Escape",
    description: "Experience the sea breeze, Montaza Palace royal gardens, Stanley Bridge, and authentic seaside culinary delights on a bespoke coastal discovery.",
    longDescription: "Unwind along Egypt's iconic northern coast with a bespoke VIP day trip exploring royal retreats and Mediterranean elegance. Wander through the lush pine and palm groves of Montaza Royal Palace overlooking private beaches, stroll across the iconic Stanley Bridge, and immerse yourself in the vibrant atmosphere of the Alexandria Corniche.",
    price: 75,
    currency: "EUR",
    duration: "Full Day",
    category: "Relaxation",
    image: "/images/qaitbay-citadel.jpg",
    gallery: ["/images/qaitbay-citadel.jpg", "/images/bibliotheca-alexandrina.jpg", "/images/kom-el-shoqafa-catacombs.jpg"],
    rating: 4.8,
    reviews: 94,
    location: "Alexandria",
    highlights: [
      "Montaza Royal Palace Gardens & historic royal beaches",
      "Stanley Bridge panoramic sea views",
      "Alexandria Corniche coastal promenade",
      "Qaitbay Fortress Mediterranean vantage points",
      "Seaside dining experience with fresh catch of the day",
      "Private luxury Mercedes/VIP minivan transfers"
    ],
    included: [
      "Door-to-door private hotel transfers",
      "Professional tour coordinator & guide",
      "Montaza Palace gardens admission tickets",
      "Seaside lunch with Mediterranean specialties",
      "Cold refreshments and mineral water"
    ],
    groupSize: "2-6 people",
    availability: "Daily",
    hot: false
  },
  {
    id: "abu-simbel-day-trip-plane-cairo",
    title: "Abu Simbel Day Trip by Plane from Cairo",
    description: "Fly to Nubia and stand before the four colossal statues of Ramses II — round-trip domestic flights, licensed Egyptologist guide, and all transfers included.",
    longDescription: "Tucked away just 40 km from the Sudanese border, the Abu Simbel temples are one of the most rewarding detours in Egypt, and a same-day flight from Cairo makes them easy to reach even on a short stay. This fully guided day trip with Vacation in Egypt pairs a scenic domestic flight over the Nubian desert with an in-depth tour of Ramses II's rock-cut masterpiece, led by a licensed Egyptologist who brings the temple's 3,000-year history to life.\n\nEnjoy an early morning pickup from your Cairo accommodation before boarding your domestic flight south across Upper Egypt and Lake Nasser. Upon arrival at Abu Simbel, explore the Great Temple of Ramses II with its four towering 20-metre statues, learn the astonishing story of the 1960s UNESCO rescue that relocated the entire complex 65 metres higher, discover the Temple of Queen Nefertari, and hear about the biannual Sun Festival solar alignment before flying comfortably back to Cairo.",
    price: 375,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/abu-simbel.jpg",
    gallery: ["/images/abu-simbel.jpg", "/images/abu-simbel-interior.jpg", "/images/SP.webp"],
    rating: 5.0,
    reviews: 184,
    location: "Cairo",
    highlights: [
      "Round-trip domestic flights (Cairo – Abu Simbel – Cairo)",
      "Great Temple’s four 20-metre colossal statues of Ramses II",
      "Temple of Queen Nefertari & Hathor",
      "Story of the 1960s UNESCO rescue from Lake Nasser",
      "Astronomical alignment behind the Sun Festival",
      "Licensed Egyptologist guide (5+ years experience)",
      "Private air-conditioned hotel pickup & drop-off in Cairo"
    ],
    included: [
      "Transfer from & to your Cairo accommodation",
      "Round-trip domestic flights (Cairo – Abu Simbel – Cairo)",
      "All ground transfers in modern air-conditioned vehicle",
      "Guided visit to both Abu Simbel temples",
      "All site entrance fees and tickets included",
      "Licensed Egyptologist guide throughout",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "2-8 people",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "pharaohs-village-al-azhar-park-cairo",
    title: "Pharaohs Village & Al Azhar Park: Cairo Family Day Tour",
    description: "A living-history boat trip through ancient Egypt, followed by Cairo's favourite green escape — motorboat Nile crossing, licensed guide, and transfers included.",
    longDescription: "Part living museum, part city park, this Vacation in Egypt day tour is one of Cairo's best options for families and anyone who wants a lighter, more playful counterpoint to temple-hopping. You'll cruise the Nile to the open-air Pharaonic Village, then unwind at Al Azhar Park, the tree-lined hilltop known locally as the 'Green Lung of Cairo.'\n\nExperience a scenic motorboat crossing on the Nile to the living-history Pharaonic Village island where costumed actors recreate scenes of ancient Egyptian daily life, craftsmanships, and mummification. Explore the full-scale replica of Tutankhamun's tomb and treasures, the Art Center workshops, and the 'Tut Land' amusement zone. Afterward, ascend to the breathtaking gardens of Al Azhar Park atop Mokattam Hill to admire the restored 12th-century Ayyubid city wall and enjoy sweeping panoramic vistas of the Citadel and Alabaster Mosque.",
    price: 59,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/pharaohs-village.jpg",
    gallery: ["/images/pharaohs-village.jpg", "/images/al-azhar-park.jpg", "/images/SP.webp"],
    rating: 4.9,
    reviews: 142,
    location: "Cairo",
    highlights: [
      "Scenic motorboat crossing of the Nile to Pharaohs Village",
      "Costumed actors recreating daily life in ancient Egypt",
      "Detailed replica of Tutankhamun's treasures & Tut Land",
      "Panoramic Cairo views from Al Azhar Park overlooking the Citadel",
      "Restored 12th-century Ayyubid city wall of Saladin",
      "Licensed Egyptologist guide (5+ years experience)",
      "Private air-conditioned hotel transfers in Cairo"
    ],
    included: [
      "Transfer from and to your Cairo accommodation",
      "All ground transfers in modern air-conditioned vehicle",
      "Motorboat crossing to Pharaohs Village",
      "Guided visits to Pharaohs Village & Al Azhar Park",
      "All site entrance fees and tickets",
      "Licensed Egyptologist guide throughout",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "2-10 people",
    availability: "Daily",
    hot: true
  },
  {
    id: "alexandria-day-trip-from-cairo",
    title: "Alexandria Day Trip from Cairo: Pearl of the Mediterranean",
    description: "Catacombs, Roman pillar, Ottoman fortress and the Bibliotheca Alexandrina — four defining Mediterranean landmarks with lunch, guide, and transfers included.",
    longDescription: "Egypt's second city has a very different character from Cairo — Mediterranean, breezy, and layered with Greco-Roman history. On this Vacation in Egypt day trip, you'll cover four of Alexandria's defining landmarks in a single, well-paced itinerary, with a scenic coastal drive there and back.\n\nBegin your morning with an air-conditioned drive from Cairo north to the 'Pearl of the Mediterranean.' Explore the Kom El Shoqafa Catacombs cut three levels into bedrock with its fascinating fusion of Pharaonic and Greco-Roman art. Stand before Pompey's Pillar, the towering 28-metre red granite column built for Emperor Diocletian. After a delicious seafood lunch at a local restaurant, visit the 15th-century Qaitbay Citadel standing on the historic site of the ancient Pharos Lighthouse of Alexandria. Conclude your day at the iconic Bibliotheca Alexandrina, the monumental modern tribute to the ancient Great Library, before your comfortable return to Cairo.",
    price: 85,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/qaitbay-citadel.jpg",
    gallery: ["/images/qaitbay-citadel.jpg", "/images/bibliotheca-alexandrina.jpg", "/images/kom-el-shoqafa-catacombs.jpg"],
    rating: 4.8,
    reviews: 216,
    location: "Alexandria",
    highlights: [
      "Kom El Shoqafa Catacombs (3-level Roman burial site)",
      "Pompey's Pillar (28-metre red granite monument)",
      "Qaitbay Citadel on the site of the ancient Pharos Lighthouse",
      "Bibliotheca Alexandrina (modern Great Library of Alexandria)",
      "Fresh Mediterranean lunch at local restaurant",
      "Licensed Egyptologist guide (5+ years experience)",
      "Round-trip transfers from Cairo in modern air-conditioned vehicle"
    ],
    included: [
      "Transfer from and to your Cairo accommodation",
      "All ground transfers in modern air-conditioned vehicle",
      "Guided visits to all four sites listed in itinerary",
      "All site entrance fees and tickets included",
      "Lunch at a local restaurant",
      "Licensed Egyptologist guide throughout",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "2-8 people",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "cairo-museum-citadel-khan-el-khalili",
    title: "Cairo Day Tour: Egyptian Museum, Citadel of Saladin & Khan el-Khalili",
    description: "A relaxed, small-group introduction to Cairo's ancient treasures and old-world bazaar — Egyptian Museum, Citadel of Saladin, and Khan el-Khalili with lunch and guide included.",
    longDescription: "Whether you're in Cairo for a few days or just a long layover, this Vacation in Egypt small-group tour packs the city's essential sights into one comfortable day: the Egyptian Museum's ancient treasures, the Citadel of Saladin's hilltop views, and the winding lanes of Khan el-Khalili bazaar.\n\nStart your journey at the legendary Egyptian Museum in Tahrir Square, discovering the iconic Narmer Palette, the Tanis royal gold treasures, and thousands of masterworks spanning 5,000 years of civilization. Travel across central Cairo to the 12th-century medieval Citadel of Saladin perched on the Muqattam Hills. Step inside the magnificent Alabaster Mosque of Muhammad Ali and marvel at panoramic skyline vistas reaching all the way to the Giza Pyramids. Enjoy a delicious traditional Egyptian lunch before exploring the historic 14th-century Khan el-Khalili bazaar to experience its vibrant spice shops, artisan lantern workshops, and historic alleys.",
    price: 52,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/egyptian-museum-tahrir.jpg",
    gallery: ["/images/egyptian-museum-tahrir.jpg", "/images/citadel-saladin-cairo.jpg", "/images/khan-el-khalili-bazaar.jpg", "/images/al-azhar-park.jpg"],
    rating: 4.9,
    reviews: 320,
    location: "Cairo",
    highlights: [
      "The Egyptian Museum in Tahrir Square (Narmer Palette & Tanis Treasures)",
      "Citadel of Saladin medieval Islamic fortress",
      "The Great Mosque of Muhammad Ali (The Alabaster Mosque)",
      "Panoramic Cairo skyline views extending to Giza Pyramids",
      "Khan el-Khalili 14th-century historic souq & spice bazaar",
      "Traditional Egyptian lunch at a local restaurant",
      "Licensed Egyptologist guide (5+ years experience)"
    ],
    included: [
      "Round-trip transfers from & to your Cairo accommodation",
      "Modern air-conditioned vehicle transport",
      "Entrance fees to all attractions in the itinerary",
      "Traditional lunch at a local restaurant",
      "Bottled mineral water and soft drinks",
      "Licensed Egyptologist guide throughout",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "2-10 people",
    availability: "Daily",
    hot: true
  },
  {
    id: "cairo-pyramids-grand-egyptian-museum-gem",
    title: "Cairo Pyramids & Grand Egyptian Museum Tour",
    description: "Giza's three pyramids, the Great Sphinx, Valley Temple and the world's largest Tutankhamun collection at the new Grand Egyptian Museum (GEM) — lunch, guide, and transfers included.",
    longDescription: "For anyone staying in Cairo, this Vacation in Egypt tour covers the two attractions no visit to the capital should skip: the Pyramids of Giza and the Grand Egyptian Museum (GEM), just a few minutes away on the same plateau. It's a comfortable, guided pairing that fits easily into a Cairo city break.\n\nBegin your morning standing before the legendary Pyramids of Giza — Khufu, Khafre, and Menkaure — with your licensed Egyptologist who brings the 4,500-year history of the Old Kingdom to life. Marvel at the enigmatic Great Sphinx, visit the granite Valley Temple of Khafre, and enjoy a traditional Egyptian lunch. In the afternoon, explore the state-of-the-art Grand Egyptian Museum (GEM), housing over 100,000 ancient masterpieces and the legendary complete Tutankhamun collection of 5,000+ golden treasures displayed together for the first time in history.",
    price: 52,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/grand-egyptian-museum.jpg",
    gallery: ["/images/grand-egyptian-museum.jpg", "/images/pyramids.jpg", "/images/SP.webp"],
    rating: 4.9,
    reviews: 435,
    location: "Cairo",
    highlights: [
      "The Great Pyramids of Giza (Khufu, Khafre & Menkaure)",
      "The iconic Great Sphinx of Giza",
      "Valley Temple of King Khafre",
      "Grand Egyptian Museum (GEM) complete Tutankhamun collection",
      "Over 100,000 ancient Egyptian masterworks & royal artifacts",
      "Traditional Egyptian lunch at a local restaurant",
      "Licensed Egyptologist guide (5+ years experience)",
      "Private air-conditioned hotel pickup & drop-off in Cairo"
    ],
    included: [
      "Round-trip transfers from & to your Cairo accommodation",
      "Modern air-conditioned vehicle transport",
      "All site entrance fees and tickets included",
      "Grand Egyptian Museum (GEM) admission",
      "Traditional lunch at a local restaurant",
      "Licensed Egyptologist guide throughout",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "2-8 people",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "coptic-quarter-old-cairo-heritage",
    title: "Coptic Quarter & Old Cairo: Christian Heritage Day Tour",
    description: "The Hanging Church, Abu Serga, El Zeitoun and the Tree of the Blessed Virgin Mary — four landmarks central to Egypt's Christian heritage with lunch and guide included.",
    longDescription: "Cairo's Coptic Quarter holds some of the oldest and most significant Christian sites in the world. This Vacation in Egypt day tour through Old Cairo visits four landmarks central to Egypt's Christian heritage — a meaningful journey for pilgrims and history lovers alike.\n\nBegin your pilgrimage at the historic Tree of the Blessed Virgin Mary in El Matariya, where the Holy Family rested during their flight into Egypt. Visit the celebrated St. Mary's Coptic Orthodox Church in El Zeitoun, renowned for the 1968 Marian apparitions. After a traditional lunch, journey into Old Cairo to visit the iconic Hanging Church (Al-Muallaqa) suspended above the Roman fortress of Babylon. Conclude at the 5th-century Church of St. Sergius and Bacchus (Abu Serga), entering the ancient crypt where the Holy Family sheltered.",
    price: 48,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/hanging-church-cairo.jpg",
    gallery: ["/images/hanging-church-cairo.jpg", "/images/al-azhar-park.jpg", "/images/dining-experience.jpg"],
    rating: 4.9,
    reviews: 188,
    location: "Cairo",
    highlights: [
      "Tree of the Blessed Virgin Mary in El Matariya",
      "El Zeitoun Church (Site of 1968 Marian apparitions)",
      "The Hanging Church (Al-Muallaqa) over Roman Babylon Fortress",
      "Abu Serga Church & the sacred Holy Family Crypt",
      "Historic Roman Babylon Fortress walls",
      "Traditional Egyptian lunch at a local restaurant",
      "Licensed Egyptologist guide (5+ years experience)",
      "Private air-conditioned hotel transfers in Cairo"
    ],
    included: [
      "Round-trip transfers from & to your Cairo accommodation",
      "All transportation in modern air-conditioned vehicle",
      "All site entrance fees and donations included",
      "Traditional lunch at a local restaurant",
      "Licensed Egyptologist guide throughout",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "2-8 people",
    availability: "Daily",
    hot: true
  },
  {
    id: "nile-dinner-cruise-cairo-oriental-show",
    title: "Nile Dinner Cruise in Cairo with Oriental Show",
    description: "Dinner, live music and a Tanoura & belly dance performance aboard a luxury 5-star cruise ship on the illuminated Nile — open buffet and transfers included.",
    longDescription: "For an evening that shows off a different side of Cairo, Vacation in Egypt's Nile dinner cruise pairs a buffet dinner aboard a 5-star cruise ship with a live Tanoura and belly dance show, all set against the city's illuminated waterfront.\n\nEnjoy an evening pickup from your Cairo accommodation before boarding a luxury 5-star Nile cruiser. Glide across the moonlit waters while admiring the glowing Cairo skyline and bridges. Savor a rich open-buffet dinner featuring authentic Egyptian specialties and international dishes accompanied by a live oriental band. Marvel at a mesmerizing Tanoura (whirling dervish) folklore dance and captivating belly dance performance, or head to the open-air upper sun deck to take in the panoramic river breeze.",
    price: 69,
    currency: "EUR",
    duration: "3 hours",
    category: "Cruise",
    image: "/images/dining-experience.jpg",
    gallery: ["/images/dining-experience.jpg", "/images/nile-cruise.jpg", "/images/citadel-saladin-cairo.jpg"],
    rating: 4.8,
    reviews: 275,
    location: "Cairo",
    highlights: [
      "Luxury sailing aboard a 5-star Nile cruise ship",
      "Illuminated Cairo skyline & iconic river bridges",
      "Gourmet open-buffet dinner with vegetarian & meat options",
      "Authentic live Tanoura (Whirling Dervish) folklore show",
      "Live oriental band & captivating belly dance performance",
      "Open-air panoramic observation deck",
      "Private air-conditioned hotel transfers in Cairo"
    ],
    included: [
      "Round-trip transfers from & to your Cairo accommodation",
      "Modern air-conditioned vehicle transport",
      "Dinner cruise aboard a 5-star Nile cruise ship",
      "Full open-buffet dinner",
      "Live Oriental show & folkloric entertainment",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "Individual / Groups",
    availability: "Daily evening",
    hot: true
  },
  {
    id: "fayum-oasis-waterfalls-lakes-day-trip",
    title: "Fayum Oasis Day Trip from Cairo: Waterfalls, Lakes & Ancient Ruins",
    description: "Egypt's only waterfalls, Lake Qarun, Qasr Qarun Temple, and Wadi El Rayan Valley of the Whales — lunch, guide, and transfers included.",
    longDescription: "Away from temples and pyramids, this Vacation in Egypt day trip heads into the Fayum region for a different kind of Egyptian landscape — desert waterfalls, an ancient salt lake, and one of the country's most unusual UNESCO sites.\n\nDepart Cairo in the early morning to the lush Fayum region. Discover the Greco-Roman ruins of Karanis and the famous historic wooden water wheels. Travel to Lake Qarun, one of the world's oldest natural saline lakes, sitting 45 metres below sea level. Visit the mysterious Ptolemaic temple of Qasr Qarun with its underground tunnels and crocodile god Sobek reliefs. Conclude at the protected nature reserve of Wadi El Rayan, witnessing Egypt's only desert waterfalls connecting two turquoise lakes, and the ancient desert landscapes of the Valley of the Whales before returning to Cairo.",
    price: 69,
    currency: "EUR",
    duration: "Full Day",
    category: "Adventure",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg", "/images/bedouin-dinner.jpg", "/images/Saqqara.webp"],
    rating: 4.8,
    reviews: 195,
    location: "Cairo",
    highlights: [
      "Karanis Greco-Roman ruins & Fayum wooden water wheels",
      "Lake Qarun (ancient lake 45m below sea level)",
      "Qasr Qarun Ptolemaic Temple of Sobek & rooftop vista",
      "Wadi El Rayan Protected Area & Egypt's only waterfalls",
      "Valley of the Whales (Wadi Al-Hitan) landscape",
      "Traditional lunch at a local restaurant",
      "Licensed Egyptologist guide (5+ years experience)",
      "Private air-conditioned hotel transfers from Cairo"
    ],
    included: [
      "Pick-up and drop-off from your Cairo accommodation",
      "All transfers in a modern air-conditioned vehicle",
      "Visits to all attractions with entrance fees included",
      "Licensed Egyptologist guide for your private tour",
      "Lunch at a local restaurant",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "2-8 people",
    availability: "Daily",
    hot: true
  },
  {
    id: "pyramids-memphis-saqqara-full-story",
    title: "Pyramids, Memphis & Saqqara Tour: Cairo's Full Pyramid Story",
    description: "From Giza's icons to the Step Pyramid that started it all — small group tour (up to 7 people) exploring Giza Pyramids, ancient capital of Memphis, and Djoser's Step Pyramid in Saqqara with lunch and guide included.",
    longDescription: "See the whole arc of pyramid-building in one day. Vacation in Egypt's small-group tour (up to 7 people) pairs the Pyramids of Giza with Memphis, ancient Egypt's first capital, and Saqqara's Step Pyramid — the structure that came before the classic pyramid shape existed.\n\nStart your morning standing beside the majestic Pyramids of Giza (Khufu, Khafre, Menkaure) and the Great Sphinx with your licensed Egyptologist. Enjoy a traditional lunch before driving to ancient Memphis, Egypt's first unified capital founded over 5,000 years ago, to admire colossal statues including the alabaster Sphinx and fallen colossus of Ramses II. Conclude at the sprawling necropolis of Saqqara, home to Djoser's 6-tiered Step Pyramid built by Imhotep — the world's earliest monumental stone building that ignited the age of the pyramids.",
    price: 62,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/Saqqara.webp",
    gallery: ["/images/Saqqara.webp", "/images/SP.webp", "/images/pyramids.jpg"],
    rating: 4.9,
    reviews: 380,
    location: "Cairo",
    highlights: [
      "Pyramids of Giza (Khufu, Khafre & Menkaure)",
      "The Great Sphinx & Valley Temple",
      "Memphis: Egypt's ancient first capital & open-air museum",
      "Saqqara Necropolis & Djoser's 62m Step Pyramid",
      "Intimate small-group format (up to 7 people)",
      "Traditional Egyptian lunch at a local restaurant",
      "Licensed Egyptologist guide (5+ years experience)",
      "Private air-conditioned hotel pickup & drop-off in Cairo"
    ],
    included: [
      "Pick-up and drop-off from your Cairo hotel",
      "All transfers in modern air-conditioned vehicles",
      "All site entrance fees and tickets included",
      "Licensed Egyptologist guide throughout",
      "Lunch at a local restaurant",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "Small group (up to 7 people)",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "pyramids-sound-and-light-show-cairo",
    title: "Sound and Light Show at the Pyramids: Cairo Evening Tour",
    description: "A 45-minute laser, music and narration spectacle telling the story of Giza after dark through the voice of the Sphinx — show tickets and hotel transfers included.",
    longDescription: "See the Giza Plateau in a completely different light — literally. Vacation in Egypt's evening tour brings you to the illuminated Pyramids of Giza for the long-running Sound and Light Show, a multimedia retelling of ancient Egyptian history set against the monuments themselves.\n\nArrive at the Giza Plateau as twilight settles over the desert sands. Take your reserved seat as the iconic 45-minute show begins, projecting vibrant laser beams and dramatic lighting across the Great Pyramids of Khufu, Khafre, Menkaure and the Mummification Temple. Listen to the epic orchestral soundtrack and storytelling narrated by the 'voice' of the Great Sphinx, recounting 5,000 years of pharaonic triumphs, architectural wonders, and timeless Egyptian mythology before your comfortable return to Cairo.",
    price: 47,
    currency: "EUR",
    duration: "2 hours",
    category: "Historical",
    image: "/images/SP.webp",
    gallery: ["/images/SP.webp", "/images/pyramids.jpg", "/images/grand-egyptian-museum.jpg"],
    rating: 4.8,
    reviews: 290,
    location: "Cairo",
    highlights: [
      "Illuminated evening atmosphere on the Giza Plateau",
      "45-minute Pyramids Sound & Light Show",
      "Dramatic laser projections across Pyramids & Great Sphinx",
      "Ancient history narration voiced by the Great Sphinx",
      "Reserved seated amphitheatre viewing",
      "Private air-conditioned round-trip hotel transfers in Cairo"
    ],
    included: [
      "Round-trip transfers from & to your accommodation",
      "All transfers in a modern air-conditioned vehicle",
      "Sound and Light Show ticket and seating",
      "All entrance fees for the show",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "Individual / Groups",
    availability: "Daily evening",
    hot: true
  },
  {
    id: "cairo-private-day-trip-from-hurghada",
    title: "Cairo Day Trip from Hurghada: Museum, Citadel & Old Cairo (Private Tour)",
    description: "A private VIP day tour from Hurghada to Cairo for up to 7 guests — your choice of the Grand Egyptian Museum or Tahrir Museum, Citadel of Saladin, Coptic Old Cairo & Khan el-Khalili with lunch and private guide included.",
    longDescription: "Cover Cairo's cultural core in a single day without joining a big bus group. This Vacation in Egypt private day trip from Hurghada takes a group of up to seven travellers to the Egyptian Museum (or the new Grand Egyptian Museum, your choice), the Citadel of Saladin, Old Cairo's Coptic churches, and the Khan el-Khalili Bazaar, all with your own dedicated guide.\n\nEnjoy early morning private pickup from your Hurghada accommodation in a luxury air-conditioned vehicle. In Cairo, explore your chosen museum (the new Grand Egyptian Museum with the complete Tutankhamun collection or the historic Egyptian Museum in Tahrir Square). Journey to the medieval Citadel of Saladin and the magnificent Alabaster Mosque of Muhammad Ali with panoramic views reaching across Cairo. Savor a traditional lunch before discovering Old Cairo's Coptic heritage — visiting the Hanging Church and the Holy Family crypt at Abu Serga Church. Conclude with free time in the vibrant alleys of Khan el-Khalili bazaar before your private return drive to Hurghada.",
    price: 115,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/egyptian-museum-tahrir.jpg",
    gallery: ["/images/egyptian-museum-tahrir.jpg", "/images/citadel-saladin-cairo.jpg", "/images/khan-el-khalili-bazaar.jpg", "/images/hanging-church-cairo.jpg"],
    rating: 4.9,
    reviews: 284,
    location: "Hurghada",
    highlights: [
      "Private VIP small group tour from Hurghada (up to 7 guests)",
      "Choice of Grand Egyptian Museum (GEM) or Tahrir Egyptian Museum",
      "Citadel of Saladin & Alabaster Mosque of Muhammad Ali",
      "Old Cairo Coptic Quarter: The Hanging Church & Abu Serga",
      "Khan el-Khalili historic 14th-century bazaar",
      "Traditional Egyptian lunch & refreshments included",
      "Dedicated private licensed Egyptologist guide (5+ years experience)",
      "Round-trip private air-conditioned transport from Hurghada"
    ],
    included: [
      "Hotel pickup and drop-off in Hurghada",
      "All transfers in a modern air-conditioned vehicle",
      "Guided visits to all sites listed with entrance fees included",
      "Private licensed Egyptologist guide for your group of up to 7",
      "Lunch at a local restaurant",
      "Mineral water and soft drinks during the tour",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "Private (up to 7 people)",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "cairo-day-trip-hurghada-bus-pyramids-gem",
    title: "Cairo Day Trip from Hurghada by Bus: Pyramids & Grand Egyptian Museum",
    description: "A small-group day trip (up to 7 guests) to the Pyramids of Giza, the Great Sphinx and the Grand Egyptian Museum with lunch and guide included.",
    longDescription: "See Egypt's most iconic landmark on a comfortable small-group day trip from the Red Sea coast. Vacation in Egypt's Cairo bus tour from Hurghada focuses on the essentials — the Pyramids of Giza, the Great Sphinx and the Grand Egyptian Museum — in a relaxed group of up to seven travellers with your own Egyptologist guide.\n\nDepart Hurghada in the early morning in a comfortable air-conditioned vehicle. Arrive at the Giza Plateau to stand before the last remaining Wonder of the Ancient World — the Great Pyramids of Khufu, Khafre, and Menkaure. Visit the enigmatic Great Sphinx and the monolithic Valley Temple. Following a traditional lunch, discover the world-class Grand Egyptian Museum (GEM) showcasing the complete Tutankhamun golden treasure collection. Finish with panoramic vistas from the medieval Citadel of Saladin and the vibrant lanes of Khan el-Khalili bazaar before your return journey to Hurghada.",
    price: 95,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/pyramids.jpg",
    gallery: ["/images/pyramids.jpg", "/images/grand-egyptian-museum.jpg", "/images/SP.webp", "/images/khan-el-khalili-bazaar.jpg"],
    rating: 4.9,
    reviews: 412,
    location: "Hurghada",
    highlights: [
      "Small-group tour from Hurghada (up to 7 guests)",
      "Pyramids of Giza (Khufu, Khafre & Menkaure)",
      "The Great Sphinx of Giza & Valley Temple",
      "Grand Egyptian Museum (GEM) Tutankhamun collection",
      "Citadel of Saladin & Muhammad Ali Mosque views",
      "Khan el-Khalili historic bazaar",
      "Traditional Egyptian lunch at a local restaurant",
      "Licensed Egyptologist guide (5+ years experience)",
      "Round-trip air-conditioned transfers from Hurghada"
    ],
    included: [
      "Transfer from and to your accommodation in Hurghada",
      "All transfers in a modern, air-conditioned vehicle",
      "All attractions listed with entrance fees included",
      "Licensed Egyptologist guide for your small-group tour",
      "Mineral water and soft drinks during the tour",
      "Lunch at a local restaurant",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "Small group (up to 7 people)",
    availability: "Daily",
    hot: true
  },
  {
    id: "hurghada-morning-quad-tour-atv-safari",
    title: "Hurghada Morning Quad Tour: 3-Hour Desert ATV Safari",
    description: "Ride the dunes and visit an authentic Bedouin village on a 3-hour Eastern Desert ATV quad safari with camel ride, guide, and hotel transfers included — no licence required.",
    longDescription: "Trade the beach for the desert for a morning with Vacation in Egypt's quad bike safari, combining a 3-hour ATV ride through the Eastern Desert with a visit to a traditional Bedouin village. No driving licence needed — just a sense of adventure.\n\nEnjoy an early morning pickup from your Hurghada accommodation to the desert quad base camp. After a safety briefing and practice run, throttle across the golden desert dunes and rugged valleys flanking the Red Sea mountain range. Arrive at an authentic Bedouin village to sip traditional Bedouin tea, learn about desert traditions and bread-making, and enjoy a short camel ride before racing across the desert trails back to base camp.",
    price: 30,
    currency: "EUR",
    duration: "3 hours",
    category: "Adventure",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg", "/images/bedouin-dinner.jpg", "/images/beach-resort.jpg"],
    rating: 4.8,
    reviews: 540,
    location: "Hurghada",
    highlights: [
      "3-hour self-drive ATV quad safari across Eastern Desert dunes",
      "No driving licence required — beginner friendly",
      "Visit to an authentic traditional Bedouin village",
      "Traditional Bedouin tea and cultural hospitality",
      "Scenic camel ride through desert trails",
      "Professional certified quad bike guides & safety gear",
      "Round-trip hotel transfers in Hurghada"
    ],
    included: [
      "Round-trip transfer from & to your accommodation in Hurghada",
      "All transfers in modern, air-conditioned vehicle",
      "3-hour ATV quad bike rental & safety helmet",
      "Visit to a traditional Bedouin village",
      "Short camel ride",
      "Experienced, professional quad bike guides",
      "Bedouin tea & bottled mineral water",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "2-15 people (Single & Double Quads available)",
    availability: "Daily (Morning departure)",
    hot: true,
    discount: 10
  },
  {
    id: "luxor-east-west-bank-2-day-tour-hurghada",
    title: "Luxor East & West Bank: 2-Day Tour from Hurghada",
    description: "A 2-day small-group tour covering both East & West Banks of Luxor — Karnak, Luxor Temple, Valley of the Kings and Hatshepsut Temple — with overnight 4-star hotel, breakfast, lunch, guide and transfers included.",
    longDescription: "One long day trip from Hurghada isn't really enough time to do Luxor justice. This Vacation in Egypt 2-day small-group tour splits the sightseeing across the East and West Banks with an overnight hotel stay in between, so you can explore both without feeling rushed.\n\nDay 1: Depart Hurghada early to reach the East Bank. Enter the legendary Karnak Temple along the Avenue of Sphinxes into the colossal Hypostyle Hall surrounding the Sacred Lake. After lunch in Luxor, visit the riverside Luxor Temple, dedicated to Amun and used for royal coronation ceremonies. Check into your 4-star Luxor hotel for an optional evening Sound and Light Show.\n\nDay 2: Cross to the West Bank after breakfast for the Valley of the Kings, visiting three richly decorated royal tombs. Explore the massive mortuary temple of Ramses III at Medinet Habu, then visit Deir El-Medina — the artisans' village whose skilled craftsmen decorated the royal tombs for over 450 years — before the return drive to Hurghada.",
    price: 209,
    currency: "EUR",
    duration: "2 Days / 1 Night",
    category: "Historical",
    image: "/images/1.jpg",
    gallery: [
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
      "/images/6.jpg",
      "/images/7.jpg",
      "/images/8.jpg"
    ],
    rating: 4.9,
    reviews: 347,
    location: "Hurghada",
    highlights: [
      "Karnak Temple Complex & Avenue of Sphinxes (East Bank)",
      "Luxor Temple along the Nile promenade (East Bank)",
      "Valley of the Kings — 3 richly decorated royal tombs (West Bank)",
      "Medinet Habu, mortuary temple of Ramses III (West Bank)",
      "Deir El-Medina artisans' village & cemeteries (West Bank)",
      "Overnight stay & breakfast at a 4-star Luxor hotel",
      "Licensed Egyptologist guide throughout both days",
      "Round-trip air-conditioned transport from Hurghada"
    ],
    included: [
      "Round-trip transfers from & to your accommodation in Hurghada",
      "All transportation in modern, air-conditioned vehicles",
      "Overnight stay and breakfast at a 4-star hotel in Luxor",
      "All entrance fees to attractions listed in itinerary",
      "Licensed Egyptologist guide throughout the tour",
      "Lunch at a local restaurant",
      "Mineral water and soft drinks during the tour",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "Small group",
    availability: "Daily",
    hot: true
  },
  {
    id: "dolphin-house-snorkeling-trip-hurghada",
    title: "Dolphin House Snorkeling Trip from Hurghada",
    description: "Full-day boat trip to Sha'ab El Erg (Dolphin House) to swim near wild spinner dolphins and explore two Red Sea coral reefs — snorkeling gear, buffet lunch and hotel transfers all included.",
    longDescription: "Sha'ab El Erg, better known to everyone in Hurghada as 'Dolphin House,' is a shallow reef system just north of the marina home to a resident pod of wild spinner dolphins. Vacation in Egypt's full-day boat trip pairs a great chance of a dolphin sighting with two guided snorkeling stops at nearby coral reefs, plus a freshly prepared buffet lunch on board.\n\nAfter pickup from your Hurghada accommodation, collect your mask, fins and life jacket at the marina before pushing off toward the open Red Sea. The boat heads for Sha'ab El Erg, where the resident spinner dolphin pod regularly gathers — wild sightings can't be guaranteed but the experienced crew knows these reefs intimately and times the visit for the best chance of an encounter. Two separate coral reef stops reveal the Red Sea's rich marine biodiversity from different angles, before a freshly prepared on-board buffet lunch and relaxed sun-deck time rounding off an unforgettable Red Sea day.",
    price: 39,
    currency: "EUR",
    duration: "Full Day (approx. 8 hours)",
    category: "Sea",
    image: "/images/dolphin-tour.jpg",
    gallery: ["/images/dolphin-tour.jpg", "/images/hero-redsea.jpg", "/images/scuba-diving.jpg"],
    rating: 4.8,
    reviews: 620,
    location: "Hurghada",
    highlights: [
      "Boat trip to Sha'ab El Erg — natural habitat of wild spinner dolphins",
      "Wild dolphin encounter (resident pod — sightings very frequent)",
      "Two guided snorkeling stops at separate Red Sea coral reefs",
      "Vibrant Red Sea marine life & coral gardens",
      "Freshly prepared buffet lunch served on board",
      "Free relaxation time on the sun deck",
      "Snorkeling gear included (mask, snorkel, fins, life jacket)",
      "Round-trip hotel transfers in Hurghada"
    ],
    included: [
      "Transfer from & to your accommodation in Hurghada",
      "All transfers in modern air-conditioned vehicles",
      "Full-day boat trip with experienced crew",
      "Snorkeling equipment (mask, snorkel, fins, life jacket)",
      "Two guided snorkeling stops at coral reefs",
      "Buffet lunch on board",
      "Mineral water and soft drinks throughout",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "Group (shared boat)",
    availability: "Daily",
    hot: true
  },
  {
    id: "cairo-day-trip-hurghada-by-flight-pyramids",
    title: "Cairo Day Trip from Hurghada by Flight: Pyramids, Sphinx & Grand Museum",
    description: "Skip the 10-hour round-trip drive — fly from Hurghada to Cairo for the day. Pyramids of Giza, Great Sphinx and Grand Egyptian Museum with return flights, private guide, lunch and transfers all included.",
    longDescription: "The road trip from Hurghada to Cairo and back takes the better part of a day on its own. Vacation in Egypt's flight-based alternative gets you there and back the same day with far more time actually in front of the Pyramids of Giza, the Great Sphinx and the Grand Egyptian Museum, travelling in a small group with your own Egyptologist guide.\n\nAn early transfer to Hurghada Airport for your short domestic flight to Cairo. On arrival your licensed Egyptologist meets you immediately for a private guided tour of the iconic Giza Plateau — the three Great Pyramids (Khufu, Khafre, Menkaure), the majestic Great Sphinx, and the ancient Valley Temple. After a traditional Egyptian lunch, spend the afternoon at the Grand Egyptian Museum (GEM) — one of the world's greatest museums — discovering over 100,000 artefacts including the complete golden treasures of Tutankhamun displayed together for the first time since 1922. Return to Cairo Airport for your flight back to Hurghada.",
    price: 345,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/grand-egyptian-museum.jpg",
    gallery: ["/images/grand-egyptian-museum.jpg", "/images/pyramids.jpg", "/images/SP.webp"],
    rating: 4.9,
    reviews: 318,
    location: "Hurghada",
    highlights: [
      "Round-trip domestic flight Hurghada ↔ Cairo (time-saving)",
      "Pyramids of Giza (Khufu, Khafre & Menkaure)",
      "The Great Sphinx of Giza & Valley Temple",
      "Grand Egyptian Museum (GEM) — complete Tutankhamun collection",
      "Small group of up to 7 with private Egyptologist guide",
      "Traditional Egyptian lunch at a local restaurant",
      "All Cairo ground transfers in private air-conditioned vehicles",
      "All site entrance fees included"
    ],
    included: [
      "Transfer from & to your accommodation in Hurghada",
      "All ground transfers in modern, air-conditioned vehicles",
      "Return domestic flights (Hurghada – Cairo – Hurghada)",
      "All entrance fees for all sites listed in itinerary",
      "Lunch at a local restaurant in Cairo",
      "Licensed Egyptologist guide throughout",
      "Dedicated travel agent support throughout"
    ],
    groupSize: "Small group (up to 7 people)",
    availability: "Daily (subject to flight schedule)",
    hot: true,
    discount: 10
  },
  {
    id: "dendera-abydos-day-trip-hurghada",
    title: "Dendera & Abydos Day Trip from Hurghada",
    description: "A single full-day trip from Hurghada to two of Upper Egypt's best-preserved temples — the Dendera Zodiac and Abydos King List — with Egyptologist guide, lunch and transfers included.",
    longDescription: "Dendera and Abydos rarely see the crowds that fill Luxor or Giza, which is exactly what makes them worth the distance. Vacation in Egypt runs this as a single, long day trip from Hurghada — an early start and a full day on the road, in exchange for two of Egypt's most vividly preserved temple interiors.\n\nDepart Hurghada well before sunrise for the 4–4.5 hour drive west across the Eastern Desert toward the Nile Valley. At Dendera, explore the remarkably well-preserved temple of the goddess Hathor, famous for its extraordinary Dendera Zodiac astronomical ceiling relief and vivid original paintwork. Continue to Abydos to visit the Temple of Seti I, celebrated for its exquisitely detailed low-relief carvings and the Abydos King List — one of ancient Egypt's most important royal succession records. Discover the enigmatic Osireion, a mysterious sunken structure believed to be a symbolic tomb of the god Osiris. After lunch at a local restaurant, enjoy the scenic Nile Valley drive back across the Eastern Desert to Hurghada.",
    price: 115,
    currency: "EUR",
    duration: "Full Day (approx. 14 hours)",
    category: "Historical",
    image: "/images/LUX VISIT.webp",
    gallery: ["/images/LUX VISIT.webp", "/images/luxor-temple.jpg", "/images/hot-air-balloon.jpg"],
    rating: 4.9,
    reviews: 198,
    location: "Hurghada",
    highlights: [
      "Dendera Temple of Hathor with vivid original colours intact",
      "The Dendera Zodiac — Egypt's most famous astronomical ceiling relief",
      "Abydos Temple of Seti I & its exquisite low-relief carvings",
      "The Abydos King List — ancient Egypt's royal succession record",
      "The Osireion — mysterious symbolic tomb of the god Osiris",
      "Lunch at a local restaurant in the Nile Valley",
      "Licensed Egyptologist guide throughout",
      "Private air-conditioned transport from Hurghada"
    ],
    included: [
      "Transfer from & to your hotel in Hurghada",
      "All transfers in a modern, air-conditioned vehicle",
      "All entrance fees for Dendera and Abydos",
      "Lunch at a local restaurant",
      "Mineral water and soft drinks during the tour",
      "Licensed Egyptologist guide throughout the tour"
    ],
    groupSize: "Private / Small group",
    availability: "Daily",
    hot: true
  },
  {
    id: "orange-bay-snorkeling-trip-hurghada",
    title: "Orange Bay Snorkeling Trip from Hurghada",
    description: "A full-day Red Sea boat trip to Orange Bay ('Egyptian Maldives') on the Giftun Islands — two coral reef snorkeling stops, white-sand beach time, buffet lunch and hotel transfers all included.",
    longDescription: "Orange Bay has earned its nickname as the 'Egyptian Maldives' fairly — a sweep of white sand on the Giftun Islands, ringed by a shallow turquoise lagoon. Vacation in Egypt's boat trip pairs the beach with two snorkeling stops on the way, making it one of the more relaxed full days you can spend on the Red Sea.\n\nAfter morning pickup from your Hurghada accommodation, board a comfortable boat with sun deck and shaded seating at the marina. En route to Orange Bay, explore two of the area's finest Red Sea coral reef sites — each offering a distinctly different mix of marine life and coral formations. A freshly prepared buffet lunch is served on board before landing on Orange Bay's stunning white sand beach for free time to swim, sunbathe, or enjoy an optional banana boat ride. The protected lagoon is barely 5 metres deep, making it ideal for families and non-swimmers.",
    price: 35,
    currency: "EUR",
    duration: "Full Day",
    category: "Sea",
    image: "/images/beach-resort.jpg",
    gallery: ["/images/beach-resort.jpg", "/images/yacht-charter.jpg", "/images/scuba-diving.jpg", "/images/hero-redsea.jpg"],
    rating: 4.8,
    reviews: 710,
    location: "Hurghada",
    highlights: [
      "Orange Bay 'Egyptian Maldives' — white sand & turquoise lagoon",
      "Part of the protected Giftun Islands National Park",
      "Two guided snorkeling stops at Red Sea coral reefs",
      "Vibrant Red Sea marine life & coral gardens",
      "Beach time: sunbeds & shaded huts on Orange Bay",
      "Freshly prepared buffet lunch with fresh fruit on board",
      "Snorkeling equipment provided (mask, snorkel, fins, life jacket)",
      "Round-trip hotel transfers in Hurghada"
    ],
    included: [
      "Transfer from & to your accommodation in Hurghada",
      "All transfers in modern air-conditioned vehicles",
      "Boat tour with sun deck and shaded seating",
      "Snorkeling equipment throughout",
      "Two guided snorkeling stops at coral reefs",
      "Orange Bay Island entrance fee",
      "Buffet lunch on board with fresh fruit",
      "Mineral water and soft drinks throughout",
      "Experienced snorkeling guides"
    ],
    groupSize: "Group (shared boat)",
    availability: "Daily",
    hot: true
  },
  {
    id: "st-anthony-st-paul-monasteries-hurghada",
    title: "St. Anthony & St. Paul Monasteries Day Trip from Hurghada",
    description: "A full-day cultural and spiritual journey from Hurghada to two of the world's oldest working Christian monasteries, hidden in the Red Sea mountains — with resident monk guides, entrance fees, lunch and transfers included.",
    longDescription: "Long before monasticism spread across the Christian world, it began here, in the rocky Galala mountains north of Hurghada. This day trip from Hurghada visits both hermit communities — founded in the 4th century and still active today — with guided time inside each led partly by resident monks.\n\nDepart Hurghada in the early morning for a scenic drive north along the Red Sea coast and inland through dramatic Red Sea mountain scenery. At St. Anthony's Monastery (founded 356 AD, one of the world's oldest continuously inhabited monasteries), visit the church housing St. Anthony's tomb and, for the willing, climb approximately 1,200 steps to the cave where he lived — rewarded with panoramic views over the desert and the Red Sea. Drive across the southern Galala Plateau to St. Paul's Monastery (Tiger Monastery), built over the cave of St. Paul of Thebes, featuring century-old frescoes restored 1997–2005 and the sacred Cave Church containing his remains. A lunch stop is included before the return drive to Hurghada.",
    price: 54,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg", "/images/bedouin-dinner.jpg", "/images/hanging-church-cairo.jpg"],
    rating: 4.9,
    reviews: 183,
    location: "Hurghada",
    highlights: [
      "Scenic Galala Plateau drive through the Red Sea mountains",
      "St. Anthony's Monastery (est. 356 AD) — one of the world's oldest",
      "St. Anthony's hermit cave — approx. 1,200 steps with panoramic views",
      "St. Paul's Monastery (Tiger Monastery), founded 4th century",
      "Cave Church of St. Paul with centuries-old restored frescoes",
      "Guided visits partly led by resident Coptic monks",
      "Lunch at a local restaurant included",
      "Private air-conditioned transport from Hurghada"
    ],
    included: [
      "Transfer from & to your accommodation in Hurghada",
      "All transfers in modern air-conditioned vehicles",
      "All entrance fees for both monasteries",
      "Guided visits inside each monastery (partly by resident monks)",
      "Lunch during the tour",
      "Mineral water and soft drinks throughout",
      "Travel agent support for pickup and drop-off"
    ],
    groupSize: "Private / Small group",
    availability: "Daily",
    hot: true
  },
  {
    id: "hurghada-super-safari-quad-buggy-jeep-bbq",
    title: "Hurghada Super Safari: Quad, Buggy, Jeep & BBQ Dinner",
    description: "Three desert vehicles in one evening — quad bike, dune buggy and 4x4 jeep — plus a Bedouin village visit, camel ride, freshly grilled BBQ dinner and a live folklore show under the Eastern Desert stars.",
    longDescription: "For travellers who can't decide between a quad, a buggy or a jeep, Vacation in Egypt's Super Safari settles the question by including all three, plus a Bedouin village visit and a barbecue dinner with live entertainment to close out the evening in the Eastern Desert outside Hurghada.\n\nA 4x4 jeep collects you from your hotel for the desert drive to the quad station. After a quick briefing (no licence required), a tour leader guides your group across the dunes on quad bikes — the pace builds as you get comfortable. Back at base, swap to a dune buggy for a thrillingly different desert-rally style ride. The jeep then carries the group to an authentic Bedouin village, where tea, a camel ride, and an insight into desert life await. As the sun sets, gather at the desert base camp for a freshly grilled BBQ dinner under the stars, followed by a traditional Bedouin folklore show of music and dance before the drive back to Hurghada.",
    price: 39,
    currency: "EUR",
    duration: "6-7 hours (Afternoon & Evening)",
    category: "Adventure",
    image: "/images/bedouin-dinner.jpg",
    gallery: ["/images/bedouin-dinner.jpg", "/images/desert-safari.jpg", "/images/beach-resort.jpg"],
    rating: 4.8,
    reviews: 865,
    location: "Hurghada",
    highlights: [
      "Quad bike ride across Eastern Desert dunes",
      "Dune buggy driving (solo or up to 3 passengers)",
      "4x4 jeep tour to an authentic Bedouin village",
      "Traditional Bedouin tea & cultural hospitality",
      "Short camel ride at the Bedouin village",
      "Freshly grilled BBQ dinner under the stars",
      "Live Bedouin folklore show with music & dance",
      "Round-trip hotel transfers in Hurghada"
    ],
    included: [
      "Transfer from & to your accommodation in Hurghada",
      "All transfers in modern air-conditioned vehicles",
      "ATV quad bike ride",
      "Dune buggy ride",
      "4x4 jeep tour to Bedouin village",
      "Camel ride",
      "Barbecue dinner with soft drinks",
      "Folklore show with music and dance",
      "Mineral water during the tour"
    ],
    groupSize: "Group",
    availability: "Daily (Afternoon departure)",
    hot: true,
    discount: 10
  },
  {
    id: "paradise-island-snorkeling-trip-hurghada",
    title: "Paradise Island Snorkeling Trip from Hurghada",
    description: "A relaxed full-day Red Sea boat trip from Hurghada — two guided coral reef snorkeling stops, free time on Paradise Island's iconic white sandbar, and an on-board buffet lunch included.",
    longDescription: "Paradise Island's calling card is its long white sandbar and shallow, calm lagoon — more of a beach day than an adventure sport, though the two snorkeling stops on the way there give it a proper Red Sea credential too. Vacation in Egypt runs this as a relaxed full-day boat trip from Hurghada.\n\nAfter morning pickup from your Hurghada hotel, board a comfortable boat at the marina and set off across the vivid turquoise Red Sea. En route to Paradise Island, the boat pauses at two outstanding coral reef sites for guided snorkeling — each offering a different mix of marine life and coral formations. Arrive at Paradise Island's iconic white sandbar, where calm shallow lagoon waters (ideal for families and beginners) invite swimming, sunbathing, and relaxation. A freshly prepared on-board buffet lunch with soft drinks rounds out the experience before a scenic afternoon sail back to Hurghada Marina.",
    price: 39,
    currency: "EUR",
    duration: "Full Day",
    category: "Sea",
    image: "/images/beach-resort.jpg",
    gallery: ["/images/beach-resort.jpg", "/images/scuba-diving.jpg", "/images/hero-redsea.jpg", "/images/yacht-charter.jpg"],
    rating: 4.8,
    reviews: 580,
    location: "Hurghada",
    highlights: [
      "Two guided snorkeling stops at Red Sea coral reefs",
      "Free time on Paradise Island's white sandbar",
      "Shallow calm lagoon — perfect for families & beginners",
      "Vibrant Red Sea marine life & coral gardens",
      "Buffet lunch on board with soft drinks",
      "Mineral water, tea and coffee throughout",
      "Snorkeling equipment provided on board",
      "Round-trip hotel transfers in Hurghada"
    ],
    included: [
      "Transfer from & to your accommodation in Hurghada",
      "All transfers in modern air-conditioned vehicles",
      "Boat trip with two guided snorkeling stops",
      "Snorkeling equipment (mask, snorkel, fins, life jacket)",
      "Paradise Island entrance fee",
      "Professional guide during the tour",
      "Buffet lunch on board with soft drinks",
      "Mineral water, tea and coffee on board"
    ],
    groupSize: "Group (shared boat)",
    availability: "Daily",
    hot: true
  },
  {
    id: "luxor-private-day-trip-hurghada-karnak-habu",
    title: "Luxor Private Day Trip from Hurghada: Karnak, Luxor Temple & Habu Temple",
    description: "A private full-day trip from Hurghada to Luxor by car or van — Karnak Temple Complex, Luxor Temple and Habu Temple on the West Bank, with a licensed Egyptologist guide and lunch included.",
    longDescription: "For travellers who can't fit in an overnight stay, Vacation in Egypt runs this private single-day version of the Luxor classic — crossing the Eastern Desert from Hurghada and back in one long day, with Karnak, Luxor Temple and Habu Temple all covered by private vehicle.\n\nYour private car or van collects you well before sunrise for the desert crossing to Luxor — the world's largest open-air museum. Begin at the legendary Karnak Temple Complex, entering through the processional sphinx avenue into the massive Hypostyle Hall and around the Sacred Lake. Continue to Luxor Temple on the Nile promenade, a coronation temple built under Amenhotep III, Ramses II and Tutankhamun — later a Roman fortress and home to early Christian churches. Cross to the West Bank after lunch for Habu Temple (Medinet Habu), one of Luxor's best-preserved mortuary temples, adorned with Ramses III's victory reliefs. Return to Hurghada in the evening.",
    price: 135,
    currency: "EUR",
    duration: "Full Day (approx. 14+ hours)",
    category: "Historical",
    image: "/images/LUX VISIT.webp",
    gallery: ["/images/LUX VISIT.webp", "/images/luxor-temple.jpg", "/images/hot-air-balloon.jpg"],
    rating: 4.9,
    reviews: 267,
    location: "Hurghada",
    highlights: [
      "Private car or van (not a shared bus) from Hurghada",
      "Karnak Temple Complex & Great Hypostyle Hall",
      "Luxor Coronation Temple on the Nile promenade (East Bank)",
      "Habu Temple (Medinet Habu) — Ramses III's mortuary temple (West Bank)",
      "Licensed Egyptologist guide throughout",
      "Traditional lunch at a local Luxor restaurant",
      "All entrance fees included",
      "Private air-conditioned round-trip transport from Hurghada"
    ],
    included: [
      "Transfer from & to your accommodation in Hurghada",
      "Private car or van for your group",
      "All entrance fees for all sites listed",
      "Lunch at a local restaurant",
      "Licensed Egyptologist guide throughout the tour",
      "Travel agent support for pickup and drop-off"
    ],
    groupSize: "Private group",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "luxor-sightseeing-day-trip-hurghada-bus",
    title: "Luxor Sightseeing Day Trip from Hurghada by Bus",
    description: "A single long day from Hurghada to Luxor covering Karnak Temple, Colossi of Memnon, Hatshepsut Temple and your choice of the Valley of the Kings or Valley of the Queens — guide, lunch and transfers included.",
    longDescription: "A beach holiday in Hurghada doesn't have to mean skipping Luxor. This Luxor sightseeing tour from Hurghada covers Thebes' essential sights — Karnak, the Colossi of Memnon, Hatshepsut Temple, and your choice of the Valley of the Kings or the Valley of the Queens — without an overnight stay.\n\nDepart Hurghada around 5:00 AM for the scenic desert mountain drive to ancient Thebes. On the East Bank, your Egyptologist guide leads you through the legendary Karnak Temple Complex with its vast Hypostyle Hall and Sacred Lake. Cross the Nile to the West Bank for the famous Colossi of Memnon — the twin 18-metre guardians of a vanished temple of Amenhotep III — followed by a traditional lunch. Choose between the Valley of the Kings (3 tombs included, still-vivid painted burial chambers) or the quieter Valley of the Queens (home to Nefertari's celebrated tomb). The day concludes at the breathtaking terraced Temple of Queen Hatshepsut before the desert drive back to Hurghada.",
    price: 99,
    currency: "EUR",
    duration: "Full Day (approx. 14+ hours)",
    category: "Historical",
    image: "/images/LUX VISIT.webp",
    gallery: ["/images/LUX VISIT.webp", "/images/luxor-temple.jpg", "/images/hot-air-balloon.jpg"],
    rating: 4.8,
    reviews: 498,
    location: "Hurghada",
    highlights: [
      "Karnak Temple Complex & iconic Great Hypostyle Hall (East Bank)",
      "Colossi of Memnon — twin 18-metre guardian statues (West Bank)",
      "Your choice: Valley of the Kings or Valley of the Queens",
      "Valley of the Kings: 3 richly painted royal tombs",
      "Valley of the Queens: Nefertari's celebrated painted tomb",
      "Terraced Temple of Queen Hatshepsut (West Bank)",
      "Licensed Egyptologist guide throughout",
      "Traditional lunch at a local Luxor restaurant"
    ],
    included: [
      "Transfer from & to your accommodation in Hurghada",
      "All transfers in a modern, air-conditioned vehicle",
      "All entrance fees for all sites listed",
      "Lunch at a local restaurant",
      "Licensed Egyptologist guide throughout the tour",
      "Travel agent support for pickup and drop-off"
    ],
    groupSize: "Small group (shared bus)",
    availability: "Daily",
    hot: true
  },
  {
    id: "abydos-dendera-luxor-private-2-day-tour-hurghada",
    title: "Abydos, Dendera & Luxor: Private 2-Day Culture Tour from Hurghada",
    description: "A private 2-day tour from Hurghada covering four of Upper Egypt's finest temples — Abydos, Dendera, Karnak and the Valley of the Kings — with overnight in a 4/5-star Luxor hotel, two lunches, and a dedicated Egyptologist guide throughout.",
    longDescription: "If your Red Sea holiday leaves room for one deeper dive into ancient Egypt, this is it. This private 2-day Luxor tour from Hurghada links three of the country's most rewarding temple sites — Abydos, Dendera and Luxor — with an overnight stay in Luxor, so you can see the East and West Banks without rushing back to the coast the same day.\n\nDay 1: Depart Hurghada at 4:00 AM by private vehicle. Begin at Abydos near El-Balyana — one of ancient Egypt's most sacred sites, featuring the Seti I and Ramses II temple sanctuaries and the revered Abydos King List. Continue to Dendera's extraordinary Hathor Temple (buried for centuries, emerging in vivid condition) and its world-famous Dendera Zodiac astronomical ceiling relief. Drive to Luxor for a guided tour of the monumental Karnak Temple Complex, including the Great Hypostyle Hall's 134 towering columns, the Sacred Lake and the White Chapel of Sesostris. Overnight at a 4 or 5-star Luxor hotel.\n\nDay 2: After breakfast, cross to the West Bank for the Valley of the Kings — 3 richly painted royal tombs with your guide explaining the burial rites behind each vivid chamber. Conclude with the breathtaking three-tiered Temple of Queen Hatshepsut at Deir el-Bahari before the private drive back to your Hurghada accommodation.",
    price: 265,
    currency: "EUR",
    duration: "2 Days / 1 Night",
    category: "Historical",
    image: "/images/LUX VISIT.webp",
    gallery: ["/images/LUX VISIT.webp", "/images/luxor-temple.jpg", "/images/hot-air-balloon.jpg"],
    rating: 4.9,
    reviews: 156,
    location: "Hurghada",
    highlights: [
      "Abydos Temple (Seti I & Ramses II) & sacred Abydos King List",
      "Dendera Hathor Temple & the Dendera Zodiac ceiling relief",
      "Karnak Temple Complex: Hypostyle Hall, Sacred Lake & White Chapel",
      "Valley of the Kings — 3 vividly painted royal tombs (West Bank)",
      "Temple of Queen Hatshepsut at Deir el-Bahari (West Bank)",
      "Overnight stay & breakfast at a 4 or 5-star Luxor hotel",
      "Private licensed Egyptologist guide throughout both days",
      "2 lunches at local restaurants + mineral water & soft drinks"
    ],
    included: [
      "Round-trip transfers from & to your Hurghada accommodation",
      "All transfers in a modern, air-conditioned vehicle",
      "One night's stay & breakfast at a 4/5-star hotel in Luxor",
      "All site entrance fees as listed in the itinerary",
      "Private licensed Egyptologist guide throughout",
      "Lunch at a local restaurant on both days",
      "Mineral water and soft drinks during the tour",
      "Travel agent support for pickup and drop-off"
    ],
    groupSize: "Private group",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "luxor-to-cairo-day-trip-by-flight",
    title: "Day Trip from Luxor to Cairo by Flight: Pyramids, Grand Museum & Khan el-Khalili",
    description: "Fly from Luxor to Cairo for the day — Pyramids of Giza, Great Sphinx, Grand Egyptian Museum (Tutankhamun collection) and Khan el-Khalili Bazaar with return flights, private guide, lunch and transfers included.",
    longDescription: "Already exploring Luxor's temples and tombs? This Luxor to Cairo day trip by flight lets you add Cairo's biggest names — the Pyramids of Giza, the Grand Egyptian Museum and the Khan el-Khalili Bazaar — without rearranging your itinerary or booking extra hotel nights.\n\nTake an early transfer from your Luxor hotel or Nile cruise ship for a short domestic flight north to Cairo. On arrival, your private Egyptologist guide takes you straight to the Giza Plateau to stand before the Pyramids of Khufu, Khafre, Menkaure and the Great Sphinx. After lunch at a traditional Egyptian restaurant, explore the state-of-the-art Grand Egyptian Museum (GEM) housing the complete Tutankhamun collection of over 5,000 treasures displayed together for the first time since 1922. Wrap up with free time through the historic alleyways of Khan el-Khalili bazaar before your return flight to Luxor.",
    price: 255,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/grand-egyptian-museum.jpg",
    gallery: ["/images/grand-egyptian-museum.jpg", "/images/pyramids.jpg", "/images/SP.webp", "/images/khan-el-khalili-bazaar.jpg"],
    rating: 4.9,
    reviews: 210,
    location: "Luxor",
    highlights: [
      "Round-trip domestic flights between Luxor and Cairo",
      "Pyramids of Giza (Khufu, Khafre & Menkaure)",
      "The Great Sphinx of Giza & Valley Temple",
      "Grand Egyptian Museum (GEM) complete Tutankhamun collection",
      "Historic Khan el-Khalili artisan souq",
      "Private licensed Egyptologist guide throughout",
      "Traditional Egyptian lunch at a local restaurant",
      "Hotel or Nile cruise ship pickup and drop-off in Luxor"
    ],
    included: [
      "Pick-up and drop-off from your hotel or Nile cruise ship in Luxor",
      "All transfers in modern, air-conditioned vehicle",
      "Return domestic flights (Luxor – Cairo – Luxor)",
      "All sightseeing with entrance fees included",
      "Lunch at a traditional restaurant in Cairo",
      "Licensed Egyptologist guide for private tour",
      "Dedicated tour coordinator assistance during pickup and return"
    ],
    groupSize: "Private / Small group",
    availability: "Daily (subject to flight schedule)",
    hot: true,
    discount: 10
  },
  {
    id: "dendera-abydos-temples-luxor-day-trip",
    title: "Dendera & Abydos Temples: Luxor Day Trip",
    description: "A single-day trip from Luxor to two of Upper Egypt's best-preserved temples — the Dendera Zodiac and Temple of Hathor, plus Abydos Temple of Ramses II and the sacred King List with private Egyptologist guide and transfers included.",
    longDescription: "If you have a spare day during your Luxor stay, this Vacation in Egypt excursion is one of the best ways to use it: a single-day trip to the Dendera and Abydos temples, both remarkably well preserved and rarely as crowded as the sites closer to town.\n\nDepart your Luxor hotel early in the morning for Dendera, roughly 55 km from Qena. Explore the exceptionally preserved Temple of Hathor with its stunning vivid blue ceiling frescoes and the famous circular Dendera Zodiac ceiling relief combining Egyptian and Greco-Roman celestial imagery. Continue north to Abydos near El-Balyana, one of ancient Egypt's most revered cult centres. Tour the Temple of Ramses II, the sanctuary of Osiris on the highest terrace, and the monumental Abydos King List recording ancient royal dynasties before returning comfortably to Luxor in the evening.",
    price: 89,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/LUX VISIT.webp",
    gallery: ["/images/LUX VISIT.webp", "/images/luxor-temple.jpg", "/images/hot-air-balloon.jpg"],
    rating: 4.9,
    reviews: 174,
    location: "Luxor",
    highlights: [
      "Dendera Temple of Hathor (exceptionally preserved frescoes)",
      "The famous circular Dendera Zodiac astronomical relief",
      "Abydos Temple of Ramses II and Seti I",
      "The historical Abydos King List royal cartouches",
      "Osiris sanctuary on the highest temple terrace",
      "Private licensed Egyptologist guide (5+ years experience)",
      "All entrance fees and site tickets included",
      "Private air-conditioned round-trip hotel transfers in Luxor"
    ],
    included: [
      "Transfers to and from your accommodation in Luxor",
      "All transfers in a modern, air-conditioned vehicle",
      "All sightseeing described with entrance fees included",
      "Licensed Egyptologist guide for your private tour",
      "Travel agent assistance with pickup and drop-off"
    ],
    groupSize: "Private / Small group",
    availability: "Daily",
    hot: true
  },
  {
    id: "edfu-kom-ombo-temples-luxor-excursion",
    title: "Edfu & Kom Ombo Temples Excursion from Luxor",
    description: "Two of the Nile's finest ancient temples in a small group of up to 7 — Temple of Horus in Edfu and the unique dual temple of Sobek & Haroeris at Kom Ombo with mummified crocodiles, guide, lunch and transfers included.",
    longDescription: "A short drive south of Luxor, the Edfu and Kom Ombo temples reward the trip with some of the best-preserved reliefs on the Nile. Vacation in Egypt runs this excursion in small groups of up to seven people, keeping the pace relaxed and the guiding personal.\n\nDepart your Luxor hotel in the morning for Edfu on the Nile's west bank. Tour the Temple of Horus, one of Egypt's most complete and magnificent temples, entering through its towering pylon flanked by massive granite falcons and exploring the intact roofed sanctuaries and the ceremonial Mammisi (birth house). After lunch at a local restaurant, continue to the picturesque riverside temple of Kom Ombo, uniquely dedicated symmetrically to two gods: Sobek the crocodile god and Haroeris the winged falcon. View rare medical instrument reliefs, engravings of Cleopatra VII, and real mummified crocodiles at the Hathor chapel museum before returning to Luxor.",
    price: 69,
    currency: "EUR",
    duration: "Full Day",
    category: "Historical",
    image: "/images/LUX VISIT.webp",
    gallery: ["/images/LUX VISIT.webp", "/images/luxor-temple.jpg", "/images/hot-air-balloon.jpg"],
    rating: 4.8,
    reviews: 226,
    location: "Luxor",
    highlights: [
      "Edfu Temple of Horus (one of Egypt's best-preserved temples)",
      "The monumental Edfu pylon & falcon statues of Horus",
      "The sacred Mammisi (birth house) at Edfu",
      "Kom Ombo dual temple (Sobek & Haroeris)",
      "Mummified crocodile museum at Hathor Chapel",
      "Small-group intimate format (up to 7 guests)",
      "Traditional lunch at a local restaurant",
      "Licensed Egyptologist guide & private air-conditioned transport"
    ],
    included: [
      "Transfer from and to your accommodation in Luxor",
      "All transfers in a modern, air-conditioned vehicle",
      "All sights described with entrance fees included",
      "Licensed Egyptologist guide for your small-group tour",
      "Lunch at a local restaurant",
      "Travel agent assistance with pickup and return"
    ],
    groupSize: "Small group (up to 7 people)",
    availability: "Daily",
    hot: true
  },
  {
    id: "hot-air-balloon-ride-luxor-sunrise",
    title: "Hot Air Balloon Ride over Luxor at Sunrise",
    description: "Float above the Valley of the Kings, Hatshepsut Temple and the Colossi of Memnon as the sun rises over ancient Thebes — flight, motorboat Nile crossing, certificate and transfers included.",
    longDescription: "Nothing quite matches the view of Luxor's West Bank from a hot air balloon at sunrise. Vacation in Egypt's balloon ride lifts you over the temples, tombs and fields of what's often called the world's largest open-air museum, with an experienced pilot narrating the landscape below as the sky turns gold.\n\nEnjoy an early 4:00 AM pickup from your Luxor hotel or Nile cruise ship and a scenic motorboat crossing of the Nile to the West Bank launch site. Watch the balloons illuminate and inflate against the predawn sky before ascending smoothly into the calm morning air. Float for 45–60 minutes drifting over ancient Thebes, taking in unparalleled bird's-eye views of the Valley of the Kings, the terraced cliffs of Hatshepsut Temple, the Colossi of Memnon, and lush green Nile banks awakening in the sunrise. Celebrate touchdown with refreshments, a flight certificate, and a prompt return transfer.",
    price: 75,
    currency: "EUR",
    duration: "3 hours (45–60 mins flight)",
    category: "Adventure",
    image: "/images/hot-air-balloon.jpg",
    gallery: ["/images/hot-air-balloon.jpg", "/images/LUX VISIT.webp", "/images/luxor-temple.jpg"],
    rating: 4.9,
    reviews: 640,
    location: "Luxor",
    highlights: [
      "Sunrise launch from Luxor's West Bank",
      "45–60 minutes airborne over ancient Thebes",
      "Panoramic aerial views of the Valley of the Kings & Hatshepsut Temple",
      "Bird's-eye perspective of the Colossi of Memnon & Nile Valley",
      "Scenic motorboat Nile crossing under starry dawn sky",
      "Licensed master balloon pilot & full safety ground crew",
      "Commemorative flight certificate & refreshments after landing",
      "Hotel or Nile cruise ship pickup & drop-off in Luxor"
    ],
    included: [
      "Transfer from & to your accommodation or Nile cruise ship in Luxor",
      "Motorboat crossing of the Nile to the West Bank launch site",
      "Hot air balloon flight (approx. 45–60 minutes airborne)",
      "Light refreshments and cold drinks after landing",
      "Personalized commemorative flight certificate",
      "All permits, insurances and flight taxes"
    ],
    groupSize: "Group / Private baskets",
    availability: "Daily at sunrise",
    hot: true,
    discount: 10
  },
  {
    id: "karnak-temple-sound-and-light-show",
    title: "Karnak Temple Sound and Light Show",
    description: "See Egypt's largest temple complex illuminated after dark — a 75-minute walking and seated Sound & Light Show by the Sacred Lake with hotel/cruise transfers included.",
    longDescription: "Karnak looks very different once the sun goes down. Vacation in Egypt's evening excursion takes you through the illuminated temple complex on a guided walk, ending with a seated Sound and Light Show that traces the site's history against a backdrop of lit columns and reflections on the Sacred Lake.\n\nTake an evening transfer from your Luxor hotel or Nile cruise ship to Karnak Temple. The experience begins with an evocative illuminated walk through the soaring columns of the Great Hypostyle Hall, accompanied by an orchestral score and dramatic narrative tracing Karnak from the Middle Kingdom pharaohs through the Ptolemaic era. The final act moves to the grand seated grandstand directly overlooking the Sacred Lake, where luminous light displays and ancient voices reflect across the waters before your return transfer.",
    price: 45,
    currency: "EUR",
    duration: "2 hours (approx. 75 mins show)",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg", "/images/LUX VISIT.webp", "/images/dining-experience.jpg"],
    rating: 4.8,
    reviews: 320,
    location: "Luxor",
    highlights: [
      "Illuminated evening walk through Karnak Temple grounds",
      "75-minute multimedia Sound and Light spectacle",
      "Dramatic lighting on the Great Hypostyle Hall columns",
      "Seated final act with panoramic views across the Sacred Lake",
      "Multilingual narration audio headset options",
      "Hotel or Nile cruise ship round-trip transfers in Luxor"
    ],
    included: [
      "Transfer from & to your accommodation or Nile cruise ship in Luxor",
      "All transfers in a modern, air-conditioned vehicle",
      "Sound and Light Show entrance ticket & seating",
      "Support from our travel agents for pickup and drop-off"
    ],
    groupSize: "Individual / Groups",
    availability: "Daily evening",
    hot: true
  },
  {
    id: "luxor-east-bank-karnak-luxor-temple-tour",
    title: "Luxor East Bank Tour: Karnak Temple & Luxor Temple",
    description: "A half-day private guided introduction to Thebes' two great East Bank temples — Karnak Temple Complex, Hypostyle Hall, Sacred Lake and Luxor Coronation Temple with Egyptologist guide and entrance fees included.",
    longDescription: "For a first taste of Luxor without committing a full day, Vacation in Egypt's East Bank tour covers the two temples that made ancient Thebes famous: the vast Karnak complex and the riverside Luxor Temple, both with a private Egyptologist guide.\n\nEnjoy a convenient morning pickup from your Luxor hotel or Nile cruise ship. Begin at Karnak, the largest religious temple complex ever built, entering along the ram-headed Sphinx Avenue into the Great Hypostyle Hall's forest of 134 towering stone columns. Explore the Sacred Lake, obelisks of Queen Hatshepsut, and ancient sanctuaries. Continue along the Nile promenade to Luxor Temple, ancient Egypt's premier coronation site. Walk through the colossal Ramses II courtyard, view the surviving pink granite obelisk (whose twin stands in Place de la Concorde in Paris), and admire the restored 2.7 km Avenue of Sphinxes connecting the two East Bank wonders.",
    price: 62,
    currency: "EUR",
    duration: "Half Day (approx. 4 hours)",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg", "/images/LUX VISIT.webp", "/images/hot-air-balloon.jpg"],
    rating: 4.9,
    reviews: 390,
    location: "Luxor",
    highlights: [
      "Karnak Temple Complex & ram-headed Sphinx Avenue",
      "The Great Hypostyle Hall (134 towering columns)",
      "The Sacred Lake & Hatshepsut Obelisk at Karnak",
      "Luxor Coronation Temple on the Nile promenade",
      "Ramses II Colonnade & surviving pink granite obelisk",
      "Restored 2.7 km Avenue of Sphinxes",
      "Private licensed Egyptologist guide (5+ years experience)",
      "All entrance fees and site tickets included"
    ],
    included: [
      "Transfer from & to your hotel or Nile cruise ship in Luxor",
      "All transfers in a modern, air-conditioned vehicle",
      "All entrance fees for Karnak Temple and Luxor Temple",
      "Private, licensed Egyptologist guide throughout",
      "Support from our travel agents for pickup and drop-off"
    ],
    groupSize: "Private group",
    availability: "Daily morning",
    hot: true
  },
  {
    id: "luxor-west-bank-habu-valley-of-kings",
    title: "Luxor West Bank Tour: Habu Temple & Valley of the Kings",
    description: "Choose the Valley of the Kings (3 royal tombs) or the Valley of the Queens alongside Ramses III's magnificently preserved Habu Temple — private guide, all entrance fees and transfers included.",
    longDescription: "The West Bank is where Thebes buried its pharaohs, and Vacation in Egypt's West Bank tour pairs the well-preserved Habu Temple with your choice of the Valley of the Kings or the quieter, less-visited Valley of the Queens — both led by a private Egyptologist guide.\n\nAfter morning pickup from your Luxor hotel or Nile cruise ship, cross to the West Bank to explore Medinet Habu (Temple of Ramses III), renowned for its vivid, deep-cut reliefs depicting pharaonic military victories over the Sea Peoples and site of history's first recorded workers' strike. Continue to your chosen royal necropolis: enter 3 richly painted subterranean tombs in the Valley of the Kings to marvel at ancient pigments and burial rituals, or explore the peaceful Valley of the Queens, resting place of queens, princes, and Queen Nefertari. Return comfortably to Luxor in the early afternoon.",
    price: 62,
    currency: "EUR",
    duration: "Half Day (approx. 4–5 hours)",
    category: "Historical",
    image: "/images/LUX VISIT.webp",
    gallery: ["/images/LUX VISIT.webp", "/images/luxor-temple.jpg", "/images/hot-air-balloon.jpg"],
    rating: 4.9,
    reviews: 345,
    location: "Luxor",
    highlights: [
      "Habu Temple (Medinet Habu) — Ramses III's mortuary temple",
      "Intact deep-cut reliefs of Ramses III's military triumphs",
      "Site of the world's first recorded workers' labour strike",
      "Your choice: Valley of the Kings OR Valley of the Queens",
      "Entry to 3 royal tombs with vivid ancient wall paintings",
      "Private licensed Egyptologist guide (5+ years experience)",
      "All site entrance fees included in the price",
      "Private air-conditioned hotel/cruise ship transfers in Luxor"
    ],
    included: [
      "Transfer from and to your hotel or Nile cruise ship in Luxor",
      "All transfers in modern, air-conditioned vehicle",
      "All entrance fees for Habu Temple & Valley of Kings or Queens",
      "Entry to three tombs included",
      "Private, licensed Egyptologist guide",
      "Support from our travel agents for pickup and drop-off"
    ],
    groupSize: "Private group",
    availability: "Daily morning",
    hot: true
  },
  {
    id: "luxor-east-west-bank-single-day",
    title: "Luxor East & West Bank in a Single Day",
    description: "Karnak, Luxor Temple, Memnon Colossi, Hatshepsut Temple and the Valley of the Kings, all in one long day.",
    longDescription: "Short on time but determined to see both banks of Luxor? Vacation in Egypt's single-day East and West Bank tour packs in the city's five essential sites without an overnight stay — a long day, but a complete one, with a private Egyptologist guide throughout.\n\n• Karnak Temple Complex: Covering both banks in a single day means making the most of every hour, so we start at Karnak Temple — the largest complex ever built — shortly after collecting you from your hotel or Nile cruise ship. Its sphinx-lined entrance opens onto a Hypostyle Hall of towering columns, quarried in southern Egypt and transported along the Nile — a feat that still puzzles visitors today. Before leaving, we visit the Sacred Lake at the edge of the complex, used for ceremonial purification in antiquity.\n\n• Luxor Temple: A short drive brings us to Luxor Temple on the river promenade, once linked to Karnak by a processional avenue now largely restored. Unlike Karnak, this temple functioned mainly as a coronation site; a chapel built by Alexander the Great and the ruins of later churches sit alongside the original pharaonic structure, a layered history spanning several religious eras.\n\n• Crossing to the West Bank (Colossi of Memnon): We cross the Nile to the West Bank, stopping first at the Colossi of Memnon, two weathered statues that once guarded the mortuary temple of Amenhotep III. They were once famous for a mysterious “singing” sound produced by wind passing through cracks in the stone — a phenomenon that stopped after restoration work sealed the fissures.\n\n• Lunch & Hatshepsut Temple: After a lunch break on the West Bank, we continue to Hatshepsut Temple, the striking terraced structure built into the cliffs at Deir el-Bahari during the 22-year reign of Egypt's only female pharaoh to rule in her own right. Its scale and design still draw comparisons to modern architecture.\n\n• Valley of the Kings: The day's final stop is the Valley of the Kings, where your guide leads you into three of the most richly decorated royal tombs (Tutankhamun's tomb is available separately, at an extra charge), before we begin the drive back to your accommodation.",
    price: 135,
    currency: "EUR",
    duration: "Full Day (approx. 9–10 hours)",
    category: "Historical",
    image: "/images/LUX VISIT.webp",
    gallery: ["/images/LUX VISIT.webp", "/images/luxor-temple.jpg", "/images/hot-air-balloon.jpg", "/images/dining-experience.jpg"],
    rating: 4.9,
    reviews: 475,
    location: "Luxor",
    highlights: [
      "Karnak Temple Complex & Great Hypostyle Hall",
      "Luxor Temple on the Nile promenade",
      "Colossi of Memnon photo stop",
      "Hatshepsut Temple at Deir el-Bahari",
      "Valley of the Kings (entry to 3 royal tombs)",
      "Traditional lunch at a local restaurant included",
      "Private licensed Egyptologist guide (5+ years experience)",
      "Private air-conditioned hotel / cruise ship transfers"
    ],
    included: [
      "Transfer from and to your hotel or Nile cruise ship",
      "All transfers in a modern, air-conditioned vehicle",
      "All entrance fees for the five sites listed in the itinerary",
      "Lunch at a local restaurant",
      "Private, licensed Egyptologist guide",
      "Support from our travel agents for pickup and drop-off"
    ],
    groupSize: "Private group",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "pirates-yacht-orange-bay-hurghada",
    title: "Pirates Yacht Trip to Orange Bay: Afternoon Sailing & Sunset Return",
    description: "A twin-masted wooden yacht, guided snorkeling, an island landing and a full seafood buffet.",
    longDescription: "Twin-masted and built in tribute to sailing's golden age, Vacation in Egypt's Pirates Yacht sails every Wednesday and Saturday afternoon from 1:00 PM to 6:30 PM, timing the return to catch Hurghada's coastline at sunset. Between departure and return sits a full afternoon: guided snorkeling, an hour on Orange Bay's sand, and a seafood buffet lunch served in a marble-and-timber salon styled after a pirate ship's quarters.\n\n• Boarding: A Ship Built for the Role: The yacht itself sets the tone before the trip even begins. Twin masts and a wide, sun-drenched upper deck give it the silhouette of a golden-age sailing ship, while two fully air-conditioned salons below deck are finished in marble and timber, decorated throughout with pirate-themed details. If you're travelling with children, they're welcomed by the on-board entertainment team and taken downstairs to begin the day's activities, leaving the adults free to settle in on the open-air upper deck as the yacht prepares to sail at 1:00 PM.\n\n• An Hour at Sea, Then an Hour of Guided Snorkeling: The yacht sails for roughly an hour to reach one of the area's best-regarded snorkeling spots. A full hour of guided snorkeling follows, with the crew on hand throughout for anyone who wants pointers or simply a second pair of eyes on what's swimming past.\n\n• Orange Bay: An Hour Ashore: From there, the yacht continues to Orange Bay, where you'll have a full hour on the island itself. Adults can stretch out on the sandy beach and take in the view, while the entertainment team runs a treasure hunt and other activities for children on shore — genuinely built around keeping kids occupied, not just tolerated.\n\n• Lunch on Board: Back on the yacht, lunch is served in the salon: a seafood soup to start, three fresh salads, a choice of rice, pasta and potatoes, a main spread of shrimp, calamari, fish, chicken and kofta, and fresh seasonal fruit to finish.\n\n• Sailing Back at Sunset: With lunch cleared and the afternoon light beginning to soften, the yacht sails back toward Hurghada, timed to reach the marina as the sun sets over the Red Sea — arriving back by approximately 6:30 PM for your transfer to the hotel.",
    price: 75,
    currency: "EUR",
    duration: "5.5 hours (1:00 PM – 6:30 PM)",
    category: "Sea",
    image: "/images/yacht-charter.jpg",
    gallery: ["/images/yacht-charter.jpg", "/images/beach-resort.jpg", "/images/scuba-diving.jpg", "/images/hero-redsea.jpg"],
    rating: 4.9,
    reviews: 388,
    location: "Hurghada",
    highlights: [
      "Twin-masted wooden yacht with sun deck & air-conditioned pirate salons",
      "One hour of guided snorkeling at top Red Sea reef spots",
      "One hour ashore on Orange Bay's white sandy beach",
      "Full children's entertainment programme & island treasure hunt",
      "Full multi-course seafood buffet lunch served on board",
      "Scenic return sailing timed for the Red Sea sunset",
      "Snorkeling equipment (mask, snorkel, fins, life jackets) included",
      "Private air-conditioned hotel transfers in Hurghada"
    ],
    included: [
      "Transfer from and to your accommodation in Hurghada",
      "All transfers in a modern, air-conditioned vehicle",
      "Afternoon trip aboard the twin-masted Pirates Yacht",
      "Snorkeling equipment (mask, snorkel, fins, life jacket)",
      "One hour of guided snorkeling",
      "Children's entertainment programme & Orange Bay treasure hunt",
      "Full seafood buffet lunch on board",
      "Mineral water and soft drinks during the tour"
    ],
    groupSize: "Small group / Family",
    availability: "Wednesdays & Saturdays (1:00 PM – 6:30 PM)",
    hot: true
  },
  {
    id: "aswan-day-trip-from-luxor",
    title: "Aswan Day Trip from Luxor: High Dam, Philae Temple & Nubian Village",
    description: "Where 1960s engineering meets a temple saved stone by stone from the rising Nile — High Dam, Philae Temple by motorboat, Unfinished Obelisk, and a Nubian village.",
    longDescription: "Aswan feels different from Luxor almost immediately — granite outcrops instead of temple pylons, Nubian villages painted in bold colour, and a river that narrows into rapids. This Vacation in Egypt day trip covers the city's three defining sights, with a motorboat crossing to Philae Temple as the centrepiece.\n\nThe Drive South to Aswan\nThe road from Luxor to Aswan runs roughly four hours south along the Nile Valley, passing farming villages and river views that make the journey itself part of the day. We collect you early from your hotel or Nile cruise ship to make the most of the time in Aswan once you arrive.\n\nThe Aswan High Dam\nCompleted in 1970, the High Dam ended the Nile's destructive annual flooding and created Lake Nasser, one of the largest artificial lakes in the world. A short stop here gives you sweeping views over the reservoir before continuing to the day's main event.\n\nPhilae Temple\nPhilae's story is almost as remarkable as the temple itself. Dedicated to the goddess Isis, it originally stood on an island that would have been permanently submerged by the High Dam — so in the 1970s, UNESCO engineers dismantled the entire complex and reassembled it, block by block, on higher ground at Agilkia Island. The short motorboat ride across is part of the experience, with the temple's pylons rising from the water as you approach.\n\nThe Unfinished Obelisk\nIn the same granite quarry that supplied stone for temples across Egypt, an enormous obelisk still lies half-carved into the bedrock. A crack that appeared during construction forced its abandonment — had it been completed, it would have stood taller than any obelisk ever raised in Egypt, giving a rare, tangible look at ancient quarrying techniques.\n\nA Nubian Village by Boat\nThe day closes with a motorboat visit to a Nubian village near Aswan, where colourfully painted houses line the riverbank. It's a chance to see Nubian culture up close — distinct from the rest of Upper Egypt in language, architecture and craft — before the drive back to Luxor.",
    price: 140,
    currency: "EUR",
    duration: "Full Day (12 Hours)",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg", "/images/nile-cruise.jpg", "/images/abu-simbel.jpg", "/images/LUX VISIT.webp"],
    rating: 4.9,
    reviews: 172,
    location: "Luxor",
    highlights: [
      "The Aswan High Dam and its views over Lake Nasser",
      "Philae Temple, dismantled and relocated to Agilkia Island to escape floodwaters",
      "The Unfinished Obelisk in its ancient granite quarry",
      "Scenic motorboat crossing to Philae Island",
      "A motorboat visit to a colorful Nubian village on the Nile",
      "Lunch at a local restaurant in Aswan included",
      "Licensed Egyptologist guide throughout the tour",
      "Private round-trip transfers from Luxor in modern air-conditioned vehicle"
    ],
    included: [
      "Transfer from and to your hotel or Nile cruise ship in Luxor",
      "All transfers in a modern, air-conditioned vehicle",
      "All entrance fees for the sites listed in the itinerary",
      "Motorboat rides to Philae Temple and the Nubian village",
      "Lunch at a local restaurant in Aswan",
      "Licensed Egyptologist guide throughout the tour",
      "Mineral water and soft drinks during the tour"
    ],
    groupSize: "Small group / Private",
    availability: "Daily (Pickup ~6:00 AM)",
    hot: true
  },
  {
    id: "ras-mohammed-white-island-sharm",
    title: "Ras Mohammed & White Island Boat Trip from Sharm El Sheikh",
    description: "Egypt's oldest marine national park paired with White Island sandbar — guided coral reef snorkeling, pristine shallow lagoons, and buffet lunch on board.",
    longDescription: "Ras Mohammed became Egypt's first national park in 1983, and the reef walls here still rank among the best snorkeling and diving in the Red Sea. Vacation in Egypt's boat trip from Sharm El Sheikh pairs a full morning in the park with an afternoon on White Island, a sandbar that seems to float on the turquoise water around it.\n\nSetting Out from Sharm El Sheikh\nRas Mohammed sits at the tip of the peninsula where the Gulf of Suez meets the Gulf of Aqaba — a location that gives its reefs an unusually rich mix of marine life, reached by boat shortly after we collect you from your hotel.\n\nRas Mohammed National Park\nInside the park, the crew leads two to three snorkeling stops along reef walls that drop steeply into deep blue water, a formation that draws divers from across the Red Sea as much as it draws snorkelers. Expect close encounters with reef fish, and on a good day, the chance of turtles or reef sharks in the distance.\n\nLunch on Board\nBetween the park and White Island, the crew serves a buffet lunch on deck — a chance to dry off, eat, and let the morning's snorkeling sink in before the second half of the day.\n\nWhite Island\nThe boat then continues to White Island, an uninhabited sandbar with nothing on it but pale sand and shallow, glass-clear water — no buildings, no shade structures, just the kind of view that ends up as everyone's favourite photo from the trip. Free time here is unstructured: swim, walk the sandbar, or just sit with the view.\n\nReturn to Sharm El Sheikh\nIn the afternoon, the boat sails back to the marina, where we transfer you to your accommodation to close out the day.",
    price: 108,
    currency: "EUR",
    duration: "Full Day (8 Hours)",
    category: "Sea",
    image: "/images/hero-redsea.jpg",
    gallery: ["/images/hero-redsea.jpg", "/images/scuba-diving.jpg", "/images/beach-resort.jpg", "/images/yacht-charter.jpg"],
    rating: 5.0,
    reviews: 246,
    location: "Sharm El Sheikh",
    highlights: [
      "Ras Mohammed National Park, Egypt's first protected marine reserve",
      "Two to three guided snorkeling stops along dramatic coral reef walls",
      "White Island's pristine sandbar, reachable only by boat",
      "Buffet lunch and soft drinks served on board",
      "High chance of seeing sea turtles, rays and exotic coral fish",
      "Full snorkeling equipment (mask, snorkel, fins, life jacket) included",
      "Round-trip air-conditioned hotel transfers in Sharm El Sheikh"
    ],
    included: [
      "Transfer from and to your accommodation in Sharm El Sheikh",
      "All transfers in a modern, air-conditioned vehicle",
      "Boat trip with two to three guided snorkeling stops",
      "Snorkeling equipment (mask, snorkel, fins, life jacket)",
      "Ras Mohammed National Park entrance fee",
      "Buffet lunch on board",
      "Mineral water and soft drinks during the tour"
    ],
    groupSize: "Small group / Yacht",
    availability: "Daily (Pickup ~8:00 AM)",
    hot: true
  },
  {
    id: "bahariya-white-desert-safari-cairo",
    title: "Bahariya Oasis & White Desert: 2-Day Safari from Cairo",
    description: "Chalk-white rock sculptures, a black volcanic desert, Valley of the Golden Mummies, Crystal Mountain, and an unforgettable night camping under star-filled skies.",
    longDescription: "Nothing about the White Desert looks like the rest of Egypt. Wind-carved chalk formations rise from the sand like something from another planet, reached by 4x4 through a black volcanic desert and a 3,000-year-old oasis along the way. Vacation in Egypt's 2-day safari covers all of it, ending with a night camping beneath a sky with almost no light pollution.\n\nThe Drive to Bahariya Oasis\nBahariya lies roughly 370 km southwest of Cairo, reached by a drive across open desert road. On arrival, we visit the Valley of the Golden Mummies, a Greco-Roman era necropolis where thousands of gilded mummies were discovered in the 1990s, along with the rock-cut Tombs of the Nobles at Qasr Selim and the Temple of Alexander the Great.\n\nThe Black Desert\nLeaving the oasis, the route crosses the Black Desert, a stretch of volcanic hills scattered with dark basalt fragments that give the landscape its name. Climbing one of the small peaks here offers a wide view over the oasis and its salt lakes before continuing deeper into the desert.\n\nCrystal Mountain & Agabat Valley\nThe route continues past Crystal Mountain, a rocky outcrop veined with natural quartz crystal, and into Agabat Valley, one of the more dramatic and less-visited pockets of the Western Desert, before the transition into the White Desert proper begins.\n\nThe White Desert & Overnight Camp\nBy late afternoon, the landscape shifts entirely: wind-eroded chalk-white rock formations, some resembling mushrooms, animals or abstract sculptures, spread across the desert floor as far as you can see. We set up camp among them for the night, with dinner cooked over an open fire and, after dark, a sky largely free of light pollution — one of the best stargazing settings in Egypt.\n\nDay 2: Return to Cairo\nAfter breakfast at camp, we break down the site and begin the drive back to Cairo, arriving in the afternoon with two days of desert scenery behind you.",
    price: 295,
    currency: "EUR",
    duration: "2 Days / 1 Night",
    category: "Adventure",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg", "/images/bedouin-dinner.jpg", "/images/hero.webp", "/images/SP.webp"],
    rating: 4.9,
    reviews: 198,
    location: "Cairo",
    highlights: [
      "Bahariya Oasis and the Valley of the Golden Mummies",
      "The Black Desert's volcanic mountain peaks and basalt scenery",
      "Crystal Mountain quartz rock formations and Agabat Valley dunes",
      "Overnight luxury camping in the White Desert National Park",
      "Bedouin-cooked campfire dinner and pristine Milky Way stargazing",
      "All 4x4 Jeep desert transport with expert safari desert drivers",
      "All meals, camping gear, and private Cairo hotel transfers included"
    ],
    included: [
      "Transfer from and to your accommodation in Cairo",
      "4x4 vehicle for all desert transfers",
      "One night's camping equipment (tent, sleeping bag and mat)",
      "All entrance fees for the sites listed in the itinerary",
      "Licensed Egyptologist/desert guide throughout the trip",
      "All meals (dinner and breakfast at camp, plus lunch on both days)",
      "Mineral water during the trip"
    ],
    groupSize: "Small group 4x4",
    availability: "Daily (Pickup ~7:00 AM)",
    hot: true
  },
  {
    id: "siwa-oasis-3day-tour-cairo",
    title: "Siwa Oasis: 3-Day Tour from Cairo",
    description: "Salt lakes, the Oracle that crowned Alexander the Great, ancient mudbrick Shali fortress, Cleopatra's Bath, and 4x4 dunes in the Great Sand Sea.",
    longDescription: "Siwa sits closer to the Libyan border than to Cairo, and the isolation shows in everything from its distinct Amazigh (Berber) culture to its mudbrick fortress town, unlike anywhere else in Egypt. Vacation in Egypt's 3-day tour covers the full oasis — Cleopatra's Bath, the Oracle Temple, the Great Sand Sea — with two nights to actually settle into its pace.\n\nDay 1: Cairo to Siwa via Marsa Matrouh\nSiwa is a genuine journey — roughly 8 hours by road — so we break it up with a stop in Marsa Matrouh, a Mediterranean coastal city, for lunch before continuing into the Western Desert. We arrive in Siwa in the evening and check in for two nights.\n\nDay 2: Shali, the Oracle Temple & Cleopatra's Bath\nThe next morning we explore Siwa Town, built around Shali, the old mudbrick citadel that housed the oasis for centuries before heavy rains partially dissolved its walls in the 1920s. From there we visit the Temple of the Oracle of Amun, where Alexander the Great travelled across the desert to be declared the son of Amun in 331 BC. The afternoon brings a swim at Cleopatra's Bath, a natural spring pool that locals believe the queen once bathed in herself.\n\nDay 2 Afternoon: The Great Sand Sea\nAs the light softens, we head out by 4x4 into the Great Sand Sea, a vast expanse of dunes running toward the Libyan border. Expect dune-bashing, a stop for sandboarding, and a swim in one of the region's buoyant salt lakes before returning to Siwa for the night.\n\nDay 3: Return to Cairo\nAfter breakfast and a final look around Siwa Town, we begin the drive back to Cairo, again breaking the journey with a stop in Marsa Matrouh, arriving back in the city in the evening.",
    price: 640,
    currency: "EUR",
    duration: "3 Days / 2 Nights",
    category: "Adventure",
    image: "/images/bedouin-dinner.jpg",
    gallery: ["/images/bedouin-dinner.jpg", "/images/desert-safari.jpg", "/images/beach-resort.jpg", "/images/hero.webp"],
    rating: 5.0,
    reviews: 132,
    location: "Cairo",
    highlights: [
      "Shali, Siwa's centuries-old mudbrick fortress town",
      "The Oracle Temple of Amun where Alexander the Great was crowned",
      "Cleopatra's natural spring bath and buoyant hyper-saline lakes",
      "4x4 safari into the Great Sand Sea with sandboarding on giant dunes",
      "Scenic Mediterranean coastal drive stop in Marsa Matrouh",
      "2 nights' eco-lodge accommodation in Siwa with daily breakfast and dinner",
      "Private licensed desert guide and full Cairo transfers included"
    ],
    included: [
      "Transfer from and to your accommodation in Cairo",
      "All transfers in modern air-conditioned vehicle + 4x4 for Great Sand Sea",
      "2 nights' accommodation in Siwa with breakfast",
      "All entrance fees for the sites listed in the itinerary",
      "Licensed guide throughout the trip",
      "Lunch and dinner as described in the itinerary",
      "Mineral water during the trip"
    ],
    groupSize: "Small group / Private",
    availability: "Tuesdays & Fridays (Pickup ~6:00 AM)",
    hot: true
  },
  {
    id: "el-alamein-day-trip-alexandria",
    title: "El Alamein Day Trip from Alexandria",
    description: "Explore the WWII battlefield that changed North Africa's fate — El Alamein War Museum, Commonwealth Cemetery, and German & Italian war memorials.",
    longDescription: "Churchill called El Alamein the end of the beginning. This Vacation in Egypt half-day trip from Alexandria covers the museum and war cemeteries where the Allied and Axis forces fought one of the Second World War's defining battles — a sober, well-preserved counterpoint to Egypt's pharaonic sites.\n\nThe Coast Road to El Alamein\nBeach resorts line the Mediterranean coast road heading west from Alexandria, giving little hint of what happened here in 1942 — until the war cemeteries start to appear, roughly an hour into the drive.\n\nEl Alamein War Museum\nThe museum lays out the battle's context room by room: tanks, artillery and uniforms from the British, German and Italian forces, alongside maps explaining how Montgomery's Eighth Army halted Rommel's advance toward Cairo and the Suez Canal.\n\nThe War Cemeteries\nFrom the museum, we visit the Commonwealth War Cemetery, where more than 7,000 Allied soldiers are buried in neat rows facing the desert they fought over, followed by the German and Italian memorials nearby. All three sites are quiet, carefully maintained, and considerably moving in person.\n\nReturn to Alexandria\nAfter lunch at a local restaurant, we begin the drive back along the coast to Alexandria, arriving in the late afternoon.",
    price: 105,
    currency: "EUR",
    duration: "6 Hours",
    category: "Historical",
    image: "/images/bibliotheca-alexandrina.jpg",
    gallery: ["/images/bibliotheca-alexandrina.jpg", "/images/qaitbay-citadel.jpg", "/images/kom-el-shoqafa-catacombs.jpg"],
    rating: 4.8,
    reviews: 94,
    location: "Alexandria",
    highlights: [
      "El Alamein War Museum with authentic WWII tanks, artillery & weapons",
      "The poignant Commonwealth War Cemetery with over 7,000 graves",
      "The historic German and Italian military memorials overlooking the coast",
      "Scenic Mediterranean coastal drive from Alexandria",
      "Lunch at a local coastal restaurant included",
      "Expert English-speaking military history guide",
      "Private round-trip air-conditioned hotel transfers in Alexandria"
    ],
    included: [
      "Transfer from and to your accommodation in Alexandria",
      "All transfers in a modern, air-conditioned vehicle",
      "All entrance fees for the sites listed in the itinerary",
      "Lunch at a local restaurant",
      "Licensed English-speaking guide throughout the tour",
      "Mineral water during the tour"
    ],
    groupSize: "Small group / Private",
    availability: "Daily (Pickup ~8:00 AM)"
  },
  {
    id: "wadi-el-natrun-monasteries-alexandria",
    title: "Wadi El Natrun Monasteries Day Trip from Alexandria",
    description: "Visit 4th-century working Coptic monasteries in the desert valley that gave mummification its name — Saint Bishoy, Deir al-Surian, and Saint Macarius.",
    longDescription: "The natron used to preserve ancient Egyptian mummies was mined from this exact desert valley, which later became one of the earliest and most important centres of Christian monasticism. Vacation in Egypt's day trip from Alexandria visits Wadi El Natrun's working monasteries, still home to Coptic monks continuing traditions that stretch back over 1,600 years.\n\nInto the Wadi El Natrun Valley\nThe drive from Alexandria heads inland to Wadi El Natrun, a desert depression roughly midway between Alexandria and Cairo. Its name comes from natron, the natural salt compound mined from lakes here and used throughout ancient Egyptian history to dry and preserve mummies.\n\nMonastery of Saint Bishoy\nOur first stop is the Monastery of Saint Bishoy, founded in the 4th century and still home to an active community of Coptic monks. Legend holds that the saint's body has remained miraculously preserved inside the monastery for over 1,500 years.\n\nThe Monastery of the Syrians\nA short drive brings us to Deir al-Surian, the Monastery of the Syrians, named for the Syrian monks who once lived alongside the Egyptian community here. Its church holds some of the finest surviving Coptic frescoes in Egypt, along with an ancient library.\n\nMonastery of Saint Macarius\nThe tour continues to the Monastery of Saint Macarius, one of the most historically significant in Egyptian Christianity and the burial place of several Coptic popes.\n\nReturn to Alexandria\nAfter lunch, we begin the drive back to Alexandria, closing out a day quite different from the city's more familiar Greco-Roman sights.",
    price: 98,
    currency: "EUR",
    duration: "Full Day (7 Hours)",
    category: "Historical",
    image: "/images/hanging-church-cairo.jpg",
    gallery: ["/images/hanging-church-cairo.jpg", "/images/qaitbay-citadel.jpg", "/images/bibliotheca-alexandrina.jpg"],
    rating: 4.9,
    reviews: 86,
    location: "Alexandria",
    highlights: [
      "Monastery of Saint Bishoy, active since the 4th century",
      "Monastery of the Syrians (Deir al-Surian) and its 1,000-year-old frescoes",
      "Monastery of Saint Macarius, resting place of Coptic popes",
      "Historical Natron lakes that supplied ancient pharaonic mummification",
      "Lunch at a local restaurant included",
      "Licensed guide specialized in Coptic and Egyptian heritage",
      "Private round-trip transfers from Alexandria"
    ],
    included: [
      "Transfer from and to your accommodation in Alexandria",
      "All transfers in a modern, air-conditioned vehicle",
      "Guided visits to all monasteries listed in the itinerary",
      "Lunch at a local restaurant",
      "Licensed guide throughout the tour",
      "Mineral water during the tour"
    ],
    groupSize: "Small group / Private",
    availability: "Daily (Pickup ~7:00 AM)"
  },
  {
    id: "abu-simbel-day-trip-from-aswan",
    title: "Abu Simbel Day Trip from Aswan",
    description: "The most direct route to Ramses II's colossal rock-cut temples — 20-metre statues, Queen Nefertari's Temple, and the dramatic UNESCO rescue story.",
    longDescription: "Aswan is the closest major city to Abu Simbel by a wide margin, which makes this the easiest and most affordable way to see the temples — no domestic flight required. Vacation in Egypt's day trip covers the roughly 3.5-hour drive each way through the Nubian desert, with a private, air-conditioned vehicle and a licensed Egyptologist guide.\n\nThe Drive South\nAbu Simbel lies close enough to Aswan that the roughly 3.5-hour drive south, alongside sections of Lake Nasser, is doable in a single day without a flight — the road gives a sense of just how much desert this reservoir reshaped when the High Dam was built.\n\nThe Great Temple of Ramses II\nOn arrival, your guide leads you into the Great Temple, fronted by four colossal seated statues of Ramses II, each around 20 metres tall. Inside, chambers decorated with battle reliefs lead toward an inner sanctuary aligned so precisely that sunlight reaches its statues twice a year, on 22 February and 22 October.\n\nThe Temple of Nefertari\nJust north of the main temple stands a smaller structure dedicated to Ramses II's wife, Queen Nefertari — one of the few ancient Egyptian temples built in honour of a queen rather than a king or god, its facade lined with statues of the royal couple standing at equal height.\n\nA Temple Moved to Save It\nYour guide can point out the visible seams where, in the 1960s, an international UNESCO-led team cut both temples into numbered blocks and reassembled them 65 metres higher and 200 metres back from their original site.\n\nReturn to Aswan\nWith time to explore both temples at your own pace, we begin the drive back to Aswan, arriving in the afternoon.",
    price: 160,
    currency: "EUR",
    duration: "Full Day (8 Hours)",
    category: "Historical",
    image: "/images/abu-simbel.jpg",
    gallery: ["/images/abu-simbel.jpg", "/images/abu-simbel-interior.jpg", "/images/SP.webp"],
    rating: 5.0,
    reviews: 312,
    location: "Aswan",
    highlights: [
      "The Great Temple's four 20-metre colossal statues of Ramses II",
      "The Hathor Temple dedicated to Queen Nefertari",
      "The breathtaking UNESCO engineering relocation story",
      "Scenic overland drive through the Nubian Desert along Lake Nasser",
      "Full entrance fees and licensed Egyptologist guide included",
      "Lunch at a local Nubian restaurant in Abu Simbel",
      "Private pickup & drop-off from your hotel or cruise in Aswan"
    ],
    included: [
      "Transfer from and to your hotel or Nile cruise ship in Aswan",
      "All transfers in a modern, air-conditioned vehicle",
      "All entrance fees for both temples",
      "Lunch at a local restaurant",
      "Licensed Egyptologist guide throughout the tour",
      "Mineral water during the tour"
    ],
    groupSize: "Small group / Private",
    availability: "Daily (Early Pickup ~4:00 AM)",
    hot: true
  },
  {
    id: "aswan-city-tour-philae-obelisk",
    title: "Aswan City Tour: High Dam, Philae Temple & Unfinished Obelisk",
    description: "A relaxed half-day introduction to Aswan — motorboat across to Philae Temple on Agilkia Island, the High Dam over Lake Nasser, and the ancient Unfinished Obelisk.",
    longDescription: "For anyone staying in Aswan rather than passing through on a Luxor day trip, this half-day tour covers the city's three defining sights without the four-hour drive that a Luxor-based version requires. Vacation in Egypt keeps it simple: the High Dam, Philae Temple by motorboat, and the Unfinished Obelisk, all close to your hotel.\n\nThe Aswan High Dam\nCompleted in 1970 to end the Nile's destructive annual flooding, the High Dam is the day's first stop, a short drive away once we've collected you. A brief stop here takes in the scale of Lake Nasser, the reservoir it created, before continuing to the day's main stop.\n\nPhilae Temple by Motorboat\nPhilae Temple's move to Agilkia Island in the 1970s — dismantled block by block to save it from the rising lake — is one of the more remarkable rescue stories in Egyptian archaeology. The short motorboat crossing brings you right up to the temple's pylons, dedicated to the goddess Isis and still richly decorated with reliefs.\n\nThe Unfinished Obelisk\nOur final stop is the ancient granite quarry that once supplied stone for monuments across Egypt, where an enormous obelisk still lies half-carved into the bedrock. A crack that appeared during construction forced its abandonment — a rare, tangible look at how ancient Egyptians worked stone on this scale, before we return you to your hotel.",
    price: 65,
    currency: "EUR",
    duration: "4 Hours",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg", "/images/nile-cruise.jpg", "/images/abu-simbel.jpg"],
    rating: 4.9,
    reviews: 164,
    location: "Aswan",
    highlights: [
      "The Aswan High Dam overlooking Lake Nasser",
      "Motorboat cruise to Philae Temple on Agilkia Island",
      "The monumental Unfinished Obelisk in its ancient bedrock quarry",
      "Relaxed morning pace ideal for guests already staying in Aswan",
      "Licensed Egyptologist guide with 5+ years experience",
      "Private air-conditioned pickup & drop-off in Aswan"
    ],
    included: [
      "Transfer from and to your hotel or Nile cruise ship in Aswan",
      "All transfers in a modern, air-conditioned vehicle",
      "All entrance fees for the sites listed in the itinerary",
      "Motorboat ride to and from Philae Temple",
      "Licensed Egyptologist guide throughout the tour",
      "Mineral water during the tour"
    ],
    groupSize: "Small group / Private",
    availability: "Daily (Pickup ~8:00 AM)"
  },
  {
    id: "nubian-village-felucca-sailing-aswan",
    title: "Nubian Village & Felucca Sailing Trip from Aswan",
    description: "A slow, peaceful half-day on the Nile powered by wind alone — sail around Elephantine Island, visit vibrant Nubian houses, and enjoy tea with a local family.",
    longDescription: "Some of the best afternoons in Aswan involve doing almost nothing — which is exactly what a felucca sail offers. Vacation in Egypt pairs a wind-powered sail around Elephantine Island with a stop in a Nubian village, where colour, architecture and even the language shift noticeably from the rest of Upper Egypt.\n\nSetting Sail\nDown on the Aswan Corniche, a traditional wooden felucca waits, reached on foot shortly after we collect you from your hotel or Nile cruise ship. There's no engine and no set schedule — just sail, current, and a captain who's spent years reading both.\n\nElephantine Island\nThe route passes Elephantine Island, one of the oldest continuously inhabited sites in Egypt, with ruins dating back to the Old Kingdom and an ancient Nilometer once used to measure the Nile's annual flood levels.\n\nA Nubian Village\nThe felucca puts in at a Nubian village, where houses painted in bright blues, yellows and oranges stand in deliberate contrast to the surrounding desert. If your visit lines up with an invitation, you may be welcomed into a family home for tea and a chance to ask about Nubian language, music and daily life.\n\nSailing Back to Aswan\nWith time to browse handwoven textiles, baskets and other Nubian crafts, we board the felucca again for the sail back to Aswan as the light starts to soften over the Nile.",
    price: 55,
    currency: "EUR",
    duration: "3–4 Hours",
    category: "Relaxation",
    image: "/images/nile-cruise.jpg",
    gallery: ["/images/nile-cruise.jpg", "/images/LUX VISIT.webp", "/images/hero.webp"],
    rating: 4.9,
    reviews: 210,
    location: "Aswan",
    highlights: [
      "Traditional wind-powered wooden felucca sail on the Nile",
      "Sailing around historic Elephantine Island and ancient Nilometer",
      "Guided visit to a brightly painted authentic Nubian village",
      "Traditional Nubian mint tea hosted in a local family home",
      "Opportunity to browse authentic hand-woven crafts and spices",
      "Hotel / cruise ship transfers in Aswan included"
    ],
    included: [
      "Transfer from and to your hotel or Nile cruise ship in Aswan",
      "Felucca sailing trip on the Nile",
      "Guided visit to a Nubian village",
      "Licensed guide throughout the tour",
      "Mineral water during the tour"
    ],
    groupSize: "Small group / Private",
    availability: "Daily (Afternoon sailing)",
    hot: true
  },
  {
    id: "blue-hole-dahab-day-trip-sharm",
    title: "Blue Hole & Dahab Day Trip from Sharm El Sheikh",
    description: "Snorkel Egypt's world-famous Blue Hole sinkhole reef flat, followed by beachside relaxation, Bedouin markets, and lunch on Dahab's Assalah promenade.",
    longDescription: "Dahab is everything Sharm El Sheikh isn't — low-rise, Bedouin-rooted and unhurried — and the drive up the Sinai coast to get there is half the appeal. Vacation in Egypt's day trip centres on the Blue Hole, a sinkhole famous among divers worldwide, with plenty of free time in Dahab afterwards.\n\nNorth Along the Sinai Coast\nThe drive from Sharm El Sheikh to Dahab runs roughly ninety minutes up the coast, with the Gulf of Aqaba on one side and the mountains of the Sinai interior on the other — a preview of the more rugged, less-developed Sinai that Dahab is known for.\n\nThe Blue Hole\nThe Blue Hole is a submarine sinkhole that plunges over 100 metres, with a reputation among technical divers that has made it the subject of documentaries. For snorkelers, the appeal is a shallow, coral-lined reef flat at the rim, with clear water and reef fish close enough to touch.\n\nLunch in Dahab\nAfter snorkeling, we head into Dahab itself for lunch at a beachfront restaurant on the Assalah promenade — the kind of place with cushions on the sand rather than formal seating.\n\nFree Time in Assalah\nThe afternoon is left open to explore Dahab's promenade at your own pace: browsing Bedouin jewellery and textile stalls, having a coffee overlooking the water, or simply watching the windsurfers and kitesurfers that Dahab's steady winds attract.\n\nReturn to Sharm El Sheikh\nIn the late afternoon, we begin the drive back down the coast to Sharm El Sheikh, arriving in the early evening.",
    price: 110,
    currency: "EUR",
    duration: "Full Day (8–9 Hours)",
    category: "Sea",
    image: "/images/scuba-diving.jpg",
    gallery: ["/images/scuba-diving.jpg", "/images/hero-redsea.jpg", "/images/beach-resort.jpg", "/images/kitesurfing.jpg"],
    rating: 4.9,
    reviews: 178,
    location: "Sharm El Sheikh",
    highlights: [
      "Snorkeling over the shallow coral reef rim of the world-famous Blue Hole",
      "Scenic coastal drive along the Gulf of Aqaba with rugged Sinai mountain views",
      "Beachfront lunch on cushions overlooking the sea in Dahab",
      "Free time to stroll Dahab's bohemian Assalah promenade & Bedouin bazaars",
      "Full snorkeling equipment (mask, snorkel, life jacket) included",
      "Round-trip air-conditioned hotel transfers from Sharm El Sheikh"
    ],
    included: [
      "Transfer from and to your hotel in Sharm El Sheikh",
      "All transfers in a modern, air-conditioned vehicle",
      "Snorkeling stop at the Blue Hole reef flat, with mask and snorkel provided",
      "Lunch at a beachfront restaurant in Dahab",
      "Guide throughout the tour",
      "Mineral water during the tour"
    ],
    groupSize: "Small group / Private",
    availability: "Daily (Pickup ~8:00 AM)",
    hot: true
  },
  {
    id: "fayoum-oasis-day-trip-cairo",
    title: "Fayoum Oasis Day Trip from Cairo: Wadi El Rayan & Magic Lake",
    description: "Waterfalls, golden dunes, and a colour-shifting lake — Wadi El Rayan waterfalls, Magic Lake sandboarding, Tunis pottery village, and prehistoric Lake Qarun.",
    longDescription: "Fayoum is the closest oasis to Cairo, and one of the least like the popular image of an oasis — a green, agricultural depression built around a lake older than the pyramids, with a protected desert reserve on its doorstep. Vacation in Egypt's day trip covers Fayoum's best-known natural sights in a single day, no overnight stay required.\n\nThe Drive to Fayoum\nFayoum lies roughly two hours southwest of Cairo, reached by a road that trades the city for open desert and then, abruptly, for the palm groves and irrigation canals of the Fayoum depression — Egypt's largest oasis.\n\nWadi El Rayan's Waterfalls\nOur first stop is Wadi El Rayan, a protected natural reserve built around two man-made lakes connected by Egypt's only waterfalls — a striking sight against the surrounding desert.\n\nThe Magic Lake & Sand Dunes\nA short drive further brings us to the Magic Lake, a small body of water tucked among golden dunes that shifts between blue, green and turquoise depending on the sun angle. Those interested can add optional sandboarding down surrounding dunes.\n\nTunis Village\nThe tour continues to Tunis Village overlooking Lake Qarun, an internationally renowned pottery-making community. Small workshops line the village, many open to visitors with finished ceramic pieces.\n\nLake Qarun\nWe close the day with a stop at Lake Qarun itself, one of the oldest natural lakes in the world and a winter haven for migratory birds, before driving back to Cairo.",
    price: 110,
    currency: "EUR",
    duration: "Full Day (9–10 Hours)",
    category: "Adventure",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg", "/images/bedouin-dinner.jpg", "/images/hero.webp", "/images/SP.webp"],
    rating: 4.9,
    reviews: 142,
    location: "Cairo",
    highlights: [
      "Wadi El Rayan's natural desert waterfalls, the only waterfalls in Egypt",
      "The color-shifting Magic Lake surrounded by sweeping golden sand dunes",
      "Opportunity for desert sandboarding down soft Sahara dunes",
      "Tunis Village pottery workshops and handcrafted ceramic studios",
      "Ancient Lake Qarun, one of the world's oldest natural lakes",
      "Traditional Egyptian lunch at a local Fayoum restaurant included",
      "Private round-trip transfers from Cairo in modern air-conditioned vehicle"
    ],
    included: [
      "Transfer from and to your hotel in Cairo",
      "All transfers in a modern, air-conditioned vehicle",
      "Entrance fees to the Wadi El Rayan protected area",
      "Lunch at a local restaurant in Fayoum",
      "Guide throughout the tour",
      "Mineral water during the tour"
    ],
    groupSize: "Small group / Private",
    availability: "Daily (Pickup ~7:00 AM)"
  },
  {
    id: "luxor-aswan-nile-cruise-4days",
    title: "Luxor to Aswan Nile Cruise: 4 Days / 3 Nights Five Stars",
    description: "The classic 5-star Nile cruise — Karnak, Luxor Temple, Valley of the Kings, Hatshepsut, Edfu, Kom Ombo double temple, and Aswan felucca sailing with all meals included.",
    longDescription: "Some of Egypt's best-known temples are strung along the Nile between Luxor and Aswan, close enough together that a cruise ship remains the most comfortable way to see them all. Vacation in Egypt's 4-day, 3-night sailing covers Luxor, Edfu, Kom Ombo and Aswan, with a licensed Egyptologist guide accompanying every excursion ashore.\n\nDay 1: Embarkation in Luxor\nWe meet you at your hotel or Luxor airport and transfer you to the ship for check-in. In the afternoon, your guide leads a tour of Karnak Temple, the largest religious complex ever built, followed by Luxor Temple, illuminated after dark. The ship remains docked in Luxor overnight.\n\nDay 2: The Valley of the Kings & West Bank\nThe morning is dedicated to Luxor's West Bank: the Valley of the Kings, burial site of Tutankhamun and dozens of other pharaohs, followed by the Temple of Hatshepsut and the Colossi of Memnon. In the afternoon, the ship sets sail south toward Edfu, with the rest of the day free to relax on deck as the Nile Valley slides past.\n\nDay 3: Edfu & Kom Ombo\nWe dock in Edfu for a morning visit to the Temple of Horus, reached by horse-drawn carriage from the quay. The ship then continues to Kom Ombo, where a unique double temple honours the crocodile god Sobek and the falcon god Horus in mirrored halves of the same building, visited in the late afternoon as the ship keeps sailing toward Aswan.\n\nDay 4: Aswan & Disembarkation\nThe final morning is spent in Aswan, with a felucca sail around Elephantine Island before the ship docks and we transfer you to your hotel or the airport, bringing four days of temples and riverside scenery to a close.",
    price: 740,
    currency: "EUR",
    duration: "4 Days / 3 Nights",
    category: "Cruise",
    image: "/images/nile-cruise.jpg",
    gallery: ["/images/nile-cruise.jpg", "/images/luxor-temple.jpg", "/images/abu-simbel.jpg", "/images/LUX VISIT.webp"],
    rating: 5.0,
    reviews: 420,
    location: "Luxor",
    highlights: [
      "3 nights aboard a 5-star Nile cruiser in an outside-view cabin with private bath",
      "Full board daily: buffet breakfast, gourmet lunch, and multi-course dinner",
      "Karnak Temple and nighttime illuminated Luxor Temple",
      "Valley of the Kings, Queen Hatshepsut Temple, and Colossi of Memnon",
      "Temple of Horus at Edfu by horse-drawn carriage",
      "Unique Kom Ombo double temple dedicated to Sobek and Horus",
      "Felucca sailboat excursion around Elephantine Island in Aswan",
      "Licensed Egyptologist guide for all shore excursions and private airport/hotel transfers"
    ],
    included: [
      "Transfer from and to your hotel or airport in Luxor and Aswan",
      "3 nights aboard ship in an outside-view cabin",
      "Full board: breakfast, lunch and dinner daily",
      "All guided excursions listed in the itinerary, with a licensed Egyptologist",
      "All entrance fees for the sites listed in the itinerary",
      "Felucca sail around Elephantine Island on Day 4"
    ],
    groupSize: "5-Star Cruise Vessel",
    availability: "Mondays & Fridays departure",
    hot: true
  },
  {
    id: "daily-diving-trip-hurghada",
    title: "Daily Diving Trip in Hurghada: Two Guided Boat Dives",
    description: "Two guided boat dives for certified divers at top Red Sea reef sites — full scuba equipment, professional dive guide, buffet lunch, and hotel transfers included.",
    longDescription: "If you're already a certified diver and simply want to get back into the water, this Hurghada diving trip is made for you. No course, no classroom and no unnecessary delays — just a full day exploring the Red Sea from a comfortable dive boat.\n\nJoin our daily diving trip from Hurghada for two guided boat dives at different Red Sea dive sites, selected according to weather, sea conditions, visibility and the experience level of the group.\n\nYour package includes hotel transfers, full scuba equipment, professional dive guidance, lunch and soft drinks on board, so you can concentrate on what really matters: enjoying the Red Sea.\n\nYour Diving Day\nHotel Pickup: Your day begins with pickup from your accommodation in Hurghada at approximately 7:30 AM. After a comfortable transfer to the marina, you'll meet the dive team, prepare your equipment and board the dive boat.\n\nDeparture & Dive Sites: The dive team evaluates the weather, wind, currents, visibility and sea conditions before confirming the day's dive locations. Rather than following a rigid itinerary, your dive plan is adapted to the sea on the day of your trip.\n\nDive One: Once the boat reaches the first dive site, your professional guide will give a comprehensive briefing before entering the water. Explore colourful coral formations, reef walls, sandy areas and diverse marine life.\n\nLunch & Surface Interval: Enjoy a buffet lunch and soft drinks on board while you warm up, recharge and share stories from the first dive.\n\nDive Two: The second dive takes you to a different dive site with new reef walls, coral gardens, and marine life.\n\nReturn: After the second dive, relax on the boat as it heads back toward Hurghada Marina, arriving in the late afternoon.",
    price: 70,
    currency: "EUR",
    duration: "Full Day (8 Hours)",
    category: "Sea",
    image: "/images/scuba-diving.jpg",
    gallery: ["/images/scuba-diving.jpg", "/images/hero-redsea.jpg", "/images/beach-resort.jpg", "/images/yacht-charter.jpg"],
    rating: 5.0,
    reviews: 294,
    location: "Hurghada",
    highlights: [
      "Two guided boat dives at two different Red Sea reef sites",
      "Full scuba diving equipment included (BCD, regulator, tanks, weights, wetsuit)",
      "Professional certified PADI / CMAS dive guide",
      "Delicious buffet lunch and unlimited soft drinks on board",
      "Dive sites selected daily for optimal visibility and calm currents",
      "Boats equipped with emergency oxygen and modern marine safety gear",
      "Non-diving companions can join as snorkelers at a reduced rate",
      "Private round-trip hotel pickup and drop-off in Hurghada"
    ],
    included: [
      "Hotel pickup and return in Hurghada",
      "Two guided boat dives at two different dive sites",
      "Full scuba diving equipment (BCD, regulator, tanks, weights, wetsuit)",
      "Professional certified dive guide",
      "Buffet lunch on board",
      "Soft drinks and mineral water",
      "Marine Park / diving area entrance fees"
    ],
    groupSize: "Certified Divers / Yacht",
    availability: "Daily (Pickup ~7:30 AM)",
    hot: true
  },
  {
    id: "daily-diving-trip-sharm-el-sheikh",
    title: "Daily Diving Trip in Sharm El Sheikh: Tiran & Ras Mohammed",
    description: "Two guided boat dives for certified divers at Straits of Tiran or Ras Mohammed National Park — full scuba equipment, professional dive guide, buffet lunch, and hotel transfers included.",
    longDescription: "Sharm El Sheikh is famous for a reason. From the dramatic walls and coral reefs of the Straits of Tiran to the spectacular underwater landscapes of Ras Mohammed National Park, this part of the Red Sea offers some of Egypt's most exciting diving.\n\nOur daily diving trip is designed for certified divers who want to experience Sharm's famous reefs without committing to a multi-day diving package. Enjoy two guided boat dives, full scuba equipment, professional dive guidance, lunch and refreshments on board, with convenient hotel transfers included.\n\nYour Diving Day\nHotel Pickup: Your adventure begins with pickup from your accommodation in Sharm El Sheikh at approximately 7:30 AM. After arriving at the marina, you'll meet the dive team, complete the necessary preparations and board the boat.\n\nSailing Toward the Reefs: The dive team confirms the day's dive locations according to weather, wind, waves, currents, visibility and safety conditions, ensuring the most appropriate sites for the group.\n\nDive One — Tiran or Ras Mohammed: Your first dive takes place at one of the day's selected sites around the Straits of Tiran (Jackson, Woodhouse, Thomas or Gordon Reef) or Ras Mohammed National Park with steep reef walls, coral gardens, and clear blue water.\n\nLunch & Surface Interval: Enjoy a buffet-style lunch and refreshments on board while you relax and take in the Red Sea scenery before preparing for the second dive.\n\nDive Two — A Different Underwater Experience: The second dive takes you to a different site with dramatic drop-offs, drifting currents, colourful coral formations, and abundant marine life.\n\nReturn: After completing your second dive, relax on the boat during the return journey to Sharm El Sheikh Marina, arriving in the afternoon.",
    price: 75,
    currency: "EUR",
    duration: "Full Day (8 Hours)",
    category: "Sea",
    image: "/images/hero-redsea.jpg",
    gallery: ["/images/hero-redsea.jpg", "/images/scuba-diving.jpg", "/images/beach-resort.jpg", "/images/yacht-charter.jpg"],
    rating: 5.0,
    reviews: 318,
    location: "Sharm El Sheikh",
    highlights: [
      "Two guided boat dives at Straits of Tiran or Ras Mohammed National Park",
      "Full scuba diving equipment included (BCD, regulator, tanks, weights, wetsuit)",
      "World-famous coral reef walls, crystal clear lagoons, and drop-offs",
      "Professional certified PADI / CMAS dive guide on every boat",
      "Buffet lunch, soft drinks, and refreshments served on board",
      "Dive boats equipped with emergency oxygen and marine safety gear",
      "Non-diving companions can join as snorkelers at a reduced rate",
      "Round-trip air-conditioned hotel transfers in Sharm El Sheikh"
    ],
    included: [
      "Hotel pickup and return in Sharm El Sheikh",
      "Two guided boat dives at Tiran or Ras Mohammed",
      "Full scuba diving equipment (BCD, regulator, tanks, weights, wetsuit)",
      "Professional certified dive guide",
      "Buffet lunch on board",
      "Soft drinks and mineral water",
      "Applicable marine park and reserve entrance fees"
    ],
    groupSize: "Certified Divers / Yacht",
    availability: "Daily (Pickup ~7:30 AM)",
    hot: true
  },
  {
    id: "padi-diving-courses-egypt",
    title: "PADI Diving Courses in Hurghada & Sharm El Sheikh",
    description: "Learn to dive in the Red Sea with certified PADI instructors — Open Water Diver, Advanced Open Water, or Discover Scuba Diving with full equipment & certification included.",
    longDescription: "From your first breath underwater to advanced diving adventures — start your diving journey in Egypt's legendary Red Sea. Warm water, spectacular coral reefs and excellent underwater visibility make the Red Sea an incredible place to learn to dive.\n\nWhether you've never worn a mask and regulator before, already hold an Open Water certification, or simply want to experience scuba diving for the first time, Vacation in Egypt offers PADI training options in both Hurghada and Sharm El Sheikh.\n\nChoose Your Diving Course\n• PADI Open Water Diver (3–4 Days): The world's most recognized recreational diving qualification. Learn essential skills, buoyancy control, dive planning, emergency procedures, and complete open-water training dives.\n• PADI Advanced Open Water Diver (2–3 Days): Take your diving beyond the basics with 5 adventure dives including Deep Diving and Underwater Navigation.\n• Discover Scuba Diving (1 Day): Your first taste of scuba diving with an instructor briefing and a supervised shallow open-water dive with no certification required.\n\nSmall Groups & Personal Instruction\nWhere available, courses are arranged in small groups with experienced PADI instructors who guide you through the theory, skills, and open-water training at your own pace.",
    price: 415,
    currency: "EUR",
    duration: "1–4 Days",
    category: "Sea",
    image: "/images/scuba-diving.jpg",
    gallery: ["/images/scuba-diving.jpg", "/images/hero-redsea.jpg", "/images/beach-resort.jpg", "/images/yacht-charter.jpg"],
    rating: 5.0,
    reviews: 264,
    location: "Hurghada",
    highlights: [
      "Official PADI Open Water, Advanced Open Water & Discover Scuba courses",
      "Full modern scuba diving equipment included throughout training",
      "Confined-water skill practice & real Red Sea open-water training dives",
      "PADI certification processing & official digital certification card included",
      "Flexible PADI eLearning options to complete theory before arrival",
      "Small training groups with dedicated, certified PADI instructors",
      "Available with daily hotel transfers in both Hurghada & Sharm El Sheikh"
    ],
    included: [
      "Transfer from and to your accommodation in Hurghada or Sharm El Sheikh",
      "PADI course materials and eLearning access",
      "Full scuba equipment during training (BCD, regulator, wetsuit, mask, fins)",
      "Confined-water training sessions & required open-water training dives",
      "PADI certification processing and official certification card",
      "Instructor-led training and safety briefings"
    ],
    groupSize: "Small Training Group",
    availability: "Daily Departures",
    hot: true
  },
  {
    id: "nile-cruise-luxor-to-aswan-4-days",
    title: "Nile Cruise Luxor to Aswan: 4 Days / 3 Nights",
    description: "Classic 4-Day, 3-Night Nile cruise from Luxor to Aswan — Karnak, Luxor Temple, Valley of the Kings, Hatshepsut, Edfu, Kom Ombo, and Philae with full board.",
    longDescription: "There is something completely different about seeing Upper Egypt from the water. Instead of spending your holiday travelling between temples by road, you wake up each morning to a new stretch of the Nile, watching villages, palm trees and desert landscapes pass slowly from the deck.\n\nThis 4-day, 3-night Nile cruise from Luxor to Aswan combines Egypt's greatest ancient monuments with the comfort of a cruise ship, full-board accommodation and guided excursions.\n\nChoose between 3-star (from €380), 4-star (from €480) or 5-star (from €680) cruise options, depending on the level of comfort and experience you prefer.\n\nYour Journey Along the Nile\n• Day 1 — Luxor East Bank: Check-in aboard your ship, followed by guided tours of the monumental Karnak Temple complex and illuminated Luxor Temple. Overnight on board in Luxor.\n• Day 2 — Valley of the Kings & Sailing South: Explore the West Bank necropolis, Valley of the Kings, Queen Hatshepsut Temple, and Colossi of Memnon before setting sail toward Edfu.\n• Day 3 — Edfu & Kom Ombo: Visit the remarkably preserved Temple of Horus at Edfu, followed by the unique double temple of Kom Ombo dedicated to Sobek and Haroeris.\n• Day 4 — Aswan, Philae Temple & High Dam: Reach Aswan to explore the High Dam and scenic motorboat ride to Philae Temple on Agilkia Island before disembarkation.",
    price: 380,
    currency: "EUR",
    duration: "4 Days / 3 Nights",
    category: "Cruise",
    image: "/images/nile-cruise.jpg",
    gallery: ["/images/nile-cruise.jpg", "/images/luxor-temple.jpg", "/images/abu-simbel.jpg", "/images/LUX VISIT.webp"],
    rating: 4.9,
    reviews: 485,
    location: "Luxor",
    highlights: [
      "4 Days / 3 Nights cruise on the Nile from Luxor to Aswan",
      "Karnak Temple and nighttime illuminated Luxor Temple",
      "Valley of the Kings, Queen Hatshepsut Temple, and Colossi of Memnon",
      "Temple of Horus at Edfu and unique double temple of Kom Ombo",
      "Philae Temple on Agilkia Island and the Aswan High Dam",
      "Full board daily: breakfast, lunch, and dinner included on board",
      "Choose from 3-Star, 4-Star, or Luxury 5-Star cruise vessels",
      "Licensed Egyptologist guides for all included shore excursions"
    ],
    included: [
      "3 nights' accommodation aboard selected Nile cruise ship",
      "Full-board meals on board (breakfast, lunch, and dinner daily)",
      "All guided sightseeing excursions listed in the itinerary",
      "Entrance fees for all included archaeological sites and temples",
      "Licensed Egyptologist guide during all excursions",
      "Transfer from your Luxor accommodation / airport to the ship",
      "Assistance arranging onward travel from Aswan"
    ],
    groupSize: "Cruise Ship (3★/4★/5★)",
    availability: "Mondays & Fridays Departures",
    hot: true
  },
  {
    id: "nile-cruise-aswan-to-luxor-4-days",
    title: "Nile Cruise Aswan to Luxor: 4 Days / 3 Nights",
    description: "Sail north along the Nile from Aswan to Luxor — Philae Temple, High Dam, Kom Ombo, Edfu, Karnak, Luxor Temple, and Valley of the Kings with full board.",
    longDescription: "A Nile cruise is more than a way to travel between Egypt's ancient cities. It's the experience of waking beside the river, watching palm-lined villages and desert landscapes drift past, and discovering a different piece of ancient Egypt at every stop.\n\nThis 4-day, 3-night Nile cruise from Aswan to Luxor takes you north along the Nile, combining the temples of Aswan, Kom Ombo and Edfu with the extraordinary monuments of Luxor.\n\nChoose between 3-star (from €320), 4-star (from €480) or 5-star (from €680) cruise options, depending on your preferred level of comfort.\n\nYour Journey Along the Nile\n• Day 1 — Aswan, Philae Temple & Embarkation: Arrive in Aswan with pickup from hotel, airport or train station. Visit Philae Temple by motorboat and the High Dam before boarding and dinner on board.\n• Day 2 — Kom Ombo & Sailing North: Sail north to explore the unique symmetrical double temple of Kom Ombo (dedicated to Sobek & Haroeris), then relax on the sun deck.\n• Day 3 — Edfu Temple & Sailing Toward Luxor: Visit the monumental Temple of Horus at Edfu, one of the best-preserved ancient temples in Egypt, then cruise toward Luxor.\n• Day 4 — Luxor Grand Finale: Explore Karnak Temple Complex, Luxor Temple on the East Bank, and the legendary tombs in the Valley of the Kings on the West Bank before disembarkation.",
    price: 345,
    currency: "EUR",
    duration: "4 Days / 3 Nights",
    category: "Cruise",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg", "/images/nile-cruise.jpg", "/images/abu-simbel.jpg", "/images/LUX VISIT.webp"],
    rating: 4.9,
    reviews: 412,
    location: "Aswan",
    highlights: [
      "4 Days / 3 Nights cruise on the Nile sailing north from Aswan to Luxor",
      "Philae Temple on Agilkia Island & Aswan High Dam",
      "Unique double temple of Kom Ombo (Sobek & Horus)",
      "Horus Temple at Edfu by local carriage / transfer",
      "Karnak Temple Complex & illuminated Luxor Temple",
      "Valley of the Kings royal tombs on Luxor's West Bank",
      "Full board daily: breakfast, lunch, and dinner on board",
      "Licensed Egyptologist guides for all shore excursions"
    ],
    included: [
      "3 nights' accommodation aboard selected Nile cruise ship",
      "Full-board accommodation (breakfast, lunch, and dinner daily)",
      "All guided excursions listed in the itinerary",
      "Entrance fees for all included archaeological sites and temples",
      "Licensed Egyptologist guide during all excursions",
      "Transfer from Aswan hotel, airport or train station to the ship",
      "Assistance arranging onward transportation from Luxor"
    ],
    groupSize: "Cruise Ship (3★/4★/5★)",
    availability: "Wednesdays & Fridays Departures",
    hot: true
  }
];

// Categories
export const categories = [
  "All",
  "Sea",
  "Historical",
  "Adventure",
  "Cruise",
  "Relaxation"
];

// Services
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "transport",
    title: "Private Transportation",
    description: "Chauffeured vehicles for all your Egyptian journeys",
    icon: "car",
    features: ["Luxury fleet", "Professional drivers", "Airport transfers", "Custom itineraries"]
  },
  {
    id: "hotels",
    title: "Luxury Hotels",
    description: "Handpicked 5-star resorts and boutique hotels across Egypt",
    icon: "building",
    features: ["Best rate guarantee", "VIP welcome amenities", "Room upgrades", "Late checkout"]
  },
  {
    id: "nile-cruises",
    title: "Nile Cruises",
    description: "Premium cruise ships from Luxor to Aswan and back",
    icon: "ship",
    features: ["5-star vessels", "All-inclusive dining", "Nile-view suites", "Guided excursions"]
  },
  {
    id: "med-cruises",
    title: "Mediterranean Cruises",
    description: "Coastal cruises from Alexandria to exotic ports",
    icon: "anchor",
    features: ["Luxury liners", "Multiple destinations", "Onboard entertainment", "Shore excursions"]
  },
  {
    id: "meet-assist",
    title: "Airport Meet & Assist",
    description: "VIP welcome and fast-track through Egyptian airports",
    icon: "user-check",
    features: ["Personal greeter", "Fast-track immigration", "Luggage assistance", "Lounge access"]
  },
  {
    id: "fast-track",
    title: "Fast Track Services",
    description: "Skip queues at airports, attractions, and events",
    icon: "zap",
    features: ["Priority security", "Express entry", "Dedicated lanes", "Time savings"]
  }
];

// Hot Offers
export interface HotOffer {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  endDate: string;
  tripId: string;
  urgency: string;
}

export const hotOffers: HotOffer[] = [
  {
    id: "offer-1",
    title: "Abu Simbel Day Trip by Plane from Cairo",
    originalPrice: 415,
    discountedPrice: 375,
    discount: 10,
    endDate: "2026-06-15",
    tripId: "abu-simbel-day-trip-plane-cairo",
    urgency: "Exclusive VIP Flight Slots"
  }
];

// Languages
export const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "sr", name: "Српски", flag: "🇷🇸" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "he", name: "עברית", flag: "🇮🇱" },
  { code: "kk", name: "Қазақша", flag: "🇰🇿" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹" }
];

// Currencies
export const currencies = [
  { code: "EUR", symbol: "€", rate: 1 },
  { code: "USD", symbol: "$", rate: 1.09 },
  { code: "GBP", symbol: "£", rate: 0.86 },
  { code: "EGP", symbol: "E£", rate: 53.0 },
  { code: "CHF", symbol: "CHF", rate: 0.96 },
  { code: "AUD", symbol: "A$", rate: 1.65 },
  { code: "CAD", symbol: "C$", rate: 1.48 },
  { code: "RUB", symbol: "₽", rate: 97.0 },
  { code: "CNY", symbol: "¥", rate: 7.85 },
  { code: "JPY", symbol: "¥", rate: 165.0 }
];

// WhatsApp numbers for rotation
export const whatsappNumbers = [
  "+201131312402"
];

// AI Concierge Responses
export const aiResponses = {
  greeting: [
    "Welcome to the world of VACATION IN EGYPT. I am Tamara, your personal curator for Egyptian luxury. How may I assist you in crafting an unforgettable journey today?",
    "Greetings! I am Tamara. It would be my distinct pleasure to help you navigate our portfolio of exclusive Egyptian experiences. Where shall we begin?",
    "A pleasure to meet you. I am Tamara, your dedicated concierge. Are you seeking the serenity of the Red Sea or the timeless grandeur of our ancient monuments?"
  ],
  recommendations: [
    "Given your refined tastes, I would highly recommend our Private Yacht Charter. Navigating the crystalline waters of the Red Sea at sunset is an experience of unparalleled grace.",
    "For those with an appetite for the extraordinary, our Bespoke Desert Expedition offers a profound encounter with the majestic Egyptian wilderness.",
    "If you wish to walk among the shadows of Pharaohs, our Private Pyramids Excursion, led by our senior Egyptologists, provides a depth of insight rarely found elsewhere."
  ],
  priceObjection: [
    "I appreciate your focus on value. At VACATION IN EGYPT, we invest in absolute excellence—from our expert guides to our premium fleet—ensuring that your investment yields memories of a lifetime. May I highlight our current seasonal privileges?",
    "Our experiences are meticulously curated to include every detail for a seamless journey. The value lies in the exclusivity and the peace of mind that only true luxury provides.",
    "We prioritize quality over quantity in every aspect. Should you wish to explore our most prestigious packages, I can certainly outline the exceptional benefits included."
  ],
  thinkAboutIt: [
    "Prudence is always wise when planning such significant moments. However, I should share that our premier yacht slots are becoming increasingly scarce as the season reaches its zenith.",
    "I completely understand the need for reflection. Please be advised that our sunrise hot air balloon flights over Luxor are currently in high demand due to the optimal atmospheric conditions.",
    "Take all the time you require. If you wish, I can tentatively reserve a window in our calendar for the next 24 hours to ensure your preferred date remains available."
  ],
  urgency: [
    "The current meteorological conditions are simply sublime—tranquil seas and radiant skies await. It is truly the definitive moment for an Egyptian escape.",
    "We are approaching capacity for our upcoming weekend excursions. Would you care to secure your place amongst our elite group of travelers?",
    "As we move into the peak of the season, our most sought-after experiences are being reserved rapidly. I would be delighted to finalize your arrangements this moment."
  ],
  closing: [
    "Shall I have the honor of preparing your bespoke itinerary? It would take but a moment to consolidate the details of your selection.",
    "If you are ready to embark on this extraordinary adventure, I am prepared to facilitate all necessary arrangements on your behalf.",
    "I look forward to welcoming you to the VACATION IN EGYPT family. Which of our distinguished experiences resonates most with your vision for this trip?"
  ]
};

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Sophie & Marcus",
    country: "Germany",
    text: "The yacht cruise was the highlight of our honeymoon. Professional crew, stunning reefs, and the sunset champagne moment was pure magic. VACATION IN EGYPT exceeded every expectation.",
    rating: 5,
    trip: "Red Sea Yacht Cruise",
    platform: "tripadvisor"
  },
  {
    id: 2,
    name: "Ivan Petrov",
    country: "Russia",
    text: "I've traveled worldwide, but the Pyramids day trip with VACATION IN EGYPT was exceptional. Our guide knew every secret of ancient Egypt. Worth every penny.",
    rating: 5,
    trip: "Pyramids Day Trip",
    platform: "google"
  },
  {
    id: 3,
    name: "Emma Richardson",
    country: "UK",
    text: "The Nile cruise was like stepping back in time, but with 5-star comfort. Waking up to temple views from my suite window - unforgettable.",
    rating: 5,
    trip: "Nile Cruise",
    platform: "booking"
  },
  {
    id: 4,
    name: "Hans Weber",
    country: "Switzerland",
    text: "Desert safari was pure adrenaline! Dune bashing, sandboarding, then a Bedouin dinner under a million stars. Perfectly organized from start to finish.",
    rating: 5,
    trip: "Desert Safari",
    platform: "getyourguide"
  },
  {
    id: 5,
    name: "Claire & David",
    country: "Canada",
    text: "Our hot air balloon ride over Luxor at sunrise was breathtaking. The pilot was incredibly skilled and made us feel so safe. A bucket-list moment realized perfectly.",
    rating: 5,
    trip: "Luxor Hot Air Balloon",
    platform: "tripadvisor"
  },
  {
    id: 6,
    name: "Ahmed Al-Mansoori",
    country: "UAE",
    text: "The private VIP concierge service in Cairo was flawless. They handled every detail from airport fast-track to private viewings at the museum. Truly 5-star luxury.",
    rating: 5,
    trip: "VIP Cairo Experience",
    platform: "google"
  },
  {
    id: 7,
    name: "Laura Rossi",
    country: "Italy",
    text: "Diving in Sharm El Sheikh with VACATION IN EGYPT's master instructors changed my life. The equipment was brand new, and they took us to reefs with zero crowds.",
    rating: 5,
    trip: "PADI Diving Experience",
    platform: "getyourguide"
  },
  {
    id: 8,
    name: "Michael Chen",
    country: "Singapore",
    text: "The coordination for our 10-day full Egypt itinerary was seamless. From the domestic flights to the luxury hotel transfers, everything was exactly on time.",
    rating: 5,
    trip: "Complete Egypt Tour",
    platform: "booking"
  }
];

// Blog posts
export const blogPosts = [
  {
    id: 1,
    title: "Best Time to Visit Hurghada: A Complete Weather & Travel Guide",
    excerpt: "Discover the perfect season for your Red Sea vacation. We break down the best months for scuba diving, luxury yacht charters, and avoiding the crowds...",
    image: "/images/beach-resort.jpg",
    date: "2026-04-15",
    category: "Travel Guide"
  },
  {
    id: 2,
    title: "Top 10 Luxury Resorts and Private Beaches in the Red Sea",
    excerpt: "From El Gouna to Soma Bay, explore the most exclusive 5-star resorts, private villas, and VIP beach clubs for an unforgettable Egyptian getaway...",
    image: "/images/yacht-charter.jpg",
    date: "2026-04-10",
    category: "Luxury"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Scuba Diving in the Red Sea",
    excerpt: "Explore world-renowned dive sites, vibrant coral reefs, and mysterious shipwrecks. Everything beginners and advanced divers need to know...",
    image: "/images/scuba-diving.jpg",
    date: "2026-04-05",
    category: "Adventure"
  },
  {
    id: 4,
    title: "Cairo in 48 Hours: A VIP Guide to the Pyramids and Beyond",
    excerpt: "Maximize your weekend in Cairo with our exclusive itinerary. Fast-track entry to the Pyramids of Giza, private museum tours, and fine dining by the Nile...",
    image: "/images/pyramids.jpg",
    date: "2026-03-28",
    category: "Historical"
  },
  {
    id: 5,
    title: "Luxor & Aswan Nile River Cruises: What to Expect",
    excerpt: "Step aboard a 5-star floating hotel. We review the ultimate luxury Nile cruise experiences, featuring private balconies, gourmet dining, and guided temple tours...",
    image: "/images/nile-cruise.jpg",
    date: "2026-03-20",
    category: "Cruises"
  },
  {
    id: 6,
    title: "Bedouin Desert Safaris: Sunset Dinners and Dune Bashing",
    excerpt: "Experience the magic of the Eastern Desert. Learn why a private sunset quad biking tour followed by a traditional Bedouin dinner under the stars is a must-do...",
    image: "/images/desert-safari.jpg",
    date: "2026-03-12",
    category: "Adventure"
  },
  {
    id: 7,
    title: "Swimming with Dolphins in Hurghada: Ethical & Safe Encounters",
    excerpt: "Where and how to safely swim with wild dolphins in the Red Sea. Our complete guide to Dolphin House tours and eco-friendly snorkeling practices...",
    image: "/images/dolphin-tour.jpg",
    date: "2026-03-05",
    category: "Wildlife"
  },
  {
    id: 8,
    title: "How to Plan a Honeymoon in Egypt: Romantic Destinations",
    excerpt: "Curating the perfect romantic escape. Think private sunset yacht charters, couple's spa treatments, and secluded island getaways in the Red Sea...",
    image: "/images/HM.webp",
    date: "2026-02-28",
    category: "Couples"
  },
  {
    id: 9,
    title: "Egypt Visa Requirements 2026: A Seamless Entry Guide",
    excerpt: "Navigate Egyptian customs like a VIP. Everything you need to know about the e-Visa, visa-on-arrival, and fast-track airport concierge services...",
    image: "/images/VISA.webp",
    date: "2026-02-15",
    category: "Travel Tips"
  },
  {
    id: 10,
    title: "What to Pack for an Egyptian Luxury Vacation",
    excerpt: "The ultimate packing checklist for a seamless holiday. From desert-appropriate fashion to the right gear for your luxury yacht cruise...",
    image: "/images/LUX VISIT.webp",
    date: "2026-02-05",
    category: "Travel Tips"
  }
];
