import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { hotOffers, trips } from '@/data/trips';
import { Clock, Flame, ChevronRight, Tag } from 'lucide-react';

function CountdownTimer({ endDate }: { endDate: string }) {
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
      <div className="w-12 h-12 md:w-14 md:h-14 glass-strong rounded-xl flex items-center justify-center animate-countdown-pulse">
        <span className="text-gold font-bold text-lg md:text-xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-ink/70 text-xs mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <TimeUnit value={timeLeft.seconds} label="Sec" />
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
    <section id="offers" ref={sectionRef} className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/30" />

      <div className="relative section-padding">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full mb-4">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-medium">Limited Time Only</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">{t('offers.title')}</h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">{t('offers.subtitle')}</p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {hotOffers.map((offer, index) => {
            const trip = trips.find(t => t.id === offer.tripId);
            if (!trip) return null;

            return (
              <div
                key={offer.id}
                className={`group relative glass-card overflow-hidden transition-all duration-500 hover-lift ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* Offer Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
                    -{offer.discount}%
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-light/80 md:bg-gradient-to-l" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-gold transition-colors">
                      {offer.title}
                    </h3>

                    <p className="text-red-400 text-sm font-medium mb-4 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      {offer.urgency}
                    </p>

                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-2xl font-bold text-gold">{formatPrice(offer.discountedPrice)}</span>
                      <span className="text-ink/70 line-through">{formatPrice(offer.originalPrice)}</span>
                      <span className="text-ink/70 text-sm">/person</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-ink/70 text-sm mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold" />
                        {t('offers.ends')}:
                      </p>
                      <CountdownTimer endDate={offer.endDate} />
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTrip(trip.id);
                        setIsWhatsAppOpen(true);
                      }}
                      className="w-full bg-gold-gradient py-3 rounded-xl text-white font-semibold hover:shadow-luxury-gold transition-all flex items-center justify-center gap-2"
                    >
                      {t('offers.book')}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
