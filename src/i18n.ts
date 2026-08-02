import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

export const supportedLngs = [
  'en', 'de', 'fr', 'ru', 'ar', 'it', 'es', 'zh', 'ja', 'ko',
  'nl', 'pl', 'tr', 'pt', 'sv', 'cs', 'uk', 'hu', 'ro', 'sk',
  'da', 'no', 'fi', 'sr', 'bg', 'hi', 'id', 'el', 'vi', 'he', 'kk', 'lt'
];

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    supportedLngs,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'querystring'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'lang',
    }
  });

i18n.on('languageChanged', (lng) => {
  const rtlLanguages = ['ar', 'he'];
  document.documentElement.dir = rtlLanguages.includes(lng) ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;
