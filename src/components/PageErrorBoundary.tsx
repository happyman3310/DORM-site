import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  children: React.ReactNode;
}

export const PageErrorBoundary: React.FC<Props> = ({ children }) => {
  const { t } = useLanguage();
  
  return (
    <React.Suspense fallback={<div>{t("loading")}</div>}>
      <ErrorBoundary fallback={<div>{t("error.general")}</div>}>
        {children}
      </ErrorBoundary>
    </React.Suspense>
  );
};
