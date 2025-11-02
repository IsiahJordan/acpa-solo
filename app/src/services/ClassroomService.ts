import api from './api.module.ts'
import NewLogger from '@/utils/log'
import { ClassroomType } from '@/types/service'

export async function postClassroom() {
  const log = NewLogger("postClassroom");
  log.info("service called");

  const res = await api.post('/room/student/fetch', {}, { withCredentials: true });
  return res.data;
}

export async function getClassroom(send: ClassroomType) {
  const log = NewLogger("getClassroom");
  log.info("service called");

  const res = await api.get('/room/fetch', { params: { code: send.code } });
  return res.data;
}

export async function postJoinClassroom(send: ClassroomType) {
  const log = NewLogger("postJoinClassroom");
  log.info("service called");

  const res = await api.post('/room/student/add', { class_id: send.class_id, role: "student" }, { withCredentials: true })
  return res.data;
}

