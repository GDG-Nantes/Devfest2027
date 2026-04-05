const i18nConfig = {
  locales: ['en', 'fr'] as const,
  defaultLocale: 'fr' as const,
};

export type Locale = (typeof i18nConfig.locales)[number];

export default i18nConfig;
