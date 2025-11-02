import { 
  Stack, 
  Box, 
  Typography, 
  TextField,
  FormGroup,
  FormControlLabel,
  Button
} from '@mui/material'
import useNav from '@/hooks/useNav'
import { useLogin } from '@/hooks/useAccount'
import React, { useState, useEffect } from 'react'

function SignInPage() {
  const { goTo } = useNav();
  const login = useLogin();
  const [inputArray, setInputArray] = useState(["", ""]);

  const handleSubmit = async () => {
    const success = await login.mutate({ email: inputArray[0], password: inputArray[1] });
  };

  useEffect(() => {
    if (login.isSuccess) {
      goTo("/home");
    }
  }, [login.isSuccess])

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const prevArr =  [...inputArray]
    prevArr[index] = e.target.value;
    setInputArray(prevArr);
  };

  return (
    <Stack display="flex" flexDirection="column">
      <Typography sx={{ flex: 1 }} variant="h3">
        Login
      </Typography>
      <Box sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        pt: 3
      }}>
        <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ mt: 2, mb: 2 }} onChange={(e) => handleChange(0, e)}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => handleChange(1, e)}/>
        <Button variant="contained" bgcolor="primary.main" sx={{ mt: 2, mb: 1 }} onClick={handleSubmit}>
          Proceed to Login
        </Button>
        <Button variant="contained" color="primary.main" sx={{ mt: 1, mb: 1 }} onClick={() => goTo("/")}>
          Create Account
        </Button>
      </Box>
    </Stack>
  );
}

export default SignInPage;
