import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';
import { Scale } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '@/i18n';

export default function TermsOfService() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const baseUrl = window.location.origin + window.location.pathname;

  return (
    <div className="min-h-screen bg-navy text-ink">
      <Helmet>
        <title>Terms of Service | VACATION IN EGYPT Luxury Egypt Tours</title>
        <meta name="description" content="Read VACATION IN EGYPT's Terms of Service. Understand our booking policies, user obligations, and terms governing luxury Egypt tour services." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Terms of Service | VACATION IN EGYPT Luxury Egypt Tours" />
        <meta property="og:description" content="Read VACATION IN EGYPT's Terms of Service. Understand our booking policies and user obligations." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VACATION IN EGYPT" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image" content="https://vacationinegypt.vip/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service | VACATION IN EGYPT Luxury Egypt Tours" />
        <meta name="twitter:description" content="Read VACATION IN EGYPT's Terms of Service. Understand our booking policies." />
        <meta name="twitter:image" content="https://vacationinegypt.vip/logo.png" />
        <link rel="canonical" href={baseUrl} />
        {supportedLngs.filter(l => l !== lang).map(l => (
          <link key={l} rel="alternate" hrefLang={l} href={`${baseUrl}?lang=${l}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      </Helmet>
      <Navigation />
      
      <main className="pt-32 pb-24 section-padding">
        <div className="max-w-4xl mx-auto glass-strong p-8 md:p-12 rounded-3xl border border-ink/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center border border-gold/30">
              <Scale className="w-6 h-6 text-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>
          
          <div className="space-y-8 text-ink/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-ink mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using VACATIONINEGYPT.VIP, you accept and agree to be bound by the terms and 
                provisions of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">2. Provision of Services</h2>
              <p>
                VACATION IN EGYPT provides luxury travel booking and concierge services. All bookings are subject to 
                availability and confirmation by our team and relevant third-party providers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">3. User Obligations</h2>
              <p>
                You agree to provide accurate, current, and complete information during the booking process 
                and to update such information to keep it accurate, current, and complete.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">4. Payment and Cancellations</h2>
              <p>
                Payment terms and cancellation policies vary by trip and service. Please refer to the specific 
                terms provided at the time of booking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">5. Limitation of Liability</h2>
              <p>
                VACATION IN EGYPT shall not be liable for any indirect, incidental, special, consequential or 
                punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of Egypt.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
