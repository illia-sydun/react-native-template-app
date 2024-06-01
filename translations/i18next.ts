import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en/translation';
import ua from './locales/ua/translation';

export const resources = {
    en: {
        translation: en,
    },
    ua: {
        translation: ua,
    },
} as const;

export const defaultLanguage = 'en';

const { languageCode } = Localization.getLocales()[0];

i18next.use(initReactI18next).init({
    lng: languageCode || defaultLanguage,
    fallbackLng: defaultLanguage,
    compatibilityJSON: 'v3',
    resources,
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

export default i18next;
