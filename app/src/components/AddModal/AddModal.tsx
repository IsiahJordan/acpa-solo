import { Box, Divider, Button, Typography, Modal } from '@mui/material'
import React from 'react'

function AddModal({ title, children, onSubmit, open, setOpen }) {
  console.log(open);
  return (
    <div>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {children}
        <Divider sx={{ mt: 2, mb: 2 }}/>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button variant="contained" color="success" sx={{ width: "10vw" }} onClick={onSubmit}>
            <Typography variant="h6" textTransform="none" sx={{ mt: 0.5 }}>
              Join Class 
            </Typography>
          </Button>
          <Button variant="contained" color="error" sx={{ with: "10vw", ml: 1 }} onClick={() => setOpen(false)}>
            <Typography variant="h6" textTransform="none" sx={{ mt: 0.5 }}>
              Close
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
    </div>
  );
}

export default AddModal;
