import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { ChevronRight, MapPin, Waves, Sun, Moon, CloudRain, Cloud, Wind, DollarSign, Euro, Sparkles, Compass } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const { t, weather } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<{ usd: string | null; eur: string | null }>({ usd: null, eur: null });

  useEffect(() => {
    setIsVisible(true);
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates && data.rates.EGP) {
          setExchangeRates({
            usd: data.rates.EGP.toFixed(2),
            eur: (data.rates.EGP / data.rates.EUR).toFixed(2),
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
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex flex-col justify-between">
      {/* Cinematic Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 scale-105"
        style={{ y: yParallax, opacity: opacityParallax }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950" aria-hidden="true">
          {/* Subtle Dynamic Ambient Lighting Orbs */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-teal-400/10 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-500/15 via-orange-400/10 to-transparent rounded-full blur-[140px] pointer-events-none animate-float-slow" />
          
          <div className="absolute inset-0 animate-ken-burns">
            <div 
              className="absolute inset-0 bg-cover bg-center -z-10 transition-opacity duration-1000 bg-[url('/images/hero.webp')] opacity-70"
            />
          </div>

          {/* Luxury Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
        </div>
      </motion.div>
 
      {/* Main Content Grid */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center pt-32 pb-16 section-padding">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Controls */}
          <div className="lg:col-span-7">
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6 border border-cyan-400/30 bg-cyan-950/40 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.25)] group cursor-pointer hover:border-cyan-400/60 transition-all duration-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <MapPin className="w-4 h-4 text-cyan-400 group-hover:animate-bounce" />
              <span className="text-xs sm:text-sm text-cyan-100 font-semibold tracking-wide">Hurghada & Red Sea Riviera · Egypt</span>
            </motion.div>
   
            {/* Main Headline with Animated Slogans */}
            <div className="relative mb-6 min-h-[95px] sm:min-h-[120px] md:min-h-[145px] lg:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={sloganIndex}
                  initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl text-balance max-w-2xl"
                >
                  {slogans[sloganIndex]}
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

            {/* Luxury CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {/* Primary Explore CTA with glowing aura */}
              <motion.button
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToTrips}
                className="relative group px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white font-bold text-base shadow-[0_12px_35px_-5px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <Compass className="w-5 h-5 text-white animate-spin-slow" />
                <span>{t('hero.cta.explore')}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.button>

              {/* Secondary AI Plan CTA */}
              <motion.button
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToPlanner}
                className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 text-white font-bold text-base shadow-lg hover:border-cyan-400/50 transition-all duration-300 flex items-center gap-2.5"
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
              className="flex flex-wrap items-center gap-5 sm:gap-7 px-5 sm:px-7 py-4 rounded-3xl w-fit backdrop-blur-2xl bg-slate-900/85 border border-white/15 hover:border-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group cursor-pointer transition-all duration-500"
            >
              {/* Ambient Inner Shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-sweep pointer-events-none" />

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
                  <span className="text-cyan-300 text-[11px] font-bold uppercase tracking-wider mt-1">{weather.condition} Air</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/15 relative z-10" />

              {/* Sea Temp */}
              <div className="flex items-center gap-3 relative z-10">
                <Waves className="w-8 h-8 text-teal-400 animate-pulse-glow drop-shadow-[0_0_10px_rgba(20,184,166,0.7)]" />
                <div className="flex flex-col">
                  <span className="text-white font-extrabold text-xl tracking-tight leading-none drop-shadow-md">{weather.seaTemp}°C</span>
                  <span className="text-teal-300 text-[11px] font-bold uppercase tracking-wider mt-1">Sea Temp</span>
                </div>
              </div>

              {exchangeRates.usd && (
                <div className="hidden md:block w-px h-8 bg-white/15 relative z-10" />
              )}

              {/* Exchange Rates */}
              {exchangeRates.usd && (
                <div className="hidden md:flex items-center gap-3 relative z-10">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-white font-bold text-xs tracking-tight">{exchangeRates.usd} <span className="text-[10px] text-slate-400 font-normal">EGP</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Euro className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-white font-bold text-xs tracking-tight">{exchangeRates.eur} <span className="text-[10px] text-slate-400 font-normal">EGP</span></span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: 2 Luxury Video Experience Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {/* Card 1: Red Sea & Yacht Video Card */}
            <motion.div
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTrips}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] p-5 flex flex-col justify-between border border-cyan-400/30 hover:border-cyan-400/70 shadow-[0_15px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(6,182,212,0.35)] cursor-pointer transition-all duration-500"
            >
              {/* Autoplaying Seamless Loop Video */}
              <video
                src="/videos/vacation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
              />
              
              {/* Rich Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/20 group-hover:via-slate-950/20 transition-all duration-500" />
              
              {/* Top Live Badge */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest text-cyan-200 bg-cyan-950/70 backdrop-blur-md border border-cyan-400/40 shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Red Sea Live
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">Luxury Diving & Mega Yachts</span>
                <h4 className="text-lg font-black text-white mb-1 group-hover:text-cyan-200 transition-colors drop-shadow-md">Hurghada Reefs</h4>
                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <span className="text-xs text-white/70">From <strong className="text-white text-sm font-black">$65</strong></span>
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4 text-cyan-300 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Pharaonic Heritage & Pyramids Video Card */}
            <motion.div
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTrips}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] p-5 flex flex-col justify-between border border-amber-400/30 hover:border-amber-400/70 shadow-[0_15px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.35)] cursor-pointer transition-all duration-500"
            >
              {/* Autoplaying Seamless Loop Video */}
              <video
                src="/videos/2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
              />
              
              {/* Rich Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/20 group-hover:via-slate-950/20 transition-all duration-500" />
              
              {/* Top Live Badge */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest text-amber-200 bg-amber-950/70 backdrop-blur-md border border-amber-400/40 shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  VIP Access
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Private Egyptologist Tours</span>
                <h4 className="text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-md">Giza & Luxor Temples</h4>
                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <span className="text-xs text-white/70">From <strong className="text-white text-sm font-black">$85</strong></span>
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4 text-amber-300 group-hover:text-black transition-colors" />
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
          className="group flex flex-col items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Explore Experiences</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 group-hover:border-cyan-400/60 flex justify-center pt-1.5 transition-colors">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 bg-cyan-400 rounded-full" 
            />
          </div>
        </button>
      </div>
    </section>
  );
}
