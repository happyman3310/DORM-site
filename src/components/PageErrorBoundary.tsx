import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Здесь можно вставить более красивый компонент для отображения ошибки
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export const PageErrorBoundary: React.FC<Props> = ({ children }) => {
  // Переменная 't' была удалена, так как она не использовалась
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </React.Suspense>
  );
};
