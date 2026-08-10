import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
};

const STORAGE_KEY = 'i18nextLng';

const normalizeLanguage = (lng) => {
  const base = (lng || '').toLowerCase().split('-')[0];
  return base === 'en' ? 'en' : 'fr';
};

const storedLanguage = (() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? normalizeLanguage(stored) : null;
  } catch {
    return null;
  }
})();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLanguage || undefined,
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: STORAGE_KEY,
      convertDetectedLanguage: normalizeLanguage,
    },
  })
  .then(() => {
    const language = normalizeLanguage(i18n.resolvedLanguage || i18n.language || 'fr');

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage errors (private mode, etc.)
    }

    if (normalizeLanguage(i18n.language) !== language) {
      return i18n.changeLanguage(language);
    }
  });

export default i18n;
