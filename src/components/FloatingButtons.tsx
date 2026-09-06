import { useApp } from '@/context/AppContext';
import { MessageCircle, Phone, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingButtons() {
  const { setIsChatOpen, setIsWhatsAppOpen } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 safe-bottom">
      {/* WhatsApp Button */}
      <div className="relative group">
        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="w-14 h-14 bg-[#128C7E] hover:bg-[#0e7a6e] rounded-full flex items-center justify-center text-white transition-all shadow-[0_10px_25px_rgba(18,140,126,0.4)] hover:shadow-[0_15px_35px_rgba(18,140,126,0.6)] hover:scale-105 active:scale-95 duration-300 cursor-pointer"
          aria-label="Open WhatsApp"
        >
          <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        {/* WhatsApp Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-2xl">
          WhatsApp Us
        </div>
      </div>

      {/* Luxury VIP AI Concierge Button */}
      <div className="relative group">
        <button
          onClick={() => setIsChatOpen(true)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-[2px] shadow-[0_10px_30px_rgba(245,158,11,0.45)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Open VIP AI Concierge"
        >
          <div className="w-full h-full rounded-full bg-slate-950/90 backdrop-blur-md flex items-center justify-center group-hover:bg-slate-900 transition-colors">
            <MessageCircle className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          {/* Pulsing Live Beacon */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          </span>
        </button>
        {/* Luxury Concierge Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-2xl">
          VIP Concierge Online
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 glass rounded-full flex items-center justify-center text-ink/70 hover:text-gold hover:bg-white/10 transition-all"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
