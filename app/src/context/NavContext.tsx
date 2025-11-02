import { createContext, ReactNode, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NavContextType } from '@/types/context'

export const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children } : { children: ReactNode }) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const nav = useMemo<NavContextType>(() => ({
    goTo: (path: string) => navigate(path),
    goHome: () => navigate("/"),
    goBack: () => navigate(-1),
    getQuery: (key: string) => params.get(key),
    setQuery: (body: object) => setParams(body)
  }), [navigate, params, setParams]);

  return (
    <NavContext.Provider value={nav}>
      {children}
    </NavContext.Provider>
  );
}
