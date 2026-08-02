import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In the future, you can connect this to Mailchimp, Formspree, or your Hostinger backend
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-ink/90 backdrop-blur-xl border-t border-white/10">
      <div className="section-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-3 group relative mb-6"
            >
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="VACATION IN EGYPT" 
                  loading="lazy"
                  width={64}
                  height={64}
                  className="h-16 w-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </button>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Luxury travel experiences across Egypt's most extraordinary destinations. 
              Curated with precision, delivered with passion.
            </p>
            <div className="flex gap-3">
              {/* Instagram — brand gradient */}
              <a
                href="https://www.instagram.com/vacationinegypt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow VACATION IN EGYPT on Instagram"
                className="instagram-gradient w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_rgba(225,48,108,0.5)]"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              {/* Facebook — brand blue */}
              <a
                href="https://www.facebook.com/vacationinegypt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow VACATION IN EGYPT on Facebook"
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_rgba(24,119,242,0.5)] bg-[#1877F2]"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              {/* YouTube — brand red */}
              <a
                href="https://www.youtube.com/@vacationinegypt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to VACATION IN EGYPT on YouTube"
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_rgba(255,0,0,0.5)] bg-[#FF0000]"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Popular Trips', id: 'trips' },
                { label: 'Hot Offers', id: 'offers' },
                { label: 'Services', id: 'services' },
                { label: 'AI Planner', id: 'planner' },
                { label: 'Gallery', id: 'gallery' }
              ].map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-sm"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Luxury Hotels', id: 'services' },
                { label: 'Airport Transfers', id: 'services' },
                { label: 'Private Tours', id: 'services' },
                { label: 'Group Bookings', id: 'services' },
                { label: 'VIP Concierge', id: 'services' }
              ].map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-sm"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5" />
                <span className="text-white/50 text-sm">Hurghada, Red Sea, Egypt</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-white/50 text-sm">+20 113 131 2402</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-white/50 text-sm">hello@vacationinegypt.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-white text-sm font-medium mb-2">{t('footer.newsletter')}</h5>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-lg border border-green-400/20">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Successfully subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 glass px-4 py-2.5 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold border border-transparent transition-colors"
                  />
                  <button type="submit" title="Subscribe to newsletter" aria-label="Subscribe to newsletter" className="bg-gold-gradient px-4 py-2.5 rounded-lg text-white hover:shadow-glow transition-all flex items-center justify-center min-w-[3rem]">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Managed by */}
        <div className="text-center mb-6">
          <p className="text-white/20 text-xs tracking-widest uppercase hover:text-gold hover:drop-shadow-[0_0_8px_rgba(46,134,222,0.6)] transition-all duration-300 cursor-default">
            VACATION IN EGYPT MANAGED AND CONTROLLED BY ALBARAA TRAVEL
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-white/30 text-sm">
              © 2026 VACATION IN EGYPT. All rights reserved.
            </p>
            <div className="group relative inline-flex items-center justify-center cursor-pointer px-3 py-0.5 rounded-full border border-gold/20 bg-gold/5 hover:bg-gold/10 transition-all duration-500 shadow-[0_0_15px_rgba(46,134,222,0.1)] hover:shadow-[0_0_20px_rgba(46,134,222,0.3)]">
              <span className="absolute text-center w-full left-0 text-gold font-bold text-xs tracking-[0.15em] drop-shadow-[0_0_8px_rgba(46,134,222,0.8)] group-hover:opacity-0 group-hover:scale-95 transition-all duration-300">
                DESIGNED BY ROMERO'S STUDIOS
              </span>
              <span className="absolute text-center w-full left-0 text-white font-bold text-xs tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                +20 122 427 8490
              </span>
              {/* Invisible spacer to maintain correct width so layout doesn't shift */}
              <span className="text-transparent font-bold text-xs tracking-[0.15em] invisible pointer-events-none">
                DESIGNED BY ROMERO'S STUDIOS
              </span>
            </div>
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="text-white/50 hover:text-white/80 text-sm transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-white/50 hover:text-white/80 text-sm transition-colors">Terms of Service</a>
            <a href="/privacy#cookies" className="text-white/50 hover:text-white/80 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
