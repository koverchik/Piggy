import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './dictionary';

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  fallbackLng: 'en'
});

export default i18n;
