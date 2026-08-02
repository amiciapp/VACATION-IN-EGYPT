import { Helmet } from 'react-helmet-async';
import { trips } from '@/data/trips';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '@/i18n';

const languageNames: Record<string, string> = {
  en: 'English', de: 'German', fr: 'French', ru: 'Russian', ar: 'Arabic',
  it: 'Italian', es: 'Spanish', zh: 'Chinese', ja: 'Japanese', ko: 'Korean',
  nl: 'Dutch', pl: 'Polish', tr: 'Turkish', pt: 'Portuguese', sv: 'Swedish',
  cs: 'Czech', uk: 'Ukrainian', hu: 'Hungarian', ro: 'Romanian', sk: 'Slovak',
  da: 'Danish', no: 'Norwegian', fi: 'Finnish', sr: 'Serbian', bg: 'Bulgarian',
  hi: 'Hindi', id: 'Indonesian', el: 'Greek', vi: 'Vietnamese', he: 'Hebrew',
  kk: 'Kazakh', lt: 'Lithuanian'
};

export default function SchemaMarkup() {
  const { t } = useTranslation();
  const availableLanguage = supportedLngs.map(l => languageNames[l] || l);

  const orgTotalReviews = trips.reduce((sum, t) => sum + t.reviews, 0);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "VACATION IN EGYPT",
    "alternateName": "Vacation In Egypt",
    "url": "https://vacationinegypt.vip",
    "logo": "https://vacationinegypt.vip/logo.png",
    "image": "https://vacationinegypt.vip/logo.png",
    "description": "Luxury travel experiences in Egypt, specializing in Red Sea cruises, yacht charters, desert safaris, historical tours, and premium excursions from Hurghada.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hurghada Marina",
      "addressLocality": "Hurghada",
      "addressRegion": "Red Sea Governorate",
      "postalCode": "84511",
      "addressCountry": "EG"
    },
    "telephone": "+201131312402",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+201131312402",
      "contactType": "customer service",
      "areaServed": ["EG", "US", "GB", "DE", "FR", "RU", "IT", "ES"],
      "availableLanguage": availableLanguage
    },
    "priceRange": "$$$",
    "currenciesAccepted": "USD, EUR, GBP, EGP",
    "paymentAccepted": "Cash, Credit Card, WhatsApp Pay",
    "openingHours": "Mo-Su 07:00-22:00",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.2579",
      "longitude": "33.8116"
    },
    "sameAs": [
      "https://www.instagram.com/vacationinegypt",
      "https://www.facebook.com/vacationinegypt",
      "https://www.youtube.com/@vacationinegypt",
      "https://www.tripadvisor.com/vacationinegypt"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": orgTotalReviews,
      "bestRating": "5"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "VACATION IN EGYPT",
    "url": "https://vacationinegypt.vip",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://vacationinegypt.vip/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const tripsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "VACATION IN EGYPT — Luxury Egyptian Experiences",
    "description": "40 curated luxury travel experiences across Egypt's most extraordinary destinations",
    "itemListElement": trips.map((trip, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristTrip",
        "name": trip.title,
        "description": trip.description,
        "image": `https://vacationinegypt.vip${trip.image}`,
        "url": `https://vacationinegypt.vip/trip/${trip.id}`,
        "touristType": trip.category === 'relaxation' || trip.category === 'cruise' ? ["Couple", "Family"] : ["Family", "Couple", "Solo"],
        "itinerary": {
          "@type": "ItemList",
          "name": trip.title,
          "itemListElement": trip.highlights.map((h, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": h
          }))
        },
        "offers": {
          "@type": "Offer",
          "price": trip.price,
          "priceCurrency": trip.currency,
          "availability": "https://schema.org/InStock",
          "url": `https://vacationinegypt.vip/trip/${trip.id}`,
          "seller": {
            "@type": "Organization",
            "name": "VACATION IN EGYPT"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": trip.rating,
          "reviewCount": trip.reviews,
          "bestRating": 5
        }
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('faq.q1'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.a1') }
      },
      {
        "@type": "Question",
        "name": t('faq.q2'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.a2') }
      },
      {
        "@type": "Question",
        "name": t('faq.q3'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.a3') }
      },
      {
        "@type": "Question",
        "name": t('faq.q4'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.a4') }
      },
      {
        "@type": "Question",
        "name": t('faq.q5'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.a5') }
      },
      {
        "@type": "Question",
        "name": t('faq.q6'),
        "acceptedAnswer": { "@type": "Answer", "text": t('faq.a6') }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(tripsSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
