import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/context/AppContext';
import { services } from '@/data/trips';
import { Building, Ship, Anchor, Car, UserCheck, Zap, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  building: Building,
  ship: Ship,
  anchor: Anchor,
  car: Car,
  'user-check': UserCheck,
  zap: Zap,
};

const serviceGradients = [
  'from-cyan-500 via-teal-500 to-blue-600',
  'from-amber-500 via-orange-500 to-yellow-600',
  'from-blue-600 via-indigo-600 to-purple-600',
  'from-rose-500 via-pink-500 to-orange-500',
  'from-emerald-500 via-teal-500 to-green-600',
  'from-purple-600 via-violet-600 to-indigo-600',
];

export default function Services() {
  const { t, setIsWhatsAppOpen } = useApp();
  const navigate = useNavigate();
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
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="relative section-padding z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 text-teal-600 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>{t('services.badge', 'VIP Hospitality & Concierge')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-ink mb-4 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-base md:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Building;
            const gradient = serviceGradients[index % serviceGradients.length];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => {
                  if (service.id === 'transport') {
                    navigate('/transportation');
                  } else {
                    setIsWhatsAppOpen(true);
                  }
                }}
                className="group relative rounded-3xl p-7 bg-white/90 backdrop-blur-2xl border border-slate-200/80 hover:border-transparent transition-all duration-500 ease-out hover:-translate-y-2.5 shadow-lg hover:shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Glowing Aura on Card Hover */}
                <div className={`absolute -inset-0.5 rounded-[26px] bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 -z-10`} />

                {/* Animated Top Color Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out`} />

                <div>
                  {/* Icon Pod */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-700 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-teal-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-slate-700 text-xs font-medium">
                        <div className="w-4 h-4 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                          <Check className="w-2.5 h-2.5 text-teal-600 group-hover:text-white transition-colors" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-teal-600 transition-colors">
                    {service.id === 'transport' ? t('services.bookRide', 'Book Luxury Ride') : t('services.inquire', 'Inquire via WhatsApp')}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-teal-500 group-hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
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
