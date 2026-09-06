import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { trips } from '@/data/trips';
import { Sparkles, Wallet, Heart, Calendar, Users, ChevronRight, Loader2, MapPin, Clock, Star, Zap, Brain, Wand2 } from 'lucide-react';
import { Link } from 'react-router';

export default function AIPlanner() {
  const { t, formatPrice, setIsWhatsAppOpen } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const [planningStep, setPlanningStep] = useState(0);
  const [recommendations, setRecommendations] = useState<typeof trips>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    budget: 500,
    interests: [] as string[],
    duration: '1 week',
    travelers: 2
  });

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

  const interestOptions = [
    { id: 'sea', label: 'Sea & Diving', icon: '🌊', color: 'from-cyan-500 to-blue-600' },
    { id: 'history', label: 'Ancient History', icon: '🏛️', color: 'from-amber-500 to-orange-600' },
    { id: 'adventure', label: 'Adventure', icon: '🏜️', color: 'from-orange-500 to-red-600' },
    { id: 'luxury', label: 'Luxury & Relax', icon: '✨', color: 'from-purple-500 to-pink-600' },
    { id: 'culture', label: 'Local Culture', icon: '🎭', color: 'from-emerald-500 to-teal-600' },
    { id: 'cruise', label: 'Nile Cruise', icon: '⛵', color: 'from-blue-500 to-indigo-600' }
  ];

  const planningSteps = [
    { label: 'Analyzing preferences…', icon: Brain },
    { label: 'Scanning destinations…', icon: MapPin },
    { label: 'Crafting itinerary…', icon: Wand2 },
  ];

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const generateItinerary = () => {
    setIsPlanning(true);
    setPlanningStep(0);

    const stepInterval = setInterval(() => {
      setPlanningStep(s => {
        if (s >= planningSteps.length - 1) {
          clearInterval(stepInterval);
          return s;
        }
        return s + 1;
      });
    }, 600);

    setTimeout(() => {
      const filtered = trips.filter(trip => {
        const matchesBudget = trip.price <= formData.budget;
        const matchesInterest = formData.interests.length === 0 ||
          formData.interests.some(i => {
            if (i === 'sea') return trip.category === 'Sea';
            if (i === 'history') return trip.category === 'Historical';
            if (i === 'adventure') return trip.category === 'Adventure';
            if (i === 'luxury') return trip.category === 'Relaxation';
            if (i === 'cruise') return trip.category === 'Cruise';
            return true;
          });
        return matchesBudget && matchesInterest;
      });
      setRecommendations(filtered.slice(0, 4));
      setIsPlanning(false);
      setPlanningStep(0);
    }, 2000);
  };

  return (
    <section id="planner" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-[#0a0e1a] to-navy" />

      {/* Ambient glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,179,237,0.15) 0%, transparent 70%)' }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${10 + (i * 7.5)}%`,
            top: `${20 + ((i * 37) % 60)}%`,
            background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#63B3ED' : '#9F7AEA',
            opacity: 0.4,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + (i * 0.4),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="relative section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ boxShadow: ['0 0 15px rgba(212,175,55,0.2)', '0 0 30px rgba(212,175,55,0.5)', '0 0 15px rgba(212,175,55,0.2)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-gold/30"
            style={{ background: 'rgba(212,175,55,0.08)' }}
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
              <Sparkles className="w-4 h-4 text-gold" />
            </motion.div>
            <span className="text-sm text-gold font-semibold tracking-widest uppercase">{t('planner.poweredBy')}</span>
          </motion.div>

          <h2
            className="text-4xl md:text-6xl font-black mb-5"
            style={{
              background: 'linear-gradient(135deg, #ffffff 30%, #D4AF37 60%, #63B3ED 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('planner.title')}
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">{t('planner.subtitle')}</p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-px w-32 mx-auto mt-6"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Form — Futuristic Command Center */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 0 60px rgba(212,175,55,0.08), inset 0 0 60px rgba(255,255,255,0.01)',
            }}
          >
            {/* Top glow bar */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, #63B3ED, transparent)' }} />

            <div className="p-6 md:p-8">
              {/* Budget */}
              <div className="mb-7">
                <label htmlFor="budget" className="flex items-center gap-2 text-white font-semibold mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                    <Wallet className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm tracking-wide uppercase">{t('planner.budget')}</span>
                </label>
                <div
                  className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/40 text-xs">$100</span>
                    <motion.span
                      key={formData.budget}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-black text-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))',
                      }}
                    >
                      ${formData.budget}
                    </motion.span>
                    <span className="text-white/40 text-xs">$2000+</span>
                  </div>
                  <input
                    id="budget"
                    title="Budget"
                    aria-label="Budget"
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: '#D4AF37' }}
                  />
                </div>
              </div>

              {/* Interests */}
              <div className="mb-7">
                <label className="flex items-center gap-2 text-white font-semibold mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                    <Heart className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm tracking-wide uppercase">{t('planner.interests')}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((option, i) => {
                    const active = formData.interests.includes(option.id);
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => toggleInterest(option.id)}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="relative p-3 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-300"
                        style={{
                          background: active ? `linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.1))` : 'rgba(255,255,255,0.04)',
                          border: active ? '1px solid rgba(212,175,55,0.5)' : '1px solid rgba(255,255,255,0.07)',
                          color: active ? '#FFD700' : 'rgba(255,255,255,0.6)',
                          boxShadow: active ? '0 0 20px rgba(212,175,55,0.2)' : 'none',
                        }}
                      >
                        {active && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{ background: `linear-gradient(135deg, ${option.color.replace('from-', '').replace(' to-', ', ')}`, opacity: 0.08 }}
                          />
                        )}
                        <span className="mr-2 text-base">{option.icon}</span>
                        {t(`planner.interest.${option.id}`) || option.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Duration & Travelers */}
              <div className="grid grid-cols-2 gap-4 mb-7">
                <div>
                  <label htmlFor="duration" className="flex items-center gap-2 text-white font-semibold mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                      <Calendar className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-xs tracking-wide uppercase">{t('planner.duration')}</span>
                  </label>
                  <select
                    id="duration"
                    title={t("planner.duration")}
                    aria-label={t("planner.duration")}
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-3 rounded-xl text-white outline-none focus:ring-1 transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', colorScheme: 'dark' }}
                  >
                    <option value="1 day">1 Day</option>
                    <option value="2-3 days">2-3 Days</option>
                    <option value="1 week">1 Week</option>
                    <option value="2 weeks">2 Weeks</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                      <Users className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-xs tracking-wide uppercase">{t('planner.travelers')}</span>
                  </label>
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormData(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                      className="w-8 h-8 rounded-lg text-white flex items-center justify-center text-lg font-bold transition-all hover:bg-white/10"
                    >
                      −
                    </motion.button>
                    <motion.span
                      key={formData.travelers}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-gold font-black text-xl"
                    >
                      {formData.travelers}
                    </motion.span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormData(prev => ({ ...prev, travelers: Math.min(20, prev.travelers + 1) }))}
                      className="w-8 h-8 rounded-lg text-white flex items-center justify-center text-lg font-bold transition-all hover:bg-white/10"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={generateItinerary}
                disabled={isPlanning}
                whileHover={!isPlanning ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isPlanning ? { scale: 0.98 } : {}}
                className="relative w-full py-4 rounded-xl text-white font-black text-lg overflow-hidden disabled:opacity-70 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #b8860b, #D4AF37, #FFD700, #D4AF37)',
                  backgroundSize: '200% 200%',
                  boxShadow: isPlanning ? 'none' : '0 8px 40px rgba(212,175,55,0.5)',
                }}
              >
                {/* Shimmer sweep */}
                {!isPlanning && (
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'skewX(-20deg)' }}
                  />
                )}
                <span className="relative flex items-center justify-center gap-2">
                  {isPlanning ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={planningStep}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          {planningSteps[planningStep]?.label ?? t('planner.creating')}
                        </motion.span>
                      </AnimatePresence>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      {t('planner.submit')}
                    </>
                  )}
                </span>
              </motion.button>
            </div>

            {/* Bottom glow bar */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #63B3ED, #D4AF37, transparent)' }} />
          </motion.div>

          {/* Recommendations Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {recommendations.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5 text-gold" />
                    </motion.div>
                    <h3 className="text-xl font-black text-white">{t('planner.itineraryTitle')}</h3>
                  </div>

                  {recommendations.map((trip, i) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <Link
                        to={`/trip/${trip.id}`}
                        className="group relative flex gap-4 p-4 rounded-2xl overflow-hidden transition-all duration-500 block"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(212,175,55,0.4)';
                          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(212,175,55,0.15)';
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.08)';
                          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                        }}
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                          <img
                            src={trip.image}
                            alt={trip.title}
                            loading="lazy"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.2), transparent)' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold group-hover:text-gold transition-colors duration-300 truncate">{trip.title}</h4>
                          <div className="flex items-center gap-3 text-white/50 text-sm mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {trip.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {trip.duration}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-gold font-black text-lg">{formatPrice(trip.price)}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-gold fill-gold" />
                              <span className="text-white/50 text-sm">{trip.rating}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/20 self-center group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                      </Link>
                    </motion.div>
                  ))}

                  <motion.button
                    onClick={() => setIsWhatsAppOpen(true)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.12)';
                      (e.currentTarget as HTMLElement).style.border = '1px solid rgba(212,175,55,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                      (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.1)';
                    }}
                  >
                    {t('planner.talkToTeam')}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full min-h-[400px] flex items-center justify-center"
                >
                  <div className="text-center">
                    {/* Futuristic glowing orb */}
                    <div className="relative w-28 h-28 mx-auto mb-6">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.4), transparent)' }}
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-2 rounded-full"
                        style={{ border: '2px dashed rgba(212,175,55,0.3)' }}
                      />
                      <div
                        className="absolute inset-4 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
                      >
                        <motion.div
                          animate={isPlanning ? { rotate: 360 } : { scale: [1, 1.2, 1] }}
                          transition={isPlanning
                            ? { duration: 1, repeat: Infinity, ease: 'linear' }
                            : { duration: 2, repeat: Infinity }
                          }
                        >
                          <Sparkles className="w-10 h-10 text-gold" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {isPlanning ? (
                        <motion.div key="planning" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          {/* Step progress */}
                          <div className="flex justify-center gap-2 mb-4">
                            {planningSteps.map((_step, i) => (
                              <motion.div
                                key={i}
                                animate={i <= planningStep ? { scale: [1, 1.3, 1] } : {}}
                                transition={{ duration: 0.4 }}
                                className="w-2 h-2 rounded-full transition-all duration-300"
                                style={{ background: i <= planningStep ? '#D4AF37' : 'rgba(255,255,255,0.15)' }}
                              />
                            ))}
                          </div>
                          <p className="text-gold font-semibold text-lg">{planningSteps[planningStep]?.label}</p>
                          <p className="text-white/30 text-sm mt-1">{t('planner.planning')}</p>
                        </motion.div>
                      ) : (
                        <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          <p className="text-white/50 text-lg font-medium">{t('planner.empty')}</p>
                          <p className="text-white/25 text-sm mt-2">Configure your preferences and generate</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
