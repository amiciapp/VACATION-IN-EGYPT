import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { whatsappNumbers } from '@/data/trips';
import {
  Car,
  Plane,
  ShieldCheck,
  Crown,
  Sparkles,
  Wifi,
  Coffee,
  CheckCircle2,
  Clock,
  Phone,
  ArrowRight,
  ChevronRight,
  Star,
  Luggage,
  UserCheck
} from 'lucide-react';

interface FleetVehicle {
  id: string;
  name: string;
  arabicName: string;
  category: string;
  capacity: string;
  luggage: string;
  image: string;
  tagline: string;
  features: string[];
  idealFor: string;
}

const FLEET: FleetVehicle[] = [
  {
    id: 'maybach-sclass',
    name: 'Mercedes-Benz Maybach & S-Class',
    arabicName: 'مرسيدس مايباخ وإس كلاس',
    category: 'Ultra-Luxury Executive',
    capacity: 'Up to 3 VIP Guests',
    luggage: '3 Large Suitcases',
    image: '/images/1.jpg',
    tagline: 'The pinnacle of private executive transport with acoustic privacy glass and massage seats.',
    features: [
      'Active multicontour massage seats',
      'Chilled champagne & cold towels',
      'High-speed 5G encrypted Wi-Fi',
      'Certified English/German speaking chauffeur'
    ],
    idealFor: 'VIP dignitaries, couples & executive airport transfers'
  },
  {
    id: 'vclass-starlight',
    name: 'Mercedes-Benz V-Class VIP Starlight',
    arabicName: 'مرسيدس في-كلاس ستارلايت VIP',
    category: 'VIP Luxury Mobile Suite',
    capacity: 'Up to 5 VIP Guests',
    luggage: '6 Large Suitcases',
    image: '/images/2.jpg',
    tagline: 'Custom Maybach captain chairs with an ambient starlight ceiling and electric privacy partition.',
    features: [
      'Rolls-Royce style starlight fiber-optic ceiling',
      'Fully reclining electric captain chairs with leg rests',
      'Nespresso machine, minibar & cold beverages',
      'HDMI Apple TV entertainment display'
    ],
    idealFor: 'Families, business delegations & private day expeditions'
  },
  {
    id: 'sprinter-presidential',
    name: 'Mercedes-Benz Sprinter Presidential',
    arabicName: 'مرسيدس سبرينتر الرئاسي',
    category: 'Presidential Luxury Van',
    capacity: 'Up to 9 VIP Guests',
    luggage: '12 Large Suitcases',
    image: '/images/3.jpg',
    tagline: 'Spacious walk-in executive cabin designed for delegations and large families demanding ultimate space.',
    features: [
      'Generous headroom with individual leather recliners',
      'Individual AC climate controls & USB-C ports',
      'Dedicated luggage trunk compartment',
      'Professional security-trained private driver'
    ],
    idealFor: 'Extended families, group charters & Nile transfers'
  },
  {
    id: 'landcruiser-sahara',
    name: 'Toyota Land Cruiser 4x4 Sahara Edition',
    arabicName: 'تويوتا لاند كروزر إصدار الصحراء',
    category: 'Luxury Off-Road Expedition',
    capacity: 'Up to 4 VIP Guests',
    luggage: '4 Large Suitcases',
    image: '/images/desert-safari.jpg',
    tagline: 'Uncompromising desert capability paired with plush leather interior for off-road archaeological exploration.',
    features: [
      'Heavy-duty desert suspension with smooth ride',
      'Reinforced cabin with panoramic safari windows',
      'Satellite phone & emergency medical telemetry',
      'Expert Bedouin master desert navigator'
    ],
    idealFor: 'Desert safari, remote oasis & Sinai exploration'
  }
];

export default function VIPFleetFastTrack() {
  const [activeTab, setActiveTab] = useState<'fleet' | 'fasttrack'>('fleet');
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicle>(FLEET[0]);

  const handleWhatsAppInquiry = (subject: string) => {
    const rawNumber = whatsappNumbers[0] || '+201068800999';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello VIP Chauffeur & Protocol Team! ✨\n\nI would like to inquire about reserving:\n*${subject}*\n\nPlease provide me with hourly/daily rates, private chauffeur availability, and booking procedure.\n\nThank you!`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="vip-fleet" className="relative py-28 lg:py-36 overflow-hidden bg-[#040814]">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-teal-500/10 border border-amber-400/30 text-amber-300 font-bold text-xs tracking-[0.25em] uppercase mb-4 shadow-sm backdrop-blur-md">
            <Car className="w-3.5 h-3.5 text-amber-400" />
            <span>Royal Logistics & Hospitality</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            VIP Mercedes Fleet & <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Airport Fast-Track</span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            Travel across Egypt with the absolute highest tier of discretion, safety, and comfort. From jet-bridge greetings in Cairo to private Mercedes Maybach chauffeurs.
          </p>

          {/* Dual Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mt-8 shadow-xl">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'fleet'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Private Chauffeur Fleet</span>
            </button>

            <button
              onClick={() => setActiveTab('fasttrack')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'fasttrack'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Airport VIP Fast-Track</span>
            </button>
          </div>
        </div>

        {/* ── TAB 1: FLEET SHOWCASE ── */}
        {activeTab === 'fleet' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Vehicle Selector List */}
            <div className="lg:col-span-5 space-y-3">
              {FLEET.map(vehicle => {
                const isSelected = selectedVehicle.id === vehicle.id;
                return (
                  <div
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-xl'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-amber-400'
                        }`}
                      >
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{vehicle.name}</div>
                        <div className="text-[10px] text-amber-400/80 font-medium">{vehicle.category}</div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Vehicle Spotlight Display */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-slate-900 border border-amber-400/40 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                {/* Vehicle Hero Image */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-slate-800">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/90 text-slate-950 text-xs font-black uppercase tracking-wider">
                      {selectedVehicle.category}
                    </span>
                    <span className="text-white text-xs font-bold px-3 py-1 rounded-lg bg-slate-950/80 border border-white/10">
                      {selectedVehicle.capacity}
                    </span>
                  </div>
                </div>

                {/* Specs & Description */}
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedVehicle.name}</h3>
                  <p className="text-amber-400 text-xs font-medium mt-0.5">{selectedVehicle.arabicName}</p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {selectedVehicle.tagline}
                  </p>

                  {/* Feature Pills */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedVehicle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Capacity & Luggage Badges */}
                  <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-amber-400" />
                      <span>{selectedVehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Luggage className="w-4 h-4 text-amber-400" />
                      <span>{selectedVehicle.luggage}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-4 h-4 text-teal-400" />
                      <span>Complimentary 5G Wi-Fi</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Chauffeur Service</span>
                      <div className="text-sm font-bold text-white">Private Dedicated Driver Included</div>
                    </div>

                    <button
                      onClick={() => handleWhatsAppInquiry(`Private Chauffeur: ${selectedVehicle.name}`)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Book Vehicle on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: AIRPORT VIP FAST-TRACK SHOWCASE ── */}
        {activeTab === 'fasttrack' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-slate-900/90 border border-amber-400/30 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Fast-Track Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
                    Cairo (CAI) & Hurghada (HRG) Protocol
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 leading-tight">
                    Diplomatic-Style Jet-Bridge Meet & Fast-Track Service
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    Skip all commercial queues. An official airport protocol officer greets you right at the aircraft cabin door with personalized signage, guides you through expedited VIP immigration, manages your luggage, and escorts you directly into your waiting private Mercedes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { title: 'Jet-Bridge Door Greeting', desc: 'Protocol escort meets you the moment you exit the plane.' },
                    { title: 'Expedited VIP Immigration', desc: 'Priority customs and visa processing with zero waiting.' },
                    { title: 'Luggage Porter Handling', desc: 'Dedicated baggage collection and escort to vehicle.' },
                    { title: 'VIP Lounge Access', desc: 'Complimentary refreshments and Wi-Fi upon departure.' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => handleWhatsAppInquiry('Airport VIP Fast-Track Service (Meet & Assist)')}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-black tracking-wider uppercase transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/40 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Reserve Airport Fast-Track via WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Protocol Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-amber-400/40 shadow-2xl bg-slate-950">
                  <img
                    src="/images/pyramids.jpg"
                    alt="Cairo VIP Airport"
                    className="w-full h-72 object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                        Official Partner
                      </span>
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-amber-300">Available 24/7 at:</div>
                      <div className="text-sm font-black text-white">• Cairo International (CAI) - Terminals 1, 2, 3</div>
                      <div className="text-sm font-black text-white">• Hurghada International (HRG)</div>
                      <div className="text-sm font-black text-white">• Sharm El Sheikh International (SSH)</div>
                      <div className="text-sm font-black text-white">• Sphinx International Airport (SPX)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
