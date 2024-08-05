import { createInstance, InitOptions, i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import i18nConfig from '@/i18nConfig';

interface InitTranslationsParams {
  locale: string;
  namespaces: string[];
  i18nInstance?: I18nInstance;
  resources?: InitOptions['resources'];
}

interface InitTranslationsResult {
  i18n: I18nInstance;
  resources: any;
  t: I18nInstance['t'];
}

export default async function initTranslations({
  locale,
  namespaces,
  i18nInstance,
  resources,
}: InitTranslationsParams): Promise<InitTranslationsResult> {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: any, namespace: any) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
