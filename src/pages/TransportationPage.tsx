import { useState, useMemo, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import { transportationRoutes } from '@/data/transportation';
import { whatsappNumbers } from '@/data/trips';
import { Car, MapPin, ShieldCheck, Clock, Phone, ArrowRight, RefreshCw, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TransportationPage() {
  // Form State
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [tripType, setTripType] = useState<'one_way' | 'round_trip'>('one_way');
  const [passengers, setPassengers] = useState<number>(2);
  const [bags, setBags] = useState<number>(0);
  const [tripDate, setTripDate] = useState<string>('');

  // Derived Options
  const departureOptions = useMemo(() => {
    return Array.from(new Set(transportationRoutes.map(r => r.from))).sort();
  }, []);

  const destinationOptions = useMemo(() => {
    if (!departure) return [];
    return Array.from(new Set(transportationRoutes.filter(r => r.from === departure).map(r => r.to))).sort();
  }, [departure]);

  // Auto-select first destination when departure changes
  useEffect(() => {
    if (departure && destinationOptions.length > 0 && !destinationOptions.includes(destination)) {
      setDestination(destinationOptions[0]);
    }
  }, [departure, destinationOptions, destination]);

  // Selected Route
  const selectedRoute = useMemo(() => {
    return transportationRoutes.find(r => r.from === departure && r.to === destination);
  }, [departure, destination]);

  // Popup state for round trip discount
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);

  // Calculated Price & Vehicle
  const { vehicle, totalPrice, originalPrice, discountPercent } = useMemo(() => {
    if (!selectedRoute) return { vehicle: 'Select Route', totalPrice: '-', originalPrice: 0, discountPercent: 0 };

    let selectedVehicle = 'Sedan / Limo';
    let basePriceStr = selectedRoute.sedanPrice;

    if (passengers > 30) {
      selectedVehicle = 'Custom Fleet';
      basePriceStr = 'Price on Request';
    } else if (passengers >= 10) {
      selectedVehicle = 'Coaster Bus';
      basePriceStr = selectedRoute.coasterPrice || 'Price on Request';
    } else if (passengers >= 4) {
      selectedVehicle = 'Toyota Hiace';
      basePriceStr = selectedRoute.hiacePrice || 'Price on Request';
    } else {
      // 1–3 passengers: bags determine vehicle
      if (bags > 2) {
        selectedVehicle = 'Toyota Hiace';
        basePriceStr = selectedRoute.hiacePrice || 'Price on Request';
      } else {
        selectedVehicle = 'Sedan / Limo';
        basePriceStr = selectedRoute.sedanPrice;
      }
    }

    let calculatedPrice = basePriceStr;
    let origPrice = 0;
    let discPct = 0;
    const priceMatch = basePriceStr.match(/\d+/);
    if (priceMatch) {
      const numericPrice = parseInt(priceMatch[0], 10);
      if (tripType === 'round_trip') {
        origPrice = numericPrice * 2;
        discPct = 15;
        const finalPrice = origPrice * (1 - discPct / 100);
        calculatedPrice = `€${finalPrice % 1 === 0 ? finalPrice : finalPrice.toFixed(2)}`;
      } else {
        origPrice = numericPrice;
        calculatedPrice = `€${origPrice}`;
      }
    }

    return { 
      vehicle: selectedVehicle, 
      totalPrice: calculatedPrice,
      originalPrice: origPrice,
      discountPercent: discPct
    };
  }, [selectedRoute, passengers, bags, tripType]);

  // Show discount popup when round trip is selected
  useEffect(() => {
    if (tripType === 'round_trip' && discountPercent > 0) {
      setShowDiscountPopup(true);
    }
  }, [tripType, discountPercent]);

  const handleBookNow = () => {
    if (!departure || !destination) {
      alert('Please select a departure and destination first.');
      return;
    }
    const dateStr = tripDate || 'Not specified';
    const tripLabel = tripType === 'one_way' ? 'One Way' : 'Round Trip';
    const discFinal = discountPercent > 0 ? (originalPrice * (1 - discountPercent / 100)) : 0;
    const discFinalStr = discFinal % 1 === 0 ? discFinal : discFinal.toFixed(2);
    const priceLine = discountPercent > 0
      ? `~~€${originalPrice}~~ ➡ €${discFinalStr} (-${discountPercent}% 🎉)`
      : `${totalPrice}`;
    const message = 
`🚗 *Private Transfer Booking* 🚗

━━━━━━━━━━━━━━━━━━━

📍 *Route*
${departure} ➡ ${destination}

🚙 *Vehicle*
${vehicle}

👥 *Passengers*
${passengers}

🛄 *Bags*
${bags}

📅 *Travel Date*
${dateStr}

🔄 *Trip Type*
${tripLabel}

💰 *Total Price*
${priceLine}

━━━━━━━━━━━━━━━━━━━

Thank you! I look forward to your confirmation. 🙏`;
    const encodedText = encodeURIComponent(message);
    const whatsappNumber = whatsappNumbers[0];
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <>
      <div className="min-h-screen text-ink overflow-x-hidden relative">
        <CustomCursor />
        <ScrollProgress />
        
        {/* Global Fixed Video Background */}
        <div className="fixed inset-0 z-[-2] bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/images/hero-redsea.jpg"
          >
            <source src="/videos/vacation.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <Navigation />
        
        <main id="main-content" className="relative z-0">
          
          {/* HERO SECTION */}
          <section className="relative pt-40 pb-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Car className="w-4 h-4" />
                Premium Transfers
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl"
              >
                Instant Price <span className="text-gold">Calculator</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium drop-shadow-md"
              >
                Book safe, reliable, and comfortable private transportation between airports, hotels, and cities across Egypt.
              </motion.p>
            </div>
          </section>

          {/* CALCULATOR & SUMMARY SECTION */}
          <section className="pb-24 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* LEFT COL: Calculator Form */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-7 space-y-6"
                >
                  <div className="bg-[#0d1b2a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-gold" />
                      Plan Your Route
                    </h2>

                    <div className="space-y-6">
                      {/* Departure */}
                      <div>
                        <label className="block text-white/70 text-sm font-semibold mb-2">Departure</label>
                        <select 
                          value={departure}
                          onChange={(e) => setDeparture(e.target.value)}
                          title="Select Departure City"
                          aria-label="Select Departure City"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="text-black">Select Departure City</option>
                          {departureOptions.map(opt => (
                            <option key={opt} value={opt} className="text-black">{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Destination */}
                      <div>
                        <label className="block text-white/70 text-sm font-semibold mb-2">Destination</label>
                        <select 
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          disabled={!departure}
                          title="Select Destination City"
                          aria-label="Select Destination City"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer disabled:opacity-50"
                        >
                          <option value="" disabled className="text-black">Select Destination</option>
                          {destinationOptions.map(opt => (
                            <option key={opt} value={opt} className="text-black">{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Trip Type & Passengers */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/70 text-sm font-semibold mb-2">Trip Type</label>
                          <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                            <button
                              onClick={() => setTripType('one_way')}
                              className={`py-2.5 rounded-lg text-sm font-medium transition-all ${tripType === 'one_way' ? 'bg-gold text-white shadow-md' : 'text-white/60 hover:text-white'}`}
                            >
                              One Way
                            </button>
                            <button
                              onClick={() => setTripType('round_trip')}
                              className={`py-2.5 rounded-lg text-sm font-medium transition-all ${tripType === 'round_trip' ? 'bg-gold text-white shadow-md' : 'text-white/60 hover:text-white'}`}
                            >
                              Round Trip
                            </button>
                          </div>
                          {/* Travel Date below Trip Type */}
                          <div className="mt-4">
                            <label className="block text-white/70 text-sm font-semibold mb-2">Travel Date</label>
                            <input
                              type="date"
                              value={tripDate}
                              onChange={(e) => setTripDate(e.target.value)}
                              title="Select Travel Date"
                              aria-label="Select Travel Date"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-gold/50 transition-colors cursor-pointer [color-scheme:dark]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white/70 text-sm font-semibold mb-2">
                            Passengers
                          </label>
                          <select 
                            value={passengers}
                            onChange={(e) => setPassengers(Number(e.target.value))}
                            title="Select Number of Passengers"
                            aria-label="Select Number of Passengers"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                          >
                            {Array.from({ length: 35 }, (_, i) => i + 1).map(num => (
                              <option key={num} value={num} className="text-black">
                                {num} {num === 1 ? 'Passenger' : 'Passengers'}
                              </option>
                            ))}
                          </select>
                      {/* Bags below Passengers */}
                      <div className="mt-4">
                        <label className="block text-white/70 text-sm font-semibold mb-2">Bags</label>
                        <select
                          value={bags}
                          onChange={(e) => setBags(Number(e.target.value))}
                          title="Select Number of Bags"
                          aria-label="Select Number of Bags"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                        >
                          {Array.from({ length: 16 }, (_, i) => (
                            <option key={i} value={i} className="text-black">{i} {i === 1 ? 'Bag' : 'Bags'}</option>
                          ))}
                        </select>
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Included Features Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: MapPin, text: 'Door-to-door' },
                      { icon: ShieldCheck, text: 'Professional' },
                      { icon: Car, text: 'A/C Vehicles' },
                      { icon: Clock, text: '24/7 Support' },
                    ].map((feature, i) => (
                      <div key={i} className="bg-[#0d1b2a]/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center text-center">
                        <feature.icon className="w-6 h-6 text-gold mb-2" />
                        <span className="text-white/80 text-xs font-semibold">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* RIGHT COL: Booking Summary */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-5"
                >
                  <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl sticky top-24 shadow-2xl relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/20 blur-3xl rounded-full pointer-events-none" />

                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                      Your Private Transfer
                    </h3>

                    {departure && destination ? (
                      <div className="space-y-5">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white mt-1">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Route</p>
                            <p className="text-white font-medium flex items-center gap-2">
                              {departure} <ArrowRight className="w-4 h-4 text-gold" /> {destination}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white mt-1">
                            <Car className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Vehicle</p>
                            <p className="text-white font-medium">{vehicle}</p>
                              <p className="text-white/40 text-xs mt-0.5">
                                  {passengers} {passengers === 1 ? 'passenger' : 'passengers'}{bags > 0 ? ` · ${bags} ${bags === 1 ? 'bag' : 'bags'}` : ''}
                                </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white mt-1">
                            <RefreshCw className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Trip</p>
                            <p className="text-white font-medium capitalize">{tripType.replace('_', ' ')}</p>
                          </div>
                        </div>

                        {tripDate && (
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white mt-1">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Date</p>
                            <p className="text-white font-medium">{new Date(tripDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                        </div>
                        )}

                        <div className="pt-6 mt-6 border-t border-white/10">
                          <div className="flex items-end justify-between mb-6">
                            <div>
                              <p className="text-white/60 text-sm font-semibold mb-1">Total Price</p>
                              {discountPercent > 0 ? (
                                <div className="flex flex-col">
                                  <p className="text-2xl text-white/40 line-through decoration-red-400">€{originalPrice}</p>
                                  <p className="text-4xl font-black text-green-400 drop-shadow-md -mt-1">{totalPrice}</p>
                                  <span className="inline-flex items-center gap-1 mt-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold w-fit">
                                    🎉 -{discountPercent}% discount
                                  </span>
                                </div>
                              ) : (
                                <p className="text-4xl font-black text-gold drop-shadow-md">{totalPrice}</p>
                              )}
                              <p className="text-white/40 text-xs mt-2">{vehicle} · {passengers} {passengers === 1 ? 'passenger' : 'passengers'}{bags > 0 ? ` · ${bags} ${bags === 1 ? 'bag' : 'bags'}` : ''}</p>
                            </div>
                          </div>

                          <button 
                            onClick={handleBookNow}
                            className="w-full bg-gold hover:bg-white text-ink font-bold py-4 rounded-xl transition-all shadow-glow hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <Phone className="w-5 h-5" />
                            Book Now on WhatsApp
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <MapPin className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/60">Select a departure and destination to calculate your price.</p>
                      </div>
                    )}
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          <Footer />
        </main>

        {/* Discount Popup for Round Trip */}
        {showDiscountPopup && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDiscountPopup(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              className="relative bg-gradient-to-br from-[#0d1b2a] to-[#1a2a3a] border border-gold/30 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
            >
              <button
                onClick={() => setShowDiscountPopup(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                ✕
              </button>
              <div className="text-6xl mb-4">🎉</div>
              <h4 className="text-2xl font-black text-gold mb-2">Special Offer! 🎁</h4>
              <p className="text-white/80 text-lg mb-2">
                You selected a <strong className="text-gold">Round Trip</strong>!
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 my-4">
                <p className="text-3xl font-black text-green-400">-15% Discount</p>
                <p className="text-green-300/70 text-sm mt-1">on your round trip booking</p>
              </div>
              <p className="text-white/60 text-sm mb-6">
                Original: <span className="line-through text-white/40">€{originalPrice}</span>
                <span className="text-gold font-bold ml-2">Now: {totalPrice}</span>
              </p>
              <button
                onClick={() => setShowDiscountPopup(false)}
                className="w-full bg-gold hover:bg-white text-ink font-bold py-3 px-6 rounded-xl transition-all"
              >
                Got it! 🚀
              </button>
            </motion.div>
          </div>
        )}

        <FloatingButtons />
      </div>
    </>
  );
}
