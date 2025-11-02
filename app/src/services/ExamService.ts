import api from './api.module.ts'
import NewLogger from '@/utils/log'
import { ExamType } from '@/types/service'

// this will call activity using class id 
export async function getExams(send: ExamType) {
  const log = NewLogger("getExams");
  log.info("service called");

  const res = await api.get('/room/activity/fetch', { params: send });
  return res.data;
}

export async function getExam(send: ExamType) {
  const log = NewLogger("getExam");
  log.info("service called");

  const res = await api.get('/exam/fetch', { params: send });
  return res.data;
}

export async function getExamLists(send: ExamType) {
  const log = NewLogger("getExamList");
  log.info("service called");

  const res = await api.get('/exam/list/fetch', { params: send });
  return res.data;
  
}
