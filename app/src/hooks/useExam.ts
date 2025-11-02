import { getExams, getExam, getExamLists } from '@/services/ExamService'
import { ExamType } from '@/types/services'
import newLogger from '@/utils/log'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useExams(params: ExamType[]) {
  const log = newLogger("useExams");
  log.info("hook called");

  return useQueries({
    queries: params.map((exam_id) => {
      return {
        queryKey: ['exam_id', params],
        queryFn: async () => {
          const res = await getExams(params);
          return res;
        },
      }
    })
  });
}

export function useExam(params: ExamType) {
  const log = newLogger("useExam");
  log.info("hook called");

  return useQuery({
    queryKey: ['exam', params],
    queryFn: async () => {
      const res = await getExam(params);
      return res;
    },
  });
}

export function useExamList(params: ExamType, enabled: bool = true) {
  const log = newLogger("useExam");
  log.info("hook called");

  log.debug(params.exam_id);
  
  return useQuery({
    queryKey: ['exam_list', params],
    queryFn: async () => {
      const res = await getExamLists(params);
      return res;
    },
    enabled: enabled&&!!params?.exam_id,
  });
}
