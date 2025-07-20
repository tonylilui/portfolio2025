import { Typography, Paper, Box } from '@mui/material';

export default function Projects() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ 
        p: 3,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h5" gutterBottom>
          My Projects
        </Typography>
        <Typography variant="body1">
          Here you can showcase your portfolio projects and achievements.
        </Typography>
      </Paper>
    </Box>
  );
}