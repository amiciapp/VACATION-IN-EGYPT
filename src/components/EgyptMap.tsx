import { useState } from 'react';
import { Navigation, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

const locations = [
  { id: 'Alexandria', name: 'Alexandria', x: 28, y: 18, description: 'The Pearl of the Mediterranean', image: 'https://images.unsplash.com/photo-1601058268499-e52658b8ebf8?q=80&w=600&auto=format&fit=crop' },
  { id: 'Cairo', name: 'Cairo', x: 35, y: 28, description: 'The Great Pyramids & Sphinx', image: '/images/pyramids.jpg' },
  { id: 'Hurghada', name: 'Hurghada', x: 65, y: 48, description: 'Red Sea Riviera & Luxury Yachts', image: '/images/hero-redsea.jpg' },
  { id: 'Sharm El Sheikh', name: 'Sharm El Sheikh', x: 75, y: 38, description: 'World-Class Diving', image: '/images/scuba-diving.jpg' },
  { id: 'Luxor', name: 'Luxor', x: 48, y: 68, description: 'Valley of the Kings & Karnak', image: '/images/luxor-temple.jpg' },
  { id: 'Aswan', name: 'Aswan', x: 52, y: 88, description: 'Nile Cruises & Philae Temple', image: '/images/nile-cruise.jpg' },
];

export default function EgyptMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-video glass-strong rounded-[2rem] overflow-hidden border-2 border-white/10 hover:border-gold/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_50px_rgba(46,134,222,0.2)] transition-all duration-700 group p-1 cursor-crosshair">
      {/* Outer Border Glow */}
      <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-transparent to-gold/10 opacity-50 group-hover:opacity-100 group-hover:from-gold/40 transition-all duration-700 rounded-[2rem] pointer-events-none" />
      
      {/* Inner Content Area */}
      <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-navy-dark/40">
        {/* Background Stylized Texture */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_35%_30%,_var(--tw-gradient-stops))] from-blue-900/40 via-navy to-navy-dark" />
        
        {/* Abstract Map Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Red Sea Coastline */}
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            d="M 50,0 L 70,30 L 80,45 L 90,100" 
            fill="none" 
            stroke="#2E86DE" 
            strokeWidth="0.6" 
          />
          {/* Nile River */}
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M 45,100 Q 55,70 45,50 T 35,20 T 28,15" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="0.8" 
          />
        </svg>

        {/* Floating Info Panel */}
        <div className="absolute top-8 left-8 z-20">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-gold/20 shadow-glow"
          >
            <Compass className="w-5 h-5 text-gold animate-spin-slow" />
            <span className="text-ink font-bold tracking-[0.2em] text-xs uppercase">Interactive Explorer</span>
          </motion.div>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-ink/60 text-sm mt-4 max-w-[240px] leading-relaxed font-medium"
          >
            Select a destination to discover curated luxury experiences.
          </motion.p>
        </div>

        {/* Location Pins */}
        {locations.map((loc) => (
          <Link
            key={loc.id}
            to={`/city/${loc.id}`}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            onMouseEnter={() => setActiveLocation(loc.id)}
            onMouseLeave={() => setActiveLocation(null)}
          >
            <div className="relative group/pin cursor-pointer p-4">
              {/* Animated Rings */}
              <AnimatePresence>
                {activeLocation === loc.id && (
                  <>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.2 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute inset-0 rounded-full bg-gold blur-md"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full border-2 border-gold"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Main Pin Dot */}
              <motion.div 
                animate={{ 
                  scale: activeLocation === loc.id ? 1.4 : 1,
                  backgroundColor: activeLocation === loc.id ? "#2E86DE" : "#ffffff"
                }}
                className="w-4 h-4 rounded-full border-[3px] border-navy shadow-2xl relative z-10"
              />
              
              {/* City Label (Smart Appearance) */}
              <motion.span
                animate={{ 
                  opacity: activeLocation === loc.id ? 1 : 0.6,
                  x: activeLocation === loc.id ? 12 : 8,
                  color: activeLocation === loc.id ? "#2E86DE" : "#ffffff"
                }}
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest hidden sm:block"
              >
                {loc.name}
              </motion.span>

              {/* Advanced Tooltip */}
              <AnimatePresence>
                {activeLocation === loc.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 10, x: "-50%" }}
                    className="absolute left-1/2 bottom-full mb-6 w-64 glass-strong p-0 overflow-hidden rounded-2xl border border-gold/30 shadow-2xl pointer-events-none"
                  >
                    <div className="w-full h-32 relative">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          loading="lazy"
                          width={256}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-[#0F0F1A]/20 to-transparent" />
                    </div>
                    <div className="p-4 pt-2 bg-white/90 backdrop-blur-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Navigation className="w-3 h-3 text-gold" />
                        <p className="text-gold font-black text-[10px] uppercase tracking-tighter">{loc.name}</p>
                      </div>
                      <p className="text-ink/90 text-xs font-medium leading-snug">{loc.description}</p>
                      <div className="mt-3 pt-2 border-t border-ink/5 flex justify-between items-center">
                        <span className="text-[8px] text-ink/70 uppercase font-bold tracking-widest">Click to explore</span>
                        <div className="w-1 h-1 rounded-full bg-gold" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
