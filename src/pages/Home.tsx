import { Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import Trips from '@/sections/Trips';
import Services from '@/sections/Services';
import TrustBadges from '@/sections/TrustBadges';
import FloatingButtons from '@/components/FloatingButtons';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import { useSEO } from '@/hooks/useSEO';

// Lazy load non-critical sections for performance
const MomentsStories = lazy(() => import('@/components/MomentsStories'));
const VIPPackages = lazy(() => import('@/sections/VIPPackages'));
const CustomJourneyBuilder = lazy(() => import('@/sections/CustomJourneyBuilder'));
const VIPFleetFastTrack = lazy(() => import('@/sections/VIPFleetFastTrack'));
const HotOffers = lazy(() => import('@/sections/HotOffers'));
const AIPlanner = lazy(() => import('@/sections/AIPlanner'));
const Gallery = lazy(() => import('@/sections/Gallery'));

const FAQ = lazy(() => import('@/sections/FAQ'));
const Blog = lazy(() => import('@/sections/Blog'));
const Footer = lazy(() => import('@/sections/Footer'));
const GoogleReviews = lazy(() => import('@/sections/GoogleReviews'));
const AIChat = lazy(() => import('@/components/AIChat'));
const WhatsAppWidget = lazy(() => import('@/components/WhatsAppWidget'));

export default function Home() {
  const seo = useSEO();

  return (
    <>
      {seo}
    <div className="min-h-screen text-ink overflow-x-hidden relative">
      <CustomCursor />
      <ScrollProgress />
      
      {/* Global Fixed Video Background */}
      <div className="fixed inset-0 z-[-2] bg-gradient-to-b from-[#0a192f] via-[#0f2847] to-[#0a192f]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-105 contrast-105"
          poster="/images/hero-redsea.jpg"
        >
          <source src="/videos/vacation.mp4" type="video/mp4" />
        </video>
        {/* Subtle luminous ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-transparent to-slate-950/30" />
      </div>

      <Navigation />
      
      <main id="main-content" className="relative z-0">
        <Hero />
        <Suspense fallback={null}>
          <MomentsStories />
        </Suspense>
        <TrustBadges />
        <Trips />
        
        <Suspense fallback={<div className="h-96" />}>
          <VIPPackages />
          <CustomJourneyBuilder />
          <VIPFleetFastTrack />
          <Services />
          <HotOffers />
          <AIPlanner />
          <Gallery />

          <GoogleReviews />
          <FAQ />
          <Blog />
          <Footer />
        </Suspense>
      </main>
      
      <FloatingButtons />
      
      <Suspense fallback={null}>
        <AIChat />
        <WhatsAppWidget />
      </Suspense>
      </div>
    </>
  );
}
