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
    handleScroll(); // Initial check
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
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={currentSection === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <Scene scrollProgress={scrollProgress} currentSection={currentSection} />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <AppBar position="fixed" 
          sx={{ 
            zIndex: theme.zIndex.drawer + 1,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Portfolio
            </Typography>
            <IconButton onClick={onToggleTheme} color="inherit">
              {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        >
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
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
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
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
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