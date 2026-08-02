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

  const baseUrl = (window.location.origin + window.location.pathname).replace(/\/$/, '');
  const ogImage = trip
    ? `${window.location.origin}${trip.image}`
    : `${window.location.origin}/images/hero-redsea.jpg`;

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
      <meta property="og:url" content={baseUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={baseUrl} />
      {supportedLngs.filter(l => l !== languageCode).map(l => (
        <link key={l} rel="alternate" hrefLang={l} href={`${baseUrl}?lang=${l}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
    </Helmet>
  );
}
