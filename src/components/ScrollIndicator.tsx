import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  currentSection: string;
}

export function ScrollIndicator({ currentSection }: ScrollIndicatorProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      {['home', 'about', 'projects', 'contact'].map((section) => (
        <motion.div
          key={section}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{ cursor: 'pointer' }}
        >
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentSection === section ? '#4a90e2' : 'rgba(74, 144, 226, 0.3)',
              transition: 'all 0.3s ease',
              position: 'relative',
              '&:hover': {
                backgroundColor: '#4a90e2',
              },
              '&:hover::before': {
                opacity: 1,
                transform: 'translateX(-100%) translateX(-20px)',
              },
              '&::before': {
                content: `"${section.charAt(0).toUpperCase() + section.slice(1)}"`,
                position: 'absolute',
                right: '100%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                marginRight: '10px',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                opacity: currentSection === section ? 1 : 0,
                transition: 'all 0.3s ease',
                color: '#4a90e2',
              }
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
}