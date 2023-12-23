import { Box, CssBaseline,Button,TextField ,Grid,Typography,FormControlLabel} from '@mui/material'
import React,{useReducer,useContext,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';


const ResetPassword = () => {
    const {user,tokendata}=useContext(AuthContext);
    const navigate=useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[])

    const initialState={
        password:'',
        password2:'',
    }
    
    const reducer=(state,action)=>{
        switch(action.type){
            case "UPDATE":
                return{
                    ...state,
                    ...action.payload
                }
            case "CLEAR":
                return{
                    ...initialState
                }
            default:
                return {
                    ...state
                }
        }
    }
    const [formstate,dispatch]=useReducer(reducer,initialState);

    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log("formstate",formstate);
        console.log(user);
        console.log(tokendata.access);
        const response= axios.post('http://127.0.0.1:8000/user/changepassword/',{
            ...formstate
        },{headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokendata.access}`
        }})

        console.log(response);
    }

  return (
    <>
      <CssBaseline />
      <Grid
        container
        style={{
          background: "linear-gradient(to right, #8e2de2, #4a00e0)",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          style={{
            margin: "0 0 0 20",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Grid item sm={0} md={3} />
          <Grid item md={6}>
            <Typography variant="h1" color="white" align="center">
              Reset Password 
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Enter new password"
                name="password"
                autoComplete="password"
                value={formstate.password}
                onChange={(e)=>dispatch({type:"UPDATE",payload:{password:e.target.value}})}
                autoFocus
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
                value={formstate.password2}
                onChange={(e)=>dispatch({type:"UPDATE",payload:{password2:e.target.value}})}
               
              />
             
              

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ color: "#fff" }}
                sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
              >
                Reset
              </Button>
             
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
   

  )
}

export default ResetPassword