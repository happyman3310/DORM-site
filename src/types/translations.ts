import translations from "../locales/translations";

type BaseTranslationKey = keyof typeof translations.ru;
type DynamicTeamKey = `team.role.${string}` | `team.modal.${string}`;
type ErrorKey = 'error.general' | 'loading';

export type TranslationKey = BaseTranslationKey | DynamicTeamKey | ErrorKey;
