import { Typography, Paper, Box } from '@mui/material';

export default function Contact() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Contact Me
        </Typography>
        <Typography variant="body1">
          Get in touch with me for opportunities and collaborations.
        </Typography>
      </Paper>
    </Box>
  );
}