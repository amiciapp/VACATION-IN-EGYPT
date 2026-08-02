// VACATION IN EGYPT - Complete Trips Data (40 Trips)
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
    id: "red-sea-yacht",
    title: "Red Sea Yacht Cruise",
    description: "Luxury yacht experience with snorkeling and gourmet dining",
    longDescription: "Sail the crystal-clear waters of the Red Sea aboard our premium yacht. Enjoy world-class snorkeling, sunbathing on deck, and a gourmet lunch prepared by our onboard chef. Perfect for couples and groups seeking an exclusive maritime adventure.",
    price: 185,
    currency: "USD",
    duration: "8 hours",
    category: "Sea",
    image: "/images/hero-redsea.jpg",
    gallery: ["/images/hero-redsea.jpg", "/images/yacht-charter.jpg", "/images/scuba-diving.jpg"],
    rating: 4.9,
    reviews: 342,
    location: "Hurghada",
    highlights: ["Snorkeling at coral reefs", "Gourmet onboard dining", "Open bar", "Professional crew"],
    included: ["Hotel transfer", "Equipment", "Lunch", "Drinks"],
    groupSize: "2-12 people",
    availability: "Daily",
    hot: true,
    discount: 15
  },
  {
    id: "pyramids-day-trip",
    title: "Pyramids & Sphinx Day Trip",
    description: "Fly from Hurghada and explore the Pyramids of Giza, Great Sphinx & Valley Temple with a licensed Egyptologist — includes flights, luxury transport, and traditional lunch.",
    longDescription: "Journey by air from Hurghada to Cairo and witness the last remaining wonder of the ancient world. Stand before the Great Pyramid of Khufu, admire the mysterious Great Sphinx, and explore the ancient Valley Temple with your private licensed Egyptologist. A Nile-side traditional lunch is included before your comfortable flight back to Hurghada. The perfect day excursion for history lovers staying on the Red Sea coast.",
    price: 145,
    currency: "USD",
    duration: "12 hours",
    category: "Historical",
    image: "/images/SP.webp",
    gallery: ["/images/SP.webp", "/images/luxor-temple.jpg"],
    rating: 4.8,
    reviews: 567,
    location: "Cairo",
    highlights: ["Pyramids of Giza", "Great Sphinx", "Valley Temple", "Camel ride", "Nile-side lunch", "Return flights from Hurghada", "Licensed Egyptologist", "Panoramic Giza viewpoint"],
    included: ["Return flight from Hurghada", "Expert Egyptologist guide", "Traditional lunch", "All entry tickets", "Air-conditioned transport", "Hotel airport transfers"],
    groupSize: "2-8 people",
    availability: "Tue, Thu, Sat",
    hot: true
  },
  {
    id: "cairo-pyramids-egyptian-museum-tour",
    title: "Cairo Pyramids & Egyptian Museum Tour",
    description: "Full-day private cultural tour to the Pyramids of Giza, Great Sphinx, Valley Temple & Egyptian Museum with a professional Egyptologist — hotel pickup & traditional lunch included.",
    longDescription: "Discover the heart of Ancient Egypt on this unforgettable full-day cultural journey through Cairo. Travel comfortably from your hotel with a licensed Egyptologist and explore Egypt's most famous historical landmarks. Marvel at the Great Pyramid of Khufu, admire the legendary Great Sphinx, visit the ancient Valley Temple, and continue to the Egyptian Museum where thousands of priceless artifacts reveal over 5,000 years of civilization — including Tutankhamun's golden mask. Perfect for history lovers, families, couples, photographers, and first-time visitors to Egypt.",
    price: 95,
    currency: "USD",
    duration: "Full Day",
    category: "Cultural Tours",
    image: "/images/SP.webp",
    gallery: ["/images/SP.webp", "/images/luxor-temple.jpg", "/images/hero-redsea.jpg"],
    rating: 4.9,
    reviews: 412,
    location: "Cairo",
    highlights: [
      "Great Pyramid of Khufu",
      "Pyramids of Khafre & Menkaure",
      "Great Sphinx",
      "Valley Temple",
      "Egyptian Museum",
      "Tutankhamun's Golden Mask",
      "Royal Mummies Gallery",
      "Traditional Egyptian Lunch",
      "Licensed Egyptologist Guide",
      "Hotel Pickup & Drop-off"
    ],
    included: [
      "Hotel Pickup & Drop-off",
      "Air-conditioned Vehicle",
      "Professional Egyptologist",
      "All Entrance Fees",
      "Egyptian Museum Tour",
      "Traditional Lunch",
      "Assistance Throughout"
    ],
    groupSize: "2-8 people",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "nile-cruise-luxor",
    title: "Nile Cruise: Luxor to Aswan",
    description: "4-day luxury cruise along the legendary Nile River",
    longDescription: "Experience Egypt's most iconic temples from the comfort of a 5-star Nile cruiser. Sail from Luxor to Aswan, visiting Karnak Temple, Valley of the Kings, Edfu Temple, and Philae Temple. All meals and guided tours included.",
    price: 890,
    currency: "USD",
    duration: "4 days",
    category: "Cruise",
    image: "/images/nile-cruise.jpg",
    gallery: ["/images/nile-cruise.jpg", "/images/luxor-temple.jpg", "/images/dining-experience.jpg"],
    rating: 4.9,
    reviews: 423,
    location: "Luxor - Aswan",
    highlights: ["Karnak Temple", "Valley of the Kings", "Edfu Temple", "Philae Temple"],
    included: ["All meals", "Guided tours", "Luxury cabin", "Entertainment"],
    groupSize: "Individual",
    availability: "Mon, Fri",
    hot: true,
    discount: 10
  },
  {
    id: "desert-safari",
    title: "Sunset Desert Safari",
    description: "4x4 adventure through golden dunes with Bedouin dinner",
    longDescription: "Thrill-seekers, this is for you! Race across the Eastern Desert in a luxury 4x4, try sandboarding, and watch the sunset from the highest dune. End the evening at a traditional Bedouin camp with a starlit dinner and folklore show.",
    price: 85,
    currency: "USD",
    duration: "6 hours",
    category: "Adventure",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg", "/images/bedouin-dinner.jpg"],
    rating: 4.7,
    reviews: 891,
    location: "Hurghada Desert",
    highlights: ["4x4 dune bashing", "Sandboarding", "Camel ride", "Bedouin dinner"],
    included: ["Hotel transfer", "Dinner", "Soft drinks", "Professional driver"],
    groupSize: "4-20 people",
    availability: "Daily",
    hot: true
  },
  {
    id: "scuba-diving",
    title: "Red Sea Scuba Diving",
    description: "World-class diving at Giftun Island marine reserve",
    longDescription: "Discover why the Red Sea is ranked among the world's top diving destinations. Explore vibrant coral gardens, encounter tropical fish, dolphins, and maybe even a reef shark. Certified instructors ensure a safe and unforgettable underwater experience.",
    price: 95,
    currency: "USD",
    duration: "6 hours",
    category: "Sea",
    image: "/images/scuba-diving.jpg",
    gallery: ["/images/scuba-diving.jpg", "/images/dolphin-tour.jpg"],
    rating: 4.9,
    reviews: 654,
    location: "Giftun Island",
    highlights: ["2 dive spots", "Certified instructors", "Equipment included", "Lunch on boat"],
    included: ["Equipment", "Boat trip", "Lunch", "Dive guide"],
    groupSize: "4-12 people",
    availability: "Daily",
    hot: true,
    discount: 20
  },
  {
    id: "luxor-hot-air",
    title: "Luxor Hot Air Balloon",
    description: "Sunrise balloon ride over Valley of the Kings",
    longDescription: "Float silently over the world's greatest open-air museum as the sun paints the desert gold. Watch the Nile shimmer below and ancient temples emerge from the morning mist. A truly once-in-a-lifetime experience with champagne breakfast included.",
    price: 125,
    currency: "USD",
    duration: "3 hours",
    category: "Adventure",
    image: "/images/hot-air-balloon.jpg",
    gallery: ["/images/hot-air-balloon.jpg", "/images/luxor-temple.jpg"],
    rating: 4.9,
    reviews: 312,
    location: "Luxor",
    highlights: ["Sunrise flight", "Valley of Kings aerial view", "Champagne breakfast", "Flight certificate"],
    included: ["Hotel transfer", "Breakfast", "Flight certificate", "Insurance"],
    groupSize: "2-16 people",
    availability: "Daily",
    hot: true
  },
  {
    id: "luxury-beach-day",
    title: "Luxury Beach Club Day Pass",
    description: "VIP access to Hurghada's finest beach resort",
    longDescription: "Indulge in a day of pure relaxation at one of Hurghada's most exclusive beach clubs. Enjoy a private cabana, infinity pool, gourmet dining, and premium cocktails. Includes water sports access and sunset yoga session.",
    price: 75,
    currency: "USD",
    duration: "Full day",
    category: "Relaxation",
    image: "/images/beach-resort.jpg",
    gallery: ["/images/beach-resort.jpg", "/images/spa-wellness.jpg"],
    rating: 4.6,
    reviews: 234,
    location: "Hurghada",
    highlights: ["Private cabana", "Infinity pool", "Gourmet dining", "Water sports"],
    included: ["Cabana", "Pool access", "Lunch", "Towels & amenities"],
    groupSize: "Individual",
    availability: "Daily"
  },
  {
    id: "spa-wellness",
    title: "Royal Hammam & Spa Day",
    description: "Traditional Egyptian spa experience with modern luxury",
    longDescription: "Rejuvenate body and soul with our signature Royal Hammam ritual. Experience traditional cleansing, full-body massage with Egyptian oils, and a clay mask using desert minerals. Complete your journey with herbal tea in our relaxation garden.",
    price: 120,
    currency: "USD",
    duration: "4 hours",
    category: "Relaxation",
    image: "/images/spa-wellness.jpg",
    gallery: ["/images/spa-wellness.jpg", "/images/beach-resort.jpg"],
    rating: 4.8,
    reviews: 189,
    location: "Hurghada",
    highlights: ["Traditional hammam", "Full body massage", "Desert clay mask", "Herbal tea ceremony"],
    included: ["Robe & slippers", "All treatments", "Herbal tea", "Transfer"],
    groupSize: "Individual",
    availability: "Daily",
    discount: 25
  },
  {
    id: "nile-dinner-cruise",
    title: "Nile Dinner Cruise Cairo",
    description: "Elegant evening on the Nile with live entertainment",
    longDescription: "Glide along the Nile on a luxury dinner boat while enjoying a gourmet buffet and live belly dancing show. Watch Cairo's illuminated skyline pass by as you savor authentic Egyptian cuisine. Perfect for couples and special occasions.",
    price: 65,
    currency: "USD",
    duration: "3 hours",
    category: "Cruise",
    image: "/images/dining-experience.jpg",
    gallery: ["/images/dining-experience.jpg", "/images/nile-cruise.jpg"],
    rating: 4.5,
    reviews: 445,
    location: "Cairo",
    highlights: ["Gourmet buffet", "Belly dance show", "Live music", "City skyline views"],
    included: ["Dinner", "Entertainment", "Hotel transfer", "Welcome drink"],
    groupSize: "Individual",
    availability: "Daily"
  },
  {
    id: "dolphin-house",
    title: "Dolphin House Snorkeling",
    description: "Swim with wild dolphins in their natural habitat",
    longDescription: "Visit the famous Dolphin House reef where wild dolphins regularly play. Our marine biologist guides will help you responsibly interact with these magnificent creatures. Includes two snorkeling stops and a beach visit to Giftun Island.",
    price: 55,
    currency: "USD",
    duration: "8 hours",
    category: "Sea",
    image: "/images/dolphin-tour.jpg",
    gallery: ["/images/dolphin-tour.jpg", "/images/hero-redsea.jpg"],
    rating: 4.8,
    reviews: 723,
    location: "Giftun Island",
    highlights: ["Wild dolphin encounter", "2 snorkeling spots", "Giftun beach", "Marine biologist guide"],
    included: ["Equipment", "Lunch", "Drinks", "Hotel transfer"],
    groupSize: "6-20 people",
    availability: "Daily",
    hot: true
  },
  {
    id: "kitesurfing",
    title: "Kitesurfing Lessons",
    description: "Learn kitesurfing in world-class Red Sea conditions",
    longDescription: "The Red Sea's consistent winds and flat waters make it one of the world's best kitesurfing destinations. Our IKO-certified instructors provide personalized lessons for all levels. Equipment, safety gear, and beach access included.",
    price: 110,
    currency: "USD",
    duration: "4 hours",
    category: "Adventure",
    image: "/images/kitesurfing.jpg",
    gallery: ["/images/kitesurfing.jpg", "/images/beach-resort.jpg"],
    rating: 4.7,
    reviews: 156,
    location: "Hurghada",
    highlights: ["IKO certified instructors", "All equipment", "Flat water perfect for learning", "Beach access"],
    included: ["Equipment", "Instructor", "Safety gear", "Beach access"],
    groupSize: "1-4 people",
    availability: "Daily"
  },
  {
    id: "bedouin-night",
    title: "Bedouin Starlight Experience",
    description: "Authentic desert camp with astronomy and folklore",
    longDescription: "Escape the city lights and journey to a traditional Bedouin camp deep in the desert. Enjoy a feast cooked underground, listen to ancient stories by the fire, and gaze at the Milky Way through our telescope with an astronomy guide.",
    price: 95,
    currency: "USD",
    duration: "8 hours",
    category: "Adventure",
    image: "/images/bedouin-dinner.jpg",
    gallery: ["/images/bedouin-dinner.jpg", "/images/desert-safari.jpg"],
    rating: 4.9,
    reviews: 278,
    location: "Eastern Desert",
    highlights: ["Underground cooked feast", "Telescope stargazing", "Bedouin stories", "Camel ride"],
    included: ["Dinner", "Transport", "Telescope session", "Camel ride"],
    groupSize: "4-16 people",
    availability: "Tue, Fri, Sat",
    hot: true
  },
  {
    id: "abu-simbel",
    title: "Abu Simbel Temples Flight",
    description: "Day trip to Ramses II's magnificent rock temples",
    longDescription: "Fly to Abu Simbel to witness the colossal temples built by Ramses II. These UNESCO World Heritage sites feature four seated pharaoh statues carved directly into a cliff face. Our Egyptologist brings the ancient history vividly to life.",
    price: 295,
    currency: "USD",
    duration: "10 hours",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg", "/images/pyramids.jpg"],
    rating: 4.9,
    reviews: 198,
    location: "Abu Simbel",
    highlights: ["Ramses II temple", "Nefertari temple", "Flight included", "Expert Egyptologist"],
    included: ["Round-trip flight", "Guide", "Lunch", "Entry tickets"],
    groupSize: "2-6 people",
    availability: "Wed, Sun"
  },
  {
    id: "luxor-full-day",
    title: "Luxor Full Day Discovery",
    description: "Complete Luxor experience with all major temples",
    longDescription: "Discover the 'World's Greatest Open-Air Museum' in one immersive day. Visit Karnak Temple, Luxor Temple, Valley of the Kings, and Queen Hatshepsut's Temple. Includes felucca sail on the Nile and a traditional lunch.",
    price: 165,
    currency: "USD",
    duration: "14 hours",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg", "/images/nile-cruise.jpg"],
    rating: 4.8,
    reviews: 534,
    location: "Luxor",
    highlights: ["Karnak Temple", "Valley of the Kings", "Hatshepsut Temple", "Felucca sail"],
    included: ["Flight from Hurghada", "All entries", "Lunch", "Felucca ride"],
    groupSize: "2-10 people",
    availability: "Tue, Thu, Sat",
    hot: true
  },
  {
    id: "private-yacht",
    title: "Private Yacht Charter",
    description: "Exclusive yacht rental for your private group",
    longDescription: "Charter your own luxury yacht for the ultimate private Red Sea experience. Customize your itinerary, bring your own music, and enjoy personalized service. Perfect for proposals, celebrations, or simply escaping the crowds.",
    price: 650,
    currency: "USD",
    duration: "8 hours",
    category: "Sea",
    image: "/images/yacht-charter.jpg",
    gallery: ["/images/yacht-charter.jpg", "/images/hero-redsea.jpg"],
    rating: 5.0,
    reviews: 87,
    location: "Hurghada",
    highlights: ["Private yacht", "Custom itinerary", "Personal chef available", "Premium drinks"],
    included: ["Yacht rental", "Crew", "Snorkeling gear", "Soft drinks"],
    groupSize: "Up to 12 people",
    availability: "Daily"
  },
  {
    id: "alexandria-day",
    title: "Alexandria Coastal Day Trip",
    description: "Explore the pearl of the Mediterranean Sea",
    longDescription: "Visit Egypt's most romantic city on the Mediterranean coast. Explore the Bibliotheca Alexandrina, Qaitbay Fortress, and the catacombs. Enjoy fresh seafood lunch overlooking the ancient harbor where Cleopatra once ruled.",
    price: 175,
    currency: "USD",
    duration: "14 hours",
    category: "Historical",
    image: "/images/nile-cruise.jpg",
    gallery: ["/images/nile-cruise.jpg", "/images/dining-experience.jpg"],
    rating: 4.6,
    reviews: 312,
    location: "Alexandria",
    highlights: ["Bibliotheca Alexandrina", "Qaitbay Fortress", "Catacombs", "Seafood lunch"],
    included: ["Transport", "Guide", "Lunch", "Entry tickets"],
    groupSize: "2-8 people",
    availability: "Mon, Thu"
  },
  {
    id: "orange-bay",
    title: "Orange Bay Island Escape",
    description: "Paradise beach day at the Red Sea's most beautiful island",
    longDescription: "Discover Orange Bay, a slice of Caribbean paradise in the Red Sea. Powder-white sand, impossibly turquoise water, and a laid-back beach bar. Spend the day swimming, sunbathing, and enjoying fresh tropical fruit cocktails.",
    price: 45,
    currency: "USD",
    duration: "8 hours",
    category: "Sea",
    image: "/images/beach-resort.jpg",
    gallery: ["/images/beach-resort.jpg", "/images/dolphin-tour.jpg"],
    rating: 4.7,
    reviews: 567,
    location: "Giftun Island",
    highlights: ["Paradise beach", "Snorkeling", "Beach bar", "Banana boat"],
    included: ["Boat transfer", "Lunch", "Snorkeling", "Beach access"],
    groupSize: "Up to 30 people",
    availability: "Daily",
    hot: true,
    discount: 10
  },
  {
    id: "cairo-museum",
    title: "Egyptian Museum & Old Cairo",
    description: "Ancient treasures and Coptic heritage in one day",
    longDescription: "Stand face-to-face with King Tutankhamun's golden mask at the Egyptian Museum. Then wander through the hanging church and Jewish synagogue in Coptic Cairo. Includes lunch at a historic restaurant in Khan el-Khalili bazaar.",
    price: 135,
    currency: "USD",
    duration: "12 hours",
    category: "Historical",
    image: "/images/pyramids.jpg",
    gallery: ["/images/pyramids.jpg", "/images/luxor-temple.jpg"],
    rating: 4.7,
    reviews: 423,
    location: "Cairo",
    highlights: ["Tutankhamun treasures", "Coptic Cairo", "Khan el-Khalili", "Historic lunch"],
    included: ["Flight", "Guide", "Lunch", "Entry tickets"],
    groupSize: "2-8 people",
    availability: "Mon, Wed, Fri"
  },
  {
    id: "suba-marine",
    title: "Submarine Underwater Adventure",
    description: "Explore the Red Sea depths without getting wet",
    longDescription: "Descend 4 meters below the surface in our state-of-the-art submarine. Watch vibrant coral reefs and tropical fish through panoramic windows. Perfect for families with young children or non-swimmers who want to experience the underwater world.",
    price: 55,
    currency: "USD",
    duration: "2 hours",
    category: "Sea",
    image: "/images/scuba-diving.jpg",
    gallery: ["/images/scuba-diving.jpg", "/images/dolphin-tour.jpg"],
    rating: 4.5,
    reviews: 678,
    location: "Hurghada",
    highlights: ["Panoramic windows", "4m depth", "Coral reef views", "Family friendly"],
    included: ["Submarine ride", "Guide commentary", "Transfer", "Soft drinks"],
    groupSize: "Up to 44 people",
    availability: "Daily"
  },
  {
    id: "quad-biking",
    title: "Desert Quad Biking Safari",
    description: "High-speed quad adventure through Eastern Desert",
    longDescription: "Feel the adrenaline as you race across the desert on powerful quads. Navigate through valleys, climb dunes, and reach a remote Bedouin village for tea and bread-making demonstration. Sunset departure for the most spectacular views.",
    price: 45,
    currency: "USD",
    duration: "4 hours",
    category: "Adventure",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg", "/images/bedouin-dinner.jpg"],
    rating: 4.6,
    reviews: 892,
    location: "Hurghada Desert",
    highlights: ["Quad biking", "Bedouin village", "Sunset views", "Tea ceremony"],
    included: ["Quad rental", "Helmet", "Guide", "Transfer"],
    groupSize: "2-20 people",
    availability: "Daily",
    hot: true
  },
  {
    id: "fishing-trip",
    title: "Deep Sea Fishing Expedition",
    description: "Sport fishing in the abundant Red Sea waters",
    longDescription: "Test your skills against Red Sea giants - grouper, barracuda, and tuna. Our experienced captain knows the best spots. All equipment provided, and the crew will prepare your catch for a fresh onboard lunch.",
    price: 195,
    currency: "USD",
    duration: "8 hours",
    category: "Sea",
    image: "/images/hero-redsea.jpg",
    gallery: ["/images/hero-redsea.jpg", "/images/yacht-charter.jpg"],
    rating: 4.8,
    reviews: 134,
    location: "Hurghada",
    highlights: ["Professional equipment", "Experienced captain", "Catch cooked onboard", "Multiple spots"],
    included: ["Equipment", "Boat", "Lunch", "Transfer"],
    groupSize: "2-6 people",
    availability: "Daily"
  },
  {
    id: "nile-river-kayaking",
    title: "Nile River Kayaking",
    description: "Serene kayaking experience on the Nile at sunset",
    longDescription: "Paddle through the calm waters of the Nile as the sun sets over Cairo. A peaceful way to experience the river's beauty and see the city from a different perspective.",
    price: 45,
    currency: "USD",
    duration: "2 hours",
    category: "Adventure",
    image: "/images/nile-cruise.jpg",
    gallery: ["/images/nile-cruise.jpg"],
    rating: 4.6,
    reviews: 112,
    location: "Cairo",
    highlights: ["Sunset views", "Guided tour", "Safety equipment provided"],
    included: ["Kayak rental", "Life jacket", "Guide"],
    groupSize: "1-10 people",
    availability: "Daily"
  },
  {
    id: "cairo-street-food",
    title: "Cairo Street Food Tour",
    description: "Authentic culinary journey through Cairo's bustling streets",
    longDescription: "Taste the flavors of Egypt with a guided tour of Cairo's best street food. From koshary to falafel, discover the local favorites and learn about the city's rich food culture.",
    price: 35,
    currency: "USD",
    duration: "3 hours",
    category: "Adventure",
    image: "/images/dining-experience.jpg",
    gallery: ["/images/dining-experience.jpg"],
    rating: 4.8,
    reviews: 245,
    location: "Cairo",
    highlights: ["Local food guide", "Multiple food stops", "Vegetarian options available"],
    included: ["All food tastings", "Water", "Local guide"],
    groupSize: "2-8 people",
    availability: "Daily"
  },
  {
    id: "luxor-temple-night",
    title: "Luxor Temple by Night",
    description: "Magical evening tour of the illuminated Luxor Temple",
    longDescription: "Experience the grandeur of Luxor Temple under the stars. The dramatic lighting brings the ancient carvings and columns to life in a truly atmospheric way.",
    price: 40,
    currency: "USD",
    duration: "2 hours",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg"],
    rating: 4.9,
    reviews: 178,
    location: "Luxor",
    highlights: ["Night-time atmosphere", "Expert guide", "Photography opportunities"],
    included: ["Entry ticket", "Guide", "Hotel transfer"],
    groupSize: "2-20 people",
    availability: "Daily"
  },
  {
    id: "red-sea-glass-boat",
    title: "Red Sea Glass Bottom Boat",
    description: "Family-friendly underwater viewing without getting wet",
    longDescription: "Enjoy the beauty of the Red Sea's coral reefs and marine life from the comfort of a glass-bottom boat. Perfect for all ages and non-swimmers.",
    price: 25,
    currency: "USD",
    duration: "2 hours",
    category: "Sea",
    image: "/images/scuba-diving.jpg",
    gallery: ["/images/scuba-diving.jpg"],
    rating: 4.4,
    reviews: 312,
    location: "Hurghada",
    highlights: ["Coral reef viewing", "Fish identification", "Great for kids"],
    included: ["Boat trip", "Soft drinks", "Hotel transfer"],
    groupSize: "Up to 30 people",
    availability: "Daily"
  },
  {
    id: "mount-sinai-sunrise",
    title: "Mount Sinai Sunrise Hike",
    description: "Pilgrimage hike to the summit for a spectacular sunrise",
    longDescription: "Climb the legendary Mount Sinai overnight and witness a breathtaking sunrise from the peak. Visit Saint Catherine's Monastery at the base afterwards.",
    price: 65,
    currency: "USD",
    duration: "12 hours",
    category: "Adventure",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg"],
    rating: 4.7,
    reviews: 156,
    location: "Saint Catherine",
    highlights: ["Starlit hike", "Sunrise views", "Monastery visit"],
    included: ["Guide", "Hotel transfer", "Breakfast box"],
    groupSize: "4-15 people",
    availability: "Daily"
  },
  {
    id: "aswan-felucca-sail",
    title: "Aswan Felucca Sunset Sail",
    description: "Relaxing sail on a traditional Egyptian boat",
    longDescription: "Drift along the Nile in Aswan on a traditional felucca. Enjoy the gentle breeze and beautiful scenery as the sun sets over the desert hills.",
    price: 20,
    currency: "USD",
    duration: "1.5 hours",
    category: "Relaxation",
    image: "/images/nile-cruise.jpg",
    gallery: ["/images/nile-cruise.jpg"],
    rating: 4.8,
    reviews: 98,
    location: "Aswan",
    highlights: ["Traditional boat", "Sunset views", "Peaceful experience"],
    included: ["Felucca hire", "Captain", "Water"],
    groupSize: "1-8 people",
    availability: "Daily"
  },
  {
    id: "karnak-sound-light",
    title: "Karnak Sound and Light Show",
    description: "Spectacular multimedia show telling the history of Thebes",
    longDescription: "Watch the history of ancient Egypt unfold through a series of light and sound effects at the magnificent Karnak Temple complex.",
    price: 35,
    currency: "USD",
    duration: "2 hours",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg"],
    rating: 4.5,
    reviews: 210,
    location: "Luxor",
    highlights: ["Audio-visual experience", "Walking tour", "Historical narration"],
    included: ["Show ticket", "Hotel transfer", "Audio guide"],
    groupSize: "Open",
    availability: "Daily"
  },
  {
    id: "hurghada-city-tour",
    title: "Hurghada City Highlights",
    description: "Discover the local culture and landmarks of Hurghada",
    longDescription: "Explore the main attractions of Hurghada, including the Grand Mosque, the Coptic Church, and the bustling fish market. Includes time for shopping in the old town.",
    price: 20,
    currency: "USD",
    duration: "4 hours",
    category: "Historical",
    image: "/images/beach-resort.jpg",
    gallery: ["/images/beach-resort.jpg"],
    rating: 4.3,
    reviews: 145,
    location: "Hurghada",
    highlights: ["Mosque visit", "Market tour", "Local insights"],
    included: ["Guide", "Hotel transfer", "Water"],
    groupSize: "2-12 people",
    availability: "Daily"
  },
  {
    id: "soma-bay-golf",
    title: "Soma Bay Golf Experience",
    description: "Play a round at the championship Cascades Golf Course",
    longDescription: "Enjoy world-class golf at the Gary Player-designed course with stunning views of the Red Sea. Perfect for both pros and enthusiasts.",
    price: 150,
    currency: "USD",
    duration: "5 hours",
    category: "Relaxation",
    image: "/images/beach-resort.jpg",
    gallery: ["/images/beach-resort.jpg"],
    rating: 4.9,
    reviews: 67,
    location: "Soma Bay",
    highlights: ["Championship course", "Red Sea views", "Premium club hire"],
    included: ["Green fees", "Cart", "Range balls"],
    groupSize: "1-4 people",
    availability: "Daily"
  },
  {
    id: "valley-of-queens",
    title: "Valley of the Queens Tour",
    description: "Visit the final resting places of Egypt's royal women",
    longDescription: "Explore the beautiful tombs of the Queens of the New Kingdom, including the spectacularly preserved Tomb of Nefertari.",
    price: 50,
    currency: "USD",
    duration: "3 hours",
    category: "Historical",
    image: "/images/luxor-temple.jpg",
    gallery: ["/images/luxor-temple.jpg"],
    rating: 4.8,
    reviews: 123,
    location: "Luxor",
    highlights: ["Nefertari's Tomb", "Ancient wall paintings", "Egyptologist guide"],
    included: ["Entry tickets", "Guide", "Hotel transfer"],
    groupSize: "2-10 people",
    availability: "Daily"
  },
  {
    id: "saqqara-pyramids",
    title: "Saqqara & Memphis Tour",
    description: "Visit the Step Pyramid and the ancient capital of Memphis",
    longDescription: "Explore the Saqqara necropolis, home to the world's oldest pyramid, and discover the ruins of the ancient capital, Memphis.",
    price: 55,
    currency: "USD",
    duration: "5 hours",
    category: "Historical",
    image: "/images/Saqqara.webp",
    gallery: ["/images/Saqqara.webp"],
    rating: 4.7,
    reviews: 189,
    location: "Giza",
    highlights: ["Step Pyramid of Djoser", "Statue of Ramses II", "Expert guide"],
    included: ["Entry tickets", "Guide", "Hotel transfer", "Lunch"],
    groupSize: "2-8 people",
    availability: "Daily"
  },
  {
    id: "khan-el-khalili-night",
    title: "Khan el-Khalili Night Walk",
    description: "Atmospheric evening tour of the historic bazaar",
    longDescription: "Wander through the labyrinthine alleys of Cairo's oldest market at night. Enjoy tea at the famous El Fishawy café and soak up the vibrant atmosphere.",
    price: 30,
    currency: "USD",
    duration: "3 hours",
    category: "Adventure",
    image: "/images/dining-experience.jpg",
    gallery: ["/images/dining-experience.jpg"],
    rating: 4.6,
    reviews: 267,
    location: "Cairo",
    highlights: ["Bazaar exploration", "Traditional café visit", "Local guide"],
    included: ["Guide", "Welcome drink", "Hotel transfer"],
    groupSize: "2-12 people",
    availability: "Daily"
  },
  {
    id: "red-sea-paddleboarding",
    title: "Red Sea Stand-Up Paddleboarding",
    description: "Peaceful paddleboarding in the clear Red Sea waters",
    longDescription: "Enjoy a unique perspective of the Red Sea's coastline and marine life while getting a great workout on a stand-up paddleboard.",
    price: 35,
    currency: "USD",
    duration: "2 hours",
    category: "Adventure",
    image: "/images/hero-redsea.jpg",
    gallery: ["/images/hero-redsea.jpg"],
    rating: 4.5,
    reviews: 84,
    location: "Hurghada",
    highlights: ["Crystal clear water", "Beginner friendly", "Safety briefing"],
    included: ["Board rental", "Paddle", "Life jacket"],
    groupSize: "1-10 people",
    availability: "Daily"
  },
  {
    id: "el-gouna-lagoon-trip",
    title: "El Gouna Lagoon Boat Trip",
    description: "Tour the beautiful lagoons and canals of El Gouna",
    longDescription: "Explore the 'Venice of the Red Sea' by boat. Glide through the turquoise lagoons and see the stunning villas and resorts of El Gouna.",
    price: 30,
    currency: "USD",
    duration: "2 hours",
    category: "Relaxation",
    image: "/images/beach-resort.jpg",
    gallery: ["/images/beach-resort.jpg"],
    rating: 4.7,
    reviews: 132,
    location: "El Gouna",
    highlights: ["Lagoon tour", "Scenic views", "Resort highlights"],
    included: ["Boat trip", "Guide", "Soft drinks"],
    groupSize: "2-20 people",
    availability: "Daily"
  },
  {
    id: "nubian-village-visit",
    title: "Nubian Village Experience",
    description: "Cultural immersion in the colorful Nubian villages of Aswan",
    longDescription: "Visit the vibrant Nubian villages on Elephantine Island. Learn about their unique culture, traditions, and enjoy a traditional meal with a local family.",
    price: 45,
    currency: "USD",
    duration: "4 hours",
    category: "Historical",
    image: "/images/nile-cruise.jpg",
    gallery: ["/images/nile-cruise.jpg"],
    rating: 4.9,
    reviews: 194,
    location: "Aswan",
    highlights: ["Colorful architecture", "Cultural exchange", "Traditional lunch"],
    included: ["Boat transfer", "Guide", "Lunch"],
    groupSize: "2-10 people",
    availability: "Daily"
  },
  {
    id: "makadi-water-world",
    title: "Makadi Water World Day Pass",
    description: "Family fun at one of Egypt's largest water parks",
    longDescription: "Enjoy a day of thrills and spills with over 50 water slides and attractions for all ages. Includes lunch and drinks.",
    price: 50,
    currency: "USD",
    duration: "Full day",
    category: "Adventure",
    image: "/images/beach-resort.jpg",
    gallery: ["/images/beach-resort.jpg"],
    rating: 4.6,
    reviews: 356,
    location: "Makadi Bay",
    highlights: ["50+ slides", "Kids area", "Wave pool"],
    included: ["Entry pass", "Lunch", "Soft drinks", "Hotel transfer"],
    groupSize: "Open",
    availability: "Daily"
  },
  {
    id: "st-anthony-monastery",
    title: "St. Anthony & St. Paul Monasteries",
    description: "Visit the oldest Christian monasteries in the world",
    longDescription: "Journey into the Eastern Desert to explore these ancient Coptic monasteries, dating back to the 4th century.",
    price: 75,
    currency: "USD",
    duration: "10 hours",
    category: "Historical",
    image: "/images/desert-safari.jpg",
    gallery: ["/images/desert-safari.jpg"],
    rating: 4.5,
    reviews: 78,
    location: "Eastern Desert",
    highlights: ["Ancient Coptic art", "Monastic life", "Desert scenery"],
    included: ["Guide", "Hotel transfer", "Lunch"],
    groupSize: "2-8 people",
    availability: "Daily"
  },
  {
    id: "red-sea-parasailing",
    title: "Red Sea Parasailing",
    description: "Breathtaking aerial views of the Red Sea coast",
    longDescription: "Soar high above the Red Sea and enjoy panoramic views of the turquoise waters and the Sinai mountains. A thrilling experience for everyone.",
    price: 40,
    currency: "USD",
    duration: "1 hour",
    category: "Adventure",
    image: "/images/hero-redsea.jpg",
    gallery: ["/images/hero-redsea.jpg"],
    rating: 4.4,
    reviews: 167,
    location: "Hurghada",
    highlights: ["Aerial views", "Tandem flights available", "Safe and fun"],
    included: ["Parasailing flight", "Boat ride", "Hotel transfer"],
    groupSize: "1-2 people",
    availability: "Daily"
  },
  {
    id: "marsa-alam-dugong",
    title: "Marsa Alam Dugong & Turtle Spotting",
    description: "Snorkel with rare dugongs and giant green sea turtles",
    longDescription: "Visit the famous Abu Dabbab bay in Marsa Alam, one of the few places in the world where you can snorkel with wild dugongs and sea turtles.",
    price: 85,
    currency: "USD",
    duration: "10 hours",
    category: "Sea",
    image: "/images/scuba-diving.jpg",
    gallery: ["/images/scuba-diving.jpg"],
    rating: 4.9,
    reviews: 212,
    location: "Marsa Alam",
    highlights: ["Rare dugong spotting", "Giant sea turtles", "Crystal clear bay"],
    included: ["Guide", "Hotel transfer", "Lunch", "Snorkeling gear"],
    groupSize: "4-12 people",
    availability: "Daily"
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
    title: "Red Sea Yacht Cruise",
    originalPrice: 185,
    discountedPrice: 157,
    discount: 15,
    endDate: "2026-05-15",
    tripId: "red-sea-yacht",
    urgency: "Only 3 spots left this week"
  },
  {
    id: "offer-2",
    title: "Scuba Diving Experience",
    originalPrice: 95,
    discountedPrice: 76,
    discount: 20,
    endDate: "2026-05-20",
    tripId: "scuba-diving",
    urgency: "Perfect visibility this week"
  },
  {
    id: "offer-3",
    title: "Royal Hammam Spa Day",
    originalPrice: 120,
    discountedPrice: 90,
    discount: 25,
    endDate: "2026-05-10",
    tripId: "spa-wellness",
    urgency: "Last minute availability"
  },
  {
    id: "offer-4",
    title: "Nile Cruise 4 Days",
    originalPrice: 890,
    discountedPrice: 801,
    discount: 10,
    endDate: "2026-06-01",
    tripId: "nile-cruise-luxor",
    urgency: "Season ending soon"
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
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "EGP", symbol: "E£", rate: 47.5 },
  { code: "RUB", symbol: "₽", rate: 88.5 },
  { code: "CNY", symbol: "¥", rate: 7.24 },
  { code: "JPY", symbol: "¥", rate: 151.8 },
  { code: "AUD", symbol: "A$", rate: 1.52 },
  { code: "CAD", symbol: "C$", rate: 1.36 },
  { code: "CHF", symbol: "CHF", rate: 0.90 }
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
