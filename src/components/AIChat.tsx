import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/context/AppContext';
import { trips, whatsappNumbers } from '@/data/trips';
import type { Trip } from '@/data/trips';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import {
  X,
  Send,
  User,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  Star,
  Clock,
  ChevronRight,
  Maximize2,
  Minimize2,
  Waves,
  Calendar,
  Phone,
  ShieldCheck,
  Flame,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendedTrips?: Trip[];
  advisory?: {
    type: 'sea' | 'weather' | 'vip';
    title: string;
    text: string;
  };
  showWhatsAppCta?: boolean;
}

interface LeadInfo {
  interest: string;
  date: string;
  travelers: string;
  specificTrip?: Trip;
}

interface SpeechRecognitionResultItem {
  transcript: string;
}

interface SpeechRecognitionResultList {
  [index: number]: {
    [index: number]: SpeechRecognitionResultItem;
  };
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: new () => ISpeechRecognition;
  webkitSpeechRecognition?: new () => ISpeechRecognition;
}

function createWelcomeMessage(weather?: { temp: number; seaTemp: number; windSpeed: number; seaStatus: string }): Message {
  const topPicks = trips.filter(t => t.hot || t.rating >= 4.9).slice(0, 2);
  const isSeaBreezy = weather ? (weather.windSpeed > 22 || weather.seaStatus.includes('Choppy')) : false;
  const weatherSnippet = isSeaBreezy
    ? `Right now, Egypt is a balmy **${weather?.temp ?? 28}°C**, though the Red Sea has a fresh breeze with moderate swells — an absolute paradise for sightseeing, pyramids, or desert adventures!`
    : `Conditions in Egypt are sublime today: **${weather?.temp ?? 28}°C** with calm, crystal-clear Red Sea waters at **${weather?.seaTemp ?? 24}°C** — perfect for both private yachting and historical exploration!`;

  return {
    id: 'welcome',
    role: 'assistant',
    content: `Welcome to **VACATION IN EGYPT VIP**. ⚜️\n\nI am **Tamara**, your Senior Luxury Travel Concierge. Whether you dream of gliding across the Nile in 5-star elegance, private after-hours Pyramids access, or a chartered yacht across the Red Sea, I am here to tailor every detail to perfection.\n\n${weatherSnippet}\n\nHow may I curate your journey today? Tell me what speaks to your heart, or select one of our signature experiences below:`,
    timestamp: new Date(),
    recommendedTrips: topPicks,
    showWhatsAppCta: false,
    advisory: isSeaBreezy
      ? {
          type: 'sea',
          title: 'Live Concierge Advisory',
          text: 'Fresh sea breeze today. Ideal for Pyramids, Luxor temples, or Desert Safari.'
        }
      : undefined
  };
}

export default function AIChat() {
  const { isChatOpen, setIsChatOpen, weather, formatPrice } = useApp();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(() => [createWelcomeMessage(weather)]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lead, setLead] = useState<LeadInfo>({ interest: '', date: '', travelers: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isChatOpen]);

  // Focus trap & accessibility
  useEffect(() => {
    if (!isChatOpen) return;
    const chat = chatRef.current;
    if (!chat) return;
    const inputEl = chat.querySelector<HTMLInputElement>('input');
    inputEl?.focus();
  }, [isChatOpen]);

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const speechWindow = window as unknown as WindowWithSpeechRecognition;
      const SpeechRecognitionConstructor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
      if (SpeechRecognitionConstructor) {
        const recognition = new SpeechRecognitionConstructor();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0]?.[0]?.transcript;
          if (transcript) {
            setInput(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

    const cleanedText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/•/g, '')
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .replace(/\n/g, '. ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.rate = 0.95;
    utterance.pitch = 1.2;
    utterance.lang = 'en-US';
    const voices = speechSynthesis.getVoices();
    const refinedVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English Female') || v.name.includes('Female'));
    if (refinedVoice) utterance.voice = refinedVoice;
    speechSynthesis.speak(utterance);
  };

  // Sales & Knowledge Brain
  const processQuery = (rawText: string): Omit<Message, 'id' | 'timestamp'> => {
    const text = rawText.toLowerCase();

    // 1. Check if user asked about weather / sea conditions
    if (text.includes('weather') || text.includes('temperature') || text.includes('wind') || text.includes('sea condition') || text.includes('cold') || text.includes('waves') || text.includes('rain')) {
      const isCold = weather.temp < 20;
      const isChoppy = weather.windSpeed > 22 || weather.seaStatus.includes('Choppy');

      if (isChoppy || isCold) {
        const landPicks = trips.filter(t => t.category === 'Historical' || t.category === 'Adventure').slice(0, 2);
        return {
          role: 'assistant',
          content: `Here is your live Egypt meteorological report: ☀️

• **Air Temperature:** ${weather.temp}°C (${weather.condition})
• **Red Sea Surface:** ${weather.seaTemp}°C
• **Wind & Waters:** ${weather.windSpeed} km/h • **${weather.seaStatus}**

**Honest Concierge Advice:** Because the sea currently has a noticeable breeze with swells, an offshore yacht cruise might feel somewhat bumpy for sensitive sailors. 

Instead, I strongly suggest taking advantage of today's crisp, sunny skies for our **world-class land & culture experiences** — such as the Pyramids & Grand Egyptian Museum, or an exhilarating desert sunset quad safari! We can easily schedule your Red Sea cruise for later in the week when the waters are glass-calm.`,
          recommendedTrips: landPicks,
          advisory: {
            type: 'sea',
            title: 'Sea Status Advisory',
            text: `Wind speed is ${weather.windSpeed} km/h with active swells. Land and desert tours recommended today.`
          },
          showWhatsAppCta: true
        };
      } else {
        const seaPicks = trips.filter(t => t.category === 'Sea' || t.category === 'Cruise').slice(0, 2);
        return {
          role: 'assistant',
          content: `The weather in Egypt today is absolute perfection! 💎

• **Air Temperature:** ${weather.temp}°C under radiant blue skies (${weather.condition})
• **Red Sea Water:** ${weather.seaTemp}°C — tranquil, warm, and crystal-clear
• **Marine Conditions:** **${weather.seaStatus}** (${weather.windSpeed} km/h breeze)

It is a flawless day for private yacht charters, Orange Bay island retreats, or dolphin encounters. Here are our top luxury sea voyages currently open for booking:`,
          recommendedTrips: seaPicks,
          showWhatsAppCta: true
        };
      }
    }

    // 2. Search for a specific trip in our 52-trip portfolio
    const matchedTrip = trips.find(t => {
      const tripTitle = t.title.toLowerCase();
      const tripId = t.id.toLowerCase();
      return (
        text.includes(tripId) ||
        (text.includes('orange bay') && tripTitle.includes('orange bay')) ||
        (text.includes('grand egyptian museum') && tripTitle.includes('grand egyptian museum')) ||
        (text.includes('gem') && tripTitle.includes('gem')) ||
        (text.includes('balloon') && tripTitle.includes('balloon')) ||
        (text.includes('abu simbel') && tripTitle.includes('abu simbel')) ||
        (text.includes('dune') && tripTitle.includes('dune')) ||
        (text.includes('quad') && tripTitle.includes('quad')) ||
        (text.includes('safari') && tripTitle.includes('safari')) ||
        (text.includes('alexandria') && tripTitle.includes('alexandria')) ||
        (text.includes('dolphins') && tripTitle.includes('dolphin')) ||
        (text.includes('pyramid') && tripTitle.includes('pyramid')) ||
        (text.includes('karnak') && tripTitle.includes('karnak')) ||
        (text.includes('nile') && tripTitle.includes('nile'))
      );
    });

    if (matchedTrip) {
      setLead(prev => ({ ...prev, specificTrip: matchedTrip }));

      // Detail-specific questions
      if (text.includes('included') || text.includes('include') || text.includes('provide') || text.includes('what do i get')) {
        return {
          role: 'assistant',
          content: `Here are the complete VIP inclusions for **${matchedTrip.title}**:

${matchedTrip.included.map(inc => `• ✨ **${inc}**`).join('\n')}

**Concierge Privilege:** When booked via our VIP WhatsApp desk, this experience also includes complimentary hotel private transfer upgrades and VIP assistance!`,
          recommendedTrips: [matchedTrip],
          showWhatsAppCta: true
        };
      }

      if (text.includes('highlight') || text.includes('itinerary') || text.includes('schedule') || text.includes('program')) {
        return {
          role: 'assistant',
          content: `Here is the curated itinerary & highlights for **${matchedTrip.title}**:

${matchedTrip.highlights.map(h => `• 🏛️ ${h}`).join('\n')}

**Duration:** ${matchedTrip.duration}
**Group Dynamic:** ${matchedTrip.groupSize}

Would you like me to hold a private slot or pair this with our complimentary VIP airport transfer?`,
          recommendedTrips: [matchedTrip],
          showWhatsAppCta: true
        };
      }

      // General specific trip query
      return {
        role: 'assistant',
        content: `**${matchedTrip.title}** is one of our most requested 5-star experiences in ${matchedTrip.location}. ⭐ ${matchedTrip.rating} (${matchedTrip.reviews} reviews)

${matchedTrip.description}

• **Duration:** ${matchedTrip.duration}
• **Private VIP Rate:** From ${formatPrice(matchedTrip.price)} per guest
• **Exclusivity:** ${matchedTrip.groupSize}

${matchedTrip.highlights.slice(0, 3).map(h => `• ✨ ${h}`).join('\n')}

Would you like to lock in this experience with our exclusive WhatsApp secret perk (such as complimentary private airport chauffeur)?`,
        recommendedTrips: [matchedTrip],
        showWhatsAppCta: true
      };
    }

    // 3. Price / Budget / VIP discounts
    if (text.includes('price') || text.includes('cost') || text.includes('discount') || text.includes('deal') || text.includes('cheap') || text.includes('budget') || text.includes('how much')) {
      const bestDeals = trips.filter(t => t.discount || t.hot).slice(0, 2);
      return {
        role: 'assistant',
        content: `As a boutique luxury concierge, we offer **transparent, 5-star value** with no hidden fees. 

💎 **The Concierge Advantage:**
• **Exclusive Offline Rates:** Our direct WhatsApp desk has special promotions up to **20% below public portal rates**.
• **Complimentary VIP Perks:** Private chauffeur transfers, luxury cold towel service, and flexible zero-penalty cancellation.
• **Best Price Guarantee:** We match and exceed any comparable 5-star operator in Egypt.

Here are two of our current high-value privileged packages:`,
        recommendedTrips: bestDeals.length ? bestDeals : trips.slice(0, 2),
        showWhatsAppCta: true
      };
    }

    // 4. Yacht / Sea / Beach interests
    if (text.includes('yacht') || text.includes('sea') || text.includes('boat') || text.includes('diving') || text.includes('snorkeling') || text.includes('island')) {
      const seaTrips = trips.filter(t => t.category === 'Sea').slice(0, 3);
      const isChoppy = weather.windSpeed > 22;

      let adviceText = `The Red Sea is legendary for its crystalline waters and vibrant coral gardens.`;
      if (isChoppy) {
        adviceText += ` Note that today has an active breeze (${weather.windSpeed} km/h), so I recommend reserving for tomorrow or booking a sheltered lagoon cruise like Orange Bay!`;
      }

      return {
        role: 'assistant',
        content: `Ah, an ocean aficionado! 🌊 

${adviceText}

Our private yachts come fully equipped with dedicated crew, gourmet chef lunch, and professional diving instructors. Here are our top-rated maritime journeys:`,
        recommendedTrips: seaTrips,
        showWhatsAppCta: true
      };
    }

    // 5. Pyramids / History / Cairo / Luxor
    if (text.includes('pyramid') || text.includes('history') || text.includes('cairo') || text.includes('luxor') || text.includes('ancient') || text.includes('museum') || text.includes('tomb') || text.includes('temple')) {
      const histTrips = trips.filter(t => t.category === 'Historical').slice(0, 3);
      return {
        role: 'assistant',
        content: `Standing before the ancient wonders of Egypt is a transformative, once-in-a-lifetime experience. 🏛️

All our historical expeditions include **licensed English/multilingual Egyptologist scholars**, private air-conditioned VIP Mercedes transports, and skip-the-line admissions.

Here are the crown jewels of our heritage collection:`,
        recommendedTrips: histTrips,
        showWhatsAppCta: true
      };
    }

    // 6. Desert / Quad / Safari
    if (text.includes('desert') || text.includes('safari') || text.includes('quad') || text.includes('adventure') || text.includes('dune') || text.includes('buggy') || text.includes('bedouin')) {
      const advTrips = trips.filter(t => t.category === 'Adventure').slice(0, 3);
      return {
        role: 'assistant',
        content: `The majesty of the Egyptian Eastern Desert at golden hour is unmatched. 🏜️

Imagine riding private high-performance quads across crimson dunes, followed by a stargazing feast with Bedouin hosts in a private mountain oasis.

Here are our finest desert journeys:`,
        recommendedTrips: advTrips,
        showWhatsAppCta: true
      };
    }

    // 7. Dates & booking intent
    if (text.includes('book') || text.includes('reserve') || text.includes('dates') || text.includes('when') || text.includes('tomorrow') || text.includes('next week')) {
      setShowDatePicker(true);
      return {
        role: 'assistant',
        content: `I would be delighted to coordinate your reservation! 🗓️

Please select your anticipated travel date below, or let me know:
1. **How many guests** are in your party?
2. **Which destination or hotel** you are staying at?

Our WhatsApp VIP desk can lock in your dates with **zero prepayment required** right now!`,
        showWhatsAppCta: true
      };
    }

    // 8. Polite greeting or fallback smart salesperson
    const generalPicks = trips.filter(t => t.hot).slice(0, 2);
    return {
      role: 'assistant',
      content: `Delighted to assist you! 🌟 

Whether you seek private yacht tranquility, ancient temple grandeur, or adrenaline across desert dunes, our concierge team guarantees an elite, stress-free Egyptian vacation.

Tell me a bit about what makes your dream trip:
• What kind of experience excites you most?
• Or would you like our direct WhatsApp team to send you our **private VIP catalog with exclusive seasonal rates**?`,
      recommendedTrips: generalPicks,
      showWhatsAppCta: true
    };
  };

  const handleSend = (overrideText?: string) => {
    const text = overrideText ?? input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const processed = processQuery(userMsg.content);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        timestamp: new Date(),
        ...processed
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      speak(processed.content);
    }, 500 + Math.random() * 400);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setShowDatePicker(false);
    const formatted = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setLead(prev => ({ ...prev, date: formatted }));
    handleSend(`I plan to travel on ${formatted}`);
  };

  const handleConnectWhatsApp = (tripTitle?: string) => {
    const phone = whatsappNumbers[0].replace(/[^0-9]/g, '');
    let msg = `Hello VACATION IN EGYPT VIP Concierge! I am chatting with Tamara on your website.`;
    if (tripTitle) {
      msg += ` I would love to check VIP availability and exclusive rates for: *${tripTitle}*.`;
    } else if (lead.specificTrip) {
      msg += ` I am interested in: *${lead.specificTrip.title}*.`;
    }
    if (lead.date) {
      msg += ` Anticipated date: ${lead.date}.`;
    }
    msg += ` Please share your secret offline rates and complimentary VIP perks. Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  const quickChips = [
    { label: '☀️ Egypt Weather & Sea', action: () => handleSend('What is the weather and sea condition today in Egypt?') },
    { label: '🛥️ Luxury Yacht & Diving', action: () => handleSend('Show me luxury yacht and Red Sea diving trips') },
    { label: '🏛️ VIP Pyramids & Cairo', action: () => handleSend('Tell me about your private Pyramids & Cairo tours') },
    { label: '🎈 Luxor Hot Air Balloon', action: () => handleSend('Tell me more about the Luxor Hot Air Balloon Sunrise tour') },
    { label: '🏝️ Orange Bay Island', action: () => handleSend('Tell me about Orange Bay Snorkeling Trip Hurghada') },
    { label: '💎 Secret WhatsApp Rates', action: () => handleSend('What exclusive secret VIP discounts do you have on WhatsApp?') },
  ];

  if (!isChatOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-500 ease-out ${
        isExpanded
          ? 'inset-3 md:inset-auto md:bottom-8 md:right-8 md:w-[620px] md:h-[760px] max-h-[92vh]'
          : 'bottom-4 right-4 md:bottom-8 md:right-8 w-[410px] max-w-[calc(100vw-2rem)] h-[630px] max-h-[85vh]'
      }`}
    >
      <div
        ref={chatRef}
        className="w-full h-full rounded-[28px] bg-slate-950/95 backdrop-blur-2xl border border-amber-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-label="VIP Luxury Travel Concierge"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-28 bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 px-5 py-4 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-b border-amber-400/20 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Bespoke Royal Gold Emblem Avatar */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-500 p-[1.5px] shadow-lg shadow-amber-500/25">
                <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center p-1 overflow-hidden">
                  <img src="/logo.jpg" alt="VACATION IN EGYPT" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            </div>

            {/* Title & Status */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm tracking-tight">Tamara</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-bold border border-amber-400/30 whitespace-nowrap tracking-wider uppercase">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  VIP Concierge
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">Online</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Luxury Travel Advisor</span>
              </div>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Voice Toggle */}
            <button
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              aria-label={isVoiceEnabled ? 'Disable Voice Voiceover' : 'Enable Voice Voiceover'}
              title={isVoiceEnabled ? 'Voice enabled' : 'Voice muted'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isVoiceEnabled
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Expand / Minimize */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Compact View' : 'Expand View'}
              title={isExpanded ? 'Compact View' : 'Expand View'}
              className="hidden md:flex w-8 h-8 rounded-full items-center justify-center bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={() => setIsChatOpen(false)}
              aria-label="Close Concierge"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-slate-400 hover:text-red-400 hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Haute-Luxe Live Weather & Marine Telemetry Ribbon */}
        <div className="relative z-10 px-4 py-2 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-amber-400/15 flex items-center justify-between text-[11px] backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1 text-amber-300 font-medium">
              <span>☀️</span> {weather.temp}°C
            </span>
            <span className="text-slate-700">|</span>
            <span className="inline-flex items-center gap-1 text-teal-300 font-medium">
              <Waves className="w-3.5 h-3.5 text-teal-400" /> Sea {weather.seaTemp}°C
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 text-[10px] hidden sm:inline">{weather.seaStatus}</span>
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Verified Tour Operator
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Role Avatar */}
              <div className="shrink-0 mt-0.5">
                {msg.role === 'assistant' ? (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-500 p-[1px] shadow-sm">
                    <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Bubble & Cards Container */}
              <div className={`space-y-3 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Text Bubble */}
                <div
                  className={`rounded-2xl p-4 text-sm leading-relaxed shadow-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold rounded-tr-none shadow-amber-500/20'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800/90 backdrop-blur-md rounded-tl-none font-normal'
                  }`}
                >
                  {msg.content.split('\n').map((line, idx) => {
                    if (!line.trim()) return <div key={idx} className="h-2" />;
                    return (
                      <p
                        key={idx}
                        className={`${
                          line.startsWith('•') || line.startsWith('🏛️') || line.startsWith('🌊') || line.startsWith('🏜️') || line.startsWith('✨')
                            ? 'pl-2 py-0.5 text-slate-300'
                            : 'py-0.5'
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-300 font-bold">$1</strong>')
                        }}
                      />
                    );
                  })}
                </div>

                {/* Optional Concierge Advisory Banner */}
                {msg.advisory && (
                  <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-400/30 p-3 flex items-start gap-2.5 shadow-sm">
                    <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                      {msg.advisory.type === 'sea' ? <Waves className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-amber-300 font-bold text-xs tracking-wide">
                        {msg.advisory.title}
                      </h4>
                      <p className="text-slate-300 text-xs mt-0.5 leading-snug">
                        {msg.advisory.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* Interactive Recommended Trip Cards */}
                {msg.recommendedTrips && msg.recommendedTrips.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between text-xs text-amber-400/80 font-bold tracking-wider uppercase px-1">
                      <span>Curated Recommendations</span>
                      <span className="text-[10px] text-slate-500 font-normal">5-Star Verified</span>
                    </div>

                    <div className="grid gap-2.5">
                      {msg.recommendedTrips.map((trip) => (
                        <div
                          key={trip.id}
                          className="group relative rounded-2xl bg-slate-900/95 border border-slate-800 hover:border-amber-400/50 p-3 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/10 flex gap-3 overflow-hidden"
                        >
                          {/* Image Thumbnail */}
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-950">
                            <img
                              src={trip.image}
                              alt={trip.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {trip.hot && (
                              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-red-500/90 text-white text-[9px] font-extrabold flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5" /> HOT
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-bold">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span>{trip.rating}</span>
                                <span className="text-slate-500">•</span>
                                <span className="text-slate-400 font-medium truncate">{trip.location}</span>
                              </div>

                              <h5 className="text-white text-xs font-bold truncate mt-0.5 group-hover:text-amber-300 transition-colors">
                                {trip.title}
                              </h5>

                              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  {trip.duration.split('(')[0]}
                                </span>
                              </div>
                            </div>

                            {/* Bottom Price & CTA */}
                            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-1">
                              <div>
                                <span className="text-slate-500 text-[10px] font-medium">From </span>
                                <span className="text-amber-400 font-extrabold text-sm">
                                  {formatPrice(trip.price)}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setIsChatOpen(false);
                                    navigate(`/trip/${trip.id}`);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => handleConnectWhatsApp(trip.title)}
                                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] font-bold transition-colors flex items-center gap-1 shadow-sm"
                                >
                                  Hold Slot
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct WhatsApp Callout Button */}
                {msg.showWhatsAppCta && (
                  <button
                    onClick={() => handleConnectWhatsApp()}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold p-3 text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-700/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group"
                  >
                    <Phone className="w-4 h-4 text-emerald-200" />
                    <span>Connect with Senior Concierge on WhatsApp</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Inline Date Picker */}
          {showDatePicker && (
            <div className="flex justify-center p-2">
              <div className="rounded-2xl bg-slate-900 border border-amber-400/30 p-3 shadow-xl max-w-[290px] w-full">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-2 px-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Select Preferred Travel Date</span>
                </div>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={{ before: new Date() }}
                  fromDate={new Date()}
                  toDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  classNames={{
                    today: 'text-amber-400 font-bold',
                    selected: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-full',
                    day: 'text-slate-300 hover:bg-slate-800 rounded-full w-8 h-8 text-xs cursor-pointer',
                    nav_button: 'text-amber-400 hover:bg-slate-800 rounded-lg p-1',
                    nav: 'flex justify-between items-center mb-1',
                    caption: 'text-white font-semibold text-xs mb-2',
                    head_cell: 'text-slate-500 text-[10px] font-bold w-8 h-8',
                    row: 'flex justify-center gap-0.5',
                    cell: 'flex items-center justify-center',
                    table: 'w-full border-collapse',
                    month: 'w-full',
                  }}
                />
              </div>
            </div>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-500 p-[1px] shadow-sm">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </div>
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-tl-none flex items-center gap-1.5 shadow-sm">
                <span className="text-xs text-slate-400 font-medium mr-1">Tamara is typing</span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3.5 py-2.5 bg-slate-950/90 border-t border-slate-900 overflow-x-auto no-scrollbar flex items-center gap-2">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={chip.action}
              className="px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>{chip.label}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-amber-400/20">
          <div className="relative flex items-center gap-2 bg-slate-900/95 border border-slate-800 focus-within:border-amber-400/60 rounded-2xl p-1.5 px-3 transition-colors shadow-inner">
            {/* Mic button */}
            <button
              onClick={toggleListening}
              title={isListening ? 'Stop listening' : 'Speak to Concierge'}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={isListening ? 'Listening to your voice...' : 'Ask Tamara about any trip, weather, or pricing...'}
              aria-label="Message your VIP concierge"
              className="flex-1 bg-transparent text-white text-xs md:text-sm placeholder:text-slate-500 focus:outline-none"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              title="Send inquiry"
              aria-label="Send message"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                input.trim()
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/30 hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-slate-800/80 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 px-2 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Direct Official Tour Operator Desk
            </span>
            <span className="text-amber-400/80 font-medium">Zero Booking Fees</span>
          </div>
        </div>
      </div>
    </div>
  );
}
