import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield } from 'lucide-react';
import { Link } from 'react-router';

const COOKIE_KEY = 'vacation-egypt-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Show after 2 seconds
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9000]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="rounded-2xl bg-[#0F0F1A]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm mb-1">We use cookies</h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  We use cookies to enhance your experience, remember preferences, and analyze traffic. 
                  Your privacy is respected — no data is sold to third parties.{' '}
                  <Link to="/privacy" className="text-gold/80 hover:text-gold underline-offset-2 underline">
                    Learn more
                  </Link>
                </p>
              </div>
              <button
                onClick={decline}
                className="p-1 text-white/30 hover:text-white/60 transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={accept}
                className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-white text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5" />
                Accept All
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
