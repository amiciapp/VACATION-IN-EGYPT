import { ShieldCheck, Clock, Award, CreditCard } from 'lucide-react';
import { memo } from 'react';

const TrustBadges = memo(function TrustBadges() {

  return (
    <section className="relative py-12 border-y border-ink/5 z-10 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/videos/sitebg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-navy-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-transparent to-navy-dark opacity-50" />
      </div>

      <div className="relative section-padding max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="text-ink font-semibold text-sm mb-1">Secure Booking</h4>
              <p className="text-ink/70 text-xs">256-bit SSL Encryption</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <Clock className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="text-ink font-semibold text-sm mb-1">24/7 Support</h4>
              <p className="text-ink/70 text-xs">Always here for you</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <Award className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="text-ink font-semibold text-sm mb-1">Top Rated</h4>
              <p className="text-ink/70 text-xs">5-Star on TripAdvisor</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <CreditCard className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="text-ink font-semibold text-sm mb-1">Flexible Payment</h4>
              <p className="text-ink/70 text-xs">Book now, pay later</p>
            </div>
          </div>

        </div>

        {/* As seen in / Partners */}
        <div className="mt-12 pt-12 border-t border-ink/5 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-ink/70 text-xs uppercase tracking-widest font-semibold mb-6">Trusted By Excellence</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <span className="text-xl font-serif text-ink/70 italic font-bold">TripAdvisor</span>
            <span className="text-xl font-sans text-ink/70 font-bold tracking-tighter">Booking.com</span>
            <span className="text-xl font-serif text-ink/70 italic">GetYourGuide</span>
            <span className="text-xl font-sans text-ink/70 font-black">Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default TrustBadges;
