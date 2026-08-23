import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { useApp } from '@/context/AppContext';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '@/i18n';
import { Menu, X, Phone, MessageCircle, Heart, ChevronDown, Globe } from 'lucide-react';
import { cities } from '@/data/trips';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'EN', ar: 'AR', de: 'DE', fr: 'FR', ru: 'RU', es: 'ES', it: 'IT',
  pt: 'PT', nl: 'NL', tr: 'TR', pl: 'PL', sv: 'SV', cs: 'CS', uk: 'UK',
  hu: 'HU', ro: 'RO', sk: 'SK', da: 'DA', no: 'NO', fi: 'FI', sr: 'SR',
  bg: 'BG', hi: 'HI', id: 'ID', el: 'EL', vi: 'VI', he: 'HE', kk: 'KK',
  lt: 'LT', ja: 'JP', ko: 'KR', zh: 'ZH',
};

export default function Navigation() {
  const navigate = useNavigate();
  const { t, setIsChatOpen, setIsWhatsAppOpen, wishlist } = useApp();
  const { i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTripsHovered, setIsTripsHovered] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock & Escape key for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Focus trap: trap Tab inside mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', trap);
    first?.focus();
    return () => document.removeEventListener('keydown', trap);
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    if (id === 'transport') {
      navigate('/transportation');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const switchLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  }, [i18n]);

  const navLinks = [
    { id: 'trips', label: t('nav.trips') },
    { id: 'services', label: t('nav.services') },
    { id: 'transport', label: t('nav.transport') },
    { id: 'offers', label: t('nav.offers') },
    { id: 'planner', label: t('nav.ai.planner') },
  ];

  const currentLang = i18n.language?.split('-')[0] || 'en';

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full section-padding">
        <div className="flex items-center justify-between">
          {/* Luxury Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-3 group relative cursor-pointer"
            aria-label="Scroll to top"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-75 blur-md transition-all duration-500" />
              <img 
                src="/logo.png" 
                alt="VACATION IN EGYPT" 
                className="relative h-9 w-auto rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.25)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            <div 
              className="relative"
              onMouseEnter={() => setIsTripsHovered(true)}
              onMouseLeave={() => setIsTripsHovered(false)}
            >
              <button
                onClick={() => scrollToSection('trips')}
                className="flex items-center gap-1.5 text-xs font-extrabold text-white/80 hover:text-cyan-400 transition-colors tracking-widest uppercase cursor-pointer py-1"
                aria-haspopup="menu"
              >
                <span>{t('nav.trips')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isTripsHovered ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              <AnimatePresence>
                {isTripsHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/15 p-2"
                  >
                    <div className="grid gap-1">
                      {cities.map((city) => (
                        <Link
                          key={city}
                          to={`/city/${city}`}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 transition-all group"
                        >
                          <div className="w-2 h-2 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />
                          <span className="text-xs font-bold">{city}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.filter(link => link.id !== 'trips').map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative text-xs font-extrabold text-white/80 hover:text-cyan-400 transition-colors tracking-widest uppercase cursor-pointer py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-extrabold text-white/90 hover:text-cyan-300 transition-colors cursor-pointer"
                aria-label="Switch language"
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>{LANGUAGE_LABELS[currentLang] || currentLang.toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/15 p-2 max-h-72 overflow-y-auto"
                  >
                    <div className="grid gap-0.5" role="listbox">
                      {supportedLngs.map((lang) => (
                        <button
                          key={lang}
                          role="option"
                          aria-selected={lang === currentLang}
                          onClick={() => switchLanguage(lang)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                            lang === currentLang
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                              : 'text-slate-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {LANGUAGE_LABELS[lang] || lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Wishlist */}
            {wishlist.length > 0 && (
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => scrollToSection('trips')}
                className="relative px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-red-400 transition-colors flex items-center justify-center cursor-pointer"
                aria-label={`Wishlist (${wishlist.length} items)`}
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              </motion.button>
            )}

            {/* AI Concierge */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-xs font-bold text-white hover:border-cyan-400/50 hover:text-cyan-300 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>AI Concierge</span>
            </motion.button>

            {/* WhatsApp Book CTA with glowing aura */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsWhatsAppOpen(true)}
              className="relative px-5 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-xs font-extrabold text-white shadow-[0_4px_20px_rgba(6,182,212,0.4)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.6)] transition-all flex items-center gap-2 overflow-hidden cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <Phone className="w-4 h-4 text-white" />
              <span>{t('hero.cta.book') || 'VIP Booking'}</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-ink/95 backdrop-blur-xl border-t border-white/10"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="section-padding py-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.id}>
                {link.id === 'trips' ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="block w-full text-left text-lg font-medium text-white/80 hover:text-gold py-2"
                    >
                      {link.label}
                    </button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      {cities.map((city) => (
                        <Link
                          key={city}
                          to={`/city/${city}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-white/50 hover:text-gold py-1"
                        >
                          {city}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left text-lg font-medium text-white/80 hover:text-gold py-2"
                  >
                    {link.label}
                  </button>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => { setIsChatOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full glass py-3 rounded-lg text-white/80 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                AI Concierge
              </button>
              <button
                onClick={() => { setIsWhatsAppOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full bg-gold-gradient py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Book via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
