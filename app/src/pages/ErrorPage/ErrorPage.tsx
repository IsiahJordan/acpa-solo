import { Stack, Box, Typography } from '@mui/material'

function ErrorPage() {
  return (
    <Stack 
      minHeight="100vh" 
      bgcolor="background.main" 
    >
      <Box sx={{ 
        bgcolor: "primary.main", 
        color: "text.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",  
        flex: 1
      }}>
        <Typography variant="h1">
          404 bad request
        </Typography>
      </Box>
    </Stack>    
  );
}

export default ErrorPage;
