import { Box, Typography, Button } from '@mui/material'

function HomePage() {
  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      flexDirection: "column",
      color: "text.default",
      bgcolor: "primary.main",
      height: "60vh"
    }}>
      <Typography variant="h1" textAlign="center">
        Explore Careers That Matches Your Strengths
      </Typography>
      <Typography variant="h6" textAlign="center">
        Discover your strenghts and skills by taking
        these exams today. What are you waiting for?
      </Typography>

      <Button variant="contained" color="success" size="large" sx={{ mt: 3, pt: 1.5, width: "10rem", borderRadius: 16 }}>
        <Typography variant="h6" textTransform="none">
          Get Started
        </Typography>
      </Button>
    </Box>
  );
}

export default HomePage;
