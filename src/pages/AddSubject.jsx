import React ,{useState,useEffect} from 'react'
import {
    Typography,
    TextField,
    Button,
    Checkbox,
    CssBaseline,
    Grid,
    Autocomplete,
    Box,
  } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const AddSubject = () => {
    const [error,setError] =useState({});
    const [subjectName,setSubjectName]=useState('');
    const [subjects,setSubjects]=useState([]);
    const [options,setOptions]=useState([]);
    const [value,setValue]=useState({label:'',value:''})
    useEffect(()=>{
      const fetchSub = async ()=>{
        try{
          const response=await axios.get("http://127.0.0.1:8000/api/subjects/");
          console.log(response.data);
          const teacheroption_array=response.data.map(opt=>({label:opt.name,value:opt.name}))
          setOptions(teacheroption_array)
        }
        catch(err){
          console.log(err)
        }
      }

      fetchSub();
     

    },[])
    // const handleChange=(event,newValue)=>{
    //   if (event && event.target && event.target.nodeName === 'INPUT') {
    //     // Handle the new value here, you can add it to your options or perform any other action
    //     console.log('New value entered:', newValue);
    //   } else {
    //     // Handle the selection from the existing options
    //     console.log({newValue});
    //   }

    // }
    let handleSubmit = async (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const response= await axios.post("http://127.0.0.1:8000/api/subjects/",
        {
            "name":subjectName,
        }   
        )
        if(response.status==201){
            console.log(response);
            window.alert("request success" +JSON.parse(response.data));
            setSubjectName(" ")
        }else{
            window.alert(JSON.parse(response.data));
            console.log(response.data);
        }
        console.log(formdata.get("subject"))

       

       
        
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
              value={subjectName}
              onChange={(e)=>setSubjectName(e.target.value)}
            /> 

<Autocomplete
      fullWidth
      required
      id="combo-box-demo"
      options={options}
      
      renderInput={(params) => <TextField {...params} label="Subjects" />}
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