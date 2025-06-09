export interface ValidationMessages {
  required: string;
  email: string;
  minLength: string;
  maxLength: string;
}

export const validationMessages: Record<string, ValidationMessages> = {
  ru: {
    required: "Это поле обязательно",
    email: "Введите корректный email",
    minLength: "Минимальная длина: {0} символов",
    maxLength: "Максимальная длина: {0} символов"
  },
  en: {
    required: "This field is required",
    email: "Please enter a valid email",
    minLength: "Minimum length: {0} characters",
    maxLength: "Maximum length: {0} characters"
  }
};
