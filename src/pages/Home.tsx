import { Typography, Paper, Stack, Box, Container } from '@mui/material';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <motion.section
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <Paper
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            sx={{ 
              p: 6, 
              width: '100%',
              background: 'rgba(26, 32, 44, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(74, 144, 226, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.3), transparent)'
              }
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                Welcome to My Portfolio
              </Typography>
              <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} paragraph>
                Scroll down to explore my work and experience.
              </Typography>
            </motion.div>
          </Paper>
        </motion.section>

        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <Paper
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            sx={{ 
              p: 6, 
              width: '100%',
              background: 'rgba(26, 32, 44, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(74, 144, 226, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.3), transparent)'
              }
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                About Me
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} paragraph>
                I'm a passionate developer focused on creating engaging web experiences.
              </Typography>
            </motion.div>
          </Paper>
        </motion.section>

        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <Paper
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            sx={{ 
              p: 6, 
              width: '100%',
              background: 'rgba(26, 32, 44, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(74, 144, 226, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                Featured Projects
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} paragraph>
                Check out some of my best work as you scroll through this interactive portfolio.
              </Typography>
            </motion.div>
          </Paper>
        </motion.section>

        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <Paper
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            sx={{ 
              p: 6, 
              width: '100%',
              background: 'rgba(26, 32, 44, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(74, 144, 226, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                Get in Touch
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} paragraph>
                Interested in working together? Let's connect!
              </Typography>
            </motion.div>
          </Paper>
        </motion.section>
      </Stack>
    </Container>
  );
}