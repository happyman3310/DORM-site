import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { ThemeProvider } from '@emotion/react'
import App from './App.tsx'
import './index.css'

const theme = extendTheme({
  // ваши настройки темы
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
