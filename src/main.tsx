import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from './App.tsx';
import './index.css';

// Здесь вы можете расширять тему Chakra UI
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#202020',
        color: '#F5F5F5',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
