import React from 'react'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Typography,TextField,Button,Checkbox, CssBaseline } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import AuthContext from '../context/authContext';
import { useContext,useReducer } from 'react';
import UserSheetUpload from '../components/UserSheetUpload'; 
import AdminInput from '../components/AdminInput';


const initailState={
  'name':'',
  'email':'',
  'password':'',
  'password2':'',
  'tc':0,
}
const reducer=(state,action)=>{
  switch(action.type){
    case "UPDATE":
      return{
        ...state,
        ...action.payload
      }
    case 'CLEAR':
      return{
        ...initailState
      }
    default:
      return {
        ...state
      }

  }
}

const SignUpPage = () => {
  const {registerUser}=useContext(AuthContext);
  const [userstate,dispatch]=useReducer(reducer,initailState);
  const handleSubmit=(e)=>{
    registerUser(e)
    dispatch({type:"CLEAR"})
  }

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
      <Typography variant="h1" color="white" align='center'>Add User</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={userstate.name}
              onChange={(e)=>dispatch({type:"UPDATE",payload:{name:e.target.value}})}
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
              value={userstate.email}
              onChange={(e)=>dispatch({type:"UPDATE",payload:{email:e.target.value}})}
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
              value={userstate.password}
              onChange={(e)=>dispatch({type:"UPDATE",payload:{password:e.target.value}})}
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
              value={userstate.password2}
              onChange={(e)=>dispatch({type:"UPDATE",payload:{password2:e.target.value}})}
              autoComplete="current-password"
            />
            <AdminInput value={userstate.tc} dispatch={dispatch}/>
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{color:'#fff'}}
              sx={{ mt: 3, mb: 2,fontSize:16,pt:3,pb:3 }}
            >
              Create User
            </Button>
            
         
    </Box>
    </Grid>
    <Grid item sm={3}>
      <UserSheetUpload/>
    </Grid>
    </Grid>
    </Grid>
    </>
  )
}

export default SignUpPage