import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMemo, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  useEffect(() => {
    emailjs.init('q70Fxa0fZZECYPrQg');
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#60a5fa', light: '#93c5fd', dark: '#3b82f6' },
          background: { default: '#0a0f1a', paper: 'rgba(15, 23, 42, 0.6)' },
          text: { primary: '#e2e8f0', secondary: '#94a3b8' },
        },
        typography: {
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          h1: { fontWeight: 800, letterSpacing: '-0.025em' },
          h2: { fontWeight: 700, letterSpacing: '-0.025em' },
          h3: { fontWeight: 700, letterSpacing: '-0.02em' },
          h4: { fontWeight: 600, letterSpacing: '-0.01em' },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
          body1: { lineHeight: 1.7 },
          button: { textTransform: 'none' as const, fontWeight: 500 },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backdropFilter: 'blur(20px)',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(96, 165, 250, 0.08)',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                textTransform: 'none',
                fontWeight: 500,
                padding: '10px 24px',
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
