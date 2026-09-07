import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, X } from 'lucide-react';

export default function PushPermission() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Only show if notifications are supported and not already granted/denied
    if ('Notification' in window && 'serviceWorker' in navigator) {
      if (Notification.permission === 'default') {
        // Delay prompt to not overwhelm the user on first load (e.g. 15 seconds)
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 15000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // In a real app, you would subscribe to push manager and send the subscription to your server here
        const registration = await navigator.serviceWorker.ready;
        console.log('Push notification permission granted.', registration);
        
        // Optional: show a welcome notification
        if (registration.showNotification) {
          registration.showNotification('Welcome to VIP Deals!', {
            body: 'You will now receive our exclusive luxury travel deals.',
            icon: '/logo.png',
          });
        }
      }
      setShowPrompt(false);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setShowPrompt(false);
    }
  };

  const decline = () => {
    setShowPrompt(false);
    // Setting to denied or handling graceful decline
    // For now we just hide it. The browser will remember if they blocked it via native prompt.
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed top-24 right-4 md:right-8 z-[8000] max-w-sm w-[calc(100%-2rem)]"
        >
          <div className="glass-strong rounded-2xl p-5 border border-gold/30 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
            
            <button 
              onClick={decline}
              className="absolute top-3 right-3 text-ink/70 hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-gold/40 flex items-center justify-center shrink-0 p-1.5 shadow-md">
                <img src="/logo.png" alt="VACATION IN EGYPT" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-ink font-bold mb-1">Unlock VIP Deals</h3>
                <p className="text-ink/60 text-sm leading-relaxed mb-4">
                  Enable push notifications to receive exclusive offers and last-minute yacht charter deals.
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={requestPermission}
                    className="px-4 py-2 bg-gold-gradient text-white text-xs font-black uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Enable Alerts
                  </button>
                  <button 
                    onClick={decline}
                    className="px-4 py-2 bg-ink/5 border border-ink/10 text-ink/60 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-ink/10 transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
