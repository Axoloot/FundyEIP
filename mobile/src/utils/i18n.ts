/* eslint-disable quote-props */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from '../lang/en.json';
import FR from '../lang/fr.json';
import ES from '../lang/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: EN,
      },
      fr: {
        translation: FR,
      },
      es: {
        translation: ES,
      },
      fallbackLng: { default: 'fr' },
    },
    lng: 'fr',
  });

export default i18n;
