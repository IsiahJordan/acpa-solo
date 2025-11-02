import { useMutation } from '@tanstack/react-query'
import { CredentialType } from '@/types/service'
import { postVerifyRole } from '@/services/CredentialService'
import newLogger from '@/utils/log'

export function useCredRole() {
  const log = newLogger("useCredRole");
  log.info("hook called");

  const mutation = useMutation({
    mutationFn: async (data: CredentialType) => {
      const res = await postVerifyRole(data);
      return res;
    }
  });

  return mutation;
}
