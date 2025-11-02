import { useContext } from 'react'
import { NavContextType } from '@/types/context'
import { NavContext } from '@/context/NavContext'
import newLogger from '@/utils/log'

function useNav(): NavContextType {
  const log = newLogger("useNav");
  const context = useContext(NavContext);

  if (!context) {
    log.error("must be within a NavProvider");
    return undefined;
  }

  return context;
}

export default useNav;
