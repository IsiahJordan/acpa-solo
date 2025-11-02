import { useMutation } from '@tanstack/react-query'
import { AccountType } from '@/types/service'
import { postLogin, postRegister, postLogout } from '@/services/AccountService'
import useNav from '@/hooks/useNav'
import newLogger from '@/utils/log'

export function useLogin() {
  const log = newLogger("useLogin");
  log.info("hook called");

  const mutation = useMutation({
    mutationFn: async (data: AccountType) => {
      const res = await postLogin(data);
      return res;
    }
  });

  return mutation;
}

export function useRegister() {
  const log = newLogger("useRegister");
  log.info("hook called");

  const mutation = useMutation({
    mutationFn: async (data: AccountType) => {
      const res = await postRegister(data);
      return res;
    }
  });

  return mutation;
}

export function useLogout() {
  const log = newLogger("useLogin");
  log.info("hook called");

  const mutation = useMutation({
    mutationFn: async (data: AccountType) => {
      const res = await postLogout();
      return res;
    }
  });

  return mutation;
}
