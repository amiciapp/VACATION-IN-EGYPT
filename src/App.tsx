import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { AppProvider, useApp } from '@/context/AppContext';
import SchemaMarkup from '@/components/SchemaMarkup';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorBoundary from '@/components/ErrorBoundary';
import CookieConsent from '@/components/CookieConsent';
import PushPermission from '@/components/PushPermission';
import LiveBookingTicker from '@/components/LiveBookingTicker';
import SpotlightSearch from '@/components/SpotlightSearch';

function GlobalAppFeatures() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  return (
    <>
      <SpotlightSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <LiveBookingTicker />
    </>
  );
}

// Lazy load pages for performance scaling
const Home = lazy(() => import('@/pages/Home'));
const CityPage = lazy(() => import('@/pages/CityPage'));
const TripPage = lazy(() => import('@/pages/TripPage'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const TransportationPage = lazy(() => import('@/pages/TransportationPage'));

export default function App() {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');

  useEffect(() => {
    // Phase 1: Show Hollywood intro sequence (2.6s)
    const fadeTimer = setTimeout(() => setPhase('fading'), 2600);
    // Phase 2: Smooth cinematic dissolve & zoom out (0.8s transition)
    const doneTimer = setTimeout(() => setPhase('done'), 3400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <ErrorBoundary>
      <AppProvider>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-gold focus:text-white focus:rounded-xl focus:font-bold focus:shadow-lg">
          Skip to main content
        </a>
        <SchemaMarkup />

        {/* === LOADING OVERLAY — sits on top of everything === */}
        {phase !== 'done' && (
          <div
            className={`fixed inset-0 z-[9999] bg-[#05070D] transition-all duration-700 ease-out ${
              phase === 'fading' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
            }`}
          >
            <LoadingScreen />
          </div>
        )}

        {/* === MAIN APP — always renders, hidden under the overlay === */}
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/city/:cityName" element={<CityPage />} />
            <Route path="/trip/:tripId" element={<TripPage />} />
            <Route path="/transportation" element={<TransportationPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        {/* Cookie Consent — GDPR compliant */}
        <CookieConsent />
        
        {/* Push Notification Permission */}
        <PushPermission />

        {/* Global Live Features: Spotlight Search & Live Booking Ticker */}
        <GlobalAppFeatures />
      </AppProvider>
    </ErrorBoundary>
  );
}
