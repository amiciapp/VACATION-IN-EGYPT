import { useParams, Link } from 'react-router';
import { useApp } from '@/context/AppContext';
import { trips } from '@/data/trips';
import {
  Clock,
  MapPin,
  ArrowLeft,
  Heart,
  Star,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Waves,
  Landmark,
  Compass,
  Ship,
  Palmtree,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';
import { useEffect, useMemo } from 'react';
import { useSEO } from '@/hooks/useSEO';

/* ── Shared category theme map (aligned with Trips.tsx) ── */
const categoryThemeMap: Record<string, {
  gradient: string;
  glowColor: string;
  badgeGradient: string;
  titleHover: string;
  priceGradient: string;
  shadowHover: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  Sea: {
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
    glowColor: 'rgba(6,182,212,0.45)',
    badgeGradient: 'from-cyan-500 via-teal-500 to-blue-500',
    titleHover: 'group-hover:text-cyan-600',
    priceGradient: 'from-cyan-600 to-blue-600',
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(6,182,212,0.35)]',
    icon: Waves,
  },
  Historical: {
    gradient: 'from-amber-500 via-yellow-500 to-orange-600',
    glowColor: 'rgba(245,158,11,0.45)',
    badgeGradient: 'from-amber-500 via-orange-500 to-yellow-600',
    titleHover: 'group-hover:text-amber-600',
    priceGradient: 'from-amber-600 to-orange-600',
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(245,158,11,0.35)]',
    icon: Landmark,
  },
  Adventure: {
    gradient: 'from-orange-500 via-rose-500 to-red-600',
    glowColor: 'rgba(249,115,22,0.45)',
    badgeGradient: 'from-orange-500 via-rose-500 to-red-500',
    titleHover: 'group-hover:text-rose-600',
    priceGradient: 'from-orange-600 to-rose-600',
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(244,63,94,0.35)]',
    icon: Compass,
  },
  Cruise: {
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    glowColor: 'rgba(99,102,241,0.45)',
    badgeGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    titleHover: 'group-hover:text-indigo-600',
    priceGradient: 'from-blue-600 to-indigo-600',
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(99,102,241,0.35)]',
    icon: Ship,
  },
  Relaxation: {
    gradient: 'from-emerald-500 via-teal-500 to-green-600',
    glowColor: 'rgba(16,185,129,0.45)',
    badgeGradient: 'from-emerald-500 to-teal-500',
    titleHover: 'group-hover:text-emerald-600',
    priceGradient: 'from-emerald-600 to-teal-600',
    shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(16,185,129,0.35)]',
    icon: Palmtree,
  },
};

const defaultTheme = {
  gradient: 'from-blue-500 via-indigo-500 to-teal-500',
  glowColor: 'rgba(59,130,246,0.45)',
  badgeGradient: 'from-blue-500 to-cyan-500',
  titleHover: 'group-hover:text-blue-600',
  priceGradient: 'from-blue-600 to-teal-600',
  shadowHover: 'group-hover:shadow-[0_20px_45px_-12px_rgba(59,130,246,0.35)]',
  icon: Sparkles,
};

/** Capitalise every word, e.g. "cairo & giza" → "Cairo & Giza" */
const toTitleCase = (str: string) =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());

export default function CityPage() {
  const { cityName } = useParams();
  const { t, formatPrice, wishlist, toggleWishlist, setIsWhatsAppOpen, setSelectedTrip } = useApp();

  const displayName = cityName ? toTitleCase(decodeURIComponent(cityName)) : '';
  const seo = useSEO(displayName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cityName]);

  const cityTrips = useMemo(() => trips.filter(trip =>
    trip.location.toLowerCase().includes(cityName?.toLowerCase() || '') ||
    (cityName?.toLowerCase() === 'luxor - aswan' &&
      (trip.location.includes('Luxor') || trip.location.includes('Aswan'))) ||
    (cityName?.toLowerCase() === 'cairo & giza' &&
      trip.location.toLowerCase() === 'cairo')
  ), [cityName]);

  return (
    <>
      {seo}
      <div className="min-h-screen text-white relative selection:bg-amber-400 selection:text-slate-950">

        {/* ── Global Unified Video Background (Identical to Home page) ── */}
        <div className="fixed inset-0 z-[-2] bg-black" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="/images/hero-redsea.jpg"
          >
            <source src="/videos/vacation.mp4" type="video/mp4" />
          </video>
          {/* Subtle cinematic gradient overlay for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#04060C]/90 via-[#04060C]/60 to-[#04060C]/95 backdrop-blur-[1px]" />
        </div>

        <Navigation />

        <main id="main-content" className="relative z-10 pt-32 pb-24">

          {/* ── Ambient glow orbs (matching website luxury feel) ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
            <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-teal-400/10 to-transparent rounded-full blur-[140px]" />
            <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/15 via-orange-400/10 to-transparent rounded-full blur-[140px]" />
            <div className="absolute bottom-20 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 via-purple-500/10 to-transparent rounded-full blur-[140px]" />
          </div>

          <div className="section-padding max-w-7xl mx-auto">

            {/* ── Breadcrumb / Back Link ── */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white/90 hover:text-white transition-all text-xs font-bold uppercase tracking-wider mb-8 group shadow-sm hover:border-cyan-400/50"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
                <span>{t('trip.backToTrips') || 'Back to All Trips'}</span>
              </Link>
            </motion.div>

            {/* ── Hero Header ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 font-bold text-xs uppercase tracking-widest mb-4 shadow-sm backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Exclusive Destination Guide</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
                {displayName}{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFE259 0%, #FFA751 50%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Trips & Tours
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Discover hand-crafted VIP journeys, private historical excursions, and Mediterranean coastal retreats in{' '}
                <span className="font-bold text-amber-300">{displayName}</span>.
              </p>

              {/* Stats row */}
              {cityTrips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 mt-6"
                >
                  <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 text-xs font-bold text-slate-200 shadow-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{cityTrips.length} Curated {cityTrips.length === 1 ? 'Experience' : 'Experiences'}</span>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 text-xs font-bold text-slate-200 shadow-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>
                      {(cityTrips.reduce((s, t) => s + (t.rating ?? 0), 0) / cityTrips.length).toFixed(1)} Rating ({(cityTrips.reduce((s, t) => s + (t.reviews ?? 0), 0))} reviews)
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 text-xs font-bold text-slate-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant VIP Confirmation</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* ── Trips Grid ── */}
            {cityTrips.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7"
              >
                <AnimatePresence>
                  {cityTrips.map((trip, i) => {
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
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        className="group relative h-full"
                      >
                        {/* Dynamic glowing ambient aura */}
                        <div
                          className={`absolute -inset-0.5 rounded-[26px] bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 -z-10 group-hover:scale-[1.01]`}
                        />

                        {/* Card Container */}
                        <div className={`relative rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/70 group-hover:border-transparent shadow-md transition-all duration-500 ease-out group-hover:-translate-y-2.5 ${theme.shadowHover} overflow-hidden flex flex-col h-full text-slate-900`}>

                          {/* Top animated color bar */}
                          <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient} transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out`} />

                          {/* Image Stage */}
                          <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                            <Link to={`/trip/${trip.id}`} className="block w-full h-full">
                              <img
                                src={trip.image}
                                alt={t('alt.trip', { title: trip.title })}
                                loading="lazy"
                                width={400}
                                height={240}
                                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                              />
                            </Link>

                            {/* Gradient Vignettes */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                            {/* Glare sweep */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                            {/* Badges — Top Left */}
                            <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold text-white shadow-md backdrop-blur-md bg-gradient-to-r ${theme.badgeGradient}`}>
                                <CategoryIcon className="w-3 h-3 text-white" />
                                {trip.category}
                              </span>
                              {trip.hot && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold text-white bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 shadow-lg shadow-red-500/30 animate-pulse">
                                  <Flame className="w-3 h-3 text-yellow-300" />
                                  {t('trips.hot')}
                                </span>
                              )}
                              {trip.discount && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-lg shadow-amber-400/40">
                                  <Sparkles className="w-3 h-3 text-slate-950" />
                                  -{trip.discount}%
                                </span>
                              )}
                            </div>

                            {/* Wishlist Heart — Top Right */}
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(trip.id); }}
                              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                              aria-label="Toggle Wishlist"
                              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-115 active:scale-90 z-20 group/heart"
                            >
                              <Heart className={`w-4 h-4 transition-all duration-300 ${isWishlisted ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-700 group-hover/heart:text-red-500'}`} />
                            </button>

                            {/* Rating Pill — Bottom Left */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-white/60 z-10 pointer-events-none">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              <span className="text-xs font-bold text-slate-900">{trip.rating}</span>
                              <span className="text-[10px] text-slate-500 font-semibold">({trip.reviews})</span>
                            </div>

                            {/* Price Pill — Bottom Right */}
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
                            {/* Meta Chips */}
                            <div className="flex items-center gap-2 mb-3">
                              <span className="inline-flex items-center gap-1 bg-blue-50/90 text-blue-700 border border-blue-200/70 rounded-lg px-2.5 py-1 text-[11px] font-bold">
                                <Clock className="w-3 h-3 text-blue-500" />
                                {trip.duration}
                              </span>
                              <span className="inline-flex items-center gap-1 bg-emerald-50/90 text-emerald-700 border border-emerald-200/70 rounded-lg px-2.5 py-1 text-[11px] font-bold">
                                <MapPin className="w-3 h-3 text-emerald-500" />
                                <span className="truncate max-w-[110px]">{trip.location}</span>
                              </span>
                            </div>

                            {/* Title */}
                            <Link to={`/trip/${trip.id}`} className="block mb-2">
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
                              <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-[11px] font-bold text-emerald-700">
                                  {t('trips.available')}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Link
                                  to={`/trip/${trip.id}`}
                                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-105"
                                  title="View Trip Details"
                                  aria-label="View Trip Details"
                                >
                                  <ArrowRight className="w-4 h-4 text-slate-700" />
                                </Link>

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
            ) : (
              /* ── Premium Frosted Empty State ── */
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20 px-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 max-w-2xl mx-auto shadow-2xl"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400/30 via-cyan-500/20 to-blue-500/30 border border-white/30 backdrop-blur-xl flex items-center justify-center mx-auto shadow-xl">
                    <MapPin className="w-9 h-9 text-amber-300" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                  Coming Soon to{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #FFE259 0%, #FFA751 50%, #FFD700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {displayName}
                  </span>
                </h2>
                <p className="text-slate-300 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                  We're curating exclusive VIP experiences for {displayName}. Explore our other luxury destinations or connect with our concierge.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/#trips"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4" />
                    Explore All Trips
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 text-cyan-400" />
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
