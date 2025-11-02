import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { NavProvider } from '@/context/NavContext'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4859ab",
      blend: "#6f7dc3"
    },
    secondary: {
      default: "#f7c601",
      main: "#2b3484",
      blend: "#252d74"
    },
    text: {
      default: "#ffffff",
      main: "#2b3484"
    },
    background: {
      main: "#ffffff"
    }
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700
    }
  }
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NavProvider>
            <App />
          </NavProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
