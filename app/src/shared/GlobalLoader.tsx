// better use this inside a layout rather than a page
// but if you want, I ain't stopping you 

import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { Backdrop, CircularProgress } from '@mui/material'

function GlobalLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const loading = isFetching + isMutating > 0

  return (
    <Backdrop
      sx={{ 
        bgcolor: "primary.default", 
        color: "primary.main", 
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
      open={loading}
    >
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
}

export default GlobalLoader;
