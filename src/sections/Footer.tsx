import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send, ChevronRight, CheckCircle2, Shield, Star } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://www.instagram.com/vacationinegypt',
    label: 'Follow VACATION IN EGYPT on Instagram',
    icon: Instagram,
    bg: 'linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)',
    shadow: 'rgba(225,48,108,0.6)',
    name: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/vacationinegypt',
    label: 'Follow VACATION IN EGYPT on Facebook',
    icon: Facebook,
    bg: '#1877F2',
    shadow: 'rgba(24,119,242,0.6)',
    name: 'Facebook',
  },
  {
    href: 'https://www.youtube.com/@vacationinegypt',
    label: 'Subscribe to VACATION IN EGYPT on YouTube',
    icon: Youtube,
    bg: '#FF0000',
    shadow: 'rgba(255,0,0,0.6)',
    name: 'YouTube',
  },
];

const trustBadges = [
  { icon: Shield, label: 'SSL Secured', color: '#4ade80' },
  { icon: Star, label: 'Top Rated', color: '#D4AF37' },
  { icon: CheckCircle2, label: 'Verified Agency', color: '#63B3ED' },
];

export default function Footer() {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050810 0%, #080c16 50%, #020408 100%)' }}>
      {/* Ambient glow orbs */}
      <motion.div
        animate={{ opacity: [0.04, 0.12, 0.04] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3), transparent 70%)' }}
      />
      <motion.div
        animate={{ opacity: [0.03, 0.09, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,179,237,0.25), transparent 70%)' }}
      />

      {/* Top glowing border */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), rgba(99,179,237,0.4), transparent)' }} />

      <div className="section-padding py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-3 mb-6 group"
            >
              {/* Logo glow backlight */}
              <motion.div
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -inset-2 rounded-xl blur-lg pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3), transparent)' }}
              />
              <img
                src="/logo.png"
                alt="VACATION IN EGYPT"
                loading="lazy"
                width={64}
                height={64}
                className="h-16 w-auto rounded-lg relative z-10"
                style={{ filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.4))' }}
              />
            </motion.button>

            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Luxury travel experiences across Egypt's most extraordinary destinations.
              Curated with precision, delivered with passion.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: social.bg,
                      boxShadow: `0 4px 20px ${social.shadow}`,
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.a>
                );
              })}
            </div>

            {/* Trust badges */}
            <div className="flex flex-col gap-2">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: badge.color }} />
                    <span className="text-white/30 text-xs tracking-wide">{badge.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold mb-5 text-sm tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Popular Trips', id: 'trips' },
                { label: 'Hot Offers', id: 'offers' },
                { label: 'Services', id: 'services' },
                { label: 'AI Planner', id: 'planner' },
                { label: 'Gallery', id: 'gallery' }
              ].map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.id)}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-sm group"
                  >
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="text-gold/50 group-hover:text-gold transition-colors"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </motion.div>
                    {link.label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold mb-5 text-sm tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, #63B3ED, #90CDF4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Luxury Hotels', id: 'services' },
                { label: 'Airport Transfers', id: 'services' },
                { label: 'Private Tours', id: 'services' },
                { label: 'Group Bookings', id: 'services' },
                { label: 'VIP Concierge', id: 'services' }
              ].map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.id)}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors text-sm group"
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />
                    {link.label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4
              className="font-bold mb-5 text-sm tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  <MapPin className="w-4 h-4 text-gold" />
                </motion.div>
                <span className="text-white/40 text-sm pt-1.5">Hurghada, Red Sea, Egypt</span>
              </li>
              <li className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  <Phone className="w-4 h-4 text-gold" />
                </motion.div>
                <span className="text-white/40 text-sm">+20 113 131 2402</span>
              </li>
              <li className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  <Mail className="w-4 h-4 text-gold" />
                </motion.div>
                <span className="text-white/40 text-sm">hello@vacationinegypt.com</span>
              </li>
            </ul>

            {/* Newsletter - Luxury Glass Card */}
            <div
              className="p-5 rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,175,55,0.2)',
                boxShadow: '0 0 30px rgba(212,175,55,0.06)',
              }}
            >
              <div className="h-px w-full mb-4 absolute top-0 left-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
              <h5 className="text-white text-sm font-bold mb-3 tracking-wide">{t('footer.newsletter')}</h5>

              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-green-400 py-3"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-semibold">Successfully subscribed!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm placeholder:text-white/25 outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) => { e.target.style.border = '1px solid rgba(212,175,55,0.5)'; }}
                    onBlur={(e) => { e.target.style.border = '1px solid rgba(255,255,255,0.08)'; }}
                  />
                  <motion.button
                    type="submit"
                    title="Subscribe to newsletter"
                    aria-label="Subscribe to newsletter"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 rounded-xl text-white flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #b8860b, #D4AF37)',
                      boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
                    }}
                  >
                    {/* Shimmer */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)', transform: 'skewX(-20deg)' }}
                    />
                    <Send className="w-4 h-4 relative z-10" />
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Managed by */}
        <div className="text-center mt-12 mb-6">
          <motion.p
            whileHover={{ scale: 1.02 }}
            className="text-white/15 text-xs tracking-[0.3em] uppercase cursor-default transition-all duration-500 hover:text-gold/60"
            style={{ letterSpacing: '0.25em' }}
          >
            VACATION IN EGYPT MANAGED AND CONTROLLED BY ALBARAA TRAVEL
          </motion.p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 relative">
          {/* Divider */}
          <div className="h-px w-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <p className="text-white/25 text-sm">
                © 2026 VACATION IN EGYPT. All rights reserved.
              </p>

              {/* Designer credit with flip reveal */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative inline-flex items-center justify-center cursor-pointer px-4 py-1.5 rounded-full"
                style={{
                  border: '1px solid rgba(212,175,55,0.25)',
                  background: 'rgba(212,175,55,0.05)',
                }}
              >
                <motion.span
                  className="text-xs tracking-widest font-bold transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 absolute text-center whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.6))',
                  }}
                >
                  DESIGNED BY ROMERO'S STUDIOS
                </motion.span>
                <span className="text-xs tracking-widest font-bold transition-all duration-300 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 absolute text-white/90 text-center whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                  +20 122 427 8490 &bull; +20 110 787 1007
                </span>
                {/* Invisible spacer to maintain correct width so layout doesn't shift */}
                <span className="text-xs tracking-widest font-bold invisible pointer-events-none whitespace-nowrap">
                  +20 122 427 8490 &bull; +20 110 787 1007
                </span>
              </motion.div>
            </div>

            <div className="flex gap-6">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/privacy#cookies' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -1 }}
                  className="text-white/30 hover:text-white/70 text-sm transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
