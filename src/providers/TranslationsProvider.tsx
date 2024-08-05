'use client';

import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance, i18n as I18nInstance, InitOptions } from 'i18next';

import initTranslations from '@/app/i18n';

interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: InitOptions['resources'] | any;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const i18n: I18nInstance = createInstance();

  initTranslations({ locale, namespaces, i18nInstance: i18n, resources });
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
