import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Star,
  Clock,
  Sparkles,
  ChevronRight,
  Phone,
  Waves,
  Sun,
  ShieldCheck,
  Eye,
  X,
  Layers,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '@/context/AppContext';
import { trips, type Trip } from '@/data/trips';

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA DEFINITIONS
───────────────────────────────────────────────────────────── */

export type LandmarkCategory = 'wonder' | 'sea' | 'desert' | 'nile';

export interface FamousLandmark {
  id: string;
  name: string;
  arabicName: string;
  cityId: string;
  cityName: string;
  category: LandmarkCategory;
  x: number; // 0-1000 coordinate
  y: number; // 0-880 coordinate
  badge: string;
  description: string;
  travelTime: string;
  image: string;
  relatedTripId: string;
}

export interface MapCityHub {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  x: number;
  y: number;
  type: 'heritage' | 'coastal' | 'hub';
  image: string;
}

// Major Destination Hubs
const mapCityHubs: MapCityHub[] = [
  {
    id: 'cairo',
    name: 'Cairo & Giza',
    arabicName: 'القاهرة والجيزة',
    tagline: 'The Cradle of Ancient Wonders & The Grand Egyptian Museum',
    x: 485,
    y: 215,
    type: 'heritage',
    image: '/images/pyramids.jpg'
  },
  {
    id: 'alexandria',
    name: 'Alexandria',
    arabicName: 'الإسكندرية',
    tagline: 'Greco-Roman Mediterranean Pearl & Legendary Ancient Library',
    x: 425,
    y: 110,
    type: 'coastal',
    image: '/images/bibliotheca-alexandrina.jpg'
  },
  {
    id: 'luxor',
    name: 'Luxor',
    arabicName: 'الأقصر',
    tagline: "World's Greatest Open-Air Museum & The Theban Royal Tombs",
    x: 580,
    y: 535,
    type: 'heritage',
    image: '/images/luxor-temple.jpg'
  },
  {
    id: 'aswan',
    name: 'Aswan',
    arabicName: 'أسوان',
    tagline: 'Philae Sanctuary of Isis, Nubian Islands & Abu Simbel Gateway',
    x: 585,
    y: 695,
    type: 'heritage',
    image: '/images/nile-cruise.jpg'
  },
  {
    id: 'hurghada',
    name: 'Hurghada',
    arabicName: 'الغردقة',
    tagline: 'Red Sea Riviera HQ: Private Yachts, Orange Bay & Coral Reefs',
    x: 740,
    y: 405,
    type: 'hub',
    image: '/images/hero-redsea.jpg'
  },
  {
    id: 'sharm',
    name: 'Sharm El Sheikh',
    arabicName: 'شرم الشيخ',
    tagline: 'Ras Mohammed Marine Sanctuary, Mount Sinai & Red Sea Diving',
    x: 775,
    y: 350,
    type: 'coastal',
    image: '/images/scuba-diving.jpg'
  }
];

// Most Famous Places Near Each Location (Geographically Accurate)
const famousLandmarks: FamousLandmark[] = [
  // ── CAIRO & GIZA REGION ──
  {
    id: 'giza-pyramids',
    name: 'Great Pyramids & Sphinx',
    arabicName: 'أهرامات الجيزة وأبو الهول',
    cityId: 'cairo',
    cityName: 'Cairo & Giza',
    category: 'wonder',
    x: 462,
    y: 228,
    badge: 'Sole Remaining Ancient Wonder',
    description: 'The iconic 4,500-year-old plateau of Khufu, Khafre, Menkaure and the enigmatic limestone Sphinx.',
    travelTime: '25 min private transfer from Cairo center',
    image: '/images/pyramids.jpg',
    relatedTripId: 'cairo-pyramids-grand-egyptian-museum-gem'
  },
  {
    id: 'gem-museum',
    name: 'Grand Egyptian Museum (GEM)',
    arabicName: 'المتحف المصري الكبير',
    cityId: 'cairo',
    cityName: 'Cairo & Giza',
    category: 'wonder',
    x: 458,
    y: 202,
    badge: 'World’s Largest Archaeological Museum',
    description: 'State-of-the-art billion-dollar museum showcasing the complete Tutankhamun treasure collection.',
    travelTime: '15 min drive from Giza plateau',
    image: '/images/trips/cairo-pyramids-grand-egyptian-museum-gem-1.jpg',
    relatedTripId: 'cairo-pyramids-grand-egyptian-museum-gem'
  },
  {
    id: 'citadel-khan',
    name: 'Saladin Citadel & Khan El Khalili',
    arabicName: 'قلعة صلاح الدين وخان الخليلي',
    cityId: 'cairo',
    cityName: 'Cairo & Giza',
    category: 'wonder',
    x: 508,
    y: 218,
    badge: 'Medieval Islamic Heritage',
    description: 'The monumental 12th-century fortress, Ottoman Alabaster Mosque, and centuries-old artisan gold bazaar.',
    travelTime: 'Heart of Historic Old Cairo',
    image: '/images/citadel-saladin-cairo.jpg',
    relatedTripId: 'cairo-pyramids-grand-egyptian-museum-gem'
  },
  {
    id: 'saqqara-pyramid',
    name: 'Saqqara Step Pyramid of Djoser',
    arabicName: 'هرم سقارة المدرج',
    cityId: 'cairo',
    cityName: 'Cairo & Giza',
    category: 'wonder',
    x: 472,
    y: 250,
    badge: 'World’s Oldest Stone Monument',
    description: 'Imhotep’s revolutionary stepped pyramid architecture dating back to Egypt’s Third Dynasty (2670 BC).',
    travelTime: '40 min scenic countryside drive',
    image: '/images/3.jpg',
    relatedTripId: 'cairo-pyramids-grand-egyptian-museum-gem'
  },

  // ── ALEXANDRIA REGION ──
  {
    id: 'qaitbay-citadel',
    name: 'Citadel of Qaitbay',
    arabicName: 'قلعة قايتباي',
    cityId: 'alexandria',
    cityName: 'Alexandria',
    category: 'wonder',
    x: 412,
    y: 98,
    badge: 'Site of Pharos Lighthouse',
    description: 'Formidable 15th-century maritime fortress erected directly atop the ruins of the ancient Lighthouse of Alexandria.',
    travelTime: 'Eastern Harbor waterfront',
    image: '/images/trips/alexandria-citadel-catacombs-library-tour-1.jpg',
    relatedTripId: 'alexandria-citadel-catacombs-library-tour'
  },
  {
    id: 'bibliotheca-alexandrina',
    name: 'Bibliotheca Alexandrina',
    arabicName: 'مكتبة الإسكندرية',
    cityId: 'alexandria',
    cityName: 'Alexandria',
    category: 'wonder',
    x: 432,
    y: 104,
    badge: 'Revived World Library',
    description: 'Architectural masterpiece overlooking the sea, holding millions of volumes, rare manuscripts, and planetarium.',
    travelTime: '10 min coastal drive from Citadel',
    image: '/images/bibliotheca-alexandrina.jpg',
    relatedTripId: 'alexandria-citadel-catacombs-library-tour'
  },
  {
    id: 'kom-el-shoqafa',
    name: 'Catacombs of Kom El Shoqafa',
    arabicName: 'مقابر كوم الشقافة',
    cityId: 'alexandria',
    cityName: 'Alexandria',
    category: 'wonder',
    x: 418,
    y: 118,
    badge: 'Seven Wonders of the Middle Ages',
    description: 'Subterranean Greco-Roman burial chambers fusing ancient Egyptian, Greek, and Roman artistic motifs.',
    travelTime: '15 min from Alexandria Corniche',
    image: '/images/trips/alexandria-citadel-catacombs-library-tour-2.jpg',
    relatedTripId: 'alexandria-citadel-catacombs-library-tour'
  },

  // ── LUXOR REGION ──
  {
    id: 'valley-of-kings',
    name: 'Valley of the Kings & Tutankhamun',
    arabicName: 'وادي الملوك ومقبرة توت عنخ آمون',
    cityId: 'luxor',
    cityName: 'Luxor',
    category: 'wonder',
    x: 562,
    y: 528,
    badge: 'Pharaonic Royal Necropolis',
    description: 'Hidden tombs carved into the Theban cliffs, featuring radiant golden hieroglyphic murals preserved for 3,300 years.',
    travelTime: 'West Bank of Luxor (25 min)',
    image: '/images/luxor-temple.jpg',
    relatedTripId: 'luxor-valley-of-kings-karnak-private-day-tour'
  },
  {
    id: 'karnak-temple',
    name: 'Karnak Temple & Avenue of Sphinxes',
    arabicName: 'معبد الكرنك وطريق الكباش',
    cityId: 'luxor',
    cityName: 'Luxor',
    category: 'wonder',
    x: 595,
    y: 525,
    badge: 'Largest Religious Sanctuary',
    description: 'Forest of 134 towering papyrus columns in the Great Hypostyle Hall, connected to Luxor Temple by 3km of sphinxes.',
    travelTime: 'East Bank of Luxor (10 min)',
    image: '/images/trips/luxor-valley-of-kings-karnak-private-day-tour-1.jpg',
    relatedTripId: 'luxor-valley-of-kings-karnak-private-day-tour'
  },
  {
    id: 'hot-air-balloon',
    name: 'Sunrise Hot Air Balloon Over Thebes',
    arabicName: 'منطاد الأقصر الطائر فجرًا',
    cityId: 'luxor',
    cityName: 'Luxor',
    category: 'wonder',
    x: 554,
    y: 512,
    badge: 'Bucket-List Dawn Flight',
    description: 'Drifting serenely at sunrise above Hatshepsut Temple, Colossi of Memnon, and the green Nile agricultural ribbon.',
    travelTime: 'Early morning private West Bank launch',
    image: '/images/trips/hot-air-balloon-ride-luxor-sunrise-1.jpg',
    relatedTripId: 'hot-air-balloon-ride-luxor-sunrise'
  },
  {
    id: 'hatshepsut-temple',
    name: 'Hatshepsut Mortuary Temple',
    arabicName: 'معبد حتشبسوت بالدير البحري',
    cityId: 'luxor',
    cityName: 'Luxor',
    category: 'wonder',
    x: 558,
    y: 538,
    badge: 'Female Pharaoh Cliff Masterpiece',
    description: 'Dramatically terraced colonnaded temple carved directly into the towering limestone cliffs of Deir El Bahari.',
    travelTime: 'West Bank (adjacent to Valley of Kings)',
    image: '/images/4.jpg',
    relatedTripId: 'luxor-valley-of-kings-karnak-private-day-tour'
  },

  // ── ASWAN & NUBIA REGION ──
  {
    id: 'abu-simbel',
    name: 'Abu Simbel Colossal Temples',
    arabicName: 'معابد أبو سمبل العظيمة',
    cityId: 'aswan',
    cityName: 'Aswan',
    category: 'wonder',
    x: 510,
    y: 805,
    badge: 'UNESCO Crown Jewel on Lake Nasser',
    description: 'Monumental rock-cut temples of Ramses II and Queen Nefertari, rescued by UNESCO from rising Nile waters.',
    travelTime: 'Scenic flight or VIP highway convoy',
    image: '/images/abu-simbel.jpg',
    relatedTripId: 'abu-simbel-day-trip-from-aswan'
  },
  {
    id: 'philae-temple',
    name: 'Philae Island Temple of Isis',
    arabicName: 'معبد فيلة بجزيرة إيزيس',
    cityId: 'aswan',
    cityName: 'Aswan',
    category: 'nile',
    x: 588,
    y: 712,
    badge: 'Island Sanctuary of the Goddess',
    description: 'Romantic Ptolemaic temple complex set on Agilkia Island, accessible only by private wooden boat.',
    travelTime: '15 min private boat transfer',
    image: '/images/trips/abu-simbel-day-trip-from-aswan-1.jpg',
    relatedTripId: 'abu-simbel-day-trip-from-aswan'
  },
  {
    id: 'nubian-village',
    name: 'Nubian Heritage Villages & Felucca',
    arabicName: 'القرية النوبية وجزر أسوان',
    cityId: 'aswan',
    cityName: 'Aswan',
    category: 'nile',
    x: 572,
    y: 685,
    badge: 'Authentic River Culture',
    description: 'Vibrant indigo and saffron painted adobe houses, tame Nile crocodiles, fragrant spices, and sunset felucca sailing.',
    travelTime: 'Gentle river boat sail past Elephantine Island',
    image: '/images/nile-cruise.jpg',
    relatedTripId: 'abu-simbel-day-trip-from-aswan'
  },

  // ── HURGHADA & RED SEA REGION ──
  {
    id: 'orange-bay',
    name: 'Orange Bay & Giftun Islands',
    arabicName: 'جزيرة أورانج باي وجفتون',
    cityId: 'hurghada',
    cityName: 'Hurghada',
    category: 'sea',
    x: 765,
    y: 412,
    badge: 'The Egyptian Maldives',
    description: 'Powder-white sandbars, transparent turquoise shallows, overwater wooden swings, and vibrant coral gardens.',
    travelTime: '45 min luxury catamaran cruise',
    image: '/images/trips/orange-bay-snorkeling-trip-hurghada-1.jpg',
    relatedTripId: 'orange-bay-snorkeling-trip-hurghada'
  },
  {
    id: 'dolphin-house',
    name: 'Dolphin House Reef Sanctuary',
    arabicName: 'محمية بيت الدلافين',
    cityId: 'hurghada',
    cityName: 'Hurghada',
    category: 'sea',
    x: 750,
    y: 388,
    badge: 'Wild Spinner Dolphins',
    description: 'Natural horseshoe reef lagoon where free pods of wild spinner dolphins congregate and swim alongside guests.',
    travelTime: '1 hour offshore yacht voyage',
    image: '/images/hero-redsea.jpg',
    relatedTripId: 'orange-bay-snorkeling-trip-hurghada'
  },
  {
    id: 'el-gouna',
    name: 'El Gouna Private Yacht Marina',
    arabicName: 'الجونة ومارينا اليخوت',
    cityId: 'hurghada',
    cityName: 'Hurghada',
    category: 'sea',
    x: 728,
    y: 385,
    badge: 'Venice of the Red Sea',
    description: 'Bespoke lagoon network, world-class golf courses, gourmet waterfront dining, and VIP yacht charters.',
    travelTime: '25 min chauffeur transfer from Hurghada',
    image: '/images/trips/orange-bay-snorkeling-trip-hurghada-2.jpg',
    relatedTripId: 'orange-bay-snorkeling-trip-hurghada'
  },
  {
    id: 'hurghada-safari',
    name: 'Eastern Desert Sunset Quad Oasis',
    arabicName: 'سفاري صحراء الغردقة والعشاء البدوي',
    cityId: 'hurghada',
    cityName: 'Hurghada',
    category: 'desert',
    x: 700,
    y: 435,
    badge: 'Red Sea Mountain Dunes',
    description: 'Adrenaline quad & buggy expeditions across sweeping canyons, Bedouin hospitality, camel rides, and stargazing.',
    travelTime: '30 min into the Red Sea mountain ranges',
    image: '/images/desert-safari.jpg',
    relatedTripId: 'orange-bay-snorkeling-trip-hurghada'
  },

  // ── SHARM EL SHEIKH & SINAI REGION ──
  {
    id: 'ras-mohammed',
    name: 'Ras Mohammed Marine National Park',
    arabicName: 'محمية رأس محمد البحرية',
    cityId: 'sharm',
    cityName: 'Sharm El Sheikh',
    category: 'sea',
    x: 765,
    y: 368,
    badge: 'World’s Top 10 Coral Wall Dives',
    description: 'Protected apex of the Sinai Peninsula where Gulfs of Suez and Aqaba converge, home to Shark & Yolanda Reefs.',
    travelTime: '25 min by yacht or private 4x4',
    image: '/images/scuba-diving.jpg',
    relatedTripId: 'scuba-diving-experience-red-sea-hurghada'
  },
  {
    id: 'st-catherine',
    name: 'Saint Catherine & Mount Sinai',
    arabicName: 'دير سانت كاترين وجبل موسى',
    cityId: 'sharm',
    cityName: 'Sharm El Sheikh',
    category: 'wonder',
    x: 755,
    y: 285,
    badge: 'Sacred Summit of Moses (2,285m)',
    description: '6th-century fortress monastery of the Burning Bush, and the sacred peak where the Ten Commandments were received.',
    travelTime: 'Scenic mountain pass journey (2.5 hours)',
    image: '/images/5.jpg',
    relatedTripId: 'scuba-diving-experience-red-sea-hurghada'
  },
  {
    id: 'straits-of-tiran',
    name: 'Straits of Tiran & Blue Hole',
    arabicName: 'مضيق تيران والثقب الأزرق',
    cityId: 'sharm',
    cityName: 'Sharm El Sheikh',
    category: 'sea',
    x: 792,
    y: 325,
    badge: 'Legendary Coral Drop-Offs',
    description: 'Jackson, Thomas, and Gordon Reefs boasting crystal visibility, sea turtles, manta rays, and shipwreck history.',
    travelTime: 'Direct yacht charter from Sharm marina',
    image: '/images/trips/orange-bay-snorkeling-trip-hurghada-3.jpg',
    relatedTripId: 'scuba-diving-experience-red-sea-hurghada'
  }
];

interface EgyptMapProps {
  onSelectCity?: (city: string) => void;
  selectedCity?: string | null;
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT IMPLEMENTATION
───────────────────────────────────────────────────────────── */

export const EgyptMap: React.FC<EgyptMapProps> = ({ onSelectCity, selectedCity: externalCity }) => {
  const { formatPrice, setIsWhatsAppOpen } = useApp();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLandmark, setSelectedLandmark] = useState<FamousLandmark | null>(null);
  const [activeCityId, setActiveCityId] = useState<string | null>(externalCity?.toLowerCase() || 'cairo');
  const [hoveredLandmark, setHoveredLandmark] = useState<FamousLandmark | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter landmarks by category
  const filteredLandmarks = useMemo(() => {
    if (activeCategory === 'all') return famousLandmarks;
    return famousLandmarks.filter(l => l.category === activeCategory);
  }, [activeCategory]);

  // Current active city object
  const currentCity = useMemo(() => {
    return mapCityHubs.find(c => c.id === activeCityId) || mapCityHubs[0];
  }, [activeCityId]);

  // Landmarks belonging to active city
  const cityLandmarks = useMemo(() => {
    return famousLandmarks.filter(l => l.cityId === activeCityId);
  }, [activeCityId]);

  // Find matching trips for the selected landmark / city
  const featuredTrip = useMemo((): Trip | undefined => {
    if (selectedLandmark) {
      return trips.find(t => t.id === selectedLandmark.relatedTripId) || trips[0];
    }
    return trips.find(t => t.location.toLowerCase().includes(currentCity.name.toLowerCase().split(' ')[0])) || trips[0];
  }, [selectedLandmark, currentCity]);

  const handleCityClick = (cityId: string) => {
    setActiveCityId(cityId);
    setSelectedLandmark(null);
    if (onSelectCity) {
      const city = mapCityHubs.find(c => c.id === cityId);
      if (city) onSelectCity(city.name);
    }
  };

  const handleWhatsAppInquire = (landmarkName: string) => {
    const text = encodeURIComponent(`Hello VACATION IN EGYPT! I am exploring your interactive map and would love VIP pricing and details for visiting: *${landmarkName}*. Please share availability!`);
    window.open(`https://wa.me/201000000000?text=${text}`, '_blank');
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden border border-amber-500/25 shadow-[0_30px_90px_rgba(0,0,0,0.85)] bg-[#030712]"
    >
      {/* ── AMBIENT GEOGRAPHICAL AURA ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fine coordinate cartography grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.8) 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_45%,transparent_35%,rgba(3,7,18,0.95)_100%)]" />

        {/* Western Sahara Desert Gold Glow */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-yellow-600/8 to-transparent rounded-full blur-[130px]" />

        {/* Eastern Red Sea Turquoise Reef Glow */}
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[550px] bg-gradient-to-tl from-teal-400/15 via-cyan-500/10 to-transparent rounded-full blur-[130px]" />

        {/* Mediterranean North Coast Sea Glow */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[200px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* ── HEADER & EXPLORER CONTROLS ── */}
      <div className="relative z-20 px-6 sm:px-8 pt-7 pb-5 border-b border-white/[0.08] bg-slate-950/60 backdrop-blur-md flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
            <span>Official Egypt Cartography</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold">24 Iconic Landmarks</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explore Egypt By{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Destination & Famous Landmarks
            </span>
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Click any regional hub or landmark pin to reveal historical wonders, travel times, and matching VIP experiences.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-amber-400/20 shadow-inner">
          {[
            { id: 'all', label: 'All Landmarks', icon: Sparkles },
            { id: 'wonder', label: 'Ancient Wonders', icon: Star },
            { id: 'sea', label: 'Red Sea & Diving', icon: Waves },
            { id: 'desert', label: 'Desert Safari', icon: Sun },
            { id: 'nile', label: 'Nile Cruises', icon: MapPin },
          ].map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DESTINATION QUICK JUMP BAR ── */}
      <div className="relative z-20 px-6 sm:px-8 py-3 bg-slate-950/80 border-b border-white/[0.05] overflow-x-auto no-scrollbar flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider mr-1">
            Focus Region:
          </span>
          {mapCityHubs.map(hub => {
            const isSelected = activeCityId === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => handleCityClick(hub.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <MapPin className={`w-3 h-3 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{hub.name}</span>
                <span className="text-[10px] text-slate-500 font-normal">({hub.arabicName})</span>
              </button>
            );
          })}
        </div>

        {selectedLandmark && (
          <button
            onClick={() => setSelectedLandmark(null)}
            className="text-[11px] text-slate-400 hover:text-amber-300 font-medium flex items-center gap-1 shrink-0 ml-3"
          >
            <X className="w-3 h-3" /> Clear selection
          </button>
        )}
      </div>

      {/* ── MAP CANVAS & LANDMARKS SVG LAYER ── */}
      <div className="relative p-4 sm:p-6 lg:p-8 grid lg:grid-cols-12 gap-6 items-start">
        {/* SVG Real Egypt Map Container */}
        <div className="lg:col-span-8 relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#060c1c] via-[#050b18] to-[#040812] border border-white/[0.06] shadow-2xl">
          {/* Scanline Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)',
              backgroundSize: '100% 3px'
            }}
          />

          <svg
            className="w-full h-auto aspect-[1000/880] select-none"
            viewBox="0 0 1000 880"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Nile River Gradient */}
              <linearGradient id="nileRealGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#0ea5e9" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>

              {/* Red Sea & Mediterranean Gradient */}
              <linearGradient id="coastalAquaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>

              {/* Landmark Glow Filter */}
              <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. EGYPT CONTINENTAL LANDMASS SHAPE (Real Topographical Accuracy) */}
            <path
              d="
                M 65,85
                L 225,95
                L 350,120
                L 425,100
                Q 465,88 515,75
                Q 570,88 605,98
                L 715,110
                L 745,95
                L 795,215
                L 780,250
                L 770,290
                L 750,350
                L 700,310
                L 635,215
                L 625,185
                L 610,215
                L 630,250
                L 665,305
                L 710,370
                L 728,400
                L 732,420
                L 755,465
                L 780,510
                L 800,545
                L 845,630
                L 925,780
                L 925,820
                L 60,820
                Z
              "
              fill="rgba(15, 23, 42, 0.75)"
              stroke="rgba(245, 158, 11, 0.35)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              className="drop-shadow-lg"
            />

            {/* 2. SINAI PENINSULA (Real Triangle with Gulf of Suez & Gulf of Aqaba) */}
            <path
              d="
                M 625,185
                L 635,215
                L 700,310
                L 750,350
                L 770,290
                L 780,250
                L 795,215
                L 745,95
                L 605,98
                Z
              "
              fill="rgba(245, 158, 11, 0.04)"
              stroke="rgba(245, 158, 11, 0.35)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* 3. THE NILE DELTA (Lush Green Apex) */}
            <path
              d="
                M 485,215
                Q 425,160 425,100
                Q 465,88 515,75
                Q 570,88 605,98
                Q 550,165 485,215
                Z
              "
              fill="rgba(16, 185, 129, 0.08)"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1"
            />

            {/* 4. REAL NILE RIVER COURSE (Winding from Lake Nasser to Alexandria/Damietta) */}
            {/* Lake Nasser Base */}
            <path
              d="M 540,820 C 530,780 500,770 510,805 C 530,770 570,740 585,695"
              fill="none"
              stroke="#0284c7"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Nile Main Stem: Aswan -> Luxor (Qena Bend) -> Asyut -> Cairo -> Delta */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
              d="
                M 585,695
                Q 580,630 575,595
                Q 570,560 580,535
                C 595,505 595,475 570,465
                C 535,450 515,400 495,335
                Q 475,270 485,215
              "
              fill="none"
              stroke="url(#nileRealGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#goldGlow)"
            />
            {/* Rosetta Branch (West) */}
            <path
              d="M 485,215 Q 460,150 425,100"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Damietta Branch (East) */}
            <path
              d="M 485,215 Q 530,150 605,98"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* 5. SUEZ CANAL (Connecting Port Said to Suez / Red Sea) */}
            <path
              d="M 605,98 L 625,185"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeDasharray="3 2"
              opacity="0.7"
            />

            {/* 6. RED SEA & COASTAL WATERWAYS HIGHLIGHT */}
            <path
              d="
                M 625,185
                L 610,215
                L 630,250
                L 665,305
                L 710,370
                L 728,400
                L 732,420
                L 755,465
                L 780,510
                L 800,545
                L 845,630
                L 925,780
              "
              fill="none"
              stroke="url(#coastalAquaGrad)"
              strokeWidth="2"
              opacity="0.7"
            />

            {/* 7. CONNECTING VIP TRAVEL CORRIDORS (Hurghada HQ to Pyramids / Luxor / Sinai) */}
            {[
              { x1: 740, y1: 405, x2: 485, y2: 215, color: '#f59e0b', label: 'VIP Air / Highway' },
              { x1: 740, y1: 405, x2: 580, y2: 535, color: '#f59e0b', label: '3.5h VIP Chauffeur' },
              { x1: 740, y1: 405, x2: 775, y2: 350, color: '#22d3ee', label: 'Red Sea Ferry / Cruise' },
              { x1: 580, y1: 535, x2: 585, y2: 695, color: '#38bdf8', label: '5★ Nile Cruise Line' },
            ].map((route, i) => (
              <line
                key={i}
                x1={route.x1}
                y1={route.y1}
                x2={route.x2}
                y2={route.y2}
                stroke={route.color}
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.45"
              />
            ))}

            {/* 8. ACTIVE CITY CONNECTING RAYS TO NEARBY LANDMARKS */}
            {cityLandmarks.map(landmark => {
              const isSelected = selectedLandmark?.id === landmark.id;
              const isHovered = hoveredLandmark?.id === landmark.id;
              return (
                <line
                  key={`ray-${landmark.id}`}
                  x1={currentCity.x}
                  y1={currentCity.y}
                  x2={landmark.x}
                  y2={landmark.y}
                  stroke={isSelected || isHovered ? '#fbbf24' : 'rgba(245, 158, 11, 0.25)'}
                  strokeWidth={isSelected || isHovered ? 1.5 : 0.8}
                  strokeDasharray={isSelected || isHovered ? '0' : '2 2'}
                  opacity={isSelected || isHovered ? 0.9 : 0.35}
                />
              );
            })}

            {/* 9. DESTINATION HUB MARKERS (Major Cities) */}
            {mapCityHubs.map(city => {
              const isActive = activeCityId === city.id;
              return (
                <g
                  key={city.id}
                  onClick={() => handleCityClick(city.id)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Aura */}
                  {isActive && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="18"
                      fill="rgba(245, 158, 11, 0.15)"
                      className="animate-ping"
                      style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                    />
                  )}

                  {/* Outer Ring */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isActive ? 12 : 9}
                    fill="#030712"
                    stroke={isActive ? '#fbbf24' : 'rgba(245, 158, 11, 0.6)'}
                    strokeWidth={isActive ? 3 : 2}
                    className="transition-all duration-300"
                  />

                  {/* Center Dot */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isActive ? 5 : 3.5}
                    fill={isActive ? '#f59e0b' : '#fbbf24'}
                  />

                  {/* Hub City Name Label */}
                  <text
                    x={city.x}
                    y={city.y - 16}
                    textAnchor="middle"
                    fill={isActive ? '#fbbf24' : '#ffffff'}
                    fontSize="13"
                    fontWeight="800"
                    letterSpacing="0.5"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                  >
                    {city.name}
                  </text>
                  <text
                    x={city.x}
                    y={city.y - 4}
                    textAnchor="middle"
                    fill="rgba(252, 211, 77, 0.7)"
                    fontSize="9"
                    fontWeight="600"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                  >
                    {city.arabicName}
                  </text>
                </g>
              );
            })}

            {/* 10. FAMOUS LANDMARKS PINS (The Requested Places) */}
            {filteredLandmarks.map(landmark => {
              const isSelected = selectedLandmark?.id === landmark.id;
              const isHovered = hoveredLandmark?.id === landmark.id;
              const isParentActive = activeCityId === landmark.cityId;

              return (
                <g
                  key={landmark.id}
                  onClick={() => setSelectedLandmark(landmark)}
                  onMouseEnter={() => setHoveredLandmark(landmark)}
                  onMouseLeave={() => setHoveredLandmark(null)}
                  className="cursor-pointer group"
                >
                  {/* Highlight Aura */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={landmark.x}
                      cy={landmark.y}
                      r="14"
                      fill="rgba(245, 158, 11, 0.25)"
                      className="animate-pulse"
                    />
                  )}

                  {/* Pin Body */}
                  <circle
                    cx={landmark.x}
                    cy={landmark.y}
                    r={isSelected ? 7 : isParentActive ? 5.5 : 4.5}
                    fill={
                      landmark.category === 'sea'
                        ? '#06b6d4'
                        : landmark.category === 'desert'
                        ? '#f97316'
                        : landmark.category === 'nile'
                        ? '#38bdf8'
                        : '#f59e0b'
                    }
                    stroke="#030712"
                    strokeWidth="1.5"
                    className="transition-transform duration-200"
                  />

                  {/* Landmark Label (Always visible for active region or hovered) */}
                  {(isParentActive || isHovered || isSelected) && (
                    <g className="transition-opacity duration-300">
                      <rect
                        x={landmark.x + 8}
                        y={landmark.y - 12}
                        width={landmark.name.length * 6.5 + 14}
                        height="18"
                        rx="5"
                        fill="rgba(3, 7, 18, 0.88)"
                        stroke={isSelected ? '#fbbf24' : 'rgba(255, 255, 255, 0.15)'}
                        strokeWidth="1"
                      />
                      <text
                        x={landmark.x + 15}
                        y={landmark.y + 1}
                        fill={isSelected ? '#fde047' : '#e2e8f0'}
                        fontSize="10"
                        fontWeight="700"
                        className="pointer-events-none select-none"
                      >
                        {landmark.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Compass Rose */}
            <g transform="translate(920, 80) scale(0.7)">
              <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" />
              <polygon points="0,-26 5,-6 0,0 -5,-6" fill="#f59e0b" />
              <polygon points="0,26 5,6 0,0 -5,6" fill="rgba(245, 158, 11, 0.4)" />
              <text x="0" y="-32" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">N</text>
            </g>
          </svg>
        </div>

        {/* ── INTERACTIVE VIP SPOTLIGHT DRAWER (RIGHT PANEL) ── */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Landmark or Region Card */}
          <AnimatePresence mode="wait">
            {selectedLandmark ? (
              <motion.div
                key={`landmark-${selectedLandmark.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-slate-900/95 border border-amber-400/40 p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Thumbnail Image */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src={selectedLandmark.image}
                    alt={selectedLandmark.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      {selectedLandmark.badge}
                    </span>
                    <span className="text-white text-xs font-semibold">
                      {selectedLandmark.cityName}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    {selectedLandmark.name}
                  </h4>
                  <p className="text-amber-400 text-xs font-medium mt-0.5">
                    {selectedLandmark.arabicName}
                  </p>
                  <p className="text-slate-300 text-xs mt-2.5 leading-relaxed">
                    {selectedLandmark.description}
                  </p>

                  <div className="flex items-center gap-2 text-slate-400 text-xs mt-3 pt-3 border-t border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{selectedLandmark.travelTime}</span>
                  </div>
                </div>

                {/* Matching VIP Trip & CTA */}
                {featuredTrip && (
                  <div className="mt-4 pt-3.5 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Matching Curated Trip
                      </span>
                      <span className="text-amber-400 font-extrabold text-xs">
                        From {formatPrice(featuredTrip.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/trip/${featuredTrip.id}`)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>View Itinerary</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleWhatsAppInquire(selectedLandmark.name)}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Book on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`city-${currentCity.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl"
              >
                {/* City Hero Image */}
                <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src={currentCity.image}
                    alt={currentCity.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/30 uppercase tracking-widest">
                      Selected Region
                    </span>
                    <h4 className="text-xl font-black text-white mt-1">
                      {currentCity.name}
                    </h4>
                  </div>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {currentCity.tagline}
                </p>

                {/* Famous Places List in this Region */}
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    Famous Places Near {currentCity.name}:
                  </h5>

                  <div className="space-y-2">
                    {cityLandmarks.map(landmark => (
                      <button
                        key={landmark.id}
                        onClick={() => setSelectedLandmark(landmark)}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-950/80 hover:bg-amber-400/10 border border-slate-800/80 hover:border-amber-400/40 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                          <div className="truncate">
                            <p className="text-white text-xs font-bold group-hover:text-amber-300 transition-colors truncate">
                              {landmark.name}
                            </p>
                            <p className="text-slate-400 text-[10px] truncate">
                              {landmark.badge}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick WhatsApp Concierge Booking */}
                <div className="mt-5 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => handleWhatsAppInquire(currentCity.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Inquire VIP Tours for {currentCity.name}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EgyptMap;
