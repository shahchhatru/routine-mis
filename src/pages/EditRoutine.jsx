import React, { useEffect, useState, useReducer,useContext } from "react";

import {
  Typography,
  TextField,
  Button,
  CssBaseline,
  Grid,
  Box,
} from "@mui/material";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MultiTeacherSelect from "../components/MultiTeacherSelect";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TeacherInput from "../components/TeacherInput";
import SubjectInput from "../components/SubjectInput";
import DayInput from "../components/DayInput";
import CourseInput from "../components/CourseInput";
import StartPeriodInput from "../components/startPeriod";
import NumPeriodINput from "../components/numPeriod";
import LectureTypeInp from "../components/LectureTypeInp";
import YearInput from "../components/YearInput";
import YearPartInput from "../components/PartYear";
import AuthContext from "../context/authContext";
import UpdatertContext from "../context/updatertContext";
import ChooseSectionInput from "../components/ChooseSection";
import AlternateFieldInput from "../components/AlternateFieldInput";

const initialState = {
  teacher: [],
  subject: "",
  session_type: "",
  starting_period_value: "",
  no_of_period_value: "",
  season:"winter"
};

const initialStateGlobal={
  year:"",
  course:"",
  day:"",
  room_number:"",
  year_part:"",
  alternate_bool:false,
  note:"",
}

const reducerfunction = (state, action) => {
  console.log("dispatch called");
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR":
      return {
        teacher: [],
        subject: "",
        session_type: "",
        season: "winter",
        starting_period_value: "",
        no_of_period_value: "",
      };
    default:
      return {
        ...state,
      };
  }
};

const reducerfunction2 = (state, action) => {
  console.log("dispatch2 called");
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR":
      return {
        
        year: "",
        course: "",
        day: "",
        
        room_number: "",
        year_part:"",
        note:"",
        alternate_bool:false,
      };
    default:
      return {
        ...state,
      };
  }
};

const EditRoutine = () => {
  const {routine_id,toggleEditOpen} = useContext(UpdatertContext);
  const navigate =useNavigate();
  const{user}=useContext(AuthContext);
  useEffect(()=>{
    const func =async()=>{
        if(user.tc==false){
          navigate('/');
        }
    }
    func();
  },[])

  useEffect(()=>{
    const fetchPeriod=async ()=>{
      try{
        const data = await axios.get(`http://127.0.0.1:8000/api/routines/${routine_id}/`)
        console.log({data:data.data})
        const ndata=data.data;
        dispatch({type:"UPDATE",payload:{teacher:ndata.teacher,subject:ndata.subject,session_type:ndata.session_type,starting_period_value:ndata.starting_period_value,no_of_period_value:ndata.no_of_period_value}})
        dispatch2({type:"UPDATE",payload:{year:ndata.year,course:ndata.course,day:ndata.day,room_number:ndata.room_number,year_part:ndata.year_part,alternate_bool:ndata.alternate,note:ndata.note}})
     
      }catch(err){
        console.log(err);
      }
    }
    fetchPeriod();
  },[routine_id])
  const [formstate, dispatch] = useReducer(reducerfunction, initialState);
  const [formstate2,dispatch2]=useReducer(reducerfunction2,initialStateGlobal);
  const [error, setError] = useState();


  let handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    
    

    const requestData={
      ...formstate,...formstate2
    }
    console.log({requestData})
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/routines/${routine_id}/`, requestData);
      window.alert("Success:", response.data);
      toggleEditOpen();
    } catch (error) {
      console.error("Error occurred while making the POST request:", error.response.data);
      setError(error.response.data);
    }
  };
  
  return (
    <>
      <CssBaseline />
      <Grid
        container
        style={{
          
          width: "20vw",
          display: "flex",
          alignItems: "center",
          height:"100%",
          borderRadius:8,

        }}
      >
        <Grid
          container
          style={{
            margin: "0 0 0 20",
            
            padding:16,
            borderRadius:8,
            height:"100%",
          }}
          sx={{ mr: 0 }}
        >
          
          <Grid item md={12}>
            <Typography variant="h4" color="white" align="center">
              EDIT PERIOD
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                  <YearInput value={formstate2.year} dispatch={dispatch2} />
              </Grid>
              <Grid item xs={12} md={12}>
                  <YearPartInput value={formstate2.year_part} dispatch={dispatch2} />
              </Grid> 
              <Grid item xs={12} md={12}>
                  <CourseInput value={formstate2.course} dispatch={dispatch2} />
              </Grid>
              
                <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      id="room_number"
                      label="Room No"
                      name="room_number"
                      autoComplete="room_number"
                      autoFocus
                      value={formstate2.room_number}
                      onChange={(e) =>
                        dispatch2({
                          type: "UPDATE",
                          payload: { room_number: e.target.value },
                        })
                      }
                    />
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 2 }}>
                   
                    <ChooseSectionInput value={formstate2.section} dispatch={dispatch2}/>
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                  <DayInput value={formstate2.day} dispatch={dispatch2} />
              </Grid>
              <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        
                                        <AlternateFieldInput value={formstate2.alternate_bool} dispatch={dispatch2}/>
                                    </Box>
                                </Grid>
              <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField
                                            fullWidth
                                            id="Note"
                                            label="Note"
                                            name="note"
                                            autoComplete="note"
                                            autoFocus
                                            value={formstate2.note}
                                            onChange={(e) =>
                                                dispatch2({
                                                    type: "UPDATE",
                                                    payload: { note: e.target.value },
                                                })
                                            }
                                        />
                                    </Box>
                                </Grid>
                  
              
              <Grid item sx={6}>
                  <Button
                    onClick={(e) => dispatch2({ type: "CLEAR", payload: {} })}
                    variant="contained"
                    style={{ color: "#fff", background: "#f0f" }}
                    sx={{ mt: 1, mb: 1, fontSize: 16, pt: 3, pb: 3 }}
                  >
                    CLEAR
                  </Button>
                </Grid>
              </Grid>

            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <SubjectInput value={formstate.subject} dispatch={dispatch} />
              
              <MultiTeacherSelect dispatch={dispatch}/>
              <Grid container spacing={2}>
               
                <Grid item xs={12} md={4}>
                  <LectureTypeInp
                    value={formstate.session_type}
                    dispatch={dispatch}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <StartPeriodInput
                    value={formstate.starting_period_value}
                    dispatch={dispatch}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NumPeriodINput
                    value={formstate.no_of_period_value}
                    dispatch={dispatch}
                  />
                </Grid>
              </Grid>
              <Box>
                {error
                  ? Object.keys(error).map((item) => (
                      <p color="red">{`${item}:${error[item]}`}</p>
                    ))
                  : ""}
              </Box>

              <Grid item container fullWidth spacing={2}>
                <Grid item sx={6}>
                  <Button
                    onClick={(e) => dispatch({ type: "CLEAR", payload: {} })}
                    variant="contained"
                    style={{ color: "#fff", background: "#f0f" }}
                    sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
                  >
                    CLEAR
                  </Button>
                </Grid>
                <Grid item sx={3}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ color: "#fff",minWidth:"100px" }}
                    sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
                  >
                   UPDATE
                  </Button>
                  
                </Grid>
                <Grid item sx={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{ color: "#fff",minWidth:"100px",background:"#f00" }}
                    sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
                    onClick={()=>toggleEditOpen()}
                  >
                  EXIT
                  </Button>
                  
                </Grid>
              </Grid>

             
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EditRoutine;
