import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { vipPackages, type VIPPackage } from '@/data/packages';
import { whatsappNumbers } from '@/data/trips';
import {
  Crown,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  Hotel,
  ShieldCheck,
  ChevronRight,
  Phone,
  Star,
  X,
  Compass,
  Layers
} from 'lucide-react';

export default function VIPPackages() {
  const { formatPrice } = useApp();
  const [selectedPackage, setSelectedPackage] = useState<VIPPackage | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  const handleWhatsAppBooking = (pkg: VIPPackage) => {
    const rawNumber = whatsappNumbers[0] || '+201068800999';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello VIP Concierge! ✨\n\nI am interested in reserving the signature multi-day package:\n*${pkg.title}* (${pkg.duration}).\n\nPlease provide me with current VIP availability, private flight details, and luxury accommodation options for my travel dates.\n\nThank you!`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="vip-packages" className="relative py-28 lg:py-36 overflow-hidden bg-[#030712]">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(217,119,6,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-amber-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-400/40 text-amber-300 font-bold text-xs tracking-[0.25em] uppercase mb-4 shadow-lg shadow-amber-500/10 backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Private Grand Vacations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Multi-Day <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">VIP Signature</span> Packages
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            All-inclusive private journeys curated for discerning travelers. Complete with private business-class domestic flights, historic 5★ luxury palace suites, boutique Dahabiya Nile sailing, and your own dedicated Egyptologist.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {vipPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 transition-all duration-500 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between"
            >
              {/* Image & Header Banner */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg backdrop-blur-md">
                    {pkg.badge}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 text-white text-xs font-bold backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating}</span>
                    <span className="text-slate-400 font-normal">({pkg.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Duration & Nights Pill */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700 text-slate-300 text-xs font-semibold backdrop-blur-md">
                    All-Inclusive Private VIP
                  </div>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-amber-400/80 text-xs font-medium mt-1">
                    {pkg.arabicTitle}
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {pkg.tagline}
                  </p>

                  {/* Route Flow */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <div className="text-[10px] text-amber-400/80 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-amber-400" />
                      <span>Curated Route Journey</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {pkg.destinations.map((dest, i) => (
                        <React.Fragment key={dest}>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-200 text-xs font-medium border border-slate-700/60">
                            {dest}
                          </span>
                          {i < pkg.destinations.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5 text-amber-400/50" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Curated Highlights */}
                  <div className="mt-5 space-y-2">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                      Key Package Privileges
                    </div>
                    {pkg.highlights.slice(0, 3).map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Haute-Luxe Price & Action Suite */}
                <div className="mt-8 pt-5 border-t border-slate-800/80 space-y-4">
                  {/* Investment & Savings Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                        Investment Per Guest
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 bg-clip-text text-transparent tracking-tight">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">/ private guest</span>
                      </div>
                    </div>

                    {pkg.originalPrice && (
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[11px] font-bold">
                          Save {formatPrice(pkg.originalPrice - pkg.price)}
                        </span>
                        <span className="text-[11px] text-slate-500 line-through mt-0.5 block">
                          Was {formatPrice(pkg.originalPrice)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dual Action Suite (Balanced & Luxurious) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setActiveDayIndex(0);
                      }}
                      className="py-3 px-4 rounded-xl bg-slate-950 hover:bg-amber-500/10 text-slate-200 hover:text-amber-300 text-xs font-bold tracking-wider uppercase transition-all duration-300 border border-slate-800 hover:border-amber-400/50 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400 group-hover/btn:scale-110 transition-transform" />
                      <span>View Itinerary</span>
                    </button>

                    <button
                      onClick={() => handleWhatsAppBooking(pkg)}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 border border-emerald-400/30 hover:border-emerald-300 cursor-pointer group/btn"
                    >
                      <Phone className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                      <span>Reserve on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DAY-BY-DAY ITINERARY MODAL / DRAWER ── */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-amber-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <img src="/logo.jpg" alt="VACATION IN EGYPT" className="h-7 w-auto object-contain rounded-md" />
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Crown className="w-3.5 h-3.5" />
                    <span>VIP Signature Master Itinerary</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {selectedPackage.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  {selectedPackage.duration} • Complete All-Inclusive Private Tour
                </p>
              </div>

              {/* Modal Body: Two-Column Layout on Desktop */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Days Selector */}
                <div className="lg:col-span-5 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Day-by-Day Journey Schedule
                  </div>
                  {selectedPackage.dayByDay.map((day, idx) => (
                    <button
                      key={day.day}
                      onClick={() => setActiveDayIndex(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between cursor-pointer border ${
                        activeDayIndex === idx
                          ? 'bg-amber-500/15 border-amber-400/50 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                            activeDayIndex === idx
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {day.day}
                        </span>
                        <div>
                          <div className="text-xs font-bold leading-snug">
                            {day.title}
                          </div>
                          <div className="text-[10px] text-amber-400/70 font-medium mt-0.5">
                            {day.location}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          activeDayIndex === idx ? 'text-amber-400 translate-x-1' : 'text-slate-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Right Column: Active Day Details & Inclusions */}
                <div className="lg:col-span-7 space-y-6">
                  {selectedPackage.dayByDay[activeDayIndex] && (
                    <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-black uppercase tracking-wider">
                          Day {selectedPackage.dayByDay[activeDayIndex].day} Details
                        </span>
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          {selectedPackage.dayByDay[activeDayIndex].location}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-white mt-3">
                        {selectedPackage.dayByDay[activeDayIndex].title}
                      </h4>

                      <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                        {selectedPackage.dayByDay[activeDayIndex].description}
                      </p>

                      {/* Day Activities */}
                      <div className="mt-4 pt-4 border-t border-slate-800">
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                          Scheduled Private Highlights
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedPackage.dayByDay[activeDayIndex].activities.map((act, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Accommodation & Meals */}
                      <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Hotel className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Luxury Stay</span>
                            <span className="font-semibold">{selectedPackage.dayByDay[activeDayIndex].accommodation}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Included Dining</span>
                            <span className="font-semibold">{selectedPackage.dayByDay[activeDayIndex].meals}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* All Inclusions Card */}
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                    <div className="text-xs font-black text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      <span>Complimentary VIP Package Privileges</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedPackage.included.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                    Total Investment Per Guest
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 bg-clip-text text-transparent tracking-tight">
                      {formatPrice(selectedPackage.price)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ private guest</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPackage(null)}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-slate-800"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleWhatsAppBooking(selectedPackage)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/40 border border-emerald-400/30 hover:border-emerald-300 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
