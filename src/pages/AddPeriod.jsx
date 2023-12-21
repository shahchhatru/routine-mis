import React, { useEffect, useState } from "react";

import {
  Typography,
  TextField,
  Button,
  Checkbox,
  CssBaseline,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TeacherInput from "../components/TeacherInput";
import SubjectInput from "../components/SubjectInput";
import DayInput from "../components/DayInput";
import CourseInput from "../components/CourseInput";
import StartPeriodInput from "../components/startPeriod";
import NumPeriodINput from "../components/numPeriod";
import LectureTypeInp from "../components/LectureTypeInp";


const AddPeriod = () => {

  const [error,setError]=useState();
  let handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    console.log({
      subject: formdata.get("subject"),
      teacher: [formdata.get("teacher")],
      session_type:formdata.get("session_type"),
      course:formdata.get("course"),
      day:formdata.get('day'),
      starting_period_value:formdata.get('starting_period_no'),
      no_of_period_value:formdata.get('num_periods'),
      room_number:formdata.get("room_number"),
      season: "winter",
      year:4
      
    });
    const requestData = {
      "teacher": [formdata.get("teacher")],
      "subject": formdata.get("subject"),
      "year": "1st Year",
      "course": formdata.get("course"),
      "day": formdata.get("day"),
      "session_type": formdata.get("session_type"),
      "room_number": formdata.get("room_number"),
      "season": "winter",
      "starting_period_value": formdata.get('starting_period_no'),
      "no_of_period_value": formdata.get('num_periods')
    };
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/routines/', requestData);
      console.log("Success:", response.data);
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
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >

              <SubjectInput />
              <TeacherInput />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DayInput />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CourseInput />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LectureTypeInp />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      required
                      fullWidth
                      id="room_number"
                      label="Room No"
                      name="room_number"
                      autoComplete="room_number"
                      autoFocus
                    />
                  </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                   <StartPeriodInput/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                  <NumPeriodINput/>
                  </Grid>
                
              </Grid>
              <Box>
                {error?Object.keys(error).map((item)=><p color="red">{`${item}:${error[item]}`}</p>):''}
              </Box>
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
