import { Box, Typography, AppBar, Toolbar, Link } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import useNav from '@/hooks/useNav'
import { useLogout } from '@/hooks/useAccount'
import { useState } from 'react'

function NavBar({ children }) {
  const { goTo, goHome } = useNav();
  const [isLogout, setLogout] = useState(false);
  const logout = useLogout();

  const handleLogout = async () => {
    const res = await logout.mutateAsync({});
    setLogout(true);
  }

  if (isLogout) {
    goHome();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ pt: 1, pb: 1, display: "flex", flexDirection: "row"}}>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center"}}>
            <Box 
              component="img"
              src="./logo.png" 
              alt="logo.png"
              sx={{ 
                height: "4rem",
                pl: 2,
                pr: 2
              }}
            />
            <Typography 
              variant="h4"
              component="div"
              sx={{ 
                mt:1
              }}
              
            >
              ACPA
            </Typography>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Box sx={{ 
              display: "flex",
              justifyContent: "center"
            }}>
              { children.map((item, index) => (
                <Link key={index} href={`/${item}`} >
                  <Typography 
                    variant="h6"
                    component="div"
                    sx={{ 
                      color: "text.default",
                      cursor: "pointer",
                      mr: 5,
                      ml: 5
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              )) }
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ 
              display: "flex",
              justifyContent: "right",
              mr: 5
            }}>
              <LogoutIcon sx={{ fontSize: "2rem", cursor: "pointer" }} onClick={handleLogout}/>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
} 

export default NavBar;
