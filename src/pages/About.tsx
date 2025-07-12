import { Typography, Paper, Box } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1">
          This is where you can share your story, experience, and skills.
        </Typography>
      </Paper>
    </Box>
  );
}