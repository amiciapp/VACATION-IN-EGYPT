import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { whatsappNumbers } from '@/data/trips';
import {
  Wand2,
  Compass,
  MapPin,
  Calendar,
  Users,
  Hotel,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Phone,
  Crown,
  ShieldCheck,
  Flame,
  Check
} from 'lucide-react';

interface DestinationChoice {
  id: string;
  name: string;
  arabicName: string;
  image: string;
  tagline: string;
}

interface StyleChoice {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface StayChoice {
  id: string;
  name: string;
  type: string;
  description: string;
  rateTier: number;
}

const DESTINATIONS: DestinationChoice[] = [
  { id: 'cairo', name: 'Cairo & Giza', arabicName: 'القاهرة والجيزة', image: '/images/pyramids.jpg', tagline: 'Pyramids & Grand Egyptian Museum' },
  { id: 'luxor', name: 'Luxor & Valley of Kings', arabicName: 'الأقصر والملوك', image: '/images/luxor-temple.jpg', tagline: 'Karnak & Royal Theban Tombs' },
  { id: 'aswan', name: 'Aswan & Abu Simbel', arabicName: 'أسوان وأبو سمبل', image: '/images/nile-cruise.jpg', tagline: 'Philae Temple & Nubian Culture' },
  { id: 'hurghada', name: 'Hurghada Red Sea', arabicName: 'الغردقة وبحرها', image: '/images/yacht-charter.jpg', tagline: 'Private Yachting & Orange Bay' },
  { id: 'sharm', name: 'Sharm El Sheikh & Sinai', arabicName: 'شرم الشيخ وسيناء', image: '/images/scuba-diving.jpg', tagline: 'Ras Mohammed & Mount Sinai' },
  { id: 'alexandria', name: 'Alexandria Coast', arabicName: 'الإسكندرية', image: '/images/bibliotheca-alexandrina.jpg', tagline: 'Qaitbay & Mediterranean Culture' }
];

const STYLES: StyleChoice[] = [
  { id: 'royal_history', name: 'Pharaonic Royal Archeology', icon: '🏛️', description: 'Curator VIP access, private Egyptologist, closed tomb entries' },
  { id: 'coastal_yacht', name: 'Private Marine & Yachting', icon: '🛥️', description: 'Private motor yacht charters, wild dolphins, coral sanctuaries' },
  { id: 'desert_glamping', name: 'Desert Dune Safari & Stargazing', icon: '🏜️', description: 'Private 4x4 Land Cruisers, Bedouin oasis gala feasts' },
  { id: 'romance_honeymoon', name: 'Romance & Ultra-Luxury', icon: '💎', description: 'Champagne sunsets, couples spa rituals, private candlelit dining' },
  { id: 'family_vip', name: 'Family VIP Privileges', icon: '👑', description: 'Kid-friendly archaeology, spacious private vans, flexible pace' }
];

const ACCOMMODATIONS: StayChoice[] = [
  { id: 'palace_5star', name: 'Historic Palaces & Iconic 5★ Suites', type: 'Royal Heritage', description: 'Marriott Mena House, Sofitel Legend Old Cataract, St. Regis Cairo', rateTier: 350 },
  { id: 'dahabiya_sail', name: 'Private Boutique Nile Dahabiya', type: 'Waterfront Exclusivity', description: 'Hand-crafted luxury sailing yacht with private chef and open sun deck', rateTier: 420 },
  { id: 'resort_villa', name: 'Overwater / Beachfront Pavilion Villa', type: 'Coastal Sanctuary', description: 'The Oberoi Beach Resort Sahl Hasheesh, Four Seasons Resort Sharm', rateTier: 390 }
];

export default function CustomJourneyBuilder() {
  const { formatPrice } = useApp();
  const [step, setStep] = useState<number>(1);

  // Wizard selections
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(['cairo', 'luxor']);
  const [selectedStyle, setSelectedStyle] = useState<string>('royal_history');
  const [durationDays, setDurationDays] = useState<number>(7);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [selectedStay, setSelectedStay] = useState<string>('palace_5star');

  const toggleDestination = (id: string) => {
    setSelectedDestinations(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Estimated Investment Calculation
  const estimatedTotal = useMemo(() => {
    const basePerDay = 240;
    const destFactor = selectedDestinations.length * 60;
    const stayObj = ACCOMMODATIONS.find(a => a.id === selectedStay) || ACCOMMODATIONS[0];
    const perPerson = (basePerDay + destFactor + stayObj.rateTier) * (durationDays / 7);
    return Math.round(perPerson);
  }, [selectedDestinations, selectedStay, durationDays]);

  const handleWhatsAppSendProposal = () => {
    const rawNumber = whatsappNumbers[0] || '+201068800999';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

    const destNames = selectedDestinations
      .map(id => DESTINATIONS.find(d => d.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const styleObj = STYLES.find(s => s.id === selectedStyle);
    const stayObj = ACCOMMODATIONS.find(a => a.id === selectedStay);

    const message = encodeURIComponent(
      `Hello Senior Concierge! ✨\n\nI have crafted a bespoke VIP Egypt journey through your interactive builder:\n\n` +
      `📍 *Destinations*: ${destNames}\n` +
      `⏳ *Duration*: ${durationDays} Days / ${durationDays - 1} Nights\n` +
      `👥 *Travelers*: ${travelersCount} Guests\n` +
      `✨ *Travel Style*: ${styleObj?.name || 'Ultra-Luxury'}\n` +
      `🏨 *Accommodation*: ${stayObj?.name || '5★ Luxury Palaces'}\n` +
      `💰 *Estimated Budget*: From ~€${estimatedTotal} per guest\n\n` +
      `Please prepare our custom day-by-day itinerary and confirm private flight availability. Thank you!`
    );

    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="custom-journey" className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-[#030712] via-[#050b1a] to-[#030712]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-teal-500/10 border border-amber-400/30 text-amber-300 font-bold text-xs tracking-[0.25em] uppercase mb-4 shadow-sm backdrop-blur-md">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Bespoke Planner</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Design Your <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Custom VIP Journey</span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Select your dream destinations, preferred travel cadence, and luxury accommodations. Our intelligent concierge engine will configure your custom private route and generate an instant proposal.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="rounded-3xl bg-slate-900/90 border border-amber-400/30 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Wizard Progress Steps Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-800">
            {[
              { num: 1, label: 'Destinations' },
              { num: 2, label: 'Travel Style' },
              { num: 3, label: 'Duration & Guests' },
              { num: 4, label: 'Stay Preference' },
              { num: 5, label: 'VIP Proposal' }
            ].map(s => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-2 group cursor-pointer transition-all ${
                  step === s.num
                    ? 'text-amber-400 font-bold'
                    : step > s.num
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-500 font-medium'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    step === s.num
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </span>
                <span className="hidden md:inline text-xs">{s.label}</span>
              </button>
            ))}
          </div>

          {/* ── STEP 1: DESTINATIONS ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white">
                  Step 1: Choose the Destinations You Wish to Experience
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Select one or multiple regions. We handle private domestic flights and seamless luxury transfers between them.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DESTINATIONS.map(dest => {
                  const isSelected = selectedDestinations.includes(dest.id);
                  return (
                    <div
                      key={dest.id}
                      onClick={() => toggleDestination(dest.id)}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                        isSelected
                          ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                          : 'border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="h-32 relative">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        <div className="absolute top-2.5 right-2.5">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-900/80 text-white/50'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-950">
                        <div className="text-sm font-bold text-white">{dest.name}</div>
                        <div className="text-[10px] text-amber-400/80 font-medium">{dest.arabicName}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{dest.tagline}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-6 border-t border-slate-800">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Continue to Travel Style</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: TRAVEL STYLE ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white">
                  Step 2: Define Your Preferred Travel Cadence & Atmosphere
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  How would you like your days to feel? This shapes your included private excursions and pacing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STYLES.map(style => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-5 rounded-2xl cursor-pointer border transition-all flex items-start gap-4 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-xl'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="text-3xl shrink-0 p-2 rounded-xl bg-slate-900 border border-slate-800">
                        {style.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold flex items-center gap-2">
                          <span>{style.name}</span>
                          {isSelected && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {style.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Continue to Duration</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: DURATION & GUESTS ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold text-white">
                  Step 3: Duration & Party Size
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Indicate how many days you would like to immerse in Egypt and the number of guests.
                </p>
              </div>

              {/* Days Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Vacation Duration:
                  </span>
                  <span className="text-lg font-black text-amber-400">
                    {durationDays} Days / {durationDays - 1} Nights
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[5, 7, 10, 14].map(days => (
                    <button
                      key={days}
                      onClick={() => setDurationDays(days)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        durationDays === days
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {days} Days ({days - 1} Nights)
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Number of Travelers:
                  </span>
                  <span className="text-lg font-black text-amber-400">
                    {travelersCount} Guests (Private Entourage)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { count: 1, label: 'Solo Dignitary' },
                    { count: 2, label: 'Couples / Duo' },
                    { count: 4, label: 'Family (4 Guests)' },
                    { count: 6, label: 'Private Group (6+)' }
                  ].map(item => (
                    <button
                      key={item.count}
                      onClick={() => setTravelersCount(item.count)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        travelersCount === item.count
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Continue to Accommodations</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: STAY PREFERENCE ── */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white">
                  Step 4: Select Your Accommodation Caliber
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Egypt offers world-renowned historic palaces, private river sailing suites, and oceanfront sanctuaries.
                </p>
              </div>

              <div className="space-y-3.5">
                {ACCOMMODATIONS.map(acc => {
                  const isSelected = selectedStay === acc.id;
                  return (
                    <div
                      key={acc.id}
                      onClick={() => setSelectedStay(acc.id)}
                      className={`p-5 rounded-2xl cursor-pointer border transition-all flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-xl'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-black uppercase tracking-wider">
                            {acc.type}
                          </span>
                          <span className="text-sm font-bold text-white">{acc.name}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {acc.description}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Generate VIP Proposal</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 5: CUSTOM PROPOSAL SUMMARY ── */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-400/40">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src="/logo.jpg" alt="VACATION IN EGYPT" className="h-8 w-auto object-contain rounded-lg shadow-md" />
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Crown className="w-4 h-4" />
                      <span>Your Personalized VIP Master Proposal</span>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    Custom Route Ready
                  </span>
                </div>

                {/* Configuration Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected Route</span>
                    <span className="text-sm font-bold text-white mt-1 block">
                      {selectedDestinations
                        .map(id => DESTINATIONS.find(d => d.id === id)?.name)
                        .join(' → ')}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration & Party</span>
                    <span className="text-sm font-bold text-white mt-1 block">
                      {durationDays} Days • {travelersCount} Guests
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Investment</span>
                    <span className="text-xl font-black text-amber-400 mt-0.5 block">
                      From ~{formatPrice(estimatedTotal)} <span className="text-xs text-slate-400 font-normal">/ guest</span>
                    </span>
                  </div>
                </div>

                {/* What is Included in this Bespoke Journey */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Your Bespoke VIP Inclusions Guarantee</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Private dedicated Senior Egyptologist guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>All domestic business-class flights included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Chauffeured Mercedes-Benz S-Class / VIP Sprinter fleet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Cairo & Hurghada VIP Airport Fast-Track (Jet-bridge meet)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>24/7 Dedicated Senior Concierge Butler on WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>100% Tailored adjustments to your preferred dates</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Modify Journey Parameters</span>
                </button>

                <button
                  onClick={handleWhatsAppSendProposal}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-black tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-900/40 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Proposal to Senior Concierge on WhatsApp</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
