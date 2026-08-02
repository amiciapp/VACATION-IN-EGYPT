import { useParams, Link } from 'react-router';
import { useApp } from '@/context/AppContext';
import { trips } from '@/data/trips';
import { Clock, MapPin, ArrowLeft, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { antigravity } from '@/utils/motion';
import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';
import { useEffect, useMemo } from 'react';
import { useSEO } from '@/hooks/useSEO';

export default function CityPage() {
  const { cityName } = useParams();
  const { t, formatPrice, wishlist, toggleWishlist } = useApp();

  const seo = useSEO(cityName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cityName]);

  const cityTrips = useMemo(() => trips.filter(trip => 
    trip.location.toLowerCase().includes(cityName?.toLowerCase() || '') ||
    (cityName === 'Luxor - Aswan' && (trip.location.includes('Luxor') || trip.location.includes('Aswan')))
  ), [cityName]);

  return (
    <>
      {seo}
    <div className="min-h-screen bg-navy text-ink">
      {/* Global Fixed Video Background (Persisted) */}
      <div className="fixed inset-0 z-[-2] bg-navy" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover opacity-30"
          poster="/images/hero-redsea.jpg"
        >
          <source src="/videos/sitebg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/60 to-navy/40" />
      </div>

      <Navigation />

      <main id="main-content" className="pt-32 pb-24 section-padding min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs / Back */}
          <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-ink transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{t('trip.backToTrips')}</span>
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-ink mb-4 tracking-tight">
              {cityName} <span className="text-gold">Trips</span>
            </h1>
            <p className="text-xl text-ink/60 max-w-2xl">
              Discover the best experiences and luxury adventures in {cityName}.
            </p>
          </div>

          {cityTrips.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {cityTrips.map((trip) => (
                  <Link
                    to={`/trip/${trip.id}`}
                    key={trip.id}
                    className="group relative glass-card overflow-hidden block"
                  >
                    <motion.div
                      layout
                      variants={antigravity}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      whileHover="hover"
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          src={trip.image}
                          alt={t('alt.trip', { title: trip.title })}
                          loading="lazy"
                          width={400}
                          height={224}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                        
                        {/* Wishlist */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(trip.id);
                          }}
                          title="Toggle Wishlist"
                          aria-label="Toggle Wishlist"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all z-10"
                        >
                          <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(trip.id) ? 'fill-red-500 text-red-500' : 'text-ink'}`} />
                        </button>

                        {/* Price */}
                        <div className="absolute bottom-3 right-3">
                          <div className="glass-strong px-4 py-2 rounded-xl">
                            <span className="text-gold font-bold text-lg">{formatPrice(trip.price)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-ink font-semibold text-lg mb-2 group-hover:text-gold transition-colors line-clamp-1">
                          {trip.title}
                        </h3>
                        <div className="flex items-center gap-4 text-ink/70 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{trip.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="line-clamp-1">{trip.location}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-24 glass-card">
              <p className="text-2xl text-ink/70">No trips found for this city yet.</p>
              <Link to="/" className="mt-4 text-gold hover:underline inline-block">Explore other cities</Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
}
