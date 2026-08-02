import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Compass, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy text-ink">
      <Helmet>
        <title>404 - Page Not Found | VACATION IN EGYPT</title>
        <meta name="description" content="The page you are looking for does not exist. Return to VACATION IN EGYPT homepage to explore luxury tours and trips in Egypt." />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="404 - Page Not Found | VACATION IN EGYPT" />
        <meta property="og:description" content="The page you are looking for does not exist. Return to VACATION IN EGYPT homepage to explore luxury tours and trips in Egypt." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VACATION IN EGYPT" />
        <meta property="og:url" content={window.location.origin + window.location.pathname} />
        <meta property="og:image" content="https://vacationinegypt.vip/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="404 - Page Not Found | VACATION IN EGYPT" />
        <meta name="twitter:description" content="The page you are looking for does not exist. Return to VACATION IN EGYPT homepage." />
        <meta name="twitter:image" content="https://vacationinegypt.vip/logo.png" />
        <link rel="canonical" href={window.location.origin + '/404'} />
      </Helmet>
      <Navigation />
      
      <main className="relative h-screen flex items-center justify-center section-padding overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        
        <div className="relative text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-24 h-24 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-gold/20"
          >
            <Compass className="w-12 h-12 text-gold animate-spin-slow" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-black text-gold/20 mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Lost in the Sands?
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-ink/60 text-lg mb-12 leading-relaxed"
          >
            The path you are looking for has been reclaimed by the desert. 
            Allow us to guide you back to civilization.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              to="/"
              className="inline-flex items-center gap-3 bg-gold-gradient px-8 py-4 rounded-2xl text-white font-bold text-lg hover:shadow-luxury-gold transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Return to Oasis
            </Link>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
