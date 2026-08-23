import { useState } from 'react';
import type { Trip } from '@/data/trips';
import { Calendar, Users, MessageCircle, ChevronRight, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function BookingEngine({ trip }: { trip: Trip; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const { formatPrice } = useApp();

  // Generate next 7 days for the date selector
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const TAX_RATE = 0.14;
  const total = trip.price * guests;

  return (
    <div className="flex flex-col h-full bg-navy border-l border-white/10 md:rounded-r-2xl md:border-l-0 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-white/5">
        <h3 className="text-xl font-bold text-ink mb-2">Book Your Experience</h3>
        <div className="flex gap-2">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-gold' : 'bg-white/10'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-gold' : 'bg-white/10'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-gold' : 'bg-white/10'}`} />
        </div>
      </div>

      <div className="flex-1 p-6">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h4 className="text-lg font-medium text-ink flex items-center gap-2">
              <Calendar className="text-gold w-5 h-5" />
              Select Date
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {dates.map((date, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(i)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${selectedDate === i
                      ? 'bg-gold/20 border-gold text-gold shadow-[0_0_15px_rgba(46,134,222,0.3)]'
                      : 'bg-white/5 border-white/10 text-ink hover:border-white/30'
                    }`}
                >
                  <span className="text-xs uppercase opacity-70">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-xl font-bold">
                    {date.getDate()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h4 className="text-lg font-medium text-ink flex items-center gap-2">
              <Users className="text-gold w-5 h-5" />
              Guests
            </h4>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-ink">Adults</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  aria-label="Decrease guests"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-ink"
                >-</button>
                <span className="text-xl font-bold w-4 text-center text-ink">{guests}</span>
                <button
                  onClick={() => setGuests(guests + 1)}
                  aria-label="Increase guests"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-ink"
                >+</button>
              </div>
            </div>

            {/* Live Pricing Update */}
            <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 mt-4">
              <div className="flex justify-between text-sm mb-2 text-ink/80">
                <span>{formatPrice(trip.price)} x {guests} guests</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2 text-ink/80">
                <span>Taxes & Fees</span>
                <span>{formatPrice(total * TAX_RATE)}</span>
              </div>
              <div className="w-full h-px bg-gold/20 my-2" />
              <div className="flex justify-between text-lg font-bold text-ink">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total * (1 + TAX_RATE))}</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-500/40 shadow-[0_0_30px_rgba(16,172,132,0.3)]">
              <MessageCircle className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-2xl font-bold text-ink">Almost There! 🎉</h4>
            <p className="text-ink/60 leading-relaxed">
              Your details are ready — {guests} {guests === 1 ? 'guest' : 'guests'} on{' '}
              <span className="text-gold font-semibold">{dates[selectedDate || 0].toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>.
            </p>
            <p className="text-ink/70 text-sm">
              Tap below to open WhatsApp and instantly confirm your reservation with our team. We reply within minutes.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left">
              <p className="text-xs text-ink/70 uppercase tracking-widest mb-2">Your Selection</p>
              <p className="text-sm text-ink font-medium">{trip.title}</p>
              <p className="text-xs text-ink/70 mt-1">{guests} {guests === 1 ? 'guest' : 'guests'} · {formatPrice(total * (1 + TAX_RATE))} total (incl. fees)</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/10 bg-white/5">
        {step < 3 ? (
          <button
            onClick={() => {
              if (step === 1 && selectedDate === null) return;
              setStep(step + 1);
            }}
            disabled={step === 1 && selectedDate === null}
            className="w-full py-4 rounded-xl bg-gold text-white font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 1 ? 'Continue to Guests' : 'Review & Confirm'}
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <a
            href={`https://wa.me/201224278490?text=${encodeURIComponent(`Hi! I'd like to book: ${trip.title}\nDate: ${dates[selectedDate || 0].toLocaleDateString()}\nGuests: ${guests}\nEstimated Total: ${formatPrice(total * 1.14)}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-[#128C7E] hover:bg-[#0e7a6e] text-white font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Confirm on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
