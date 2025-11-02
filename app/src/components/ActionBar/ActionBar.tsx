import { Toolbar, Box, Typography } from '@mui/material'

function ActionBar({ title, actions }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h4" sx={{ width: "50%" }}>
          {title}
        </Typography>
        <Box sx={{ width: "50%", float: "right" }}>
          { actions }
        </Box>
      </Toolbar>
    </Box> 
  );
}

export default ActionBar;
