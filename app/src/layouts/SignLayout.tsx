import { Outlet } from 'react-router-dom'
import { Stack, Box, Typography } from '@mui/material'
import GlobalLoader from '@/shared/GlobalLoader'

function SignLayout() {
  return (
    <Stack 
      minHeight="100vh" 
      bgcolor="background.main" 
      dislay="flex" 
      flexDirection="row">
      <Box sx={{ 
        color: "text.default",
        flex: 2,
        bgcolor: "primary.main",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4
      }}>
        <Typography variant="h4">
          test 
        </Typography>
      </Box>
      <Box sx={{ 
        color: "text.main",
        flex: 1,
        bgcolor: "primary.default",
        padding: 4
      }}>
        <GlobalLoader/>
        <Outlet/>
      </Box>
    </Stack>
  );
}

export default SignLayout;
