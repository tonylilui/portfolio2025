import { Typography, Paper, Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to My Portfolio
        </Typography>
        <Typography variant="body1">
          This is a React TypeScript project using Material-UI components.
        </Typography>
      </Paper>
    </Box>
  );
}