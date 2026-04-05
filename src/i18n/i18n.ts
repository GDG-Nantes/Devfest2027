import { createInstance } from 'i18next';
import type { i18n, Resource, TFunction } from 'i18next';
import i18nConfig from './i18nConfig';
import type { Locale } from './i18nConfig';

// Import translation files statically for Astro (no dynamic import needed at build time)
import frTranslation from '../locales/fr/translation.json';
import enTranslation from '../locales/en/translation.json';

const resources: Resource = {
  fr: { translation: frTranslation },
  en: { translation: enTranslation },
};

const i18nInstances: Record<string, i18n> = {};

async function getOrCreateInstance(locale: string): Promise<i18n> {
  if (i18nInstances[locale]) {
    return i18nInstances[locale];
  }

  const instance = createInstance();
  await instance.init({
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'translation',
    fallbackNS: 'translation',
    ns: ['translation'],
    resources,
  });

  i18nInstances[locale] = instance;
  return instance;
}

/**
 * Get a translation function for a given locale.
 * Astro version: takes locale string directly (not a Promise).
 */
export async function getTranslation(
  locale: string,
  keyPrefix?: string
): Promise<TFunction> {
  const resolvedLocale = locale || i18nConfig.defaultLocale;
  const instance = await getOrCreateInstance(resolvedLocale);
  return instance.getFixedT(resolvedLocale, 'translation', keyPrefix);
}

/**
 * Helper to extract locale from Astro params.
 * Falls back to default locale.
 */
export function getLocaleFromParams(
  params: Record<string, string | undefined>
): Locale {
  const locale = params.locale || params.lang;
  if (locale && i18nConfig.locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return i18nConfig.defaultLocale;
}
