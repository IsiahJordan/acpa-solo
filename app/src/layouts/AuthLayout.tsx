import { Outlet } from 'react-router-dom'
import { useCredRole } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import useNav from '@/hooks/useNav'
import { getRoleLevel } from '@/utils/verify'

function AuthLayout({ role }) {
  const credRole = useCredRole();
  const { goTo } = useNav();
  const [tokenRole, setTokenRole] = useState(null);

  useEffect(() => {
    async function handleCall () {
      const res = await credRole.mutateAsync({});     
      setTokenRole(res);
    }

    handleCall();
  }, []);

  if (tokenRole && getRoleLevel(tokenRole) < getRoleLevel(role)) {
    goTo("/login");
  }


  return (
    <>
      <Outlet/>
    </>
  );
}

export default AuthLayout;
