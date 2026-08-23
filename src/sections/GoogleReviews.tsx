import { Star, ExternalLink, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: "Sophie & Marcus",
    country: "🇩🇪 Germany",
    text: "The yacht cruise was the highlight of our honeymoon. Professional crew, stunning reefs, and the sunset champagne moment was pure magic. VACATION IN EGYPT exceeded every expectation.",
    rating: 5,
    trip: "Red Sea Yacht Cruise",
    platform: "Google",
    avatar: "SM",
    date: "March 2026"
  },
  {
    id: 2,
    name: "Ivan Petrov",
    country: "🇷🇺 Russia",
    text: "I've traveled worldwide, but the Pyramids day trip with VACATION IN EGYPT was exceptional. Our guide knew every secret of ancient Egypt. Worth every penny.",
    rating: 5,
    trip: "Pyramids Day Trip",
    platform: "TripAdvisor",
    avatar: "IP",
    date: "February 2026"
  },
  {
    id: 3,
    name: "Emma Richardson",
    country: "🇬🇧 United Kingdom",
    text: "The Nile cruise was like stepping back in time, but with 5-star comfort. Waking up to temple views from my suite window - unforgettable. Tamara the AI concierge made planning effortless.",
    rating: 5,
    trip: "Nile Cruise: Luxor to Aswan",
    platform: "Booking.com",
    avatar: "ER",
    date: "January 2026"
  },
  {
    id: 4,
    name: "Hans Weber",
    country: "🇨🇭 Switzerland",
    text: "Desert safari was pure adrenaline! Dune bashing, sandboarding, then a Bedouin dinner under a million stars. Perfectly organized from start to finish.",
    rating: 5,
    trip: "Sunset Desert Safari",
    platform: "GetYourGuide",
    avatar: "HW",
    date: "April 2026"
  },
  {
    id: 5,
    name: "Ahmed Al-Mansoori",
    country: "🇦🇪 UAE",
    text: "The private VIP concierge service in Cairo was flawless. They handled every detail from airport fast-track to private viewings at the museum. Truly 5-star luxury.",
    rating: 5,
    trip: "VIP Cairo Experience",
    platform: "Google",
    avatar: "AA",
    date: "March 2026"
  },
  {
    id: 6,
    name: "Laura Rossi",
    country: "🇮🇹 Italy",
    text: "Diving in the Red Sea with VACATION IN EGYPT's master instructors changed my life. The equipment was brand new, and they took us to reefs with zero crowds.",
    rating: 5,
    trip: "Red Sea Scuba Diving",
    platform: "TripAdvisor",
    avatar: "LR",
    date: "April 2026"
  }
];

const platformColorClasses: Record<string, string> = {
  'Google': 'text-[#4285F4] bg-[#4285F4]/10 border-[#4285F4]/30',
  'TripAdvisor': 'text-[#34E0A1] bg-[#34E0A1]/10 border-[#34E0A1]/30',
  'Booking.com': 'text-[#006CE4] bg-[#006CE4]/10 border-[#006CE4]/30',
  'GetYourGuide': 'text-[#FF5533] bg-[#FF5533]/10 border-[#FF5533]/30',
};

export default function GoogleReviews() {
  return (
    <section className="section-padding py-24 relative overflow-hidden bg-slate-950">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>5-Star Verified Guest Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight drop-shadow-lg"
          >
            What Our Guests <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Celebrate</span>
          </motion.h2>

          {/* Aggregate rating row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white font-black text-lg">4.9</span>
              <span className="text-white/60 text-xs">/ 5.0</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <span className="text-slate-300 text-sm font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              5,000+ verified traveler reviews
            </span>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="flex gap-2 items-center flex-wrap justify-center">
              {['Google', 'TripAdvisor', 'Booking.com', 'GetYourGuide'].map(p => (
                <span
                  key={p}
                  className={`text-[10px] font-extrabold px-3 py-1 rounded-xl border backdrop-blur-sm shadow-sm ${platformColorClasses[p]}`}
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative p-7 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_45px_-10px_rgba(245,158,11,0.25)] overflow-hidden cursor-pointer"
            >
              {/* Top Animated Color Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:rotate-6 transition-transform duration-300" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-amber-400/30 group-hover:text-amber-400/60 transition-colors" />
                </div>

                {/* Review text */}
                <p className="text-slate-200 text-sm leading-relaxed mb-5 font-normal">
                  "{review.text}"
                </p>

                {/* Trip badge */}
                <div className="mb-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                    {review.trip}
                  </span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center text-xs font-black shadow-lg group-hover:scale-105 transition-transform">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{review.name}</p>
                    <p className="text-slate-400 text-xs">{review.country} · {review.date}</p>
                  </div>
                </div>
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${platformColorClasses[review.platform]}`}
                >
                  {review.platform}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to leave review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="https://g.page/r/vacationinegypt/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white hover:text-amber-300 hover:border-amber-400/50 transition-all duration-300 text-sm font-bold shadow-xl hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Read 500+ More Reviews on Google</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
