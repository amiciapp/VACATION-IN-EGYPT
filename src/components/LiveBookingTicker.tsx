import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router';

interface BookingActivity {
  id: string;
  traveler: string;
  location: string;
  flag: string;
  tripTitle: string;
  tripSlug: string;
  price: string;
  timeAgo: string;
  type: 'booking' | 'vip_inquiry' | 'exclusive_slot';
}

const bookingQueue: BookingActivity[] = [
  {
    id: 'b-1',
    traveler: 'Maximilian & Sophie',
    location: 'Munich, Germany',
    flag: '🇩🇪',
    tripTitle: 'Luxor East & West Bank: 2-Day Tour',
    tripSlug: 'luxor-east-west-bank-2-day-tour-hurghada',
    price: '€165',
    timeAgo: '14 min ago',
    type: 'booking',
  },
  {
    id: 'b-2',
    traveler: 'Sheikh Hamdan & Family',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    tripTitle: 'Pirates Yacht VIP Sunset Charter',
    tripSlug: 'pirates-yacht-orange-bay-hurghada',
    price: '€75',
    timeAgo: '28 min ago',
    type: 'vip_inquiry',
  },
  {
    id: 'b-3',
    traveler: 'Arthur & Charlotte',
    location: 'London, UK',
    flag: '🇬🇧',
    tripTitle: 'Abu Simbel Day Trip by Plane',
    tripSlug: 'abu-simbel-day-trip-plane-cairo',
    price: '€375',
    timeAgo: '42 min ago',
    type: 'booking',
  },
  {
    id: 'b-4',
    traveler: 'Jean-Luc & Élodie',
    location: 'Paris, France',
    flag: '🇫🇷',
    tripTitle: 'Hot Air Balloon Sunrise over Luxor',
    tripSlug: 'hot-air-balloon-ride-luxor-sunrise',
    price: '€75',
    timeAgo: '55 min ago',
    type: 'exclusive_slot',
  },
  {
    id: 'b-5',
    traveler: 'Lukas & Elena',
    location: 'Zurich, Switzerland',
    flag: '🇨🇭',
    tripTitle: 'Dolphin House Snorkeling Trip',
    tripSlug: 'dolphin-house-snorkeling-trip-hurghada',
    price: '€45',
    timeAgo: '1 hour ago',
    type: 'booking',
  },
  {
    id: 'b-6',
    traveler: 'Matteo & Giulia',
    location: 'Milan, Italy',
    flag: '🇮🇹',
    tripTitle: 'Cairo & Pyramids Day Trip from Hurghada',
    tripSlug: 'cairo-private-day-trip-from-hurghada',
    price: '€120',
    timeAgo: '2 hours ago',
    type: 'booking',
  },
];

export const LiveBookingTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Initial delay before first popup
    const initialTimer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 4500);

    // Periodic rotation
    const interval = setInterval(() => {
      if (isDismissed) return;
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bookingQueue.length);
        setIsVisible(true);
      }, 1200);
    }, 11000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = bookingQueue[currentIndex];

  return (
    <aside aria-label="Recent verified bookings" className="fixed bottom-24 left-4 sm:left-6 z-40 max-w-[340px] sm:max-w-[380px] pointer-events-auto">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="relative overflow-hidden rounded-2xl bg-[#0a0f1d]/95 backdrop-blur-xl border border-amber-500/30 p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-amber-400/60 transition-colors duration-300"
          >
            {/* Top Amber Shimmer */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Dismiss booking notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3">
              {/* Flag / Avatar Badge */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-teal-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-inner">
                  {current.flag}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0a0f1d] flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 mb-0.5">
                  <Sparkles className="w-3 h-3 text-amber-400 animate-spin-slow" />
                  <span>Verified Reservation</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 flex items-center gap-1 font-normal">
                    <Clock className="w-2.5 h-2.5" /> {current.timeAgo}
                  </span>
                </div>

                <p className="text-xs text-white/90 font-medium leading-tight truncate">
                  <span className="font-bold text-white">{current.traveler}</span>
                  <span className="text-slate-400 text-[11px]"> ({current.location})</span>
                </p>

                <Link
                  to={`/trip/${current.tripSlug}`}
                  className="block mt-1 text-[11px] sm:text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors line-clamp-1 group/link"
                >
                  {current.tripTitle}
                  <span className="inline-block ml-1 text-amber-400 font-bold">({current.price})</span>
                </Link>

                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-emerald-400/90 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Instant Confirmation • Best Rate Guaranteed</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default LiveBookingTicker;
