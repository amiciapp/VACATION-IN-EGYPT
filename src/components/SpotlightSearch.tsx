import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  MapPin, 
  Clock, 
  Star, 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal,
  Compass,
  Landmark,
  Waves,
  Palmtree,
  Ship
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { trips, cities } from '@/data/trips';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, typeof Waves> = {
  Sea: Waves,
  Historical: Landmark,
  Adventure: Compass,
  Cruise: Ship,
  Relaxation: Palmtree,
};

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice] = useState<number>(800);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus on input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedCity('All');
      setSelectedCategory('All');
    }
  }, [isOpen]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered trips
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesQuery =
        query === '' ||
        trip.title.toLowerCase().includes(query.toLowerCase()) ||
        trip.description.toLowerCase().includes(query.toLowerCase()) ||
        trip.location.toLowerCase().includes(query.toLowerCase()) ||
        trip.category.toLowerCase().includes(query.toLowerCase()) ||
        trip.highlights.some(h => h.toLowerCase().includes(query.toLowerCase()));

      const matchesCity =
        selectedCity === 'All' ||
        trip.location.toLowerCase() === selectedCity.toLowerCase();

      const matchesCategory =
        selectedCategory === 'All' ||
        trip.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesPrice = trip.price <= maxPrice;

      return matchesQuery && matchesCity && matchesCategory && matchesPrice;
    });
  }, [query, selectedCity, selectedCategory, maxPrice]);

  // Handle arrow key navigation
  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTrips.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTrips.length) % Math.max(1, filteredTrips.length));
    } else if (e.key === 'Enter' && filteredTrips.length > 0) {
      e.preventDefault();
      const targetTrip = filteredTrips[selectedIndex] || filteredTrips[0];
      navigate(`/trip/${targetTrip.id}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:p-12 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl bg-[#090d1a] border border-amber-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10 my-auto"
            onKeyDown={handleKeyNav}
          >
            {/* Top Amber Shimmer */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            {/* Search Input Bar */}
            <div className="relative flex items-center px-5 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search 50+ luxury tours, cities, diving, hot air balloon, Nile cruises..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none font-medium pr-10"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10 mr-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-400 font-mono flex-shrink-0">
                <kbd>ESC</kbd>
              </div>
            </div>

            {/* Filter Tags Bar */}
            <div className="px-5 py-3 bg-[#060913]/90 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-amber-400" /> City:
              </span>
              {['All', ...cities].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedCity(c);
                    setSelectedIndex(0);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedCity === c
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="px-5 py-2.5 bg-[#060913]/60 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-1">
                Category:
              </span>
              {['All', 'Historical', 'Sea', 'Adventure', 'Cruise', 'Relaxation'].map((cat) => {
                const Icon = categoryIcons[cat] || Sparkles;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedIndex(0);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      selectedCategory === cat
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Results List */}
            <div className="max-h-[55vh] overflow-y-auto p-3 sm:p-4 space-y-2 divide-y divide-white/5">
              {filteredTrips.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-3">
                    <Compass className="w-6 h-6 animate-spin-slow" />
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">No Experiences Found</h4>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto">
                    Try searching for "Luxor", "Yacht", "Pyramids", or reset your city filters.
                  </p>
                  <button
                    onClick={() => {
                      setQuery('');
                      setSelectedCity('All');
                      setSelectedCategory('All');
                    }}
                    className="mt-4 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold hover:bg-amber-400/30 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredTrips.map((trip, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <Link
                      key={trip.id}
                      to={`/trip/${trip.id}`}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`block rounded-2xl p-3 sm:p-3.5 transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500/15 via-white/5 to-cyan-500/10 border border-amber-400/40 shadow-lg'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/10">
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {trip.hot && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-500 text-[9px] font-bold text-slate-950 uppercase">
                              HOT
                            </span>
                          )}
                        </div>

                        {/* Trip Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-0.5">
                            <span className="text-amber-400 font-semibold flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {trip.location}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" /> {trip.duration}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {trip.rating} ({trip.reviews})
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-white leading-snug truncate">
                            {trip.title}
                          </h4>

                          <p className="text-xs text-slate-300 line-clamp-1 mt-0.5 font-normal">
                            {trip.description}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="text-right flex-shrink-0 pl-2">
                          <div className="text-xs text-slate-400 font-medium">From</div>
                          <div className="text-base sm:text-lg font-black text-amber-400">
                            €{trip.price}
                          </div>
                          <div className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-semibold mt-1">
                            <span>View</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Tip */}
            <div className="px-5 py-3 bg-[#060913] border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">{filteredTrips.length}</span>
                <span>experiences matched</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="hidden sm:inline">Use</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">↓</kbd>
                <span className="hidden sm:inline">to navigate,</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">ENTER</kbd>
                <span className="hidden sm:inline">to select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SpotlightSearch;
