import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { whatsappNumbers, trips } from '@/data/trips';
import { X, Send, Phone, MessageCircle, ChevronRight, Loader2, CheckCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const { isWhatsAppOpen, setIsWhatsAppOpen, selectedTrip, formatPrice } = useApp();
  const [step, setStep] = useState<'welcome' | 'form' | 'sending' | 'sent'>('welcome');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    travelers: 2,
    message: ''
  });
  const [typingEffect, setTypingEffect] = useState('');

  const selectedTripData = trips.find(trip => trip.id === selectedTrip);
  const whatsappNumber = whatsappNumbers[Math.floor(Math.random() * whatsappNumbers.length)];

  // Reset step when widget opens
  useEffect(() => {
    if (isWhatsAppOpen) {
      setStep('welcome');
    }
  }, [isWhatsAppOpen]);

  useEffect(() => {
    if (isWhatsAppOpen && step === 'welcome') {
      const message = selectedTripData 
        ? `Hi! I'm interested in the ${selectedTripData.title}. Could you help me with booking details?`
        : "Hi VACATION IN EGYPT! I'm interested in booking a trip with you.";
      
      let i = 0;
      const interval = setInterval(() => {
        if (i <= message.length) {
          setTypingEffect(message.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isWhatsAppOpen, step, selectedTripData]);

  const sendToWhatsApp = () => {
    setStep('sending');
    
    // Real-Time Analytics tracking (GTM)
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'whatsapp_booking_click',
        trip: selectedTripData?.title || 'General Enquiry',
        travelers: formData.travelers,
        value: selectedTripData?.price ? (selectedTripData.price * formData.travelers) : 0,
        currency: 'USD'
      });
    }
    
    setTimeout(() => {
      const tripInfo = selectedTripData ? `\n\nTrip: ${selectedTripData.title}` : '';
      const message = `Hi VACATION IN EGYPT!${tripInfo}\n\nName: ${formData.name}\nPreferred Date: ${formData.date}\nTravelers: ${formData.travelers}\n\n${formData.message}`;
      
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encoded}`, '_blank');
      setStep('sent');
    }, 1500);
  };

  if (!isWhatsAppOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsWhatsAppOpen(false)} />
      
      <div className="relative w-full max-w-md bg-[#0F0F1A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#128C7E] to-[#075E54] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">VACATION IN EGYPT WhatsApp</h3>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Typically replies instantly
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWhatsAppOpen(false)}
            title="Close"
            aria-label="Close"
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'welcome' && (
            <div className="space-y-4">
              <div className="bg-[#128C7E]/10 p-4 rounded-xl border border-[#128C7E]/20">
                <p className="text-white/80 text-sm leading-relaxed">
                  {typingEffect}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
              
              {selectedTripData && (
                <div className="glass p-3 rounded-xl flex items-center gap-3">
                  <img
                    src={selectedTripData.image}
                    alt={selectedTripData.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-white font-medium text-sm">{selectedTripData.title}</p>
                    <p className="text-gold text-sm">{formatPrice(selectedTripData.price)}/person</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep('form')}
                className="w-full bg-[#128C7E] hover:bg-[#0e7a6e] text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Continue to Booking
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'form' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="wa-name" className="text-white/70 text-sm mb-1 block">Your Name</label>
                <input
                  id="wa-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Smith"
                  maxLength={60}
                  aria-label="Your Name"
                  className="w-full glass px-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold border border-transparent"
                />
              </div>

              <div>
                <label htmlFor="wa-date" className="text-white/70 text-sm mb-1 block">Preferred Date</label>
                <input
                  id="wa-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  aria-label="Preferred Date"
                  className="w-full glass px-4 py-3 rounded-xl text-white focus:outline-none focus:border-gold border border-transparent [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm mb-1 block">Number of Travelers</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                    className="w-10 h-10 glass rounded-lg text-white hover:bg-white/10 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-white font-bold text-lg w-8 text-center">{formData.travelers}</span>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, travelers: Math.min(20, prev.travelers + 1) }))}
                    className="w-10 h-10 glass rounded-lg text-white hover:bg-white/10 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="wa-requests" className="text-white/70 text-sm mb-1 block">Additional Requests</label>
                <textarea
                  id="wa-requests"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Any special requirements..."
                  rows={3}
                  maxLength={500}
                  aria-label="Additional Requests"
                  className="w-full glass px-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold border border-transparent resize-none"
                />
              </div>

              <button
                onClick={sendToWhatsApp}
                className="w-full bg-[#128C7E] hover:bg-[#0e7a6e] text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send via WhatsApp
              </button>
            </div>
          )}

          {step === 'sending' && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-[#128C7E] animate-spin mx-auto mb-4" />
              <p className="text-white font-medium">Opening WhatsApp...</p>
              <p className="text-white/50 text-sm mt-2">Preparing your booking request</p>
            </div>
          )}

          {step === 'sent' && (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-white font-medium text-lg">Message Sent!</p>
              <p className="text-white/50 text-sm mt-2">Our team will reply within minutes</p>
              <button
                onClick={() => {
                  setIsWhatsAppOpen(false);
                  setStep('welcome');
                }}
                className="mt-6 bg-gold-gradient px-6 py-2.5 rounded-xl text-white font-semibold"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white/5 p-3 text-center">
          <p className="text-white/30 text-xs flex items-center justify-center gap-1">
            <Phone className="w-3 h-3" />
            Multi-language support available
          </p>
        </div>
      </div>
    </div>
  );
}
