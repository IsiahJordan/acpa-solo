import { Box, Drawer, TextField, Typography, List, ListItem, ListItemText, ListItemButton, Button } from '@mui/material'
import AddModal from '@/components/AddModal'
import AddIcon from '@mui/icons-material/Add'
import { useJoinClassroom } from '@/hooks/useClassroom'
import { useState } from 'react'
import useNav from '@/hooks/useNav'

function SideBar({ children, list_id }) {
  const [open, setOpen] = useState(false);
  const [inputBox, setInputBox] = useState("");
  const [params, setParams] = useState(null);
  const response = useJoinClassroom(params);
  const { setQuery } = useNav();

  const handleSubmit = () => {  
    setParams({ code: inputBox });
  };

  const onClick = (index: string) => {
    setQuery({ exam_id: list_id[index].exam_id });
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ pt: 2, pl: 4 }}>
        <Typography variant="h5" sx={{ opacity: "30%", mt: 2}}>
          Exam List
        </Typography>
      </Box>
      <List sx={{ }}>
        {children.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => onClick(index)}>
              <ListItemText primary={item}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ pl: 4 }}>
        <Button variant="contained" color="success" sx={{ width: "70%" }} onClick={() => setOpen(true)}>
          <AddIcon sx={{ fontSize: "1.6rem" }}/>
          <Typography variant="h6" textTransform="none" sx={{ mt: 0.5}}>
            Add Class
          </Typography>
        </Button>
      </Box>
      <AddModal
        title="Join a Class"
        children={
          <TextField id="outlined-basic" label="Enter Class Code" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setInputBox(e.target.value)}/>
        }
        onSubmit={() => handleSubmit()}
        open={open}
        setOpen={setOpen}
      /> 
    </Box>
  );
}

export default SideBar;
