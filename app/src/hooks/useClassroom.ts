import { useMutation, useQuery } from '@tanstack/react-query'
import { postClassroom, getClassroom, postJoinClassroom } from '@/services/ClassroomService'
import newLogger from '@/utils/log'
import { useState, useEffect } from 'react'
import { ClassroomType } from '@/types/service'

export function useClassroom() {
  const log = newLogger("useClassroom");
  log.info("hook called");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await postClassroom();
      return res;
    }
  });

  return mutation;
}

export function useJoinClassroom(params: ClassroomType) {
  const log = newLogger("useJoinClassroom");
  const [response, setResponse] = useState(null);
  log.info("hook called");

  const { data } = useQuery({
    queryKey: ['class_code', params],
    queryFn: async () => {
      const res = await getClassroom({ code: params.code })
      return res;
    },
    enabled: !!params?.code,
  });

  log.debug(JSON.stringify(data));

  useEffect(() => {
    if (!data?.payload?.data?.class_id) return;

    async function handle() {
      const res = await postJoinClassroom({ class_id: data.payload.data.class_id });
      setResponse(res.payload);
    }

    handle();
  }, [data]);

  return response;
}
