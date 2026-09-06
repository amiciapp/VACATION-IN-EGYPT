import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { currencies } from '@/data/trips';

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  exchangeRate: number;
  formatPrice: (price: number) => string;
  t: (key: string, options?: any) => string;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isWhatsAppOpen: boolean;
  setIsWhatsAppOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedTrip: string | null;
  setSelectedTrip: (trip: string | null) => void;
  weather: { temp: number; condition: string; seaTemp: number; windSpeed: number; seaStatus: string };
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { t: i18nT, i18n } = useTranslation();
  const [currency, setCurrencyState] = useState('EUR');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [weather, setWeather] = useState({
    temp: 28,
    condition: 'Sunny',
    seaTemp: 24,
    windSpeed: 14,
    seaStatus: 'Crystal Calm'
  });
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [liveRates, setLiveRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedCurr = localStorage.getItem('vacationinegypt-currency');
    const savedWishlist = localStorage.getItem('vacationinegypt-wishlist');
    if (savedCurr) {
      setCurrencyState(savedCurr);
    } else {
      setCurrencyState('EUR');
      localStorage.setItem('vacationinegypt-currency', 'EUR');
    }
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) {
        console.warn('Failed to parse wishlist from localStorage:', e);
        localStorage.removeItem('vacationinegypt-wishlist');
      }
    }

    // Fetch real weather from Open-Meteo for Hurghada (updates every 3 hours)
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=27.2574&longitude=33.8129&current_weather=true');
        const data = await res.json();
        if (data && data.current_weather) {
          const w = data.current_weather;
          let conditionStr = 'Clear';
          if (w.weathercode === 1 || w.weathercode === 2) conditionStr = 'Partly Cloudy';
          else if (w.weathercode === 3) conditionStr = 'Cloudy';
          else if (w.weathercode >= 51 && w.weathercode <= 67) conditionStr = 'Rainy';
          else if (w.weathercode >= 71) conditionStr = 'Windy';

          const wind = Math.round(w.windspeed || 14);
          let seaCond = 'Crystal Calm & Smooth';
          if (wind > 25 || w.weathercode >= 51) {
            seaCond = 'Choppy & Rough Waves';
          } else if (wind > 17) {
            seaCond = 'Moderate Swell';
          }

          setWeather({
            temp: Math.round(w.temperature),
            condition: conditionStr,
            seaTemp: Math.max(22, Math.min(29, Math.round(w.temperature * 0.8 + 5))),
            windSpeed: wind,
            seaStatus: seaCond
          });
        }
      } catch (e) {
        console.error('Failed to fetch weather', e);
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 10800000); // 3 hours in ms

    return () => clearInterval(weatherInterval);
  }, []);

  // Fetch Live Exchange Rates Every Hour (EUR Base)
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Fetching from a free, reliable public API that updates frequently
        const response = await fetch('https://open.er-api.com/v6/latest/EUR');
        const data = await response.json();
        if (data && data.rates) {
          setLiveRates(data.rates);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 3600000); // 1 hour in ms
    return () => clearInterval(interval);
  }, []);

  // Note: Google Translate removed — i18next handles all 32 languages natively

  const setLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  const setCurrency = useCallback((curr: string) => {
    setCurrencyState(curr);
    localStorage.setItem('vacationinegypt-currency', curr);
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist(prev => {
      const newList = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('vacationinegypt-wishlist', JSON.stringify(newList));
      return newList;
    });
  }, []);

  const fallbackRate = currencies.find(c => c.code === currency)?.rate || 1;
  const exchangeRate = liveRates[currency] || fallbackRate;
  const currencySymbol = currencies.find(c => c.code === currency)?.symbol || '€';

  const formatPrice = useCallback((price: number) => {
    const converted = Math.round(price * exchangeRate);
    return `${currencySymbol}${converted.toLocaleString()}`;
  }, [exchangeRate, currencySymbol]);

  const t = useCallback((key: string, options?: any) => {
    return i18nT(key, options) as string;
  }, [i18nT]);

  return (
    <AppContext.Provider value={{
      language: i18n.language, setLanguage,
      currency, setCurrency,
      exchangeRate, formatPrice, t,
      isChatOpen, setIsChatOpen,
      isWhatsAppOpen, setIsWhatsAppOpen,
      isSearchOpen, setIsSearchOpen,
      selectedTrip, setSelectedTrip,
      weather, wishlist, toggleWishlist
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
