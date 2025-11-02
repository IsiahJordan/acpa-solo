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
import { useRegister } from '@/hooks/useAccount'
import { validate } from './utils.module.ts'
import { useState } from 'react'

function SignUpPage() {
  const { goTo } = useNav();
  const register = useRegister();
  const [inputArray, setInputArray] = useState(["", "", ""]);

  const handleSubmit = async () => {
    if (validate(inputArray[1], inputArray[2])) {
      const res = await register.mutate({ email: inputArray[0], password: inputArray[1] });

      if (register.isSuccess) {
        goTo("/login");
      }
      else {
        console.error("account exist");
      }
    }
    else {
      console.error("password doesn't match");
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const prevArr =  [...inputArray]
    prevArr[index] = e.target.value;
    setInputArray(prevArr);
  };

  return (
    <Stack display="flex" flexDirection="column">
      <Typography sx={{ flex: 1 }} variant="h3">
        Create Account
      </Typography>
      <Box sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        pt: 3
      }}>
        <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ mt: 2, mb: 2 }} onChange={(e) => handleChange(0, e)}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => handleChange(1, e)}/>
        <TextField id="outlined-basic" label="Re-Password" variant="outlined" sx={{ mt: 2, mb: 2 }} onChange={(e) => handleChange(2, e)}/>
        <Button variant="contained" bgcolor="primary.main" sx={{ mt: 2, mb: 1 }} onClick={handleSubmit}>
          Sign Up 
        </Button>
        <Button variant="contained" color="primary.main" sx={{ mt: 1, mb: 1 }} onClick={() => goTo("/login")}>
          Continue to Login
        </Button>
      </Box>
    </Stack>
  );
}

export default SignUpPage;
