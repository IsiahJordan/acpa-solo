import SectionCard from '@/components/SectionCard'
import ActionBar from '@/components/ActionBar'
import { useExamList } from '@/hooks/useExam'
import useNav from '@/hooks/useNav'
import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

function ExamPage() {
  const { getQuery } = useNav();
  const { data } = useExamList({ exam_id: getQuery("exam_id") });
  const [cardList, setCardList] = useState(
    <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h4" color="grey.400">
        Empty List 
      </Typography>
    </Box>
  );
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (data && data?.success) {
      const cards = [];
      const metadata = []; // stores all of the data per card for reuse 
      for (const list of data.payload.data) {
        cards.push(<SectionCard title={list.section_name} description={list.description} section_name={list.section_name}/>);
        metadata.push(list);
      }

      setCardList(
        <Box sx={{ width: "100%", height: "100%", pt: 4, pl: 2, pr: 2}}>
          { cards }
        </Box>
      );
      setCardData(metadata);
    }
  }, [data])

  return (
    <Box sx={{ height:"100%", overflow: "hidden" }}>
      <ActionBar
        title="Section List"
        actions={undefined}
      />
      <Box sx={{ bgcolor: "grey.100", height: "100%", overflow: "overflow-y" }}>
        {cardList}
      </Box>
    </Box> 
  );
}

export default ExamPage;
