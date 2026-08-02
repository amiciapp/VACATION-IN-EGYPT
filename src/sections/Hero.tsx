import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { ChevronRight, MapPin, Waves, Sun, Moon, CloudRain, Cloud, Wind, DollarSign, Euro } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { t, weather } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<{ usd: string | null; eur: string | null }>({ usd: null, eur: null });

  useEffect(() => {
    setIsVisible(true);
    // EGP rate display only — different from currency converter in AppContext
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
    }, 5000); // Elegant 5-second rotation
    return () => clearInterval(interval);
  }, [isVisible, slogans.length]);

  const scrollToTrips = () => {
    document.getElementById('trips')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlanner = () => {
    document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Cinematic Video Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 scale-110"
        style={{ y: yParallax }}
      >
      <div className="absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
        {/* Elite CSS Background Texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="absolute inset-0 animate-ken-burns">
          {/* Main Hero Image with Ken Burns */}
          <div 
            className="absolute inset-0 bg-cover bg-center -z-10 transition-opacity duration-1000 bg-[url('/images/hero.webp')] opacity-80"
          />
        </div>

        {/* Overlays optimized for maintaining text readability over the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>
      </motion.div>
 
      {/* Content */}
      <div className="relative h-full min-h-screen flex flex-col pt-48 pb-24 lg:pb-32 section-padding">
        <div className="max-w-5xl">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border-turquoise/20 bg-turquoise/5"
          >
            <MapPin className="w-4 h-4 text-turquoise" />
            <span className="text-sm text-white/80 font-medium tracking-wide">Hurghada, Red Sea, Egypt</span>
          </motion.div>
 
          {/* Main Headline Container */}
          <div className="relative mb-12">
            <motion.h1
              key={sloganIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-[20px] sm:text-[34px] md:text-[41px] lg:text-[54px] font-bold text-white leading-[1.1] drop-shadow-2xl text-balance max-w-4xl"
            >
              {slogans[sloganIndex]}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTrips}
              className="group bg-gold-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-[0_10px_30px_rgba(46,134,222,0.4)] transition-shadow flex items-center gap-2"
            >
              {t('hero.cta.explore')}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToPlanner}
              className="glass px-8 py-4 rounded-xl text-white font-semibold text-lg hover:bg-white/15 transition-colors flex items-center gap-2"
            >
              {t('hero.cta.plan')}
            </motion.button>
          </motion.div>

          {/* Weather Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="flex flex-wrap items-center gap-6 sm:gap-8 glass-strong px-6 sm:px-10 py-6 rounded-3xl w-fit hover:shadow-[0_20px_40px_rgba(16,172,132,0.15)] border border-white/10 hover:border-turquoise/30 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group cursor-pointer"
          >
            {/* Highlight Sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-sweep" />

            {/* Air Temp & Dynamic Icon */}
            <div className="flex items-center gap-4 relative z-10">
              {(() => {
                const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
                const cond = weather.condition.toLowerCase();
                if (cond.includes('rain')) return <CloudRain className="w-10 h-10 text-blue-400 animate-bounce drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />;
                if (cond.includes('wind')) return <Wind className="w-10 h-10 text-turquoise animate-pulse drop-shadow-[0_0_10px_rgba(16,172,132,0.8)]" />;
                if (cond.includes('cloud')) return <Cloud className="w-10 h-10 text-gray-300 animate-[float_4s_ease-in-out_infinite] drop-shadow-[0_0_10px_rgba(209,213,219,0.8)]" />;
                
                return isDay ? (
                  <Sun className="w-10 h-10 text-yellow-400 animate-[spin_10s_linear_infinite] drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
                ) : (
                  <Moon className="w-10 h-10 text-blue-200 animate-pulse drop-shadow-[0_0_15px_rgba(191,219,254,0.8)]" />
                );
              })()}
              <div className="flex flex-col">
                <span className="text-white font-bold text-3xl tracking-tight drop-shadow-md">{weather.temp}°C</span>
                <span className="text-turquoise/80 text-base font-semibold uppercase tracking-wider">{weather.condition} Air</span>
              </div>
            </div>

            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent relative z-10" />

            {/* Sea Temp */}
            <div className="flex items-center gap-4 relative z-10">
              <Waves className="w-10 h-10 text-turquoise animate-[pulse-glow_3s_infinite] drop-shadow-[0_0_10px_rgba(16,172,132,0.6)]" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-3xl tracking-tight drop-shadow-md">{weather.seaTemp}°C</span>
                <span className="text-turquoise/80 text-base font-semibold uppercase tracking-wider">Sea Temp</span>
              </div>
            </div>

            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent relative z-10" />

            {/* Exchange Rates */}
            {exchangeRates.usd && (
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                    <span className="text-white font-bold text-xl tracking-tight drop-shadow-md">{exchangeRates.usd} <span className="text-sm font-normal text-white/70">EGP</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="w-5 h-5 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                    <span className="text-white font-bold text-xl tracking-tight drop-shadow-md">{exchangeRates.eur} <span className="text-sm font-normal text-white/70">EGP</span></span>
                  </div>
                </div>
              </div>
            )}

            {exchangeRates.usd && (
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent relative z-10" />
            )}

            {/* Status */}
            <div className="flex items-center relative z-10">
              <div className="px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/30">
                <span className="text-green-400 text-lg font-bold tracking-wide drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">
                  {weather.condition.toLowerCase().includes('rain') ? 'Best time to relax indoors' 
                    : weather.seaTemp >= 24 ? 'Perfect for diving' 
                    : 'Great beach weather'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
