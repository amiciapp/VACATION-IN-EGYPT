import { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { ChevronRight, MapPin, Waves, Sun, Moon, CloudRain, Cloud, Wind, DollarSign, Euro, Sparkles, Compass, Star } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const { t, weather, formatPrice } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<{ usd: string | null; eur: string | null }>({ usd: null, eur: null });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate tracker for 3D tilt & dynamic light beacon
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y, normX, normY });
  };

  useEffect(() => {
    setIsVisible(true);
    fetch('https://open.er-api.com/v6/latest/EUR')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates && data.rates.EGP) {
          setExchangeRates({
            eur: data.rates.EGP.toFixed(2),
            usd: (data.rates.EGP / data.rates.USD).toFixed(2),
          });
        }
      })
      .catch((err) => console.error('Failed to fetch EGP rate', err));
  }, []);

  const [sloganIndex, setSloganIndex] = useState(0);

  const slogans = useMemo(() => [
    t('hero.title'),
    t('hero.slogan2'),
    t('hero.slogan3'),
    t('hero.slogan4'),
  ], [t]);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, slogans.length]);

  const scrollToTrips = () => {
    document.getElementById('trips')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlanner = () => {
    document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a1b38] via-[#07132a] to-[#0c1f42] flex flex-col justify-between"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic 3D Cursor Spotlight Beacon */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245,158,11,0.12), rgba(6,182,212,0.08) 40%, transparent 80%)`,
        }}
      />

      {/* Cinematic Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 scale-105"
        style={{ y: yParallax, opacity: opacityParallax }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#0a1b38] via-[#07132a] to-[#0c1f42]" aria-hidden="true">
          {/* Volumetric Glowing Light Shafts & Radiant Aura Orbs */}
          <div className="absolute top-1/4 -left-20 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-400/30 via-teal-300/15 to-transparent rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
          <div className="absolute top-1/3 right-0 w-[750px] h-[750px] bg-gradient-to-bl from-amber-400/25 via-yellow-300/15 to-transparent rounded-full blur-[150px] pointer-events-none animate-float-slow" />
          <div className="absolute -bottom-20 left-1/3 w-[550px] h-[550px] bg-sky-400/20 rounded-full blur-[130px] pointer-events-none" />
          
          <div className="absolute inset-0 animate-ken-burns">
            <div 
              className="absolute inset-0 bg-cover bg-center -z-10 transition-opacity duration-1000 bg-[url('/images/hero.webp')] opacity-80 brightness-105"
            />
          </div>

          {/* Luxury Multi-layer Radiant Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07132a]/75 via-[#07132a]/30 to-[#07132a]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07132a]/80 via-[#07132a]/30 to-transparent" />
          
          {/* Subtle grid line overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>
      </motion.div>
 
      {/* Main Content Grid */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center pt-32 pb-16 section-padding">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Controls (7 cols) */}
          <div className="lg:col-span-7">
            
            {/* 3D Location & Agency Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 border border-amber-400/40 bg-gradient-to-r from-amber-500/20 via-slate-900/60 to-cyan-950/40 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.3)] group cursor-pointer hover:border-amber-400/70 transition-all duration-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
              </span>
              <MapPin className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm text-white font-semibold tracking-wide">
                Hurghada &amp; Red Sea Riviera · Egypt
              </span>
              <span className="w-px h-3.5 bg-white/20 hidden sm:inline" />
              <span className="text-[11px] text-amber-200 font-bold uppercase tracking-wider hidden sm:flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-amber-400" />
                Rated 4.9/5
              </span>
            </motion.div>
   
            {/* Main Headline with Animated Gilded Slogans */}
            <div className="relative mb-6 min-h-[95px] sm:min-h-[120px] md:min-h-[145px] lg:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={sloganIndex}
                  initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl text-balance max-w-2xl font-sans"
                >
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 25%, #FDE68A 55%, #F59E0B 85%, #D97706 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 35px rgba(245,158,11,0.4))',
                    }}
                  >
                    {slogans[sloganIndex]}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed font-normal"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Luxury Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {/* Primary Explore CTA with golden shimmer aura */}
              <motion.button
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToTrips}
                className="relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FCD34D] text-slate-950 font-black text-base shadow-[0_12px_40px_rgba(245,158,11,0.5)] transition-all duration-300 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <Compass className="w-5 h-5 text-slate-950 animate-spin-slow" />
                <span>{t('hero.cta.explore')}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.button>

              {/* Secondary AI Plan CTA */}
              <motion.button
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToPlanner}
                className="px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/30 text-white font-bold text-base shadow-lg hover:border-amber-400/60 transition-all duration-300 flex items-center gap-2.5"
              >
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>{t('hero.cta.plan')}</span>
              </motion.button>
            </motion.div>

            {/* 3D Glass Command Hub (Weather & Currency) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex flex-wrap items-center gap-5 sm:gap-7 px-5 sm:px-7 py-4 rounded-3xl w-fit backdrop-blur-2xl bg-slate-900/60 border border-white/25 hover:border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden group cursor-pointer transition-all duration-500"
            >
              {/* Ambient Inner Shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:animate-sweep pointer-events-none" />

              {/* Air Temp & Dynamic Icon */}
              <div className="flex items-center gap-3 relative z-10">
                {(() => {
                  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
                  const cond = weather.condition.toLowerCase();
                  if (cond.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-400 animate-bounce drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />;
                  if (cond.includes('wind')) return <Wind className="w-8 h-8 text-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />;
                  if (cond.includes('cloud')) return <Cloud className="w-8 h-8 text-slate-300 animate-float drop-shadow-[0_0_10px_rgba(209,213,219,0.8)]" />;
                  
                  return isDay ? (
                    <Sun className="w-8 h-8 text-amber-400 animate-[spin_12s_linear_infinite] drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]" />
                  ) : (
                    <Moon className="w-8 h-8 text-cyan-200 animate-pulse drop-shadow-[0_0_15px_rgba(191,219,254,0.9)]" />
                  );
                })()}
                <div className="flex flex-col">
                  <span className="text-white font-extrabold text-xl tracking-tight leading-none drop-shadow-md">{weather.temp}°C</span>
                  <span className="text-amber-300 text-[11px] font-bold uppercase tracking-wider mt-1">{weather.condition} Air</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/20 relative z-10" />

              {/* Sea Temp */}
              <div className="flex items-center gap-3 relative z-10">
                <Waves className="w-8 h-8 text-cyan-300 animate-pulse-glow drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                <div className="flex flex-col">
                  <span className="text-white font-extrabold text-xl tracking-tight leading-none drop-shadow-md">{weather.seaTemp}°C</span>
                  <span className="text-cyan-300 text-[11px] font-bold uppercase tracking-wider mt-1">Sea Temp</span>
                </div>
              </div>

              {exchangeRates.eur && (
                <>
                  <div className="hidden md:block w-px h-8 bg-white/20 relative z-10" />
                  {/* Exchange Rates */}
                  <div className="hidden md:flex items-center gap-3 relative z-10">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1">
                        <Euro className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-white font-bold text-xs tracking-tight">{exchangeRates.eur} <span className="text-[10px] text-slate-300 font-normal">EGP</span></span>
                      </div>
                      {exchangeRates.usd && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-white font-bold text-xs tracking-tight">{exchangeRates.usd} <span className="text-[10px] text-slate-300 font-normal">EGP</span></span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column: 2 Luxury 3D Video Experience Cards with Tilt */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              transform: `rotateY(${mousePos.normX * -6}deg) rotateX(${mousePos.normY * 6}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {/* Card 1: Red Sea & Yacht Video Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTrips}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] p-5 flex flex-col justify-between border border-cyan-400/40 hover:border-cyan-300 shadow-[0_20px_50px_rgba(6,182,212,0.25)] hover:shadow-[0_25px_70px_rgba(6,182,212,0.5)] cursor-pointer transition-all duration-500 bg-slate-900/40"
            >
              {/* Autoplaying Seamless Loop Video */}
              <video
                src="/videos/vacation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-105"
              />
              
              {/* Rich Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07132a]/90 via-[#07132a]/20 to-transparent group-hover:via-transparent transition-all duration-500" />
              
              {/* Top Live Badge */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest text-cyan-200 bg-cyan-950/80 backdrop-blur-md border border-cyan-400/50 shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Red Sea Live
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">Luxury Diving &amp; Mega Yachts</span>
                <h4 className="text-lg font-black text-white mb-1 group-hover:text-cyan-200 transition-colors drop-shadow-md">Hurghada Reefs</h4>
                <div className="flex items-center justify-between pt-1 border-t border-white/15">
                  <span className="text-xs text-white/80">From <strong className="text-white text-sm font-black">{formatPrice(65)}</strong></span>
                  <div className="w-7 h-7 rounded-full bg-cyan-500/30 border border-cyan-400/50 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4 text-cyan-200 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Pharaonic Heritage & Pyramids Video Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTrips}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] p-5 flex flex-col justify-between border border-amber-400/50 hover:border-amber-300 shadow-[0_20px_50px_rgba(245,158,11,0.25)] hover:shadow-[0_25px_70px_rgba(245,158,11,0.5)] cursor-pointer transition-all duration-500 bg-slate-900/40"
            >
              {/* Autoplaying Seamless Loop Video */}
              <video
                src="/videos/2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-105"
              />
              
              {/* Rich Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07132a]/90 via-[#07132a]/20 to-transparent group-hover:via-transparent transition-all duration-500" />
              
              {/* Top Live Badge */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest text-amber-200 bg-amber-950/80 backdrop-blur-md border border-amber-400/50 shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  VIP Access
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Private Egyptologist Tours</span>
                <h4 className="text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-md">Giza &amp; Luxor Temples</h4>
                <div className="flex items-center justify-between pt-1 border-t border-white/15">
                  <span className="text-xs text-white/80">From <strong className="text-white text-sm font-black">{formatPrice(85)}</strong></span>
                  <div className="w-7 h-7 rounded-full bg-amber-500/30 border border-amber-400/50 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4 text-amber-200 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Luxury Animated Scroll Indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <button 
          onClick={scrollToTrips}
          aria-label="Scroll to trips"
          className="group flex flex-col items-center gap-2 text-white/50 hover:text-gold transition-colors"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/60 group-hover:text-gold transition-colors">Explore Experiences</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 group-hover:border-gold/60 flex justify-center pt-1.5 transition-colors">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 bg-gold rounded-full" 
            />
          </div>
        </button>
      </div>
    </section>
  );
}
