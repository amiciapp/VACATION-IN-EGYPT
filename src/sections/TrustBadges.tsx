import { ShieldCheck, Clock, Award, CreditCard, Sparkles } from 'lucide-react';
import { memo } from 'react';
import { motion } from 'framer-motion';

const badges = [
  {
    icon: ShieldCheck,
    title: 'Secure VIP Booking',
    desc: '256-bit Bank Grade SSL',
    gradient: 'from-cyan-500 to-blue-600',
    shadow: 'shadow-cyan-500/20'
  },
  {
    icon: Clock,
    title: '24/7 Dedicated Concierge',
    desc: 'Instant WhatsApp Assistance',
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/20'
  },
  {
    icon: Award,
    title: '5-Star Excellence',
    desc: 'Top Rated on TripAdvisor',
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20'
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    desc: 'Reserve with Zero Hidden Fees',
    gradient: 'from-purple-500 to-indigo-600',
    shadow: 'shadow-purple-500/20'
  }
];

const partners = [
  { name: 'TripAdvisor', rating: '5.0 ★★★★★' },
  { name: 'Booking.com', rating: '9.8 / 10 Superb' },
  { name: 'GetYourGuide', rating: '4.9 ★★★★★' },
  { name: 'Google Reviews', rating: '4.9 ★★★★★' }
];

const TrustBadges = memo(function TrustBadges() {
  return (
    <section className="relative py-16 z-10 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25"
        >
          <source src="/videos/sitebg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative rounded-3xl p-6 bg-slate-900/70 backdrop-blur-2xl border border-white/10 hover:border-white/25 shadow-xl transition-all duration-300 flex items-center gap-4 cursor-pointer overflow-hidden"
              >
                <div className={`w-13 h-13 rounded-2xl bg-gradient-to-r ${badge.gradient} p-3 flex items-center justify-center shrink-0 shadow-lg ${badge.shadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 group-hover:text-cyan-300 transition-colors">
                    {badge.title}
                  </h4>
                  <p className="text-slate-400 text-xs font-medium">
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Partners Row */}
        <div className="mt-12 pt-10 border-t border-white/10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <p className="text-slate-400 text-[11px] uppercase tracking-[0.25em] font-extrabold">
              Global Trust & Verified Excellence
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14">
            {partners.map((partner, pIdx) => (
              <div 
                key={pIdx} 
                className="group flex flex-col items-center px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] text-amber-400 font-bold mt-0.5">
                  {partner.rating}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default TrustBadges;
