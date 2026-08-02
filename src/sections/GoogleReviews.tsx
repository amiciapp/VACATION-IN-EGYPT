import { Star, ExternalLink, Quote } from 'lucide-react';
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
  'Google': 'text-[#4285F4]',
  'TripAdvisor': 'text-[#34E0A1]',
  'Booking.com': 'text-[#003580]',
  'GetYourGuide': 'text-[#FF5533]',
};

export default function GoogleReviews() {
  return (
    <section className="section-padding py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Star className="w-3 h-3 fill-current" />
            5-Star Reviews
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-lg"
          >
            What Our Guests{' '}
            <span className="text-gold">Say</span>
          </motion.h2>

          {/* Aggregate rating row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-current" />
                ))}
              </div>
              <span className="text-white font-black text-xl drop-shadow-md">4.9</span>
              <span className="text-white/80 text-sm drop-shadow-md">/ 5.0</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <span className="text-white/90 text-sm font-medium drop-shadow-md">5,000+ verified reviews</span>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex gap-3 items-center">
              {['Google', 'TripAdvisor', 'Booking.com', 'GetYourGuide'].map(p => (
                <span
                  key={p}
                  className={`text-[10px] font-bold px-2 py-1 rounded-lg bg-[#0d1b2a]/80 backdrop-blur-sm border border-white/10 shadow-sm ${platformColorClasses[p]}`}
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group p-6 rounded-3xl bg-[#0d1b2a]/85 backdrop-blur-md border border-white/10 hover:bg-[#0d1b2a] hover:border-gold/40 transition-all duration-500 flex flex-col shadow-2xl"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-gold/30 mb-4 shrink-0" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-gold fill-current" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/85 text-sm leading-relaxed flex-1 mb-4 font-medium">
                "{review.text}"
              </p>

              {/* Trip badge */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60 px-3 py-1 rounded-full bg-gold/5 border border-gold/10">
                  {review.trip}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-black shadow-inner">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-white/60 text-xs">{review.country} · {review.date}</p>
                  </div>
                </div>
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg bg-white/5 border border-white/10 ${platformColorClasses[review.platform]}`}
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
          className="text-center mt-12"
        >
          <a
            href="https://g.page/r/vacationinegypt/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#0d1b2a]/85 backdrop-blur-md border border-white/10 text-white/90 hover:text-white hover:border-gold/40 transition-all text-sm font-semibold shadow-xl"
          >
            <ExternalLink className="w-4 h-4" />
            Leave a Review on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
