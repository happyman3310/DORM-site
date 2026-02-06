import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from './App.tsx';
import { AppDataProvider } from './data/appData';
import './index.css';

// Здесь вы можете расширять тему Chakra UI
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'var(--app-bg)',
        color: 'var(--app-text)',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AppDataProvider>
          <App />
        </AppDataProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
