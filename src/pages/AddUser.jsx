import React from 'react';
import {useReducer} from 'react';
import {
    Typography,
    TextField,
    Button,
    Checkbox,
    CssBaseline,
    Grid,
    Box,
    FormControlLabel,
  } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const AddUser = () => {
  const initailState={
            "name":'',
            "email":'',
            "address":'',
            "phone":''
  }

  const reducerfunction=(state,action)=>{
    switch(action.type){
      case "UPDATE":
        return {
          ...state,
          ...action.payload,
        };
      case "CLEAR":
        return {
          ...initailState,
        }
      default:
        return state
    }
  }
  //const [userstate,dispatch]=useReducer(reducerfunction,initailState)
    let handleSubmit = async (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        console.log({
            "name":formdata.get("name"),
            "email":formdata.get("email"),
            "address":formdata.get("address"),
            "phone":formdata.get("phone")
        })
        const response= await axios.post("http://127.0.0.1:8000/api/teachers/",
        {
            "name":formdata.get("name"),
            "email":formdata.get("email"),
            "address":formdata.get("address"),
            "phone":formdata.get("phone")
        }
        )

       

        console.log(response)
        
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
            ADD USER
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
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete='address'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="phone"
              type="tel"
              id="phone"
              autoComplete='phone'

              
            />
           
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ color: "#fff" }}
              sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
            >
              Register
            </Button>
            <Box>
              <Typography variant="h6" align="right" sx={{marginTop:4}}>Back to Home page<Link to="/" style={{"color":"orange"}}>
                <Button variant="contained" startIcon={<KeyboardBackspaceIcon/>} sx={{marginLeft:4}}>Go back</Button>
                </Link> </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  </>
  )
}

export default AddUser