import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Compass, Clock, ArrowRight, MapPin, Star, Anchor, Sun } from 'lucide-react';
import { Link } from 'react-router';
import { trips } from '@/data/trips';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
interface MapCity {
  id: string;
  name: string;
  arabicName: string;
  x: number;
  y: number;
  description: string;
  highlights: string[];
  badge: string;
  badgeIcon: React.ReactNode;
  image: string;
  travelTime?: string;
  type: 'heritage' | 'coastal' | 'hub';
}

const mapCities: MapCity[] = [
  {
    id: 'alexandria',
    name: 'Alexandria',
    arabicName: 'الإسكندرية',
    x: 28, y: 18,
    description: 'Pearl of the Mediterranean — ancient citadel, legendary library & Corniche sunsets.',
    highlights: ['Citadel of Qaitbay', 'Bibliotheca Alexandrina', 'Stanley Beach'],
    badge: 'Mediterranean Coast',
    badgeIcon: <Anchor className="w-3 h-3" />,
    image: '/images/bibliotheca-alexandrina.jpg',
    travelTime: 'Flight via Cairo',
    type: 'coastal',
  },
  {
    id: 'cairo',
    name: 'Cairo & Giza',
    arabicName: 'القاهرة والجيزة',
    x: 35, y: 30,
    description: 'The Last Wonder of the Ancient World — the Great Pyramids, Sphinx & Grand Egyptian Museum.',
    highlights: ['Great Pyramids', 'Grand Egyptian Museum', 'Khan El Khalili'],
    badge: 'Pyramids & GEM',
    badgeIcon: <Sun className="w-3 h-3" />,
    image: '/images/pyramids.jpg',
    travelTime: '50m Flight · 5h VIP Coach',
    type: 'heritage',
  },
  {
    id: 'hurghada',
    name: 'Hurghada',
    arabicName: 'الغردقة',
    x: 64, y: 50,
    description: 'Red Sea Riviera HQ — private yachts, Orange Bay & vibrant coral reef diving.',
    highlights: ['Orange Bay', 'Private Yachts', 'Coral Diving'],
    badge: 'Red Sea HQ',
    badgeIcon: <Anchor className="w-3 h-3" />,
    image: '/images/hero-redsea.jpg',
    travelTime: 'Direct Hub',
    type: 'hub',
  },
  {
    id: 'sharm-el-sheikh',
    name: 'Sharm El Sheikh',
    arabicName: 'شرم الشيخ',
    x: 75, y: 40,
    description: 'Ras Mohammed National Park, Tiran Straits & world-class dive sites.',
    highlights: ['Ras Mohammed NP', 'Straits of Tiran', 'Blue Hole Dive'],
    badge: 'Sinai Diving Hub',
    badgeIcon: <Anchor className="w-3 h-3" />,
    image: '/images/scuba-diving.jpg',
    travelTime: 'Ferry · Short Flight',
    type: 'coastal',
  },
  {
    id: 'luxor',
    name: 'Luxor',
    arabicName: 'الأقصر',
    x: 53, y: 70,
    description: "World's Greatest Open-Air Museum — Valley of Kings, Karnak & hot-air balloon dawns.",
    highlights: ['Valley of the Kings', 'Karnak Temple', 'Sunrise Ballooning'],
    badge: 'Open-Air Museum',
    badgeIcon: <Sun className="w-3 h-3" />,
    image: '/images/luxor-temple.jpg',
    travelTime: '3.5h VIP Transfer',
    type: 'heritage',
  },
  {
    id: 'aswan',
    name: 'Aswan',
    arabicName: 'أسوان',
    x: 56, y: 88,
    description: 'Philae Temple, Nubian villages & gateway to the awe-inspiring Abu Simbel.',
    highlights: ['Philae Temple', 'Nubian Villages', 'Abu Simbel'],
    badge: 'Nile Cruise Gateway',
    badgeIcon: <Anchor className="w-3 h-3" />,
    image: '/images/nile-cruise.jpg',
    travelTime: 'Scenic Nile Cruise',
    type: 'heritage',
  },
];

const routes = [
  { from: 'hurghada', to: 'cairo',           color: '#f59e0b', dashed: true  },
  { from: 'hurghada', to: 'luxor',           color: '#f59e0b', dashed: true  },
  { from: 'hurghada', to: 'sharm-el-sheikh', color: '#22d3ee', dashed: true  },
  { from: 'luxor',    to: 'aswan',           color: '#38bdf8', dashed: false },
  { from: 'cairo',    to: 'alexandria',      color: '#a78bfa', dashed: true  },
];

const PIN_COLORS = {
  heritage: {
    dot: '#f59e0b',
    glow: 'rgba(245,158,11,0.6)',
    labelBg: 'rgba(245,158,11,0.12)',
    labelBorder: 'rgba(245,158,11,0.35)',
    labelText: '#fcd34d',
  },
  coastal: {
    dot: '#22d3ee',
    glow: 'rgba(34,211,238,0.6)',
    labelBg: 'rgba(34,211,238,0.12)',
    labelBorder: 'rgba(34,211,238,0.35)',
    labelText: '#67e8f9',
  },
  hub: {
    dot: '#f43f5e',
    glow: 'rgba(244,63,94,0.7)',
    labelBg: 'rgba(244,63,94,0.12)',
    labelBorder: 'rgba(244,63,94,0.35)',
    labelText: '#fda4af',
  },
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
interface EgyptMapProps {
  onSelectCity?: (city: string) => void;
  selectedCity?: string;
}

export const EgyptMap: React.FC<EgyptMapProps> = ({ onSelectCity, selectedCity }) => {
  const [hoveredCity, setHoveredCity] = useState<MapCity | null>(null);
  const [activeCity, setActiveCity]   = useState<MapCity | null>(() => {
    // Initialise from external selectedCity prop if provided
    if (!selectedCity) return null;
    return mapCities.find(c =>
      c.name.toLowerCase() === selectedCity.toLowerCase() ||
      (c.id === 'cairo' && selectedCity.toLowerCase() === 'cairo')
    ) ?? null;
  });
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const getCityTourCount = (cityId: string) => {
    const city = mapCities.find(c => c.id === cityId);
    if (!city) return 0;
    return trips.filter(t =>
      t.location.toLowerCase() === city.name.toLowerCase() ||
      (cityId === 'cairo' && t.location.toLowerCase() === 'cairo')
    ).length;
  };

  const getCityPos = (id: string) => mapCities.find(c => c.id === id);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveCity(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayCity = activeCity ?? hoveredCity;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
      style={{ background: 'linear-gradient(145deg, #04080f 0%, #070d1a 50%, #030608 100%)' }}
    >
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-amber-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-2/3 h-60 bg-cyan-900/20 blur-3xl rounded-full" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-white/[0.06]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: '#fcd34d' }}
          >
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
            <span>Interactive Egypt Cartography</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-black tracking-tight text-white"
          >
            Explore Egypt By{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Destination
            </span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-md"
          >
            Click any landmark to reveal curated VIP itineraries, private transfers & exclusive experiences.
          </motion.p>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium"
        >
          {[
            { color: '#f59e0b', label: 'Heritage & Temples' },
            { color: '#22d3ee', label: 'Coastal & Sea'      },
            { color: '#f43f5e', label: 'Operations Hub'     },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-300">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: color, boxShadow: `0 0 8px ${color}` }}
              />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Map Canvas ── */}
      <div className="relative px-4 sm:px-8 pb-6 sm:pb-8 pt-4">
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-white/[0.05]"
          style={{
            aspectRatio: '16 / 9',
            background: 'linear-gradient(160deg, #060d1e 0%, #081325 60%, #040a18 100%)',
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Scan-line texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
              backgroundSize: '100% 3px',
            }}
          />

          {/* ── SVG Cartographic Layer ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="nileGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%"   stopColor="#0369a1" stopOpacity="0.9" />
                <stop offset="60%"  stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>
              <filter id="mapGlow">
                <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <style>{`
                @keyframes dashFlow { to { stroke-dashoffset: -20; } }
                .route-flow { animation: dashFlow 2.5s linear infinite; }
              `}</style>
            </defs>

            {/* Egypt border outline */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.18 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              d="M 20,12 L 62,12 L 70,22 L 80,26 L 82,38 L 76,44 L 80,60 L 78,82 L 70,96 L 56,96 L 52,88 L 46,74 L 38,50 L 28,38 L 20,32 Z"
              fill="rgba(245,158,11,0.04)"
              stroke="#d97706"
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
            {/* Sinai Peninsula */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.18 }}
              transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
              d="M 70,22 L 80,26 L 82,38 L 76,44 L 68,38 L 65,28 Z"
              fill="rgba(245,158,11,0.03)"
              stroke="#d97706"
              strokeWidth="0.6"
            />

            {/* Nile River */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.4 }}
              d="M 56,88 Q 54,78 53,70 T 48,50 Q 42,38 38,32 Q 32,24 28,18"
              fill="none"
              stroke="url(#nileGrad)"
              strokeWidth="1.4"
              strokeLinecap="round"
              filter="url(#mapGlow)"
            />

            {/* Red Sea coastline */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
              d="M 70,22 Q 76,32 74,44 T 66,52 Q 64,62 70,74 T 80,96"
              fill="none"
              stroke="url(#seaGrad)"
              strokeWidth="1.8"
              strokeDasharray="3 2"
              filter="url(#mapGlow)"
            />

            {/* Route Lines */}
            {routes.map((route) => {
              const a = getCityPos(route.from);
              const b = getCityPos(route.to);
              if (!a || !b) return null;
              return (
                <motion.line
                  key={`${route.from}-${route.to}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={route.color}
                  strokeWidth="0.7"
                  strokeDasharray={route.dashed ? '2.5 2' : '0'}
                  strokeLinecap="round"
                  opacity={0}
                  className={route.dashed ? 'route-flow' : ''}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  filter="url(#mapGlow)"
                />
              );
            })}
          </svg>

          {/* ── Compass Rose ── */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none select-none" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="relative w-14 h-14 sm:w-16 sm:h-16"
            >
              <div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: 'rgba(245,158,11,0.2)', boxShadow: '0 0 20px rgba(245,158,11,0.08) inset' }}
              />
              <div
                className="absolute inset-2 rounded-full border"
                style={{ borderColor: 'rgba(245,158,11,0.1)' }}
              />
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Compass className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'rgba(245,158,11,0.5)' }} />
              </motion.div>
              {['N','S','W','E'].map((dir, i) => (
                <span
                  key={dir}
                  className="absolute text-[8px] font-mono font-bold"
                  style={{
                    color: dir === 'N' ? '#fcd34d' : 'rgba(245,158,11,0.4)',
                    top:    i === 0 ? '2px'   : i === 1 ? 'auto' : '50%',
                    bottom: i === 1 ? '2px'   : 'auto',
                    left:   i === 2 ? '2px'   : i === 3 ? 'auto' : '50%',
                    right:  i === 3 ? '2px'   : 'auto',
                    transform: (i === 0 || i === 1) ? 'translateX(-50%)' : 'translateY(-50%)',
                  }}
                >
                  {dir}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Scale Bar ── */}
          <div className="absolute bottom-3 left-4 z-10 pointer-events-none select-none" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col gap-0.5"
            >
              <div className="flex items-center gap-1">
                <div
                  className="w-16 h-[3px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.6) 50%, transparent 50%)', backgroundSize: '8px 100%' }}
                />
                <span className="text-[9px] font-mono" style={{ color: 'rgba(245,158,11,0.5)' }}>500 km</span>
              </div>
              <p className="text-[8px] font-mono" style={{ color: 'rgba(255,255,255,0.18)' }}>Nereus Tours · Egypt</p>
            </motion.div>
          </div>

          {/* ── City Pins ── */}
          {mapCities.map((city, i) => {
            const colors    = PIN_COLORS[city.type];
            const isActive  = activeCity?.id === city.id;
            const isHovered = hoveredCity?.id === city.id;
            const lit       = isActive || isHovered;
            const tourCount = getCityTourCount(city.id);

            return (
              <motion.div
                key={city.id}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => {
                  const newActive = activeCity?.id === city.id ? null : city;
                  setActiveCity(newActive);
                  if (onSelectCity && newActive) onSelectCity(city.id === 'cairo' ? 'Cairo' : city.name);
                }}
                role="button"
                aria-label={`Select ${city.name}`}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && e.currentTarget.click()}
              >
                <div className="relative flex items-center justify-center">
                  {/* Radar ping */}
                  <AnimatePresence>
                    {(lit || city.type === 'hub') && (
                      <motion.div
                        key="ping"
                        initial={{ scale: 0.5, opacity: 0.9 }}
                        animate={{ scale: 3.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: colors.dot, filter: 'blur(1px)' }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Glow halo */}
                  {lit && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 2.8, opacity: 0.18 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: colors.dot }}
                    />
                  )}

                  {/* Pin core */}
                  <motion.div
                    animate={lit ? { scale: 1.35 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#070d1a] z-10 flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, #fff 0%, ${colors.dot} 65%)`,
                      boxShadow: lit
                        ? `0 0 0 2px ${colors.dot}, 0 0 20px ${colors.glow}`
                        : `0 0 10px ${colors.glow}`,
                    }}
                  >
                    {city.type === 'hub' && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1.5 h-1.5 rounded-full bg-white"
                      />
                    )}
                  </motion.div>

                  {/* Name label */}
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-bold pointer-events-none border transition-all duration-200"
                    style={{
                      background: colors.labelBg,
                      borderColor: colors.labelBorder,
                      color: colors.labelText,
                      backdropFilter: 'blur(12px)',
                      opacity: lit ? 1 : 0.75,
                      boxShadow: lit ? `0 0 16px ${colors.glow}` : 'none',
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{city.name}</span>
                      {tourCount > 0 && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>
                          {tourCount}
                        </span>
                      )}
                    </div>
                    <div className="text-[9px] font-normal opacity-60 font-mono mt-0.5" style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
                      {city.arabicName}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* ── City Detail Panel ── */}
          <AnimatePresence mode="wait">
            {displayCity && (
              <motion.div
                key={displayCity.id}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="absolute bottom-4 left-4 z-40"
                style={{ width: 'min(320px, calc(100% - 2rem))', pointerEvents: activeCity ? 'auto' : 'none' }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(7,12,25,0.97) 0%, rgba(10,18,35,0.97) 100%)',
                    border: '1px solid rgba(245,158,11,0.25)',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(245,158,11,0.08) inset',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Image strip */}
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={displayCity.image}
                      alt={displayCity.name}
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(0.72) saturate(1.15)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080f] via-transparent to-transparent" />

                    {/* Badge */}
                    <div
                      className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: 'rgba(0,0,0,0.6)',
                        border: '1px solid rgba(245,158,11,0.4)',
                        color: '#fcd34d',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {displayCity.badgeIcon}
                      {displayCity.badge}
                    </div>

                    {/* Tour count pill */}
                    {getCityTourCount(displayCity.id) > 0 && (
                      <div
                        className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
                        style={{ background: 'rgba(245,158,11,0.92)', color: '#1a0800' }}
                      >
                        <Star className="w-2.5 h-2.5" />
                        {getCityTourCount(displayCity.id)} Tours
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-sm font-black text-white leading-tight">{displayCity.name}</h4>
                        <p
                          className="text-[11px] font-medium mt-0.5"
                          style={{ color: 'rgba(245,158,11,0.7)', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}
                        >
                          {displayCity.arabicName}
                        </p>
                      </div>
                      {displayCity.travelTime && (
                        <div
                          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] whitespace-nowrap flex-shrink-0"
                          style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', color: '#67e8f9' }}
                        >
                          <Clock className="w-2.5 h-2.5" />
                          {displayCity.travelTime}
                        </div>
                      )}
                    </div>

                    <p className="text-[12px] text-slate-300 leading-relaxed mb-3">
                      {displayCity.description}
                    </p>

                    {/* Highlight tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {displayCity.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/city/${displayCity.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-shadow duration-200 group/cta"
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#1a0800',
                        boxShadow: '0 4px 20px rgba(245,158,11,0.35)',
                      }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Explore {displayCity.name} Tours</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty-state hint */}
          {!displayCity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <p
                className="text-[11px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap"
                style={{
                  color: 'rgba(245,158,11,0.45)',
                  border: '1px solid rgba(245,158,11,0.12)',
                  background: 'rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                ✦ Hover or click a destination to explore
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EgyptMap;
