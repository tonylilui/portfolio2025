import { Typography, Paper, Stack } from '@mui/material';

export default function Home() {
  return (
    <Stack spacing={0}>
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ 
          p: 3, 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h3" gutterBottom>
            Welcome to My Portfolio
          </Typography>
          <Typography variant="body1" paragraph>
            Scroll down to explore my work and experience.
          </Typography>
        </Paper>
      </section>

      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ 
          p: 3, 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h4" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" paragraph>
            I'm a passionate developer focused on creating engaging web experiences.
          </Typography>
        </Paper>
      </section>

      <section id="projects" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ 
          p: 3, 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h4" gutterBottom>
            Featured Projects
          </Typography>
          <Typography variant="body1" paragraph>
            Check out some of my best work as you scroll through this interactive portfolio.
          </Typography>
        </Paper>
      </section>

      <section id="contact" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ 
          p: 3, 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h4" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1">
            Interested in working together? Let's connect!
          </Typography>
        </Paper>
      </section>
    </Stack>
  );
}