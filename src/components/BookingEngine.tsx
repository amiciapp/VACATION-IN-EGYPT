import { useState } from 'react';
import type { Trip } from '@/data/trips';
import { Calendar, Users, ChevronRight, Phone, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { whatsappNumbers } from '@/data/trips';

export default function BookingEngine({ trip }: { trip: Trip; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const { formatPrice } = useApp();

  const whatsappNumber = (whatsappNumbers && whatsappNumbers[0]) ? whatsappNumbers[0].replace('+', '') : '201131312402';

  // Generate next 14 days for the date selector
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const total = trip.price * guests;

  return (
    <div className="flex flex-col h-full bg-[#0d1626]/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white tracking-wide">Instant Reservation</h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30">
            Step {step} of 3
          </span>
        </div>
        <div className="flex gap-2">
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-gradient-to-r from-gold to-amber-400' : 'bg-white/10'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-gradient-to-r from-gold to-amber-400' : 'bg-white/10'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-gradient-to-r from-gold to-amber-400' : 'bg-white/10'}`} />
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                <Calendar className="text-gold w-4 h-4" />
                Select Preferred Date
              </h4>
              <span className="text-xs text-white/50">Next 14 days</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {dates.map((date, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedDate(i)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    selectedDate === i
                      ? 'bg-gold/20 border-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                      : 'bg-white/[0.04] border-white/10 text-white/70 hover:border-gold/40 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] uppercase font-semibold opacity-70">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-base font-bold text-white my-0.5">
                    {date.getDate()}
                  </span>
                  <span className="text-[9px] text-white/40 uppercase">
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <Users className="text-gold w-4 h-4" />
              Number of Travelers
            </h4>
            
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <div>
                <span className="text-white font-semibold block text-sm">Guests (Adults & Children)</span>
                <span className="text-xs text-white/40">Includes all tickets & hotel accommodations</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  aria-label="Decrease guests"
                  className="w-9 h-9 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 text-white font-bold text-lg transition-colors"
                >-</button>
                <span className="text-xl font-bold w-6 text-center text-white">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests(guests + 1)}
                  aria-label="Increase guests"
                  className="w-9 h-9 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 text-white font-bold text-lg transition-colors"
                >+</button>
              </div>
            </div>

            {/* Live Pricing Breakdown */}
            <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 space-y-2">
              <div className="flex justify-between text-xs text-white/80">
                <span>{formatPrice(trip.price)} × {guests} {guests === 1 ? 'traveler' : 'travelers'}</span>
                <span className="font-semibold text-white">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-xs text-white/80">
                <span>Private Egyptologist & All Entrance Fees</span>
                <span className="text-green-400 font-semibold">Included</span>
              </div>
              <div className="w-full h-px bg-gold/20 my-2" />
              <div className="flex justify-between text-base font-bold text-white pt-1">
                <span>Total Guaranteed Price</span>
                <span className="text-gold text-lg">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300 text-center">
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/40 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
              <CheckCircle2 className="w-7 h-7 text-green-400" />
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white">Booking Summary Ready!</h4>
              <p className="text-xs text-white/60 mt-1">
                Ready for <span className="text-gold font-semibold">{guests} {guests === 1 ? 'traveler' : 'travelers'}</span> on{' '}
                <span className="text-white font-semibold">{dates[selectedDate || 0].toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left space-y-1.5 text-xs">
              <p className="text-white/40 uppercase tracking-widest text-[10px]">Selected Experience</p>
              <p className="text-white font-bold">{trip.title}</p>
              <div className="flex justify-between items-center pt-2 border-t border-white/10 text-white/80">
                <span>Total Amount:</span>
                <span className="text-gold font-bold text-sm">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-5 border-t border-white/10 bg-white/[0.02]">
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b8860b] via-[#D4AF37] to-[#f3cf65] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
          >
            {step === 1 ? 'Select Date & Continue' : 'Review & Confirm'}
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi VACATION IN EGYPT! 🇪🇬\n\nI would like to book:\n*${trip.title}*\n\n📅 Date: ${dates[selectedDate || 0].toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}\n👥 Travelers: ${guests}\n💰 Estimated Price: ${formatPrice(total)}\n\nPlease confirm availability and details!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
          >
            <Phone className="w-4 h-4" />
            Book Instantly on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
