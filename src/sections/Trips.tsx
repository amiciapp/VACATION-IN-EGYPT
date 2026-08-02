import { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { trips, categories, cities } from '@/data/trips';
import { Clock, MapPin, Star, Heart } from 'lucide-react';
import EgyptMap from '@/components/EgyptMap';
import { motion, AnimatePresence } from 'framer-motion';
import { antigravity } from '@/utils/motion';
import { Link } from 'react-router';

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
    <section id="trips" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="section-padding">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">{t('trips.title')}</h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">{t('trips.subtitle')}</p>
        </div>

        <div className="mb-16">
          <EgyptMap />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-8">
          <div className="glass p-1 rounded-xl flex gap-1">
            <button
              onClick={() => { setFilterMode('category'); setActiveCity('All'); setActiveCategory('All'); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterMode === 'category' ? 'bg-turquoise text-white shadow-[0_0_10px_rgba(16,172,132,0.3)]' : 'text-ink/70 hover:text-ink'}`}
            >
              {t('trips.byType')}
            </button>
            <button
              onClick={() => { setFilterMode('city'); setActiveCategory('All'); setActiveCity('All'); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterMode === 'city' ? 'bg-turquoise text-white shadow-[0_0_10px_rgba(16,172,132,0.3)]' : 'text-ink/70 hover:text-ink'}`}
            >
              {t('trips.byCity')}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => { setActiveCategory('All'); setActiveCity('All'); }}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'All' && activeCity === 'All'
                ? 'bg-turquoise-gradient text-white shadow-[0_0_20px_rgba(16,172,132,0.4)]'
                : 'glass text-ink/70 hover:text-ink hover:bg-ink/10'
            }`}
          >
            {t('trips.filter.all')}
          </button>
          
          {filterMode === 'category' ? (
            categories.filter(cat => cat !== 'All').map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveCity('All'); }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-turquoise-gradient text-white shadow-[0_0_20px_rgba(16,172,132,0.4)]'
                    : 'glass text-ink/70 hover:text-ink hover:bg-ink/10'
                }`}
              >
                {t(`trips.filter.${cat.toLowerCase()}`) || cat}
              </button>
            ))
          ) : (
            cities.map((city) => (
              <button
                key={city}
                onClick={() => { setActiveCity(city); setActiveCategory('All'); }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCity === city
                    ? 'bg-turquoise-gradient text-white shadow-[0_0_20px_rgba(16,172,132,0.4)]'
                    : 'glass text-ink/70 hover:text-ink hover:bg-ink/10'
                }`}
              >
                {city}
              </button>
            ))
          )}
        </div>

        {/* Trips Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
          {filteredTrips.map((trip) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badges & Wishlist */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {trip.hot && (
                      <span className="bg-red-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {t('trips.hot')}
                      </span>
                    )}
                    {trip.discount && (
                      <span className="bg-gold/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        -{trip.discount}%
                      </span>
                    )}
                  </div>
                  
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

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 glass px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                    <span className="text-ink text-sm font-medium">{trip.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 right-3">
                    <div className="glass-strong px-3 py-2 rounded-xl flex flex-col items-end">
                      <span className="text-ink/60 text-[10px] uppercase font-semibold tracking-wider mb-0.5">{t('trips.startingFrom')}</span>
                      <div>
                        <span className="text-gold font-bold text-lg">{formatPrice(trip.price)}</span>
                        <span className="text-ink/70 text-xs ml-1">/person</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-ink font-semibold text-lg mb-2 group-hover:text-gold transition-colors line-clamp-1">
                    {trip.title}
                  </h3>
                  <p className="text-ink/60 text-sm mb-3 line-clamp-2">{trip.description}</p>

                  <div className="flex items-center gap-4 text-ink/70 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{trip.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-ink/70 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        {t('trips.available')}
                      </span>
                      <span className="text-ink/70 text-[10px] mt-0.5">{trip.reviews}+ {t('trips.verified')}</span>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedTrip(trip.id);
                        setIsWhatsAppOpen(true);
                      }}
                      className="bg-[#128C7E]/20 hover:bg-[#128C7E] text-[#128C7E] hover:text-white border border-[#128C7E]/30 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                    >
                      {t('trips.book')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
