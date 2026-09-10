import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';
import { Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '@/i18n';

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const baseUrl = window.location.origin + window.location.pathname;

  return (
    <div className="min-h-screen bg-navy text-ink">
      <Helmet>
        <title>Privacy Policy | VACATION IN EGYPT Luxury Egypt Tours</title>
        <meta name="description" content="Read VACATION IN EGYPT's privacy policy. We are committed to protecting your personal data and privacy when using our luxury Egypt tour booking services." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy | VACATION IN EGYPT Luxury Egypt Tours" />
        <meta property="og:description" content="Read VACATION IN EGYPT's privacy policy. We are committed to protecting your personal data." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VACATION IN EGYPT" />
        <meta property="og:url" content="https://vacationinegypt.vip/privacy" />
        <meta property="og:image" content="https://vacationinegypt.vip/logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | VACATION IN EGYPT Luxury Egypt Tours" />
        <meta name="twitter:description" content="Read VACATION IN EGYPT's privacy policy. We protect your personal data." />
        <meta name="twitter:image" content="https://vacationinegypt.vip/logo.jpg" />
        <link rel="canonical" href="https://vacationinegypt.vip/privacy" />
        {supportedLngs.filter(l => l !== lang).map(l => (
          <link key={l} rel="alternate" hrefLang={l} href={`https://vacationinegypt.vip/privacy?lang=${l}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href="https://vacationinegypt.vip/privacy" />
      </Helmet>
      <Navigation />
      
      <main className="pt-32 pb-24 section-padding">
        <div className="max-w-4xl mx-auto glass-strong p-8 md:p-12 rounded-3xl border border-ink/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center border border-gold/30">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>
          
          <div className="space-y-8 text-ink/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-ink mb-4">1. Introduction</h2>
              <p>
                Welcome to VACATION IN EGYPT. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our 
                website (regardless of where you visit it from) and tell you about your privacy rights and how 
                the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">2. The Data We Collect</h2>
              <p>
                Personal data, or personal information, means any information about an individual from which that 
                person can be identified. We may collect, use, store and transfer different kinds of personal data 
                about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Identity Data (First name, last name)</li>
                <li>Contact Data (Email address, phone number)</li>
                <li>Technical Data (IP address, browser type and version)</li>
                <li>Usage Data (Information about how you use our website)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your 
                personal data to provide you with our services, to manage our relationship with you, and to 
                improve our website and user experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being 
                accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-xl font-bold text-ink mb-4">5. Cookie Policy</h2>
              <p>
                We use cookies and similar tracking technologies to improve your browsing experience on our website. 
                Cookies are small files stored on your device. We use:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-ink">Essential Cookies:</strong> Required for the website to function (language preferences, session management)</li>
                <li><strong className="text-ink">Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong className="text-ink">Preference Cookies:</strong> Remember your settings (currency, language choice)</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact 
                us at: <span className="text-gold">hello@vacationinegypt.vip</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
