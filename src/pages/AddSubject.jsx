import React ,{useState} from 'react'
import {
    Typography,
    TextField,
    Button,
    Checkbox,
    CssBaseline,
    Grid,
    Box,
  } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const AddSubject = () => {
    const [error,setError] =useState([]);
    let handleSubmit = async (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const response= await axios.post("http://127.0.0.1:8000/api/subjects/",
        {
            "name":formdata.get("subject"),
            "year":"http://127.0.0.1:8000/api/years/4/",
            "semester":["http://127.0.0.1:8000/api/semesters/1/","http://127.0.0.1:8000/api/semesters/2/"]
        }
        )
        if(response.status==201){
            console.log(response);
            console.log("request success");
        }else{
            setError(response.data);
            console.log(response.data);
        }

       

       
        
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
            ADD SUBJECT
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
              id="subject"
              label="Subject Name"
              name="subject"
              autoComplete="subject"
              autoFocus
            />

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ color: "#fff" }}
              sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
            >
              ADD
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

export default AddSubject;