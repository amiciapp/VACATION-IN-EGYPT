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
      <button
        onClick={() => setIsWhatsAppOpen(true)}
        className="w-14 h-14 bg-[#128C7E] rounded-full flex items-center justify-center text-white hover:bg-[#0e7a6e] transition-all shadow-lg"
        aria-label="Open WhatsApp"
      >
        <Phone className="w-6 h-6" />
      </button>

      {/* AI Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="w-14 h-14 glass rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all shadow-luxury-gold animate-pulse-glow"
        aria-label="Open AI Concierge"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

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
