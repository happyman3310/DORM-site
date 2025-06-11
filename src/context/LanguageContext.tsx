import React, { createContext, useContext, useState, ReactNode } from 'react';
import translations from '../locales/translations';
import { TranslationKey } from '../types/translations';

interface LanguageContextType {
  language: 'ru' | 'en';
  setLanguage: (lang: 'ru' | 'en') => void;
  // Обновляем сигнатуру функции t, чтобы она могла принимать переменные
  t: (key: TranslationKey, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');

  const t = (key: TranslationKey, options?: { [key: string]: string | number }): string => {
    // Получаем строку перевода
    let translation = translations[language][key as keyof typeof translations.ru] || key;
    
    // Если переданы переменные, заменяем плейсхолдеры вида {{variable}}
    if (options) {
      Object.keys(options).forEach((optionKey) => {
        const regex = new RegExp(`{{${optionKey}}}`, 'g');
        translation = translation.replace(regex, String(options[optionKey]));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
