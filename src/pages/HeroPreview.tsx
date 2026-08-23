import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  MapPin, 
  Calendar, 
  Compass, 
  Search, 
  Star, 
  ShieldCheck, 
  ChevronRight, 
  Waves, 
  Sun, 
  Sparkles, 
  DollarSign, 
  Crown, 
  X, 
  ArrowLeft,
  Flame
} from 'lucide-react';
import { Link } from 'react-router';

export default function HeroPreview() {
  const [selectedConcept, setSelectedConcept] = useState<'concept1' | 'concept2' | 'current'>('concept1');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<{ usd: string; eur: string }>({ usd: '50.45', eur: '52.80' });

  // Search Capsule State
  const [capsuleDestination, setCapsuleDestination] = useState('Hurghada');
  const [capsuleType, setCapsuleType] = useState('Yacht Cruise');
  const [capsuleGuests, setCapsuleGuests] = useState('2 Guests');

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data?.rates?.EGP) {
          setExchangeRates({
            usd: data.rates.EGP.toFixed(2),
            eur: (data.rates.EGP / data.rates.EUR).toFixed(2),
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#05070E] text-white relative font-sans">
      {/* Top Preview Switcher Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080B14]/90 backdrop-blur-2xl border-b border-gold/20 px-4 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-gold transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <span className="text-xs uppercase tracking-widest text-gold font-black flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-gold" />
              Hero Design Studio Review
            </span>
          </div>

          {/* Concept Tabs */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setSelectedConcept('concept1')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedConcept === 'concept1'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Concept 1: Royal Belmond & Capsule (Recommended)</span>
            </button>
            <button
              onClick={() => setSelectedConcept('concept2')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedConcept === 'concept2'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Concept 2: Stardust Riviera</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Preview Container */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {/* =========================================================================
              CONCEPT 1: ROYAL BELMOND & AMAN EDITORIAL WITH FLOATING SEARCH CAPSULE
             ========================================================================= */}
          {selectedConcept === 'concept1' && (
            <motion.section
              key="concept1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden"
            >
              {/* Background Video/Image with Caustic Atmosphere */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
                  style={{ backgroundImage: "url('/images/hero.webp')" }}
                />
                {/* Caustics and Ambient Radial Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#05070E] via-[#05070E]/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-[#05070E]/40 to-[#05070E]/80 z-10" />
                
                {/* Ambient Golden Glowing Dust Orbs */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/4 left-10 w-[550px] h-[550px] rounded-full pointer-events-none z-10"
                  style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)' }}
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                  className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full pointer-events-none z-10"
                  style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)' }}
                />
              </div>

              {/* Floating Floating VIP Badge - Top Right */}
              <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-16 flex justify-end">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-gold/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                >
                  <div className="w-8 h-8 rounded-xl bg-gold/20 flex items-center justify-center border border-gold/40">
                    <Crown className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                      ))}
                      <span className="text-xs font-bold text-gold ml-1">4.99 / 5</span>
                    </div>
                    <p className="text-[10px] text-white/60 tracking-wider uppercase">Preferred by 1,400+ VIP Travelers</p>
                  </div>
                </motion.div>
              </div>

              {/* Center Content */}
              <div className="relative z-20 max-w-7xl mx-auto w-full px-6 py-8">
                <div className="max-w-4xl">
                  {/* Luxury Monogram Tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 border border-gold/40 bg-gold/10 backdrop-blur-xl shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                    <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase">
                      THE ART OF BESPOKE EGYPTIAN JOURNEYS
                    </span>
                  </motion.div>

                  {/* High-Fashion Editorial Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 tracking-tight"
                  >
                    Experience Egypt in{' '}
                    <span 
                      className="font-serif italic font-normal underline decoration-gold/40 decoration-wavy decoration-1 underline-offset-8"
                      style={{
                        background: 'linear-gradient(135deg, #FFF6D5 0%, #D4AF37 50%, #AA771C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.4))'
                      }}
                    >
                      Unrivaled Grandeur
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mb-8 leading-relaxed"
                  >
                    Private Red Sea mega yachts, VIP pharaonic access, and 5-star concierge precision crafted for the discerning traveler.
                  </motion.p>

                  {/* CTAs Row + 4K Cinema Trigger */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center gap-4 mb-10"
                  >
                    <button
                      onClick={() => alert('Search initiated!')}
                      className="relative group px-8 py-4 rounded-2xl text-black font-extrabold text-base transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-[0_12px_40px_rgba(212,175,55,0.4)]"
                      style={{
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #C59B27 100%)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      <Crown className="w-5 h-5 text-black" />
                      <span>Explore Curated Journeys</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* 4K Cinematic Play Button with Ripple */}
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="group px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 hover:border-gold/50 text-white font-bold text-base transition-all duration-300 flex items-center gap-3"
                    >
                      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gold/20 text-gold border border-gold/40 group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-gold ml-0.5" />
                        <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping pointer-events-none" />
                      </div>
                      <span className="text-sm font-semibold tracking-wide">Watch 4K Cinematic Reel</span>
                    </button>
                  </motion.div>
                </div>

                {/* =========================================================
                    FLOATING LUXURY SEARCH CAPSULE BAR (THE CROWN JEWEL)
                   ========================================================= */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-3xl p-3 sm:p-4 backdrop-blur-2xl bg-slate-950/80 border border-gold/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
                >
                  {/* Subtle top gold foil highlight line */}
                  <div className="h-[1px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
                    {/* Destination Selector */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-all">
                      <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Destination</span>
                      </div>
                      <select
                        value={capsuleDestination}
                        onChange={(e) => setCapsuleDestination(e.target.value)}
                        className="bg-transparent text-white font-bold text-sm w-full outline-none cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="Hurghada">Hurghada & Red Sea</option>
                        <option value="Cairo">Cairo & Giza Pyramids</option>
                        <option value="Luxor">Luxor & Valley of Kings</option>
                        <option value="Aswan">Aswan & Nile Islands</option>
                        <option value="Sharm">Sharm El Sheikh</option>
                      </select>
                    </div>

                    {/* Experience Style */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-all">
                      <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-1">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Experience Style</span>
                      </div>
                      <select
                        value={capsuleType}
                        onChange={(e) => setCapsuleType(e.target.value)}
                        className="bg-transparent text-white font-bold text-sm w-full outline-none cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="Yacht Cruise">Private Yacht & Reefs</option>
                        <option value="Historical">VIP Pharaonic Access</option>
                        <option value="Desert Safari">Luxury Desert Safari</option>
                        <option value="Nile Cruise">5-Star Nile Steamer</option>
                      </select>
                    </div>

                    {/* Guest Party */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-all">
                      <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Party Size</span>
                      </div>
                      <select
                        value={capsuleGuests}
                        onChange={(e) => setCapsuleGuests(e.target.value)}
                        className="bg-transparent text-white font-bold text-sm w-full outline-none cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="1 Guest">Solo Private VIP</option>
                        <option value="2 Guests">Couple Retreat (2 Guests)</option>
                        <option value="Small Group">Private Family (3-6 Guests)</option>
                        <option value="Charter">Full Yacht Charter (8+ Guests)</option>
                      </select>
                    </div>

                    {/* Instant Search Trigger */}
                    <button
                      onClick={() => alert(`Finding ${capsuleType} in ${capsuleDestination} for ${capsuleGuests}`)}
                      className="h-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 text-black transition-all duration-300 shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.6)] group cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA771C 100%)'
                      }}
                    >
                      <Search className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                      <span>FIND EXPERIENCES</span>
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Glass Bar: Live Weather & Exchange Rates */}
              <div className="relative z-20 max-w-7xl mx-auto w-full px-6 py-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-400 animate-[spin_12s_linear_infinite]" />
                    <span>Air: <strong className="text-white">28°C Sunny</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-teal-400 animate-pulse" />
                    <span>Red Sea: <strong className="text-white">25°C Crystal Calm</strong></span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>1 USD = <strong className="text-white">{exchangeRates.usd} EGP</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Certified Egyptian Ministry of Tourism Agency</span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* =========================================================================
              CONCEPT 2: STARDUST RIVIERA WITH FLOATING DESTINATION TILES
             ========================================================================= */}
          {selectedConcept === 'concept2' && (
            <motion.section
              key="concept2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden py-12 px-6"
            >
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
                  style={{ backgroundImage: "url('/images/hero.webp')" }}
                />
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/20 via-teal-400/15 to-transparent rounded-full blur-[140px] pointer-events-none z-10" />
              </div>

              <div className="relative z-20 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Bold Riviera Headline */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-cyan-400/30 bg-cyan-950/40 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-bold text-cyan-200 tracking-widest uppercase">
                      HURGHADA & RED SEA RIVIERA
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
                    Where Pharaonic Legends Meet{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                      Turquoise Waters
                    </span>
                  </h1>

                  <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                    Crafting unforgettable voyages across Egypt's sun-drenched reefs, ancient temples, and golden dunes.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-extrabold shadow-[0_10px_35px_rgba(6,182,212,0.4)] flex items-center gap-2">
                      <Flame className="w-5 h-5" />
                      <span>Book Today's Hot Deals</span>
                    </button>
                    <button 
                      onClick={() => setIsVideoModalOpen(true)}
                      className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Watch Preview</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: 3D Interactive Destination Carousel */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  {[
                    { name: 'Hurghada Reefs', tag: 'Luxury Diving & Yachts', img: '/images/hero.webp', price: '$65' },
                    { name: 'Giza Pyramids', tag: 'Private Egyptologist', img: '/images/SP.webp', price: '$85' },
                    { name: 'Luxor Temples', tag: 'Valley of the Kings', img: '/images/abu-simbel.jpg', price: '$120' },
                    { name: 'Nile Cruising', tag: '5-Star Luxury Suites', img: '/images/hero.webp', price: '$290' },
                  ].map((card, _i) => (
                    <motion.div
                      key={card.name}
                      whileHover={{ scale: 1.05, y: -6 }}
                      className="group relative rounded-2xl overflow-hidden aspect-[4/5] p-4 flex flex-col justify-end border border-white/15 shadow-2xl cursor-pointer"
                    >
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url(${card.img})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="relative z-10">
                        <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">{card.tag}</span>
                        <h4 className="text-base font-bold text-white mb-1">{card.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">From <strong className="text-white">{card.price}</strong></span>
                          <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* 4K Cinematic Video Preview Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-gold/40 shadow-[0_0_80px_rgba(212,175,55,0.3)] bg-black">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/5m-x7d8L0vU?autoplay=1&mute=0&controls=1"
                title="Cinematic Egypt 4K"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
