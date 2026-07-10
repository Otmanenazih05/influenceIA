import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import commonEN from './locales/en/common.json';
import commonFR from './locales/fr/common.json';
import homeEN from './locales/en/home.json';
import homeFR from './locales/fr/home.json';
import influencerDashboardEN from './locales/en/influencerDashboard.json';
import influencerDashboardFR from './locales/fr/influencerDashboard.json';
import brandDashboardEN from './locales/en/brandDashboard.json';
import brandDashboardFR from './locales/fr/brandDashboard.json';
import influencersEN from './locales/en/influencers.json';
import influencersFR from './locales/fr/influencers.json';
import brandsEN from './locales/en/brands.json';
import brandsFR from './locales/fr/brands.json';
import contactEN from './locales/en/contact.json';
import contactFR from './locales/fr/contact.json';
import authEN from './locales/en/auth.json';
import authFR from './locales/fr/auth.json';

const resources = {
  en: {
    common: commonEN,
    home: homeEN,
    auth: authEN,
    influencerDashboard: influencerDashboardEN,
    brandDashboard: brandDashboardEN,
    influencers: influencersEN,
    brands: brandsEN,
    contact: contactEN
  },
  fr: {
    common: commonFR,
    home: homeFR,
    auth: authFR,
    influencerDashboard: influencerDashboardFR,
    brandDashboard: brandDashboardFR,
    influencers: influencersFR,
    brands: brandsFR,
    contact: contactFR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // default language
    fallbackLng: "en",
    ns: ['common', 'home', 'auth', 'influencerDashboard', 'brandDashboard', 'influencers', 'brands', 'contact'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
