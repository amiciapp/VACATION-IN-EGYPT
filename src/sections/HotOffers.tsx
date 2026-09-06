import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { hotOffers, trips } from '@/data/trips';
import { Clock, Flame, ChevronRight, Tag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function CountdownTimer({ endDate }: { endDate: string }) {
  const { t } = useApp();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-amber-400/30 flex items-center justify-center shadow-lg group-hover:border-amber-400/60 transition-colors">
        <span className="text-amber-400 font-black text-lg md:text-xl font-mono tracking-tight drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1.5">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2.5">
      <TimeUnit value={timeLeft.days} label={t('offers.days', 'Days')} />
      <TimeUnit value={timeLeft.hours} label={t('offers.hours', 'Hrs')} />
      <TimeUnit value={timeLeft.minutes} label={t('offers.minutes', 'Min')} />
      <TimeUnit value={timeLeft.seconds} label={t('offers.seconds', 'Sec')} />
    </div>
  );
}

export default function HotOffers() {
  const { t, formatPrice, setSelectedTrip, setIsWhatsAppOpen } = useApp();
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

  return (
    <section id="offers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 -right-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative section-padding z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 border border-red-500/20 text-red-600 font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
            <Flame className="w-4 h-4 text-red-500 animate-bounce" />
            <span>{t('offers.badge', 'Limited Time Privileges')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-ink mb-4 tracking-tight">
            {t('offers.title')}
          </h2>
          <p className="text-base md:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
            {t('offers.subtitle')}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto">
          {hotOffers.map((offer, index) => {
            const trip = trips.find(t => t.id === offer.tripId);
            if (!trip) return null;

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/80 hover:border-transparent transition-all duration-500 ease-out hover:-translate-y-2.5 shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(239,68,68,0.25)] overflow-hidden flex flex-col"
              >
                {/* Glowing Aura on Card Hover */}
                <div className="absolute -inset-0.5 rounded-[26px] bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 -z-10" />

                {/* Offer Discount Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 text-white px-3.5 py-1.5 rounded-2xl font-black text-sm shadow-lg shadow-red-500/40 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    -{offer.discount}% OFF
                  </div>
                </div>

                <div className="flex flex-col md:flex-row h-full">
                  {/* Image */}
                  <div className="relative md:w-2/5 h-52 md:h-auto overflow-hidden bg-slate-900">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {offer.title}
                      </h3>

                      <p className="text-red-500 text-xs font-bold mb-4 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{offer.urgency}</span>
                      </p>

                      <div className="flex items-baseline gap-2.5 mb-5">
                        <span className="text-2xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                          {formatPrice(offer.discountedPrice)}
                        </span>
                        <span className="text-slate-400 line-through text-sm font-semibold">
                          {formatPrice(offer.originalPrice)}
                        </span>
                        <span className="text-slate-500 text-xs font-medium">{t('trip.perPerson', '/person')}</span>
                      </div>

                      <div className="mb-6">
                        <p className="text-slate-600 text-xs font-semibold mb-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>{t('offers.ends')}:</span>
                        </p>
                        <CountdownTimer endDate={offer.endDate} />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTrip(trip.id);
                        setIsWhatsAppOpen(true);
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>{t('offers.book')}</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
