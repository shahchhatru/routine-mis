import React, { useEffect, useState, useReducer } from "react";
import MultiTeacherSelect from "../components/MultiTeacherSelect";
import {
  Typography,
  TextField,
  Button,
  CssBaseline,
  Grid,
  Box,
  
} from "@mui/material";
import { Link } from "react-router-dom";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ChooseSectionInput from "../components/ChooseSection";
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

const initialState = {
  teacher: "",
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
  section:""
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
        teacher: "",
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
        year_part:""
      };
    default:
      return {
        ...state,
      };
  }
};

const AddPeriod = () => {
  
 
  const [formstate, dispatch] = useReducer(reducerfunction, initialState);
  const [formstate2,dispatch2]=useReducer(reducerfunction2,initialStateGlobal);
  const [error, setError] = useState();
  let handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);


    const requestData={
      ...formstate,...formstate2,
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/routines/', requestData);
      window.alert("Success:", response.data);
    } catch (err) {
      console.error("Error occurred while making the POST request:", err);
      setError(err.response.data);
    }
  };
  // console.log("formstate:", formstate);
  // console.log("formstate2:",formstate2);
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
          sx={{ mr: 0 }}
        >
          <Grid item sm={0} md={3} />
          <Grid item md={6}>
            <Typography variant="h1" color="white" align="center">
              ADD PERIOD
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                  <YearInput value={formstate2.year} dispatch={dispatch2} />
              </Grid>
              <Grid item xs={12} md={4}>
                  <YearPartInput value={formstate2.year_part} dispatch={dispatch2} />
              </Grid> 
              <Grid item xs={12} md={4}>
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
                    {/* <TextField
                      fullWidth
                      id="section"
                      label="Section"
                      name="section"
                      autoComplete="section"
                      autoFocus
                      value={formstate2.section}
                      onChange={(e) =>
                        dispatch2({
                          type: "UPDATE",
                          payload: { section: e.target.value },
                        })
                      } 

                    />*/}
                    <ChooseSectionInput value={formstate2.section} dispatch={dispatch2}/>
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                  <DayInput value={formstate2.day} dispatch={dispatch2} />
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
              {/* <TeacherInput value={formstate.teacher} dispatch={dispatch} /> */}
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
                <Grid item sx={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ color: "#fff",minWidth:"100px" }}
                    sx={{ mt: 3, mb: 2, fontSize: 16, pt: 3, pb: 3 }}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>

              <Box>
                <Typography variant="h6" align="right" sx={{ marginTop: 4 }}>
                  Back to Home page
                  <Link to="/" style={{ color: "orange" }}>
                    <Button
                      variant="contained"
                      startIcon={<KeyboardBackspaceIcon />}
                      sx={{ marginLeft: 4 }}
                    >
                      Go back
                    </Button>
                  </Link>{" "}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddPeriod;
