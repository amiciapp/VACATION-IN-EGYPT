import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { trips, whatsappNumbers } from '@/data/trips';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { X, Send, User, Volume2, VolumeX, Mic, MicOff, Calendar } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LeadInfo {
  interest: string;
  date: string;
  travelers: string;
}

export default function AIChat() {
  const { isChatOpen, setIsChatOpen, setIsWhatsAppOpen } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lead, setLead] = useState<LeadInfo>({ interest: '', date: '', travelers: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const isCollected = (field: keyof LeadInfo) => lead[field] !== '';

  const [lastDataRefresh, setLastDataRefresh] = useState<number>(Date.now());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const now = Date.now();
    const hoursSinceRefresh = (now - lastDataRefresh) / (1000 * 60 * 60);
    if (hoursSinceRefresh > 12) {
      setLastDataRefresh(now);
    }
  }, [isChatOpen, lastDataRefresh]);

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      const topTrip = trips.slice(0, 3).map(t => `• **${t.title}** — ${t.duration}, from $${t.price}`).join('\n');
      const greeting = `Hey there! 🌟 I'm VACATION AI — your personal Smart Travel Concierge here in Egypt.

I'm here to help you find the **perfect Egyptian experience** at the best price. Let me ask you a quick question:

🌊 **What kind of trip are you dreaming of?** A Red Sea yacht charter, a VIP Pyramids tour, a Nile cruise, or a desert adventure?

Here are our hottest trips right now:
${topTrip}

💬 Want the best deal? Our WhatsApp concierge team has **exclusive VIP discounts** not available on the website. Just say the word!`;
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, [isChatOpen, messages.length]);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isChatOpen) return;
    const chat = chatRef.current;
    if (!chat) return;
    const input = chat.querySelector<HTMLInputElement>('input, textarea, [contenteditable]');
    input?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusable = chat.querySelectorAll<HTMLElement>('button, input, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    chat.addEventListener('keydown', handleKeyDown);
    return () => chat.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
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
      } else {
        alert("Voice input is not supported in this browser.");
      }
    }
  };

  const speak = (text: string) => {
    if (!isVoiceEnabled) return;

    const cleanedText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/•/g, '')
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .replace(/\n/g, '. ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.rate = 0.95;
    utterance.pitch = 1.5;
    utterance.lang = 'en-US';
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English Female'));
    if (femaleVoice) utterance.voice = femaleVoice;
    speechSynthesis.speak(utterance);
  };

  const askQuestion = (field: keyof LeadInfo, userMessage?: string): string => {
    const words = userMessage ? extractKeywords(userMessage) : [];
    const echo = words.length ? words.slice(0, 2).join(' and ') : null;

    switch (field) {
      case 'interest':
        return `${echo ? `"${capitalize(echo)}" — I love it! 🎉 That's a fantastic pick.` : 'Awesome choice! 🎉'} 

Now, **when are you thinking of visiting Egypt?** Even a rough idea helps — I'll check real-time availability and the best rates for you.

💡 **Quick tip:** Our WhatsApp team can instantly confirm availability and send you exclusive pricing. Want me to connect you there?`;
      case 'date':
        setShowDatePicker(true);
        return `${echo ? `${capitalize(echo)} sounds perfect! 🗓️ Great timing.` : 'Perfect timing! 🗓️'}

**Pick your travel date below** 👇 and I'll check availability and best rates for you.

And **how many guests will be joining you?** Just you, a couple, a family, or a group?

Also — our best rates are going fast for that period. Our WhatsApp concierge can **lock in your rate right now** with no obligation!`;
      case 'travelers':
        return `${echo ? `Wonderful, ${echo}! 👥 That's going to be a fantastic group setup.` : 'Wonderful! 👥'}

Let me check what's available for you...

✨ **Great news!** I can get you an **exclusive VIP discount** if we continue on WhatsApp. Our team responds in under 2 minutes and can send you personalized packages with **prices you won't see here**.

👉 Want me to connect you to WhatsApp for the best deal?`;
      default:
        return '';
    }
  };

  const extractKeywords = (text: string): string[] => {
    return text
      .replace(/[.,!?;:]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3)
      .slice(0, 5);
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const detectLeadInfo = (text: string): Partial<LeadInfo> => {
    const lower = text.toLowerCase();
    const updates: Partial<LeadInfo> = {};

    if (!isCollected('interest')) {
      if (lower.includes('yacht') || lower.includes('boat') || lower.includes('sea') || lower.includes('red sea') || lower.includes('diving') || lower.includes('beach') || lower.includes('cruise')) {
        updates.interest = 'Sea & Yacht';
      } else if (lower.includes('pyramid') || lower.includes('history') || lower.includes('museum') || lower.includes('ancient') || lower.includes('temple') || lower.includes('cairo') || lower.includes('giza') || lower.includes('luxor')) {
        updates.interest = 'Historical & Culture';
      } else if (lower.includes('desert') || lower.includes('safari') || lower.includes('adventure') || lower.includes('sand') || lower.includes('dune')) {
        updates.interest = 'Desert Adventure';
      } else if (lower.includes('nile') || lower.includes('cruise')) {
        updates.interest = 'Nile Cruise';
      } else if (lower.includes('luxury') || lower.includes('relax') || lower.includes('spa') || lower.includes('private')) {
        updates.interest = 'Luxury & Relaxation';
      } else if (lower.includes('trip') || lower.includes('tour') || lower.includes('package') || lower.includes('offer') || lower.includes('deal') || lower.includes('recommend') || lower.includes('suggest') || lower.includes('best') || lower.includes('popular')) {
        updates.interest = 'Open to suggestions';
      }
    }

    if (!isCollected('date') && !updates.interest) {
      const datePatterns = [
        /(this|next)\s+(week|month|summer|winter|spring|autumn|fall|year)/i,
        /(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        /\b(spring|summer|fall|winter|autumn)\b/i,
        /\b\d{4}\b/,
        /\b(today|tomorrow|soon|asap|now)\b/i,
      ];
      if (datePatterns.some(p => p.test(lower))) {
        updates.date = lower.match(/(this|next\s+)?\w+(\s+\d{4})?/i)?.[0] || 'Soon';
      }
    }

    if (!isCollected('travelers') && !updates.interest && !updates.date) {
      const travelerPatterns = [
        /(\d+)\s*(people|person|guest|pax|travelers?|friends?|family|adults?)/i,
        /(couple|solo|alone|just me|family|group|honeymoon)/i,
        /just\s+(\d+)/i,
        /(\d+)\s*of\s*us/i,
      ];
      for (const p of travelerPatterns) {
        const m = lower.match(p);
        if (m) {
          updates.travelers = m[1] || m[0];
          break;
        }
      }
    }

    return updates;
  };

  const generateMarketingBlurb = (): string => {
    const interest = lead.interest || 'dream Egyptian vacation';
    const date = lead.date || 'your preferred dates';
    const travelers = lead.travelers || 'your group';
    const matchedTrips = trips.filter(t =>
      t.title.toLowerCase().includes(interest.toLowerCase()) ||
      t.category.toLowerCase().includes(interest.toLowerCase()) ||
      t.description.toLowerCase().includes(interest.toLowerCase())
    ).slice(0, 2);

    return `I've got some incredible options for ${interest}! 🇪🇬

Here's a quick summary:
• **Trip Type:** ${interest || 'To be confirmed'}
• **Travel Dates:** ${date || 'To be confirmed'}
• **Guests:** ${travelers || 'To be confirmed'}
${matchedTrips.length ? `• **Suggested:** ${matchedTrips.map(t => `${t.title} ($${t.price}/${t.duration})`).join(', ')}` : ''}

🔥 **Here's the deal:** I can get you an **exclusive VIP discount** that's only available through our WhatsApp concierge — up to 20% off in some cases! Our team replies in under 2 minutes.

👉 **Tap the WhatsApp button below** and I'll personally handle everything for you and send you the best offers!`;
  };

  const generateResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    const words = extractKeywords(userMessage);
    const echoLead = words.length ? words.slice(0, 2).join(' and ') : null;
    const firstWord = words.length ? capitalize(words[0]) : null;

    const updates = detectLeadInfo(userMessage);
    let newInfo = false;
    if (updates.interest || updates.date || updates.travelers) {
      setLead(prev => ({ ...prev, ...updates }));
      newInfo = true;
    }

    if (lower.includes('whatsapp') || lower.includes('chat') || lower.includes('connect')) {
      setTimeout(() => {
        setIsChatOpen(false);
        setIsWhatsAppOpen(true);
      }, 1500);
      return `Perfect! Transferring you to our WhatsApp VIP line now... 🤝

📱 **Our WhatsApp number:** ${whatsappNumbers[0]}

Our concierge team will respond within 2 minutes with exclusive pricing and offers just for you!`;
    }

    if (lower.includes('expensive') || lower.includes('price') || lower.includes('cost') || lower.includes('cheap') || lower.includes('budget') || lower.includes('money')) {
      return `I hear you ${echoLead ? `— "${echoLead}" is exactly what smart travelers ask about` : ''}! 💎

Here's the inside scoop: we have **exclusive WhatsApp-only rates** that aren't shown on the website. Our VIP packages often include complimentary upgrades, airport transfers, and special amenities.

Let's connect on WhatsApp so I can send you our current promo deals with real pricing — no obligation at all!`;
    }

    if (lower.includes('think') || lower.includes('later') || lower.includes('decide') || lower.includes('maybe') || lower.includes('not sure') || lower.includes('hesitant')) {
      const trending = trips.filter(t => t.hot).slice(0, 3);
      return `I totally get it ${echoLead ? `— thinking about "${echoLead}" is smart` : ''}! 😊 No rush at all.

But here's what I'll tell you honestly — Egypt's peak season is filling up fast! ${trending.length ? `Our hottest trips right now: ${trending.map(t => t.title).join(', ')} are booking quickly.` : ''}

The smartest move? Let's connect on WhatsApp with **zero commitment**. I'll send you some amazing options with prices, and you can decide whenever you're ready. At least you'll have the best choices secured!

👉 Want me to send you our top deals on WhatsApp?`;
    }

    if (lower.includes('recommend') || lower.includes('suggest') || lower.includes('what') || lower.includes('best') || lower.includes('popular')) {
      const topRated = trips.sort((a, b) => b.rating - a.rating).slice(0, 3);
      return `${firstWord ? `"${firstWord}" — great question! ` : 'Great question! '}Here are our **top-rated experiences** right now:

${topRated.map((t, i) => `${['🌊', '🏛️', '⛵'][i] || '📍'} **${t.title}** — ${t.duration}, $${t.price} — ⭐ ${t.rating}`).join('\n')}

Which one speaks to you most? Or I can tailor something totally unique just for you!

💬 **Pro tip:** Our WhatsApp concierge can send you **exclusive packages** with bonuses not available on the website! Want to check it out?`;
    }

    if (lower.includes('book') || lower.includes('reserve') || lower.includes('appointment') || lower.includes('ready')) {
      return `Excellent ${echoLead ? `— "${echoLead}" is the right move` : ''}! You're going to have an amazing time! 🎉

Let me fast-track your booking:
1. **Which trip** caught your eye?
2. **When** would you like to go?
3. **How many** are in your party?

Or even better — tap the WhatsApp button below and I'll **personally handle everything** in under 2 minutes with the best rates!`;
    }

    if (lower.includes('weather') || lower.includes('condition') || lower.includes('sea')) {
      return `${echoLead ? `Ah, "${echoLead}" — great question! ` : ''}The weather in Egypt is absolutely gorgeous right now! ☀️

Perfect conditions — warm sun, calm Red Sea waters, ideal for yacht charters and beach days. Honestly, there's no better time to visit!

Want me to check real-time availability for this week? Our WhatsApp team can confirm openings and send you **last-minute deals** instantly.`;
    }

    if (lower.includes('thanks') || lower.includes('thank you') || lower.includes('appreciate') || lower.includes('grateful')) {
      return `You're so welcome ${echoLead ? `— happy I could help with "${echoLead}"` : ''}! 😊 It's truly my pleasure.

Before you go — our WhatsApp VIP line is **always open** if you think of anything else. I'd love to personally take care of your booking and get you the best rate!

👉 Just tap the WhatsApp button whenever you're ready!`;
    }

    if (lower.includes('hello') || lower.includes('hi ') || lower.includes('hey') || lower.includes('good morning') || lower.includes('good afternoon') || lower.includes('good evening')) {
      const hot = trips.find(t => t.hot);
      return `Hey hey${echoLead ? `! "${capitalize(echoLead)}" love the energy` : ''}! Great to have you here! 😊

I'm VACATION AI, your personal smart travel concierge in Egypt. Tell me — what kind of experience are you looking for?

🌊 **Sea & yacht** lover?
🏛️ **History & pyramids** explorer?
🏜️ **Adventure & desert** enthusiast?

${hot ? `🔥 **Hot deal:** Our ${hot.title} is selling fast at just $${hot.price}!` : ''}

💬 Want the best price? Our WhatsApp team has exclusive discounts waiting for you!`;
    }

    if (newInfo) {
      const nextField: keyof LeadInfo | null =
        !isCollected('interest') && !updates.interest ? 'interest' :
        !isCollected('date') && !updates.date ? 'date' :
        !isCollected('travelers') && !updates.travelers ? 'travelers' :
        null;

      if (!nextField) {
        return generateMarketingBlurb();
      }
      return askQuestion(nextField, userMessage);
    }

    const allCollected = isCollected('interest') && isCollected('date') && isCollected('travelers');
    if (allCollected) {
      return generateMarketingBlurb();
    }

    const nextField: keyof LeadInfo =
      !isCollected('interest') ? 'interest' :
      !isCollected('date') ? 'date' :
      'travelers';

    const topPicks = trips.slice(0, 3);
    const responses: Record<string, string> = {
      interest: `${firstWord ? `"${firstWord}" — interesting! 😊 ` : 'No worries! '}Let me help you find the perfect match.

Our most popular experiences right now:
${topPicks.map(t => `• **${t.title}** — ${t.description.split('.')[0]}`).join('\n')}

Which one sounds most exciting to you? Or I can recommend something totally unique!

💬 **By the way** — our WhatsApp concierge has exclusive pricing on all of these. Want to see?`,
      date:
        (() => { setShowDatePicker(true); return `${echoLead ? `${capitalize(echoLead)} — got it! 🗓️ ` : 'Got it! 🗓️ '}**Pick your travel date below** 👇 and I'll check availability and best rates for you.

Also, our WhatsApp team can **reserve your spot** right now with zero commitment!`; })(),
      travelers: `${echoLead ? `"${capitalize(echoLead)}" — perfect! 👥 ` : 'Perfect! 👥 '}And how many of you will be traveling?

Is it a romantic trip for two, a family adventure, or a group of friends? This helps me recommend the ideal setup for you!

💡 Our WhatsApp concierge can send you **group discounts** and special offers — want to check it out?`,
    };

    return responses[nextField];
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
      const response = generateResponse(userMsg.content);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      speak(response);
    }, 600 + Math.random() * 600);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setShowDatePicker(false);
    const formatted = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    handleSend(`I'd like to travel on ${formatted}`);
  };

  const quickReplies = [
    { label: '🌊 Yacht Cruise', action: () => handleSend('I\'m interested in a yacht cruise!') },
    { label: '🏛️ Pyramids Tour', action: () => handleSend('Tell me about the Pyramids tour') },
    { label: '⛵ Nile Cruise', action: () => handleSend('I want a Nile cruise') },
    { label: '💬 WhatsApp Deals', action: () => {
      setIsChatOpen(false);
      setIsWhatsAppOpen(true);
    }},
  ];

  if (!isChatOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 md:right-8 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
      <div ref={chatRef} className="glass-card overflow-hidden shadow-2xl" role="dialog" aria-modal="true" aria-label="AI Concierge chat">
        {/* Header */}
        <div className="bg-gold-gradient p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="VACATION IN EGYPT logo" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-white font-black tracking-wide">VACATION AI</h3>
              <p className="text-white/80 text-xs flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                Smart Travel Concierge • <span className="text-[#128C7E]">Online Now</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              aria-label={isVoiceEnabled ? 'Disable voice' : 'Enable voice'}
              className={`p-2 rounded-lg transition-colors ${
                isVoiceEnabled ? 'bg-navy-dark/20 text-white' : 'text-white/50 hover:bg-white/10'
              }`}
            >
              {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chat"
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-ink/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                msg.role === 'assistant' ? 'bg-gold-gradient' : 'bg-white/10'
              }`}>
                {msg.role === 'assistant' ? (
                  <img src="/logo.png" alt="VACATION IN EGYPT logo" width={32} height={32} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'assistant'
                  ? 'glass text-white/90 rounded-tl-none font-medium'
                  : 'bg-gold-gradient text-white rounded-tr-none font-bold'
              }`}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('•') || line.startsWith('🌊') || line.startsWith('🏛️') || line.startsWith('⛵') || line.startsWith('🏜️') ? 'ml-2 mt-1' : 'mt-1'}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {showDatePicker && (
            <div className="flex justify-center">
              <div className="glass rounded-xl p-3 border border-white/10 w-full max-w-[280px]">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={{ before: new Date() }}
                  fromDate={new Date()}
                  toDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  classNames={{
                    today: 'text-gold font-bold',
                    selected: 'bg-gold-gradient text-white rounded-full',
                    day: 'text-white/80 hover:bg-white/10 rounded-full w-9 h-9 text-sm cursor-pointer',
                    nav_button: 'text-white/70 hover:text-gold',
                    nav: 'flex justify-between items-center mb-2',
                    caption: 'text-white font-semibold text-sm mb-2',
                    head_cell: 'text-white/40 text-xs font-medium w-9 h-9',
                    row: 'flex justify-center gap-0.5',
                    cell: 'flex items-center justify-center',
                    table: 'w-full border-collapse',
                    month: 'w-full',
                  }}
                />
                <div className="text-center mt-2">
                  <p className="text-white/30 text-xs">Pick your travel date</p>
                </div>
              </div>
            </div>
          )}

          {isTyping && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="VACATION IN EGYPT logo" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <div className="glass p-3 rounded-2xl rounded-tl-none" role="status" aria-label="VACATION AI is typing">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:150ms]" />
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-2 bg-ink/80 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply.label}
                onClick={reply.action}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  reply.label.includes('WhatsApp')
                    ? 'bg-[#128C7E]/20 text-[#25D366] border border-[#128C7E]/50 hover:bg-[#128C7E]/40'
                    : 'glass text-white/70 hover:text-gold hover:bg-white/10'
                }`}
              >
                {reply.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 bg-ink-light border-t border-white/10">
          <div className="flex gap-2 items-center">
            <button
              onClick={toggleListening}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-red-500/20 text-red-500 border border-red-500/50 animate-pulse'
                  : 'glass text-white/50 hover:text-gold hover:bg-white/10'
              }`}
              title="Voice Input"
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={isListening ? "Listening..." : "Message VACATION AI..."}
              aria-label="Message VACATION AI"
              className="flex-1 glass px-4 py-2.5 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold border border-transparent"
            />
            <button
              onClick={() => handleSend()}
              title="Send message"
              aria-label="Send message"
              className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center text-white hover:shadow-glow transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
