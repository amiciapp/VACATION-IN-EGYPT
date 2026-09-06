import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Phone,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { whatsappNumbers } from '@/data/trips';
import { useNavigate } from 'react-router';

export interface MomentStory {
  id: string;
  title: string;
  location: string;
  videoUrl: string;
  poster: string;
  avatar: string;
  guest: string;
  caption: string;
  tripId?: string;
  whatsappInquiry: string;
}

const STORIES: MomentStory[] = [
  {
    id: 'dolphins',
    title: 'Wild Dolphins',
    location: 'Hurghada Reef Sanctuary',
    videoUrl: '/videos/1.mp4',
    poster: '/images/dolphin-tour.jpg',
    avatar: '/images/dolphin-tour.jpg',
    guest: 'Sophia & Marcus • London 🇬🇧',
    caption: 'Swimming alongside wild spinner dolphins in the crystal turquoise lagoons of Hurghada.',
    tripId: 'hurg-dolphin-swim',
    whatsappInquiry: 'Private Dolphin Swimming Excursion in Hurghada'
  },
  {
    id: 'balloon',
    title: 'Sunrise Balloon',
    location: 'Luxor West Bank',
    videoUrl: '/videos/2.mp4',
    poster: '/images/hot-air-balloon.jpg',
    avatar: '/images/hot-air-balloon.jpg',
    guest: 'Elena & Julian • Zurich 🇨🇭',
    caption: 'Drifting quietly over the Valley of the Kings as dawn illuminates the Nile and pharaonic temples.',
    tripId: 'lux-sunrise-balloon',
    whatsappInquiry: 'Private Sunrise Hot Air Balloon Flight in Luxor'
  },
  {
    id: 'pyramids',
    title: 'Pyramids at Dusk',
    location: 'Giza Plateau',
    videoUrl: '/videos/3.mp4',
    poster: '/images/pyramids.jpg',
    avatar: '/images/pyramids.jpg',
    guest: 'Alexander V. • Monaco 🇲🇨',
    caption: 'Private golden hour access standing before King Khufu’s Great Pyramid with zero crowds.',
    tripId: 'cairo-vip-pyramids-gem',
    whatsappInquiry: 'Private VIP Giza Pyramids & Grand Egyptian Museum Tour'
  },
  {
    id: 'yacht',
    title: 'Private Yachting',
    location: 'Red Sea Islands',
    videoUrl: '/videos/Vacation.mp4',
    poster: '/images/yacht-charter.jpg',
    avatar: '/images/yacht-charter.jpg',
    guest: 'The Al-Maktoum Family • Dubai 🇦🇪',
    caption: 'Full-day 60ft luxury motor yacht charter to Orange Bay with private chef and champagne.',
    tripId: 'hurg-private-yacht-charter',
    whatsappInquiry: 'Private Luxury Yacht Charter in Hurghada'
  },
  {
    id: 'desert',
    title: 'Desert Dunes',
    location: 'Eastern Desert',
    videoUrl: '/videos/sitebg.mp4',
    poster: '/images/desert-safari.jpg',
    avatar: '/images/desert-safari.jpg',
    guest: 'Christian & Clara • Munich 🇩🇪',
    caption: 'Private sunset 4x4 Land Cruiser dune safari leading to an authentic candlelit Bedouin feast.',
    tripId: 'hurg-super-safari',
    whatsappInquiry: 'Private VIP Desert Safari & Stargazing Dinner'
  }
];

export default function MomentsStories() {
  const navigate = useNavigate();
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeStory = activeStoryIndex !== null ? STORIES[activeStoryIndex] : null;

  // Progress Bar Timer when a story is open
  useEffect(() => {
    if (activeStoryIndex === null || !isPlaying) return;

    setProgress(0);
    const duration = 12000; // 12 seconds per reel
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Advance to next story or close
          if (activeStoryIndex < STORIES.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
          } else {
            setActiveStoryIndex(null);
          }
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStoryIndex, isPlaying]);

  const handleNextStory = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex < STORIES.length - 1) {
        setActiveStoryIndex(activeStoryIndex + 1);
      } else {
        setActiveStoryIndex(null);
      }
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(activeStoryIndex - 1);
      } else {
        setActiveStoryIndex(0);
      }
    }
  };

  const handleWhatsAppBooking = (story: MomentStory) => {
    const rawNumber = whatsappNumbers[0] || '+201068800999';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello VIP Concierge! ✨\n\nI was watching the guest moments reel for *${story.title}* (${story.location}).\n\nI would like to reserve this private VIP experience. Please share available dates and pricing!`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="relative py-8 bg-[#030712]/90 border-y border-amber-500/20 backdrop-blur-xl z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
          {/* Stories Header Label */}
          <div className="shrink-0 pr-4 border-r border-slate-800 flex flex-col justify-center">
            <div className="flex items-center gap-1 text-[11px] font-black text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>VIP Stories</span>
            </div>
            <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
              Real Guest Moments
            </div>
          </div>

          {/* Story Circles */}
          {STORIES.map((story, index) => (
            <button
              key={story.id}
              onClick={() => {
                setActiveStoryIndex(index);
                setIsPlaying(true);
              }}
              className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer focus:outline-none transition-transform active:scale-95"
            >
              <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 shadow-md group-hover:shadow-amber-500/30 group-hover:scale-105 transition-all duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-slate-900 border-2 border-slate-950">
                  <img
                    src={story.avatar}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Live Play Dot */}
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-slate-950 border border-amber-400 flex items-center justify-center">
                  <Play className="w-2 h-2 text-amber-400 fill-amber-400" />
                </div>
              </div>

              <span className="text-[11px] font-semibold text-slate-300 group-hover:text-amber-300 transition-colors whitespace-nowrap">
                {story.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── FULL SCREEN VERTICAL STORY VIEWER ── */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-0 sm:p-4">
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0 z-0"
              onClick={() => setActiveStoryIndex(null)}
            />

            {/* Story Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full sm:h-[88vh] sm:max-w-md sm:rounded-3xl overflow-hidden bg-black shadow-2xl border sm:border-amber-400/40 z-10 flex flex-col justify-between"
            >
              {/* Top Segmented Progress Bars */}
              <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
                {STORIES.map((s, idx) => (
                  <div
                    key={s.id}
                    className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden"
                  >
                    <div
                      className="h-full bg-amber-400 transition-all duration-75 ease-linear"
                      style={{
                        width:
                          idx < activeStoryIndex!
                            ? '100%'
                            : idx === activeStoryIndex
                            ? `${progress}%`
                            : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="absolute top-6 left-3 right-3 z-30 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activeStory.avatar}
                    alt={activeStory.title}
                    className="w-9 h-9 rounded-full border border-amber-400 object-cover"
                  />
                  <div>
                    <div className="text-xs font-black leading-tight flex items-center gap-1">
                      <span>{activeStory.title}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400 text-slate-950" />
                    </div>
                    <div className="text-[10px] text-amber-300 font-medium">
                      {activeStory.location}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </button>

                  <button
                    onClick={() => setActiveStoryIndex(null)}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Video Element */}
              <div className="relative flex-1 w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  src={activeStory.videoUrl}
                  poster={activeStory.poster}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                {/* Left/Right Tap Zones for Navigation */}
                <div
                  className="absolute top-16 bottom-28 left-0 w-1/3 z-20 cursor-pointer"
                  onClick={handlePrevStory}
                />
                <div
                  className="absolute top-16 bottom-28 right-0 w-1/3 z-20 cursor-pointer"
                  onClick={handleNextStory}
                />

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              </div>

              {/* Bottom Caption & Floating CTA */}
              <div className="absolute bottom-4 left-4 right-4 z-30 space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-xl">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    {activeStory.guest}
                  </div>
                  <p className="text-white text-xs mt-1 leading-relaxed">
                    {activeStory.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {activeStory.tripId && (
                    <button
                      onClick={() => {
                        const tId = activeStory.tripId;
                        setActiveStoryIndex(null);
                        navigate(`/trip/${tId}`);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md border border-slate-700"
                    >
                      <span>View Itinerary</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => handleWhatsAppBooking(activeStory)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/40 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Book Experience</span>
                  </button>
                </div>
              </div>

              {/* External Desktop Arrows */}
              <button
                onClick={handlePrevStory}
                className="hidden sm:flex absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white items-center justify-center border border-white/20 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextStory}
                className="hidden sm:flex absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white items-center justify-center border border-white/20 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
