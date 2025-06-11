// Для исправления ошибок мы временно определяем TranslationKey как string.
// Позже вы сможете вернуть ваш строгий тип, добавив в него все новые ключи.
export type TranslationKey = string;

export interface Translations {
  [key: string]: string;
}

export interface LocaleData {
  ru: Translations;
  en: Translations;
}
