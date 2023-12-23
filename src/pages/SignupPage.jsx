import React from 'react'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Typography,TextField,Button,Checkbox, CssBaseline } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import AuthContext from '../context/authContext';
import { useContext } from 'react';
import AdminInput from '../components/AdminInput';




const SignUpPage = () => {
  const {registerUser}=useContext(AuthContext);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  //  const response= await axios.post('http://127.0.0.1:8000/api/user/login/',{
  //   email: data.get('email'),
  //   password: data.get('password'),
  //  })
   
  //  console.log("result::",response.data)
  // };

  return (
    <>
    <CssBaseline />
    <Grid 
      container 
      style={{
        background: "linear-gradient(to right, #8e2de2, #4a00e0)",
        width:"100vw",
        height:"100vh",
        display:"flex",
        alignItems:"center",

      }}
      >
    <Grid container  style={{margin:"0 0 0 20",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
    <Grid item sm={0} md={3}/>
    <Grid item md={6}>
      <Typography variant="h1" color="white" align='center'>Signup</Typography>
      <Box component="form" onSubmit={registerUser} noValidate sx={{ mt: 1 }}>
      <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
            <AdminInput/>
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{color:'#fff'}}
              sx={{ mt: 3, mb: 2,fontSize:16,pt:3,pb:3 }}
            >
              Sign Up
            </Button>
            
            <Box>
                <Typography variant="h6" align="right" >Already have an account?<Link to="/login" style={{"color":"orange"}}>Sign In</Link> </Typography>
              </Box>
    </Box>
    </Grid>
    </Grid>
    </Grid>
    </>
  )
}

export default SignUpPage