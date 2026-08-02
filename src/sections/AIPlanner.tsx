import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { trips } from '@/data/trips';
import { Sparkles, Wallet, Heart, Calendar, Users, ChevronRight, Loader2, MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router';

export default function AIPlanner() {
  const { t, formatPrice, setIsWhatsAppOpen } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
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
    { id: 'sea', label: 'Sea & Diving', icon: '🌊' },
    { id: 'history', label: 'Ancient History', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure', icon: '🏜️' },
    { id: 'luxury', label: 'Luxury & Relax', icon: '✨' },
    { id: 'culture', label: 'Local Culture', icon: '🎭' },
    { id: 'cruise', label: 'Nile Cruise', icon: '⛵' }
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
    // Simulate AI processing
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
    }, 2000);
  };

  return (
    <section id="planner" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light/20 to-navy" />

      <div className="relative section-padding">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold">{t('planner.poweredBy')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">{t('planner.title')}</h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">{t('planner.subtitle')}</p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className={`glass-card p-6 md:p-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Budget */}
            <div className="mb-6">
              <label htmlFor="budget" className="flex items-center gap-2 text-ink font-medium mb-3">
                <Wallet className="w-5 h-5 text-gold" />
                {t('planner.budget')}
              </label>
              <div className="glass p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-ink/60 text-sm">$100</span>
                  <span className="text-gold font-bold text-lg">${formData.budget}</span>
                  <span className="text-ink/60 text-sm">$2000+</span>
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
                  className="w-full h-2 bg-ink/10 rounded-full appearance-none cursor-pointer accent-gold"
                />
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-ink font-medium mb-3">
                <Heart className="w-5 h-5 text-gold" />
                {t('planner.interests')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleInterest(option.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                      formData.interests.includes(option.id)
                        ? 'bg-gold-gradient text-white'
                        : 'glass text-ink/70 hover:bg-ink/10'
                    }`}
                  >
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Travelers */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="duration" className="flex items-center gap-2 text-ink font-medium mb-3">
                  <Calendar className="w-5 h-5 text-gold" />
                  {t('planner.duration')}
                </label>
                <select
                  id="duration"
                  title={t("planner.duration")}
                  aria-label={t("planner.duration")}
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full glass p-3 rounded-xl text-ink bg-transparent border border-ink/10 focus:border-gold outline-none"
                >
                  <option value="1 day">1 Day</option>
                  <option value="2-3 days">2-3 Days</option>
                  <option value="1 week">1 Week</option>
                  <option value="2 weeks">2 Weeks</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-ink font-medium mb-3">
                  <Users className="w-5 h-5 text-gold" />
                  {t('planner.travelers')}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                    className="w-10 h-10 glass rounded-lg text-ink hover:bg-ink/10 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-ink font-bold text-lg w-8 text-center">{formData.travelers}</span>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, travelers: Math.min(20, prev.travelers + 1) }))}
                    className="w-10 h-10 glass rounded-lg text-ink hover:bg-ink/10 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={generateItinerary}
              disabled={isPlanning}
              className="w-full bg-gold-gradient py-4 rounded-xl text-white font-bold text-lg hover:shadow-luxury-gold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isPlanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('planner.creating')}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {t('planner.submit')}
                </>
              )}
            </button>
          </div>

          {/* Recommendations */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  {t('planner.itineraryTitle')}
                </h3>
                {recommendations.map((trip) => (
                  <Link
                    to={`/trip/${trip.id}`}
                    key={trip.id}
                    className="glass-card p-4 flex gap-4 hover:bg-ink/[0.08] transition-colors block group"
                  >
                    <img
                      src={trip.image}
                      alt={trip.title}
                      loading="lazy"
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-lg object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1">
                      <h4 className="text-ink font-semibold group-hover:text-gold transition-colors">{trip.title}</h4>
                      <div className="flex items-center gap-3 text-ink/70 text-sm mt-1">
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
                        <span className="text-gold font-bold">{formatPrice(trip.price)}</span>
                        <span className="flex items-center gap-1 text-ink/70 text-sm">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          {trip.rating}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink/30 self-center group-hover:text-gold transition-colors" />
                  </Link>
                ))}
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="w-full glass py-3 rounded-xl text-ink font-medium hover:bg-ink/10 transition-all"
                >
                  {t('planner.talkToTeam')}
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-gold" />
                  </div>
                  <p className="text-ink/60 text-lg">
                    {isPlanning ? t('planner.planning') : t('planner.empty')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
