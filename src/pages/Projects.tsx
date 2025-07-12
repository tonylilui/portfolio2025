import { Typography, Paper, Box } from '@mui/material';

export default function Projects() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
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