import React, { useEffect, useState, useRef } from "react";
import { Grid, CssBaseline, Box, Card, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Divider } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useParams } from "react-router-dom";
import PeriodCard from "../components/PeriodCard";
import colors from "../constants/colors";
import useWindowDimensions from "../customhooks/useWindowDimensions";
import TraditionalCard from "../components/TraditionalCard";


const TraditionalRoutine = (props) => {
  const tablular_rtine = {
    sun: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    mon: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    tue: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    wed: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    thrus: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    fri: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
  };
  let routine_oobj = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thrus: [],
    fri: [],
    sat: [],
  };
  const days = ["sun", "mon", "tue", "wed", "thrus", "fri", "sat"];

  const set_routine_oobj = (perArray) => {
    perArray.forEach((period) => {
      const { day, url, starting_period_value } = period;
      console.log("starting_period_value:", day, starting_period_value);

      // Check if the URL is not already present in the day's list
      if (routine_oobj[day]) {
        const isDuplicate = routine_oobj[day].some((p) => p.url === url);

        if (!isDuplicate) {
          routine_oobj[day].push(period);
          tablular_rtine[day][starting_period_value] = { ...period };
        }
      }
    });
  };

  
//   console.log("routine_oobj", routine_oobj);
//   console.log("tabular_routine", tablular_rtine);
  // slide_per_view.current=1;
  

  
  //const { id } = useParams();
  const id=props.id;
  const periodsarray = useRef([]);
  const [tabular_object,set_tO] = useState({...tablular_rtine});
  const [routine_obj, setRO] = useState({
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thrus: [],
    fri: [],
    sat: [],
  });
  useEffect(() => {
    const fetchRoutines = async () => {
      const course_id = id;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/routines/get_routines_by_course_and_year/?course_id=${course_id}&year=5`
        );

        console.log(response.data);
        //setPeriodsArray(response.data);
        periodsarray.current = response.data;
        set_routine_oobj(periodsarray.current);
        setRO({ ...routine_oobj });
        set_tO({...tablular_rtine})
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoutines();
   
  }, []);

  console.log("tabular_object",tabular_object)
  
  

  const renderNextKey = ( myObject ) => {
    console.log("inside renderNextKey",myObject);
  if(myObject===''){
    console.log('empty')
    return(<TableCell style={{minWidth:"200px"}}>{""}</TableCell>)
  }else{
    console.log('myObject',myObject)
    return(
      <TableCell >
        <PeriodCard 
                    teacher_list={myObject.teacher} 
                    subject={myObject.subject}
                    start_time={myObject.time_start}
                    end_time={myObject.time_end}
                    session_type={myObject.session_type}
                    room_number={myObject.room_number}
                    /></TableCell>
    )
  }
  
  };

  return (
    <Grid
        container
        style={{
          background: "linear-gradient(to right, #8e2de2, #4a00e0)",
          width: "100%",
          height: "100vh",
          marginTop: 8,
          marginLeft: 4,
          marginRight: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
    <Grid
      container
      style={{
        background: colors["white-purple"],
        width: "80vw",
        height: "fit-content",
        borderRadius: 8,
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Days \ Time</TableCell>
              <TableCell align="left">
                <Typography>10:15 to 11:00</Typography>
                <Divider />
                <Typography>10:15 to 11:05</Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography>11:00 to 11:45</Typography>
                <Divider />
                <Typography>10:15 to 11:05</Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography>11:45 to 12:30</Typography>
                <Divider />
                <Typography>10:15 to 11:05</Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography>12:30 to 1</Typography>
                <Divider />
                <Typography>10:15 to 11:05</Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography>1 to 1:45</Typography>
                <Divider />
                <Typography>10:15 to 11:05</Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography>1:45 to 2:30</Typography>
                <Divider />
                <Typography>10:15 to 11:05</Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography>2:30 to 3:15</Typography>
                <Divider />
                <Typography>10:15 to 11:05</Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography> 3:15 to 4:00</Typography>
                <Divider />
                <Typography>10:15 to 11:05</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           <TableRow>
            <TableCell>Sunday</TableCell>
            { 
                Object.keys(tabular_object['sun']).length>0?
                Object.keys(tabular_object['sun']).map((item)=>renderNextKey(tabular_object['sun'][item])):''
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
           <TableRow>
            <TableCell>Monday</TableCell>
            { 
                Object.keys(tabular_object['mon']).length>0?
                Object.keys(tabular_object['mon']).map((item)=>renderNextKey(tabular_object['mon'][item])):''
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
          
           <TableRow>
            <TableCell>Tuesday</TableCell>
            { 
                Object.keys(tabular_object['tue']).length>0?
                Object.keys(tabular_object['tue']).map((item)=>renderNextKey(tabular_object['tue'][item])):''
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
           <TableRow>
            <TableCell>Wednesday</TableCell>
            { 
                Object.keys(tabular_object['wed']).length>0?
                Object.keys(tabular_object['wed']).map((item)=>renderNextKey(tabular_object['wed'][item])):''
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
           <TableRow>
            <TableCell>Thrusday</TableCell>
            { 
                Object.keys(tabular_object['thrus']).length>0?
                Object.keys(tabular_object['thrus']).map((item)=>renderNextKey(tabular_object['thrus'][item])):''
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
           <TableRow>
            <TableCell>Friday</TableCell>
            { 
                Object.keys(tabular_object['fri']).length>0?
                Object.keys(tabular_object['fri']).map((item)=>renderNextKey(tabular_object['fri'][item])):''
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    </Grid>
  );
};

export default TraditionalRoutine;
