import { Outlet } from 'react-router-dom'
import { Stack, Box } from '@mui/material'

import NavBar from '@/components/NavBar'
import SideLayout from './SideLayout'

function HomeLayout() {
  return (
    <Stack maxHeight="100vh">
      <NavBar
        children={["home", "exams", "careers", "performance"]}
      />
      <Outlet/>
    </Stack>
  );
}

export default HomeLayout;
