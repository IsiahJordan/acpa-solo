import api from './api.module.ts';
import newLogger from '@/utils/log'
import { AccountType } from '@/types/service'

export async function postLogin(send: AccountType){
  const log = newLogger("postLogin");
  log.info("service called");
  
  const res = await api.post('/account/login', send, { withCredentials: true });
  return res.data;
}

export async function postRegister(send: AccountType){
  const log = newLogger("postRegister");
  log.info("service called");

  const res = await api.post('/account/register', send);
  return res.data;
}

export const postLogout = async () => {
  const log = newLogger("postLogout");
  log.debug("service called");

  const res = await api.post("/account/logout", {}, { withCredentials: true });

  return res.data;
}
