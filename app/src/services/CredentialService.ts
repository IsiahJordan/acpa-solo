import api from './api.module.ts'
import NewLogger from '@/utils/log'
import { CredentialType } from '@/types/service'

export async function postVerifyRole() {
  const log = NewLogger("postVerifyRole");
  log.info("service called");
  
  const res = await api.post('/auth/fetch/role', {}, { withCredentials: true });
  return res.data;
}
