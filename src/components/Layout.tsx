import { useState, useEffect, type ReactNode } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Scene } from './Scene';

interface LayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { text: 'Home', icon: <HomeIcon />, path: 'home' },
  { text: 'About', icon: <PersonIcon />, path: 'about' },
  { text: 'Projects', icon: <WorkIcon />, path: 'projects' },
  { text: 'Contact', icon: <ContactMailIcon />, path: 'contact' },
];

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight - viewportHeight;
      const progress = totalHeight > 0 ? Math.max(0, Math.min(1, scrollPosition / totalHeight)) : 0;
      setScrollProgress(progress);
      setScrolled(scrollPosition > 50);

      // Find current section
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.path));
      let active = 'home';
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= viewportHeight / 3) {
            active = section.id;
          }
        }
      }
      setCurrentSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Scene scrollProgress={scrollProgress} currentSection={currentSection} />

      {/* Floating Navbar */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          left: 0,
          right: 0,
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          width: '90%',
          maxWidth: 800,
          pointerEvents: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.5,
            borderRadius: '16px',
            background: scrolled
              ? 'rgba(10, 15, 26, 0.85)'
              : 'rgba(10, 15, 26, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(96, 165, 250, 0.08)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 4px 16px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          <Typography
            variant="h6"
            onClick={() => handleNavigation('home')}
            sx={{
              background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: '1.1rem',
              cursor: 'pointer',
              letterSpacing: '-0.02em',
              userSelect: 'none',
            }}
          >
            TonyStack
          </Typography>

          {/* Desktop nav links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {NAV_ITEMS.map((item) => (
                <Box
                  key={item.text}
                  component="button"
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    background: currentSection === item.path
                      ? 'rgba(96, 165, 250, 0.12)'
                      : 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    px: 2,
                    py: 1,
                    color: currentSection === item.path ? '#60a5fa' : '#94a3b8',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#e2e8f0',
                      background: 'rgba(96, 165, 250, 0.08)',
                    },
                  }}
                >
                  {item.text}
                </Box>
              ))}
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ color: '#60a5fa' }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Box>

        {/* Scroll progress bar */}
        <motion.div
          style={{
            height: 2,
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
            borderRadius: '0 0 16px 16px',
            transformOrigin: '0%',
            scaleX: scrollProgress,
            marginTop: -1,
          }}
        />
      </motion.header>
      </Box>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: 260,
                background: 'rgba(10, 15, 26, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(96, 165, 250, 0.08)',
                pt: 10,
              },
            }}
          >
            <List>
              {NAV_ITEMS.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={currentSection === item.path}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      borderRadius: '10px',
                      mx: 1.5,
                      my: 0.5,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: currentSection === item.path ? '#60a5fa' : '#64748b',
                        minWidth: 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: currentSection === item.path ? '#60a5fa' : '#94a3b8',
                          fontWeight: currentSection === item.path ? 600 : 400,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}