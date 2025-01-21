import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // Use the HTTP backend to load translations
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: 'en', // Default language fallback
    debug: true, // Enable debug mode during development

    backend: {
      // Specify the path to load translation files from the public folder
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    ns: ['main'],

    interpolation: {
      escapeValue: false // React escapes by default
    }
  })

export default i18n
