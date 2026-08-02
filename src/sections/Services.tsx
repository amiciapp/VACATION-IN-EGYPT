import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/context/AppContext';
import { services } from '@/data/trips';
import { Building, Ship, Anchor, Car, UserCheck, Zap, Check } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  building: Building,
  ship: Ship,
  anchor: Anchor,
  car: Car,
  'user-check': UserCheck,
  zap: Zap,
};

export default function Services() {
  const { t } = useApp();
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
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/30" />

      <div className="relative section-padding">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">{t('services.title')}</h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Building;
            return (
              <div
                key={service.id}
                onClick={() => service.id === 'transport' && navigate('/transportation')}
                className={`group glass-card p-6 hover-lift transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${service.id === 'transport' ? 'cursor-pointer' : ''}`}
                style={{ transitionDelay: `${150 + index * 75}ms` }}
              >
                <h3 className="text-xl font-bold text-ink mb-4 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <div className="w-14 h-14 bg-gold-gradient rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-ink/70 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-ink/60 text-sm">
                      <Check className="w-4 h-4 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
