import { useParams, Link, useNavigate } from 'react-router';
import { useApp } from '@/context/AppContext';
import { trips } from '@/data/trips';
import { 
  Clock, MapPin, ArrowLeft, Heart, CheckCircle2, Star, Users, Calendar, 
  ShieldCheck, Zap, Info, ChevronLeft, ChevronRight, Maximize2, X, 
  Sparkles, Camera, Phone, Award, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';
import BookingEngine from '@/components/BookingEngine';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSEO } from '@/hooks/useSEO';

export default function TripPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { formatPrice, wishlist, toggleWishlist, setIsWhatsAppOpen, setSelectedTrip } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const trip = trips.find(t => t.id === tripId);
  const similarTrips = useMemo(() => trips
    .filter(t => t.id !== tripId && (t.location === trip?.location || t.category === trip?.category))
    .slice(0, 4), [tripId, trip?.location, trip?.category]);

  const seo = useSEO(undefined, trip);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!trip) {
      navigate('/', { replace: true });
    }
  }, [trip, navigate]);

  const images = trip?.gallery && trip.gallery.length > 0 ? trip.gallery : (trip ? [trip.image] : []);

  const handleNextImg = useCallback(() => {
    setActiveImg((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevImg = useCallback(() => {
    setActiveImg((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation for lightbox & slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextImg();
      if (e.key === 'ArrowLeft') handlePrevImg();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextImg, handlePrevImg]);

  if (!trip) return null;

  // Check if description has multi-day structure
  const itineraryDays = trip.longDescription.includes('Day 1:')
    ? trip.longDescription.split(/(?=Day \d+:)/g).filter(Boolean)
    : null;

  return (
    <>
      {seo}
      <div className="min-h-screen bg-[#060913] text-white selection:bg-gold selection:text-black relative">
        {/* Ambient background glow & particles */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px]" />
        </div>

        <Navigation />

        <main id="main-content" className="pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs & Navigation */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white transition-all text-xs font-semibold uppercase tracking-widest group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-gold" />
              <span>Back to all experiences</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleWishlist(trip.id)}
                title="Save to wishlist"
                aria-label="Save to wishlist"
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${
                  wishlist.includes(trip.id)
                    ? 'bg-red-500/20 border-red-500/40 text-red-400'
                    : 'bg-white/[0.04] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(trip.id) ? 'fill-current text-red-400' : ''}`} />
                <span className="hidden sm:inline">
                  {wishlist.includes(trip.id) ? 'Saved' : 'Save'}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN: Main Details & Visuals (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Title & Badges */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold uppercase tracking-wider border border-gold/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
                    <Compass className="w-3.5 h-3.5" />
                    {trip.category}
                  </span>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>{trip.rating}</span>
                    <span className="text-white/40 font-normal">({trip.reviews} reviews)</span>
                  </div>

                  {trip.hot && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Best Seller
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-md">
                  {trip.title}
                </h1>

                <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
                  {trip.description}
                </p>
              </div>

              {/* GALLERY & MEDIA SECTION */}
              <div className="space-y-4">
                {/* Main Hero Viewer */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      src={images[activeImg]}
                      alt={`${trip.title} - photo ${activeImg + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setIsLightboxOpen(true)}
                    />
                  </AnimatePresence>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImg}
                        aria-label="Previous photo"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-black/50 hover:bg-gold hover:text-black border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleNextImg}
                        aria-label="Next photo"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-black/50 hover:bg-gold hover:text-black border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Photo Counter Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90">
                    <Camera className="w-3.5 h-3.5 text-gold" />
                    <span>Photo {activeImg + 1} of {images.length}</span>
                  </div>

                  {/* Fullscreen Expand CTA */}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    aria-label="View Fullscreen"
                    className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition-all hover:scale-105"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-gold" />
                    <span className="hidden sm:inline">View Gallery ({images.length})</span>
                  </button>
                </div>

                {/* Thumbnails Row */}
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImg(idx)}
                        className={`relative w-20 sm:w-24 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                          activeImg === idx
                            ? 'border-gold ring-2 ring-gold/40 scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                            : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-[9px] font-bold text-white/80">
                          {idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* QUICK KEY STATS GRID (4 Cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                  <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold block mb-1.5">Duration</span>
                  <div className="flex items-center gap-2 text-gold">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-bold text-white">{trip.duration}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                  <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold block mb-1.5">Location</span>
                  <div className="flex items-center gap-2 text-gold">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-bold text-white">{trip.location}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                  <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold block mb-1.5">Group Size</span>
                  <div className="flex items-center gap-2 text-gold">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-bold text-white">{trip.groupSize}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                  <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold block mb-1.5">Availability</span>
                  <div className="flex items-center gap-2 text-gold">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-bold text-white">{trip.availability}</span>
                  </div>
                </div>
              </div>

              {/* HIGHLIGHTS SECTION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-gold" />
                  Key Highlights & Sightseeing
                </h3>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  {trip.highlights.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-gold/15 flex items-center justify-center text-gold shrink-0 mt-0.5 group-hover:bg-gold group-hover:text-black transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-white/90 leading-snug">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ITINERARY & EXPERIENCE DETAILS */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-gold" />
                  Experience Overview & Itinerary
                </h3>

                {itineraryDays ? (
                  <div className="space-y-4">
                    {itineraryDays.map((dayText, idx) => {
                      const [dayTitle, ...dayBody] = dayText.split('\n\n');
                      return (
                        <div 
                          key={idx} 
                          className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold/30 transition-all space-y-2"
                        >
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-lg bg-gold/20 text-gold text-xs font-bold uppercase tracking-wider">
                              Day {idx + 1}
                            </span>
                            <h4 className="font-bold text-white text-base">
                              {dayTitle.replace(/Day \d+:\s*/, '')}
                            </h4>
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed pl-1">
                            {dayBody.join('\n\n') || dayTitle}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-white/80 text-base leading-relaxed space-y-4 font-normal">
                    {trip.longDescription.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* VIP Travel Concierge Note */}
                <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex items-start gap-4">
                  <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-cyan-300 mb-1">VIP Private Guidance & Flexibility</h5>
                    <p className="text-xs text-white/70 leading-relaxed">
                      All our trips include dedicated private transportation and licensed Egyptologist guides. Itineraries can be tailored to your preferred start times and pacing.
                    </p>
                  </div>
                </div>
              </div>

              {/* WHAT'S INCLUDED & PACKING */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-gold" />
                  What's Included in this Tour
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {trip.included.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-white/80 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Floating Booking Sidebar (4 cols) */}
            <div className="lg:col-span-4" id="booking-sidebar">
              <div className="sticky top-32 space-y-6">
                
                {/* Price & Guarantee Card */}
                <div className="p-6 rounded-3xl bg-[#0b1220] border border-gold/30 shadow-[0_10px_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-gold/80 block mb-1">
                        Guaranteed Price
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white tracking-tight">
                          {formatPrice(trip.price)}
                        </span>
                        <span className="text-xs text-white/50 font-semibold">/ person</span>
                      </div>
                    </div>

                    {trip.discount && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                        Save {trip.discount}%
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-white/70">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Best Price Guarantee — No hidden fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Instant confirmation on WhatsApp</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Booking Engine */}
                <div className="h-[520px]">
                  <BookingEngine trip={trip} onClose={() => {}} />
                </div>

                {/* Direct WhatsApp Concierge CTA */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 text-center space-y-3">
                  <p className="text-xs text-white/70">
                    Have special requests or need custom arrangements?
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTrip(trip.id);
                      setIsWhatsAppOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:border-gold/40"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    Speak with Egypt Concierge
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* SIMILAR EXPERIENCES CAROUSEL */}
          {similarTrips.length > 0 && (
            <div className="mt-24 pt-16 border-t border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">Explore More</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Similar Top Experiences</h2>
                </div>
                <Link to="/" className="text-xs uppercase tracking-wider text-gold hover:text-white font-bold transition-colors">
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarTrips.map((sTrip) => (
                  <Link
                    to={`/trip/${sTrip.id}`}
                    key={sTrip.id}
                    className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-gold/40 transition-all hover:-translate-y-1.5 shadow-lg flex flex-col"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-black">
                      <img
                        src={sTrip.image}
                        alt={sTrip.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-gold border border-white/15 uppercase">
                        {sTrip.category}
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-amber-300 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{sTrip.rating}</span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-gold transition-colors mb-1">
                          {sTrip.title}
                        </h4>
                        <p className="text-xs text-white/50 line-clamp-2 mb-3">
                          {sTrip.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">{sTrip.duration}</span>
                        <span className="text-gold font-bold text-sm">{formatPrice(sTrip.price)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />

        {/* FULLSCREEN LIGHTBOX MODAL */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between text-white z-10">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-gold" />
                  <span className="font-bold text-sm sm:text-base">{trip.title}</span>
                  <span className="text-xs text-white/50 px-2 py-0.5 rounded-full bg-white/10">
                    {activeImg + 1} / {images.length}
                  </span>
                </div>

                <button
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close Lightbox"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Main Image & Arrows */}
              <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
                <button
                  onClick={handlePrevImg}
                  aria-label="Previous"
                  className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-gold hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>

                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImg]}
                  alt={`${trip.title} full view`}
                  className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                />

                <button
                  onClick={handleNextImg}
                  aria-label="Next"
                  className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-gold hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>

              {/* Lightbox Thumbnails Navigation */}
              <div className="flex justify-center gap-2.5 overflow-x-auto py-2 z-10">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImg === idx
                        ? 'border-gold scale-110 shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                        : 'border-white/20 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Sticky Booking Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[50] p-4 bg-[#080d1a]/95 backdrop-blur-xl border-t border-white/15 flex items-center justify-between gap-4 safe-bottom shadow-2xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-white">{formatPrice(trip.price)}</span>
              <span className="text-[10px] text-white/50">/ person</span>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('booking-sidebar');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 max-w-[200px] bg-gradient-to-r from-gold to-amber-400 py-3.5 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Book Experience
          </button>
        </div>
      </div>
    </>
  );
}
