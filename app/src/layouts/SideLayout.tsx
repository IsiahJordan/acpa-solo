// this can be used in conjuction with other layouts 
// to make a left and right layout 

import SideBar from '@/components/SideBar'
import { Box, Divider } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useClassroom } from '@/hooks/useClassroom'
import { useExams, useExam } from '@/hooks/useExam'
import { getExams, getExam } from '@/services/ExamService'
import { useState, useEffect } from 'react'

function SideLayout() {
  const classroom = useClassroom();
  const [classIds, setClassIds] = useState([]);
  const [examIds, setExamIds] = useState([]);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    async function handle() {
      try {
        const res = await classroom.mutateAsync();
        if (res?.payload?.data) {
          setClassIds(prev => {
            const combined = [...prev, ...res.payload.data];
            const unique = Array.from(new Map(combined.map(i => [i.class_id, i])).values());
            return unique;
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    setExamIds([]);
    setClassIds([]);
    setTabs([]);
    handle();
  }, []);

  useEffect(() => {
    async function handle() {
      for (const ids of classIds) {
        const res = await getExams({ class_id: ids.class_id });
        if (res?.payload?.data) {
          setExamIds(prev => {
            const combined = [...prev, ...res.payload.data];
            const unique = Array.from(new Map(combined.map(i => [i.exam_id, i])).values());
            return unique;
          });
        }
      }
    }
    handle();
  }, [classIds]);

  useEffect(() => {
    async function handle() {
      for (const ids of examIds) {
        const res = await getExam({ exam_id: ids.exam_id });
        if (res?.payload?.data) {
          setTabs(prev => {
            const combined = [...prev, res.payload.data.exam_name];
            return [...new Set(combined)];
          });
        }
      }
    }

    handle();
  }, [examIds]);

  return (
    <Box display="flex" sx={{ height: "100vh" }}>
      <SideBar children={tabs} list_id={examIds}/>
      <Divider flexItem orientation="vertical" />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default SideLayout;

