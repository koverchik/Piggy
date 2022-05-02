import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './dictionary';

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: DETECTION_OPTIONS,
    resources,
    fallbackLng: 'en',
    supportedLngs: ['ru', 'en', 'uk', 'by']
  });

export default i18n;
