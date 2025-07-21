import { useState, useEffect, type ReactNode } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
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
  Divider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Scene } from './Scene';

interface LayoutProps {
  children: ReactNode;
  onToggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

const DRAWER_WIDTH = 240;
const NAV_ITEMS = [
  { text: 'Home', icon: <HomeIcon />, path: 'home' },
  { text: 'About', icon: <PersonIcon />, path: 'about' },
  { text: 'Projects', icon: <WorkIcon />, path: 'projects' },
  { text: 'Contact', icon: <ContactMailIcon />, path: 'contact' }
];

export default function Layout({ children, onToggleTheme, currentTheme }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.path));
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // Find current section
      let activeSection = sections[0];
      let minDistance = Infinity;

      sections.forEach((section) => {
        if (section) {
          const distance = Math.abs(section.offsetTop - scrollPosition);
          if (distance < minDistance) {
            minDistance = distance;
            activeSection = section;
          }
        }
      });

      if (activeSection) {
        setCurrentSection(activeSection.id);
      }

      // Calculate overall scroll progress
      const totalHeight = document.documentElement.scrollHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrollPosition / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = section.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => (
          <motion.div
            key={item.text}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <ListItem disablePadding>
              <ListItemButton 
                selected={currentSection === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: '8px',
                  mx: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      backgroundColor: '#4a90e2',
                      borderRadius: '0 2px 2px 0'
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: currentSection === item.path ? '#4a90e2' : 'inherit',
                  transition: 'color 0.3s ease'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{ 
                    color: currentSection === item.path ? '#4a90e2' : 'inherit',
                    transition: 'color 0.3s ease'
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <Scene scrollProgress={scrollProgress} currentSection={currentSection} />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ 
            zIndex: theme.zIndex.drawer + 1,
            background: 'rgba(26, 32, 44, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(74, 144, 226, 0.1)'
          }}
        >
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <Toolbar>
              {isMobile && (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography 
                variant="h6" 
                component={motion.div}
                sx={{ 
                  flexGrow: 1,
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }}
                whileHover={{ scale: 1.05 }}
              >
                Portfolio
              </Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <IconButton 
                  onClick={onToggleTheme} 
                  color="inherit"
                  sx={{
                    background: 'rgba(74, 144, 226, 0.1)',
                    '&:hover': {
                      background: 'rgba(74, 144, 226, 0.2)'
                    }
                  }}
                >
                  {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </motion.div>
            </Toolbar>
          </motion.div>
          
          {/* Scroll Progress Indicator */}
          <motion.div
            style={{
              height: '2px',
              background: '#4a90e2',
              transformOrigin: '0%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollProgress }}
          />
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        >
          <AnimatePresence>
            {isMobile ? (
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                  '& .MuiDrawer-paper': { 
                    boxSizing: 'border-box', 
                    width: DRAWER_WIDTH,
                    background: 'rgba(26, 32, 44, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRight: '1px solid rgba(74, 144, 226, 0.1)'
                  },
                }}
              >
                {drawer}
              </Drawer>
            ) : (
              <Drawer
                variant="permanent"
                sx={{
                  '& .MuiDrawer-paper': { 
                    boxSizing: 'border-box', 
                    width: DRAWER_WIDTH,
                    background: 'rgba(26, 32, 44, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRight: '1px solid rgba(74, 144, 226, 0.1)'
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            )}
          </AnimatePresence>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { md: `${DRAWER_WIDTH}px` },
            mt: '64px'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}