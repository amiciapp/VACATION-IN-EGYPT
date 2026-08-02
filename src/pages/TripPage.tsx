import { useParams, Link, useNavigate } from 'react-router';
import { useApp } from '@/context/AppContext';
import { trips } from '@/data/trips';
import { Clock, MapPin, ArrowLeft, Heart, CheckCircle2, Star, Users, Calendar, ShieldCheck, Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';
import BookingEngine from '@/components/BookingEngine';
import { useEffect, useState, useMemo } from 'react';
import { useSEO } from '@/hooks/useSEO';

export default function TripPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { t, formatPrice, wishlist, toggleWishlist } = useApp();
  const [activeImg, setActiveImg] = useState(0);

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

  if (!trip) return null;

  const images = trip.gallery || [trip.image];

  return (
    <>
      {seo}
    <div className="min-h-screen bg-navy text-foreground selection:bg-gold selection:text-white">
      {/* Global Fixed Video Background */}
      <div className="fixed inset-0 z-[-2] bg-navy" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover opacity-10"
          poster="/images/hero-redsea.jpg"
        >
          <source src="/videos/sitebg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-transparent to-navy" />
      </div>

      <Navigation />

      <main id="main-content" className="pt-32 pb-24 section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
              <Link to="/" className="inline-flex items-center gap-2 text-gold/80 hover:text-ink transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium uppercase tracking-widest">{t('trip.backToTrips')}</span>
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Content: Trip Info */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Title & Stats */}
                <div className="mb-10">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="px-4 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-black uppercase tracking-[0.2em] border border-gold/20">
                      {trip.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-gold">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm">{trip.rating}</span>
                      <span className="text-ink/70 text-xs ml-1 font-medium">{trip.reviews} {t('trip.reviews')}</span>
                    </div>
                    {trip.hot && (
                      <span className="flex items-center gap-1 text-red-400 text-[10px] font-black uppercase tracking-wider">
                        <Zap className="w-3 h-3 fill-current" />
                        {t('trip.popular')}
                      </span>
                    )}
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black text-ink mb-8 leading-[0.95] tracking-tighter">
                    {trip.title}
                  </h1>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-gray-200 shadow-md">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-ink/70 font-bold">{t('trips.duration')}</span>
                      <div className="flex items-center gap-2 text-gold">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-bold text-ink">{trip.duration}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-ink/70 font-bold">{t('trip.location')}</span>
                      <div className="flex items-center gap-2 text-gold">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-bold text-ink">{trip.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-ink/70 font-bold">{t('trip.groupSize')}</span>
                      <div className="flex items-center gap-2 text-gold">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-bold text-ink">{trip.groupSize}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-ink/70 font-bold">{t('trip.availability')}</span>
                      <div className="flex items-center gap-2 text-gold">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-bold text-ink">{trip.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Image & Gallery */}
                <div className="space-y-4 mb-16">
                  <div className="aspect-[16/9] rounded-[2rem] overflow-hidden border border-gray-200 shadow-xl group relative">
                    <motion.img 
                      key={activeImg}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                      src={images[activeImg]} 
                      alt={trip.title} 
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  
                  {images.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`relative h-24 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                            activeImg === i ? 'border-gold scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`${trip.title} ${i}`} loading="lazy" width={160} height={120} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                  <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-3">
                          <span className="w-8 h-px bg-gold" />
                          {t('trip.details')}
                      </h2>
                      <p className="text-lg text-ink/70 leading-relaxed font-medium italic border-l-2 border-gold/30 pl-6">
                        {trip.longDescription}
                      </p>
                    </div>

                      <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
                      <Info className="w-6 h-6 text-blue-400 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-ink mb-1">{t('trip.tip.title')}</p>
                        <p className="text-xs text-ink/60">{t('trip.tip.text')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {/* Highlights */}
                    <div>
                      <h3 className="text-xl font-bold text-ink mb-6 text-gold uppercase tracking-tighter">{t('trip.highlights')}</h3>
                      <div className="space-y-4">
                        {trip.highlights.map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 group"
                          >
                            <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm font-semibold text-ink/90">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h3 className="text-xl font-bold mb-6 text-gold uppercase tracking-tighter">{t('trip.included')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {trip.included.map((item, i) => (
                          <span key={i} className="px-4 py-2 rounded-xl bg-ink/[0.03] border border-ink/10 text-xs font-bold text-ink/70 hover:text-gold hover:border-gold/30 transition-all cursor-default">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Similar Experiences Section */}
                {similarTrips.length > 0 && (
                  <div className="pt-20 border-t border-ink/10">
                    <h2 className="text-3xl font-black mb-10 tracking-tight">{t('trip.similar')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {similarTrips.map((sTrip) => (
                        <Link 
                          to={`/trip/${sTrip.id}`} 
                          key={sTrip.id}
                          className="flex gap-4 p-4 rounded-3xl bg-ink/[0.02] border border-ink/10 hover:bg-ink/[0.05] transition-all group"
                        >
                          <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                            <img src={sTrip.image} alt={sTrip.title} loading="lazy" width={128} height={128} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-bold text-ink mb-1 group-hover:text-gold transition-colors">{sTrip.title}</h4>
                            <p className="text-xs text-ink/70 mb-3">{sTrip.location}</p>
                            <span className="text-gold font-black">{formatPrice(sTrip.price)}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Content: Booking Sidebar */}
            <div className="lg:w-[420px]" id="booking-sidebar">
              <div className="sticky top-32">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-[2.5rem] bg-white border border-ink/10 shadow-[0_30px_100px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  <div className="p-10 border-b border-ink/10 bg-ink/[0.02]">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/70 block mb-2">{t('trip.priceFrom')}</span>
                        <div className="flex items-end gap-2">
                          <span className="text-4xl font-black text-gold leading-none">{formatPrice(trip.price)}</span>
                          <span className="text-ink/70 text-xs font-bold pb-1">{t('trip.perPerson')}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleWishlist(trip.id)}
                        title="Toggle Wishlist"
                        aria-label="Toggle Wishlist"
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          wishlist.includes(trip.id) 
                            ? 'bg-red-500/20 text-red-500 border border-red-500/30' 
                            : 'bg-ink/5 text-ink/70 border border-ink/10 hover:text-ink'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(trip.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    {trip.discount && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                        <ShieldCheck className="w-3 h-3" />
                        {t('trip.priceGuarantee')}
                      </div>
                    )}
                  </div>
                  
                  <div className="h-[500px]">
                    <BookingEngine trip={trip} onClose={() => navigate(-1)} />
                  </div>
                </motion.div>
                
                {/* Confidence Badges */}
                <div className="mt-8 grid grid-cols-2 gap-4 px-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-gold/60" />
                    <span className="text-[10px] font-bold text-ink/70 uppercase tracking-widest">{t('trip.safeBooking')}</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Clock className="w-5 h-5 text-gold/60" />
                    <span className="text-[10px] font-bold text-ink/70 uppercase tracking-widest">{t('trip.instantConfirm')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] p-4 bg-ink/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between gap-4 safe-bottom">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-gold/60">{t('trip.startingFrom')}</span>
          <div className="flex items-end gap-1">
            <span className="text-xl font-black text-white">{formatPrice(trip.price)}</span>
            <span className="text-[10px] text-white/40 mb-1">/ person</span>
          </div>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('booking-sidebar');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex-1 bg-gold-gradient py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-glow"
        >
          {t('trip.bookSpot')}
        </button>
      </div>
    </div>
    </>
  );
}
