export interface PackageDay {
  day: number;
  title: string;
  location: string;
  description: string;
  activities: string[];
  accommodation: string;
  meals: string;
}

// Runtime exports to guarantee zero Vite ESM export errors
export const PackageDay = {};
export const VIPPackage = {};

export interface VIPPackage {
  id: string;
  title: string;
  arabicTitle: string;
  tagline: string;
  duration: string;
  daysCount: number;
  nightsCount: number;
  price: number; // Base price in EUR
  originalPrice?: number;
  badge: string;
  rating: number;
  reviewCount: number;
  heroImage: string;
  gallery: string[];
  destinations: string[];
  travelStyle: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  dayByDay: PackageDay[];
}

export const vipPackages: VIPPackage[] = [
  {
    id: 'grand-odyssey-10d',
    title: 'The Grand Pharaohs & Red Sea Riviera Odyssey',
    arabicTitle: 'ملحمة الفراعنة والبحر الأحمر الملكية',
    tagline: 'The Ultimate 10-Day Egypt Expedition: Private Pyramids, 5★ Luxury Dahabiya Nile Cruise & Hurghada Private Yacht',
    duration: '10 Days / 9 Nights',
    daysCount: 10,
    nightsCount: 9,
    price: 3450,
    originalPrice: 4200,
    badge: 'Signature Flagship',
    rating: 4.98,
    reviewCount: 47,
    heroImage: '/images/pyramids.jpg',
    gallery: [
      '/images/pyramids.jpg',
      '/images/nile-cruise.jpg',
      '/images/luxor-temple.jpg',
      '/images/yacht-charter.jpg',
      '/images/abu-simbel.jpg'
    ],
    destinations: ['Cairo & Giza', 'Luxor', 'Edfu & Kom Ombo', 'Aswan', 'Hurghada'],
    travelStyle: ['Ultra-Luxury', 'Historical', 'Nile Cruise', 'Private Yacht'],
    highlights: [
      'Private sunrise opening access at the Great Pyramid & Sphinx',
      'Exclusive curator-guided tour of the Grand Egyptian Museum (GEM)',
      '4 Nights aboard a private 5★ boutique Dahabiya Nile sailboat',
      'Dawn hot air balloon flight over Luxor’s Valley of the Kings',
      'Private flight excursion to the Colossal Rock Temples of Abu Simbel',
      'Full-day private luxury motor yacht charter to Orange Bay & dolphin sanctuaries'
    ],
    included: [
      'VIP Airport Meet & Assist (Jet-bridge escort & fast-track customs in Cairo)',
      'All private domestic business-class flights (Cairo - Luxor / Aswan - Hurghada - Cairo)',
      '3 Nights at 5★ Historic Palace Hotel in Cairo (Mena House / St. Regis)',
      '4 Nights aboard 5★ Luxury Boutique Nile Dahabiya (Full Board & private chef)',
      '2 Nights at 5★ Ultra-All-Inclusive Red Sea Beach Resort & Spa Suite in Hurghada',
      'Private dedicated Senior Egyptologist guide throughout all ancient sites',
      'Chauffeured Mercedes-Benz S-Class & VIP Sprinter transfers with cold refreshments',
      'All VIP monument entrance passes including Tutankhamun tomb & GEM Grand Hall',
      'Complimentary high-speed 5G mobile Wi-Fi device for your entire stay',
      '24/7 Dedicated Private Concierge Butler on WhatsApp'
    ],
    notIncluded: [
      'International round-trip airfare',
      'Personal gratuities (optional)',
      'Travel insurance'
    ],
    dayByDay: [
      {
        day: 1,
        title: 'Royal Arrival & Historic Palace Check-in',
        location: 'Cairo',
        description: 'Meet your private protocol escort directly at the aircraft jet bridge at Cairo International Airport. Breeze through diplomatic fast-track customs while luggage is handled. Chauffeur transfer in a private Mercedes-Benz S-Class to the historic Marriott Mena House overlooking the Giza Pyramids.',
        activities: ['Jet-bridge VIP escort', 'Fast-track visa & customs', 'Private limousine check-in', 'Welcome cocktail on Pyramid Terrace'],
        accommodation: 'Marriott Mena House (Pyramid View Suite)',
        meals: 'Welcome Dinner'
      },
      {
        day: 2,
        title: 'The Great Pyramids, Sphinx & Grand Egyptian Museum',
        location: 'Giza & Cairo',
        description: 'Sunrise private access before the public arrives at the Plateau of Giza. Stand between the paws of the Great Sphinx with your private Egyptologist. In the afternoon, enjoy an exclusive private tour inside the Grand Egyptian Museum (GEM) to marvel at the complete 5,000-piece golden treasure of King Tutankhamun.',
        activities: ['Private Giza Plateau access', 'Entry inside King Khufu Pyramid', 'Sphinx enclosure walk', 'Curated GEM VIP tour'],
        accommodation: 'Marriott Mena House',
        meals: 'Breakfast & Gourmet Egyptian Lunch overlooking Pyramids'
      },
      {
        day: 3,
        title: 'Private Flight to Luxor & Boarding Luxury Nile Dahabiya',
        location: 'Cairo to Luxor',
        description: 'Morning private flight to Luxor. Step aboard your hand-crafted 5-star private Nile Dahabiya sailboat. Settle into your sun-drenched timber suite. At dusk, tour the illuminated Karnak Temple and stroll the ancient 3-kilometer Avenue of Sphinxes.',
        activities: ['Domestic business flight to Luxor', 'Dahabiya embarkation', 'Karnak Temple illuminated tour', 'Sunset sail initiation'],
        accommodation: 'Private 5★ Luxury Dahabiya Suite',
        meals: 'Full Board (Chef-prepared Gourmet Cuisine)'
      },
      {
        day: 4,
        title: 'Dawn Hot Air Balloon & Royal Tombs of the Kings',
        location: 'Luxor West Bank',
        description: 'At dawn, float gently 1,500 feet over the West Bank and River Nile in a private hot air balloon basket as the sun illuminates the Valley of the Kings. Descend to explore King Tutankhamun’s and Seti I’s royal tombs, followed by Queen Hatshepsut’s majestic cliffside temple.',
        activities: ['Private hot air balloon launch', 'Valley of the Kings tombs', 'Tutankhamun & Seti I entries', 'Hatshepsut Colonnade'],
        accommodation: 'Private 5★ Luxury Dahabiya Suite',
        meals: 'Full Board'
      },
      {
        day: 5,
        title: 'Sailing Ancient Waters: Edfu & Kom Ombo Temples',
        location: 'Nile Valley',
        description: 'Sail upstream under billowing white canvas sails. Disembark in Edfu to visit the Temple of Horus, the best-preserved temple in Egypt. Continue gentle sailing to Kom Ombo to explore the rare double temple dedicated to Horus the Falcon and Sobek the Crocodile God at golden hour.',
        activities: ['Nile navigation through lock', 'Horus Temple of Edfu', 'Kom Ombo riverside sanctuary', 'Stargazing on open-air sundeck'],
        accommodation: 'Private 5★ Luxury Dahabiya Suite',
        meals: 'Full Board'
      },
      {
        day: 6,
        title: 'Aswan: Philae Sanctuary of Isis & High Dam',
        location: 'Aswan',
        description: 'Glide into Aswan, the jewel of Upper Egypt. Private wooden motor launch to the sacred Island of Agilkia to wander the colonnades of the Temple of Isis. Savor high tea on the legendary terrace of the Sofitel Legend Old Cataract Hotel, where Agatha Christie wrote Death on the Nile.',
        activities: ['Private boat to Philae Temple', 'Aswan Granite Quarry & Unfinished Obelisk', 'Royal High Tea at Old Cataract', 'Nubian sunset sail'],
        accommodation: 'Private 5★ Luxury Dahabiya Suite',
        meals: 'Full Board & Royal High Tea'
      },
      {
        day: 7,
        title: 'Colossal Abu Simbel Temples & Fly to Red Sea Riviera',
        location: 'Aswan to Abu Simbel to Hurghada',
        description: 'Private flight across the Nubian desert to Abu Simbel. Stand in awe before the 65-foot seated colossi of Ramesses II and Queen Nefertari carved into the sacred sandstone mountain. Return to Aswan and fly privately to Hurghada on the Red Sea coast.',
        activities: ['Abu Simbel private flight & tour', 'Great Sun Temple of Ramesses II', 'Flight transfer to Hurghada', 'Beachfront resort check-in'],
        accommodation: 'The Oberoi Beach Resort Sahl Hasheesh (Deluxe Pavilion)',
        meals: 'Breakfast & Seafood Welcome Dinner'
      },
      {
        day: 8,
        title: 'Private Yacht Charter: Dolphin Sanctuary & Orange Bay',
        location: 'Hurghada Red Sea',
        description: 'Board your private 55-foot luxury motor yacht from the private marina. Cruise into the open azure Red Sea to swim alongside wild spinner dolphin pods. Drop anchor at Orange Bay island for private beach cabana relaxation, crystal snorkeling among kaleidoscopic coral walls, and freshly caught seafood prepared on board.',
        activities: ['Private 55ft motor yacht charter', 'Swimming with wild dolphins', 'Private cabana on Orange Bay', 'Chef-prepared seafood lunch on deck'],
        accommodation: 'The Oberoi Beach Resort Sahl Hasheesh',
        meals: 'Full Board on Yacht'
      },
      {
        day: 9,
        title: 'Red Sea Leisure & Sunset Desert Dune Oasis',
        location: 'Hurghada',
        description: 'A morning of serene relaxation: indulge in a signature spa massage or snorkel directly off the resort house reef. In the late afternoon, embark on a private luxury 4x4 desert safari across crimson dunes to a private Bedouin stargazing camp featuring gourmet barbecue and astronomical telescope guidance.',
        activities: ['Spa & private beach morning', 'Private 4x4 dune excursion', 'Sunset champagne Bedouin dinner', 'High-powered telescope stargazing'],
        accommodation: 'The Oberoi Beach Resort Sahl Hasheesh',
        meals: 'Breakfast & Private Desert Gala Dinner'
      },
      {
        day: 10,
        title: 'Private Flight to Cairo & VIP Departure',
        location: 'Hurghada to Cairo',
        description: 'Morning private transfer to Hurghada Airport for your return flight to Cairo. Direct escort through VIP departure lounge, duty-free assistance, and seamless connection to your onward international flight home with unforgettable memories.',
        activities: ['Private airport transfer', 'VIP lounge access', 'International departure escort'],
        accommodation: 'Departure',
        meals: 'Breakfast'
      }
    ]
  },
  {
    id: 'golden-nile-7d',
    title: 'King Tut & The Golden Nile Expedition',
    arabicTitle: 'رحلة توت عنخ آمون والنيل الذهبي',
    tagline: '7 Days of Pure Royal History: Cairo Pyramids, Valley of Kings & Aswan Sanctuary',
    duration: '7 Days / 6 Nights',
    daysCount: 7,
    nightsCount: 6,
    price: 2450,
    originalPrice: 2950,
    badge: 'Most Popular',
    rating: 4.96,
    reviewCount: 38,
    heroImage: '/images/luxor-temple.jpg',
    gallery: [
      '/images/luxor-temple.jpg',
      '/images/pyramids.jpg',
      '/images/grand-egyptian-museum.jpg',
      '/images/hot-air-balloon.jpg',
      '/images/nile-cruise.jpg'
    ],
    destinations: ['Cairo & Giza', 'Luxor', 'Edfu', 'Kom Ombo', 'Aswan'],
    travelStyle: ['Pharaonic Archeology', 'Nile Cruise', 'Ultra-Luxury'],
    highlights: [
      'Private entry inside the Great Pyramid of Giza & Sphinx paws',
      'Exclusive GEM Grand Egyptian Museum VIP guided preview',
      '3-Night 5★ Luxury Nile Cruise from Luxor to Aswan',
      'VIP sunrise hot air balloon over Luxor West Bank',
      'Complete exploration of Abu Simbel colossal temples'
    ],
    included: [
      'VIP Airport Meet & Assist in Cairo',
      'Private domestic flights (Cairo - Luxor / Aswan - Cairo)',
      '2 Nights at 5★ St. Regis Cairo (Nile View Suite)',
      '3 Nights on 5★ Luxury Cruiser Luxor to Aswan (All-inclusive meals)',
      '1 Night at 5★ Sofitel Legend Old Cataract Aswan',
      'Private Senior Egyptologist and private air-conditioned Mercedes transport',
      'All monument entries, VIP tickets, and domestic transfers'
    ],
    notIncluded: ['International airfare', 'Gratuities', 'Personal travel insurance'],
    dayByDay: [
      {
        day: 1,
        title: 'Welcome to Cairo & Private Nile Suite',
        location: 'Cairo',
        description: 'Airport jet-bridge escort, expedited visa, and private Mercedes S-Class transfer to The St. Regis Cairo overlooking the illuminated Nile River.',
        activities: ['VIP Fast-track airport arrival', 'Private suite check-in', 'Evening Nile dinner cruise'],
        accommodation: 'The St. Regis Cairo',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Pyramids of Giza & The Grand Egyptian Museum',
        location: 'Giza & Cairo',
        description: 'Full-day private immersion into the wonders of the 4th Dynasty: Giza Pyramids, private camel trek, Sphinx photo privileges, and VIP tour of the GEM.',
        activities: ['Pyramid of Khufu entry', 'Sphinx panoramic walk', 'GEM King Tutankhamun galleries'],
        accommodation: 'The St. Regis Cairo',
        meals: 'Breakfast & Lunch'
      },
      {
        day: 3,
        title: 'Fly to Luxor: Valley of the Kings & Karnak Temple',
        location: 'Luxor',
        description: 'Fly to Luxor. Embark on your 5-star luxury Nile cruiser. Afternoon visit to Karnak’s Great Hypostyle Hall and the soaring Luxor Temple at sunset.',
        activities: ['Flight to Luxor', 'Cruiser check-in', 'Karnak & Luxor Temple visits'],
        accommodation: '5★ Luxury Nile Cruiser Suite',
        meals: 'Full Board'
      },
      {
        day: 4,
        title: 'Sunrise Hot Air Balloon & Royal Theban Tombs',
        location: 'Luxor West Bank',
        description: 'Float quietly over the Nile West Bank at sunrise. Step inside the gilded burial chambers of the Valley of the Kings and Hatshepsut’s Temple.',
        activities: ['Sunrise balloon flight', 'Valley of Kings royal tombs', 'Colossi of Memnon'],
        accommodation: '5★ Luxury Nile Cruiser Suite',
        meals: 'Full Board'
      },
      {
        day: 5,
        title: 'Nile Sailing: Edfu & Kom Ombo Temples',
        location: 'Edfu & Kom Ombo',
        description: 'Relax on the sundeck as your ship navigates southern Egypt. Visit the falcon god Horus at Edfu and the crocodile sanctuary of Kom Ombo.',
        activities: ['Edfu Temple excursion', 'Kom Ombo sunset visit', 'Cocktail reception on deck'],
        accommodation: '5★ Luxury Nile Cruiser Suite',
        meals: 'Full Board'
      },
      {
        day: 6,
        title: 'Aswan: Abu Simbel Temples & Old Cataract Legend',
        location: 'Aswan & Abu Simbel',
        description: 'Fly to Abu Simbel to witness Ramesses II’s monumental cliff temple. Check in to the legendary Sofitel Legend Old Cataract Aswan for high tea.',
        activities: ['Abu Simbel excursion', 'Temple of Isis at Philae', 'Old Cataract sunset drinks'],
        accommodation: 'Sofitel Legend Old Cataract Aswan',
        meals: 'Breakfast & Celebratory Gala Dinner'
      },
      {
        day: 7,
        title: 'Nile Felucca & Return Flight to Cairo',
        location: 'Aswan to Cairo',
        description: 'Morning traditional private felucca sail around Elephantine Island. Flight to Cairo for your VIP international departure.',
        activities: ['Elephantine Island sail', 'Airport transfer & flight to Cairo', 'Departure lounge'],
        accommodation: 'Departure',
        meals: 'Breakfast'
      }
    ]
  },
  {
    id: 'red-sea-marine-6d',
    title: 'Red Sea Royal Marine & Desert Oasis Escape',
    arabicTitle: 'ملاذ البحر الأحمر الملكي والواحة الصحراوية',
    tagline: '6 Days of Pure Marine Luxury: Private Yachting, Wild Dolphins, Coral Lagoons & Desert Glamping',
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    nightsCount: 5,
    price: 1850,
    originalPrice: 2250,
    badge: 'VIP Coastal',
    rating: 4.97,
    reviewCount: 29,
    heroImage: '/images/yacht-charter.jpg',
    gallery: [
      '/images/yacht-charter.jpg',
      '/images/dolphin-tour.jpg',
      '/images/desert-safari.jpg',
      '/images/beach-resort.jpg',
      '/images/hero-redsea.jpg'
    ],
    destinations: ['Hurghada', 'El Gouna', 'Giftun Islands', 'Eastern Desert'],
    travelStyle: ['Private Yachting', 'Marine Wildlife', 'Desert Safari', 'Ultra-Luxury'],
    highlights: [
      'Private 60ft luxury motor yacht charter for 2 full days',
      'Exclusive encounter swimming with wild spinner dolphin pods',
      'Private VIP cabana and gourmet seafood dining on Orange Bay',
      'Sunset quad biking and luxury Bedouin glamping dinner under desert stars',
      'Complimentary spa treatment and private beach cabana at 5★ beachfront resort'
    ],
    included: [
      'VIP Airport Fast-Track arrival & private Mercedes V-Class transfers in Hurghada',
      '5 Nights at 5★ The Oberoi Beach Resort Sahl Hasheesh (Grand Pavilion)',
      '2 Full-day private motor yacht charters with skipper, private crew & gourmet chef',
      'Professional underwater photographer/videographer capturing your excursions',
      'Private desert safari with luxury 4x4 Land Cruiser and VIP Bedouin banquet',
      'All high-end snorkeling & diving gear provided on board',
      '24/7 Dedicated Concierge Butler'
    ],
    notIncluded: ['International flights', 'Scuba diving certification fees (optional)'],
    dayByDay: [
      {
        day: 1,
        title: 'VIP Hurghada Arrival & Oceanfront Pavilion Check-in',
        location: 'Hurghada',
        description: 'Private chauffeur greeting with chilled champagne and towels. Transfer to The Oberoi Beach Resort Sahl Hasheesh for sunset beachside check-in.',
        activities: ['VIP Airport arrival', 'Private luxury limousine transfer', 'Resort orientation & welcome dinner'],
        accommodation: 'The Oberoi Beach Resort (Grand Pavilion)',
        meals: 'Welcome Dinner'
      },
      {
        day: 2,
        title: 'Private Yacht Charter: Dolphin House & Coral Reefs',
        location: 'Hurghada Archipelago',
        description: 'Board your private 60-foot luxury motor yacht. Cruise to Dolphin House sanctuary to swim gently beside playful pods of wild dolphins.',
        activities: ['Dolphin House private swimming', 'Snorkeling protected reefs', 'Chef-prepared seafood on deck'],
        accommodation: 'The Oberoi Beach Resort',
        meals: 'Full Board on Yacht'
      },
      {
        day: 3,
        title: 'Orange Bay Private Island Cabana & Sunset Cocktails',
        location: 'Giftun Island National Park',
        description: 'Anchor off Orange Bay. Enjoy a reserved private wooden beach pavilion over the crystal shallows, paddleboarding, and chilled sunset cocktails.',
        activities: ['Orange Bay private cabana', 'Stand-up paddleboarding', 'Coral drop-off snorkeling', 'Sunset yacht cruise'],
        accommodation: 'The Oberoi Beach Resort',
        meals: 'Breakfast & Seafood Beach Lunch'
      },
      {
        day: 4,
        title: 'El Gouna Marina & Sunset Desert Dunes Expedition',
        location: 'El Gouna & Eastern Desert',
        description: 'Morning private car to El Gouna superyacht marina for boutique shopping. Late afternoon 4x4 desert safari across golden dunes for stargazing.',
        activities: ['El Gouna yacht marina walk', 'Private 4x4 dune bashing', 'Bedouin sunset feast with live oud music'],
        accommodation: 'The Oberoi Beach Resort',
        meals: 'Breakfast & Gourmet Desert Dinner'
      },
      {
        day: 5,
        title: 'Spa Sanctuary & Sunset Catamaran Cruise',
        location: 'Sahl Hasheesh',
        description: 'Morning couples massage and Turkish hammam ritual at the resort spa. Relax by the infinity pool followed by a private sunset catamaran sail.',
        activities: ['Signature Spa treatment', 'House reef snorkeling', 'Private sunset catamaran champagne cruise'],
        accommodation: 'The Oberoi Beach Resort',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 6,
        title: 'Farewell Red Sea & VIP Airport Departure',
        location: 'Hurghada',
        description: 'Leisurely beachfront breakfast, late check-out privilege, and chauffeured Mercedes transfer to Hurghada International Airport for departure.',
        activities: ['Beach leisure', 'Private airport transfer', 'VIP lounge access'],
        accommodation: 'Departure',
        meals: 'Breakfast'
      }
    ]
  },
  {
    id: 'sinai-sacred-5d',
    title: 'Sinai Holy Peaks & Red Sea Blue Sanctuary',
    arabicTitle: 'قمم سيناء المقدسة وملاذ البحر الأحمر الأزرق',
    tagline: '5 Days in South Sinai: St. Catherine UNESCO Monastery, Mount Sinai Sunrise & Ras Mohammed Reefs',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    nightsCount: 4,
    price: 1650,
    originalPrice: 1990,
    badge: 'Spiritual & Diving',
    rating: 4.95,
    reviewCount: 22,
    heroImage: '/images/scuba-diving.jpg',
    gallery: [
      '/images/scuba-diving.jpg',
      '/images/hero-redsea.jpg',
      '/images/kitesurfing.jpg',
      '/images/beach-resort.jpg'
    ],
    destinations: ['Sharm El Sheikh', 'Ras Mohammed', 'Mount Sinai', 'St. Catherine'],
    travelStyle: ['Heritage & Spirit', 'Scuba & Snorkel', 'Nature Exploration'],
    highlights: [
      'Private yacht charter to Ras Mohammed National Park coral walls',
      'Midnight guided pilgrimage ascent of Mount Sinai for breathtaking dawn sunrise',
      'Private historian tour inside St. Catherine Monastery & Burning Bush',
      'Private luxury beach villa at Four Seasons Resort Sharm El Sheikh'
    ],
    included: [
      'VIP Airport Meet & Assist in Sharm El Sheikh',
      '4 Nights at Four Seasons Resort Sharm El Sheikh (Sea View Suite)',
      'Private motor yacht to Ras Mohammed & White Island with private dive master',
      'Private chauffeur-driven Mercedes van to St. Catherine with private Bedouin mountain guide',
      'All VIP national park permits, monastery admissions, and full-board dining on excursions'
    ],
    notIncluded: ['International airfare', 'Gratuities'],
    dayByDay: [
      {
        day: 1,
        title: 'Arrival in Sharm El Sheikh & Four Seasons Check-in',
        location: 'Sharm El Sheikh',
        description: 'Private airport greeting and transfer to the Four Seasons Resort nestled on the cliffs overlooking the Straits of Tiran.',
        activities: ['VIP airport arrival', 'Four Seasons check-in', 'Waterfront dinner'],
        accommodation: 'Four Seasons Resort Sharm El Sheikh',
        meals: 'Welcome Dinner'
      },
      {
        day: 2,
        title: 'Ras Mohammed Marine National Park by Private Yacht',
        location: 'Ras Mohammed',
        description: 'Sail to the southern tip of Sinai where Gulf of Suez meets Gulf of Aqaba. Snorkel the legendary Shark & Yolanda Reefs and walk the White Island sands.',
        activities: ['Private yacht charter', 'Shark & Yolanda Reef snorkeling', 'White Island sandbar walk'],
        accommodation: 'Four Seasons Resort Sharm El Sheikh',
        meals: 'Breakfast & Seafood Lunch on Yacht'
      },
      {
        day: 3,
        title: 'Red Sea Relaxation & Journey to the Sacred Mount',
        location: 'Sharm El Sheikh to Mount Sinai',
        description: 'Enjoy a serene day relaxing by the resort pool or spa. In the late evening, private transfer to the foothills of Mount Sinai to begin the sunrise ascent.',
        activities: ['Resort beach day', 'Evening private van to Sinai High Mountains', 'Midnight tea with Bedouin guides'],
        accommodation: 'Mount Sinai Pilgrim Ascent',
        meals: 'Breakfast & High Mountain Dinner'
      },
      {
        day: 4,
        title: 'Mount Sinai Sunrise & St. Catherine Monastery',
        location: 'Mount Sinai & St. Catherine',
        description: 'Stand atop the peak of Mount Sinai as sunrise gilds the desert peaks. Descend to the 6th-century fortress monastery of St. Catherine and see the Burning Bush.',
        activities: ['Sunrise summit atop Mt. Sinai', 'St. Catherine 6th-century basilica', 'Sacred Burning Bush sanctuary', 'Afternoon rest at resort'],
        accommodation: 'Four Seasons Resort Sharm El Sheikh',
        meals: 'Breakfast & Celebratory Dinner'
      },
      {
        day: 5,
        title: 'Farewell Sinai & VIP Departure',
        location: 'Sharm El Sheikh',
        description: 'Morning swim along the Four Seasons private reef. Private Mercedes transfer to Sharm El Sheikh Airport for your return flight.',
        activities: ['Reef swim', 'Private airport transfer', 'VIP lounge access'],
        accommodation: 'Departure',
        meals: 'Breakfast'
      }
    ]
  }
];
