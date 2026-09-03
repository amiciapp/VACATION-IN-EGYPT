import { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { trips, categories, cities } from '@/data/trips';
import { 
  Clock, 
  MapPin, 
  Star, 
  Heart, 
  Waves, 
  Landmark, 
  Compass, 
  Ship, 
  Palmtree, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  SlidersHorizontal
} from 'lucide-react';
import EgyptMap from '@/components/EgyptMap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

// Category specific styling configuration
const categoryThemeMap: Record<string, {
  gradient: string;
  glowColor: string;
  badgeGradient: string;
  titleHover: string;
  priceGradient: string;
  chipBg: string;
  icon: typeof Waves;
  shadowHover: string;
}> = {
  Sea: {
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    badgeGradient: 'from-cyan-500 via-teal-500 to-blue-500',
    titleHover: 'group-hover:text-cyan-600',
    priceGradient: 'from-cyan-600 to-blue-600',
    chipBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    icon: Waves,
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(6,182,212,0.35)]',
  },
  Historical: {
    gradient: 'from-amber-500 via-yellow-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    badgeGradient: 'from-amber-500 via-orange-500 to-yellow-600',
    titleHover: 'group-hover:text-amber-600',
    priceGradient: 'from-amber-600 to-orange-600',
    chipBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
    icon: Landmark,
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(245,158,11,0.35)]',
  },
  Adventure: {
    gradient: 'from-orange-500 via-rose-500 to-red-600',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    badgeGradient: 'from-orange-500 via-rose-500 to-red-500',
    titleHover: 'group-hover:text-rose-600',
    priceGradient: 'from-orange-600 to-rose-600',
    chipBg: 'bg-rose-50 text-rose-800 border-rose-200/80',
    icon: Compass,
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(244,63,94,0.35)]',
  },
  Cruise: {
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    badgeGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    titleHover: 'group-hover:text-indigo-600',
    priceGradient: 'from-blue-600 to-indigo-600',
    chipBg: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    icon: Ship,
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(99,102,241,0.35)]',
  },
  Relaxation: {
    gradient: 'from-emerald-500 via-teal-500 to-green-600',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    badgeGradient: 'from-emerald-500 to-teal-500',
    titleHover: 'group-hover:text-emerald-600',
    priceGradient: 'from-emerald-600 to-teal-600',
    chipBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    icon: Palmtree,
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(16,185,129,0.35)]',
  },
};

const defaultTheme = {
  gradient: 'from-blue-500 via-indigo-500 to-teal-500',
  glowColor: 'rgba(59, 130, 246, 0.45)',
  badgeGradient: 'from-blue-500 to-cyan-500',
  titleHover: 'group-hover:text-blue-600',
  priceGradient: 'from-blue-600 to-teal-600',
  chipBg: 'bg-blue-50 text-blue-800 border-blue-200/80',
  icon: Sparkles,
  shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(59,130,246,0.35)]',
};

const categoryIconMap: Record<string, typeof Waves> = {
  All: Sparkles,
  Sea: Waves,
  Historical: Landmark,
  Adventure: Compass,
  Cruise: Ship,
  Relaxation: Palmtree,
};

export default function Trips() {
  const { t, formatPrice, wishlist, toggleWishlist, setIsWhatsAppOpen, setSelectedTrip } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCity, setActiveCity] = useState('All');
  const [filterMode, setFilterMode] = useState<'category' | 'city'>('category');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredTrips = useMemo(() => trips.filter(trip => {
    const categoryMatch = activeCategory === 'All' || trip.category === activeCategory;
    const cityMatch = activeCity === 'All' || trip.location.toLowerCase().includes(activeCity.toLowerCase());
    return categoryMatch && cityMatch;
  }), [activeCategory, activeCity]);

  return (
    <section id="trips" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dynamic Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/15 via-teal-300/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-gradient-to-bl from-amber-400/15 via-orange-300/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/10 via-pink-300/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-cyan-500/20 text-cyan-600 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t('trips.subtitle') || 'Explore Premier Egypt Experiences'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-ink mb-4 tracking-tight">
            {t('trips.title')}
          </h2>
          <p className="text-base md:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
            Discover hand-crafted luxury journeys, private Nile cruises, desert quad adventures, and ancient Pharaonic wonders.
          </p>
        </div>

        {/* Map Explorer with dynamic city filter link */}
        <div className="mb-14">
          <EgyptMap
            selectedCity={activeCity !== 'All' ? activeCity : undefined}
            onSelectCity={(city) => {
              setFilterMode('city');
              setActiveCity(city);
              setActiveCategory('All');
            }}
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-8">
          <div className="glass p-1.5 rounded-2xl flex gap-1.5 shadow-md border border-white/60 bg-white/70 backdrop-blur-xl">
            <button
              onClick={() => { setFilterMode('category'); setActiveCity('All'); setActiveCategory('All'); }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                filterMode === 'category' 
                  ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105' 
                  : 'text-ink/70 hover:text-ink hover:bg-white/50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {t('trips.byType')}
            </button>
            <button
              onClick={() => { setFilterMode('city'); setActiveCategory('All'); setActiveCity('All'); }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                filterMode === 'city' 
                  ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105' 
                  : 'text-ink/70 hover:text-ink hover:bg-white/50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {t('trips.byCity')}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-2.5 md:gap-3 mb-14 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => { setActiveCategory('All'); setActiveCity('All'); }}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
              activeCategory === 'All' && activeCity === 'All'
                ? 'bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                : 'glass text-ink/75 hover:text-ink hover:bg-white/90 hover:scale-102 border border-slate-200/80 shadow-sm'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            {t('trips.filter.all')}
          </button>
          
          {filterMode === 'category' ? (
            categories.filter(cat => cat !== 'All').map((cat) => {
              const theme = categoryThemeMap[cat] || defaultTheme;
              const IconComp = categoryIconMap[cat] || Sparkles;
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveCity('All'); }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg shadow-cyan-500/30 scale-105`
                      : 'glass text-ink/75 hover:text-ink hover:bg-white/80 hover:scale-102 border border-slate-200/60 shadow-sm'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  {t(`trips.filter.${cat.toLowerCase()}`) || cat}
                </button>
              );
            })
          ) : (
            cities.map((city) => {
              const isSelected = activeCity === city;
              return (
                <button
                  key={city}
                  onClick={() => { setActiveCity(city); setActiveCategory('All'); }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                      : 'glass text-ink/75 hover:text-ink hover:bg-white/80 hover:scale-102 border border-slate-200/60 shadow-sm'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-500" />
                  {city}
                </button>
              );
            })
          )}
        </div>

        {/* Trips Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7">
          <AnimatePresence>
          {filteredTrips.map((trip) => {
            const theme = categoryThemeMap[trip.category] || defaultTheme;
            const CategoryIcon = theme.icon;
            const isWishlisted = Array.isArray(wishlist) && wishlist.includes(trip.id);

            return (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative h-full"
              >
                {/* Dynamic Glowing Ambient Aura on Card Hover */}
                <div 
                  className={`absolute -inset-0.5 rounded-[26px] bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 -z-10 group-hover:scale-[1.01]`} 
                />

                {/* Card Container */}
                <div className={`relative rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/70 group-hover:border-transparent shadow-md transition-all duration-500 ease-out group-hover:-translate-y-2.5 ${theme.shadowHover} overflow-hidden flex flex-col h-full`}>
                  
                  {/* Top Animated Color Bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient} transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out`} />

                  {/* Image Stage */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <Link to={`/trip/${trip.id}`} className="block w-full h-full cursor-pointer">
                      <img
                        src={trip.image}
                        alt={t('alt.trip', { title: trip.title })}
                        loading="lazy"
                        width={400}
                        height={240}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-115 group-hover:rotate-0.5 group-hover:brightness-105"
                      />
                    </Link>

                    {/* Gradient Vignettes */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                    
                    {/* Light Sweep Glare on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    {/* Badges on Top-Left */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                      {/* Category Badge */}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold text-white shadow-md backdrop-blur-md bg-gradient-to-r ${theme.badgeGradient} transition-transform duration-300 group-hover:scale-105`}>
                        <CategoryIcon className="w-3 h-3 text-white" />
                        {trip.category}
                      </span>

                      {/* Hot Badge */}
                      {trip.hot && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold text-white bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 shadow-lg shadow-red-500/30 animate-pulse">
                          <Flame className="w-3 h-3 text-yellow-300 animate-bounce" />
                          {t('trips.hot')}
                        </span>
                      )}

                      {/* Discount Badge */}
                      {trip.discount && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-lg shadow-amber-400/40">
                          <Sparkles className="w-3 h-3 text-slate-950" />
                          -{trip.discount}%
                        </span>
                      )}
                    </div>

                    {/* Top-Right Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(trip.id);
                      }}
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      aria-label="Toggle Wishlist"
                      className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-115 active:scale-90 z-20 group/heart"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-all duration-300 ${
                          isWishlisted 
                            ? 'fill-red-500 text-red-500 scale-110' 
                            : 'text-slate-700 group-hover/heart:text-red-500 group-hover/heart:scale-115'
                        }`} 
                      />
                    </button>

                    {/* Bottom-Left Rating Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-white/60 group-hover:bg-white transition-colors duration-300 z-10 pointer-events-none">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 transition-transform duration-300 group-hover:rotate-12" />
                      <span className="text-xs font-bold text-slate-900">{trip.rating}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">({trip.reviews})</span>
                    </div>

                    {/* Bottom-Right Starting Price Pill */}
                    <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl flex flex-col items-end border border-white/70 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 leading-none mb-0.5">
                          {t('trips.startingFrom')}
                        </span>
                        <div className="flex items-baseline gap-0.5">
                          <span className={`text-lg font-black bg-gradient-to-r ${theme.priceGradient} bg-clip-text text-transparent leading-none`}>
                            {formatPrice(trip.price)}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 ml-0.5">/person</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex flex-col flex-1">
                    
                    {/* Location & Duration Badges */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 bg-blue-50/90 text-blue-700 border border-blue-200/70 rounded-lg px-2.5 py-1 text-[11px] font-bold group-hover:bg-blue-100 transition-colors">
                        <Clock className="w-3 h-3 text-blue-500 group-hover:rotate-45 transition-transform duration-300" />
                        <span>{trip.duration}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 bg-emerald-50/90 text-emerald-700 border border-emerald-200/70 rounded-lg px-2.5 py-1 text-[11px] font-bold group-hover:bg-emerald-100 transition-colors">
                        <MapPin className="w-3 h-3 text-emerald-500 group-hover:animate-bounce" />
                        <span className="truncate max-w-[110px]">{trip.location}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <Link to={`/trip/${trip.id}`} className="block mb-2 group/title">
                      <h3 className={`text-slate-900 font-bold text-base md:text-lg leading-snug line-clamp-1 transition-colors duration-300 ${theme.titleHover}`}>
                        {trip.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
                      {trip.description}
                    </p>

                    {/* Highlights Preview */}
                    {trip.highlights && trip.highlights.length > 0 && (
                      <div className="space-y-1.5 mb-4 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100/80">
                        {trip.highlights.slice(0, 2).map((hl, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className="pt-3.5 mt-auto border-t border-slate-100 flex items-center justify-between gap-2">
                      {/* Availability Pulse Dot */}
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700">
                          {t('trips.available')}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {/* Details Arrow Link */}
                        <Link
                          to={`/trip/${trip.id}`}
                          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105"
                          title="View Trip Details"
                          aria-label="View Trip Details"
                        >
                          <ArrowRight className="w-4 h-4 text-slate-700 group-hover:translate-x-0.5 transition-transform" />
                        </Link>

                        {/* WhatsApp / Book CTA */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedTrip(trip.id);
                            setIsWhatsAppOpen(true);
                          }}
                          className="bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54] hover:from-[#20bd5a] hover:to-[#0e6f64] text-white shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/40 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 group/btn"
                        >
                          <MessageCircle className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
                          <span>{t('trips.book')}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

