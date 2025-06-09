import translations from "../locales/translations";

/**
 * Union type of all translation keys.
 * Includes dynamic team role and modal keys for future expansion.
 */
export type TranslationKey = keyof typeof translations.ru | `team.role.${string}` | `team.modal.${string}`;
