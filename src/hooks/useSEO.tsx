import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '../i18n';
import type { Trip } from '../data/trips';

export function useSEO(cityName?: string, trip?: Trip) {
  const { t, i18n } = useTranslation();
  const languageCode = i18n.language?.split('-')[0] || 'en';
  const rtlLanguages = ['ar', 'he'];
  const dir = rtlLanguages.includes(languageCode) ? 'rtl' : 'ltr';

  let title = t('seo.title');
  let description = t('seo.description');

  if (trip) {
    title = `${trip.title} | Luxury Egypt Tours | VACATION IN EGYPT`;
    description = trip.description;
  } else if (cityName) {
    const cityId = cityName.toLowerCase().replace(/\s+/g, '');
    const cityTitleKey = `seo.city.${cityId}.title`;
    const cityDescKey = `seo.city.${cityId}.description`;
    const cityTitle = t(cityTitleKey);
    const cityDesc = t(cityDescKey);
    if (cityTitle !== cityTitleKey) title = cityTitle;
    if (cityDesc !== cityDescKey) description = cityDesc;
  }

  const canonicalBaseUrl = 'https://vacationinegypt.vip' + (window.location.pathname.replace(/\/$/, '') || '');
  const baseUrl = (window.location.origin + window.location.pathname).replace(/\/$/, '');
  const ogImage = trip
    ? `https://vacationinegypt.vip${trip.image}`
    : `https://vacationinegypt.vip/logo.jpg`;

  // Dynamic Google JSON-LD Structured Data
  const jsonLdData: Record<string, unknown>[] = [];

  if (trip) {
    // 1. TouristTrip Schema with live Euro Price & Star Reviews
    jsonLdData.push({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": trip.title,
      "description": trip.description,
      "image": `https://vacationinegypt.vip${trip.image}`,
      "url": `https://vacationinegypt.vip/trip/${trip.id}`,
      "touristType": ["Luxury", "Family", "Couples", "VIP"],
      "offers": {
        "@type": "Offer",
        "price": trip.price,
        "priceCurrency": trip.currency || "EUR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01",
        "url": `https://vacationinegypt.vip/trip/${trip.id}`,
        "seller": {
          "@type": "TravelAgency",
          "name": "VACATION IN EGYPT",
          "telephone": "+201131312402",
          "url": "https://vacationinegypt.vip",
          "image": "https://vacationinegypt.vip/logo.jpg"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": trip.rating || 4.9,
        "reviewCount": trip.reviews || 150,
        "bestRating": 5,
        "worstRating": 1
      },
      "itinerary": {
        "@type": "ItemList",
        "numberOfItems": trip.highlights.length,
        "itemListElement": trip.highlights.map((h, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": h
        }))
      }
    });

    // 2. BreadcrumbList Schema
    jsonLdData.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://vacationinegypt.vip"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `${trip.location} Experiences`,
          "item": `https://vacationinegypt.vip/city/${trip.location.toLowerCase().replace(/\s+/g, '-')}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": trip.title,
          "item": `https://vacationinegypt.vip/trip/${trip.id}`
        }
      ]
    });
  }

  return (
    <Helmet>
      <title>{title}</title>
      <html lang={languageCode} dir={dir} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={languageCode} />
      <meta property="og:type" content={trip ? 'article' : 'website'} />
      <meta property="og:site_name" content="VACATION IN EGYPT" />
      <meta property="og:url" content={canonicalBaseUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={canonicalBaseUrl} />
      {supportedLngs.filter(l => l !== languageCode).map(l => (
        <link key={l} rel="alternate" hrefLang={l} href={`${canonicalBaseUrl}?lang=${l}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonicalBaseUrl} />

      {/* Structured Data Scripts */}
      {jsonLdData.map((schemaObj, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
}
