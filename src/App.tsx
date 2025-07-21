import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    emailjs.init('q70Fxa0fZZECYPrQg'); // Replace with your EmailJS public key
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#4a90e2',
            light: '#6eb0ff',
            dark: '#2170b0',
          },
          background: {
            default: '#0a192f',
            paper: 'rgba(26, 32, 44, 0.8)',
          },
          text: {
            primary: '#4a90e2',
            secondary: '#64b5f6',
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backdropFilter: 'blur(10px)',
                background: 'rgba(26, 32, 44, 0.5)',
                borderColor: '#4a90e2',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                background: 'rgba(26, 32, 44, 0.8)',
                borderRight: '1px solid rgba(74, 144, 226, 0.1)',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                background: 'rgba(26, 32, 44, 0.8)',
                borderBottom: '1px solid rgba(74, 144, 226, 0.1)',
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout onToggleTheme={toggleTheme} currentTheme={mode}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
