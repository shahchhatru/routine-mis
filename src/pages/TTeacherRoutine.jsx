import React, { useEffect, useState, useRef ,useContext} from "react";
import { Grid, CssBaseline, Box, Card, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Divider } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import axios from "axios";
import AddPeriodCard from "../components/AddPeriodCard";
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
import { AddPeriodContext,RefreshPeriodContext ,ZoomContext,TimingContext,ScreenOrientationContext,AuthContext} from "../context";
import {motion} from 'framer-motion'

const TTeacherRoutine = (props) => {
  const minWidth = "200px";
  const part =props.part;
  const {user}=useContext(AuthContext)
  const {screenRotate}=useContext(ScreenOrientationContext)
  const {scalesize}=useContext(ZoomContext);
  const tablular_rtine_occupied = {
    sun: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    },
    mon: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    },
    tue: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    },
    wed: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    },
    thu: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    },
    fri: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    },
  };
  const tablular_rtine = {
    sun: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    mon: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    tue: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    wed: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    thu: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
    fri: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
  };
  let routine_oobj = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  };
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const {isWinTrue,get_summer_timing,get_winter_timing}=useContext(TimingContext)
  
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

  const [freePeriod, setFreePeriod] = useState({ ...tablular_rtine_occupied });

  const get_khali_period = (period_list) => {
    // console.log("inside get_khali_period",period_list);
    Object.keys(period_list).forEach((day) => {
      const routines = period_list[day];
      //console.log("routines",routines);
      routines.forEach((period) => {
        // console.log("period",period);
        // console.log(period.starting_period_value)
        var ending_value =
          parseInt(period.starting_period_value) +
          parseInt(period.no_of_period_value);
        // console.log(ending_value);
        for (
          var i = parseInt(period.starting_period_value);
          i < ending_value;
          i++
        ) {
          tablular_rtine_occupied[day][i] = true;
        }
      });
    });

    console.log(
      "occupied period from get_khali_period",
      tablular_rtine_occupied
    );
    setFreePeriod({ ...tablular_rtine_occupied });
  };

  const id = props.id;
  const periodsarray = useRef([]);
  const [tabular_object,set_tO] = useState({...tablular_rtine});
  const [routine_obj, setRO] = useState({
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  });
  useEffect(() => {
    const fetchRoutines = async () => {
      const teacher_id = id;
      try {
        const response = await axios.get(
            `http://127.0.0.1:8000//api/routines/get_routines_by_teacher_and_year_part/?teacher_id=${teacher_id}&year_part=${part}`
        );

        console.log(response.data);
        //setPeriodsArray(response.data);
        periodsarray.current = response.data;
        set_routine_oobj(periodsarray.current);
        setRO({ ...routine_oobj });
        get_khali_period(routine_oobj);
        set_tO({...tablular_rtine})
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoutines();
   
  }, []);

  console.log("tabular_object",tabular_object)
  
  

  const renderNextKey = ( myObject ) => {
    //console.log("inside renderNextKey",myObject);
  if(myObject===''){
    //console.log('empty')
    return(<TableCell style={{minWidth:"200px"}}>{""}</TableCell>)
  }else{
    //console.log('myObject',myObject)
    return(
      <TableCell>
        <PeriodCard 
                    teacher_list={myObject.teacher} 
                    subject={myObject.subject}
                    start_time={myObject.time_start}
                    end_time={myObject.time_end}
                    session_type={myObject.session_type}
                    room_number={myObject.room_number}
                    url={myObject.url}
                    /></TableCell>
    )
  }
  
  };

  const newNextRender = (myObject, day, period_index) => {
    if (myObject == "") {
      if ((freePeriod[day][period_index+1] === false) && (user.tc==true)) {
        return (
          <TableCell style={{minWidth:minWidth}}>
            <AddPeriodCard
              day={day}
              start_period_index={period_index+1}
              course_id={props.id}
              section={'AB'}
              year={'2'}
              year_part={'1'}
            />
          </TableCell>
        );
      } else {
        return(
          <TableCell>
            {""}
          </TableCell>
        )
      }
    }else{
      return (
        <TableCell>
          <PeriodCard
            teacher_list={myObject.teacher}
            subject={myObject.subject}
            start_time={isWinTrue?`${get_winter_timing(parseInt(myObject.starting_period_value)-1)}`:`${get_summer_timing(parseInt(myObject.starting_period_value)-1)}`}
            end_time={isWinTrue?`${get_winter_timing(parseInt(myObject.no_of_period_value)+parseInt(myObject.starting_period_value)-1)}`:`${get_summer_timing(parseInt(myObject.no_of_period_value)-1+parseInt(myObject.starting_period_value))}`}
            session_type={myObject.session_type}
            room_number={myObject.room_number}
            url={myObject.url}
          />
        </TableCell>
      );
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
      <TableContainer component={motion.div} style={{height:'fit-content'}}>
          <motion.table animate={{scale:scalesize,rotate:screenRotate?'90deg':'0deg',y:screenRotate?'400px':'0px'}}>
         
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
                Object.keys(tabular_object['sun']).map((item,index) =>newNextRender(tabular_object["sun"][item],"sun",index)):""
            }
           </TableRow>
           <TableRow>
            <TableCell>Monday</TableCell>
            { 
                Object.keys(tabular_object['mon']).length>0?
                Object.keys(tabular_object['mon']).map((item,index) =>newNextRender(tabular_object["mon"][item],"mon",index)):""
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
          
           <TableRow>
            <TableCell>Tuesday</TableCell>
            { 
                Object.keys(tabular_object['tue']).length>0?
                Object.keys(tabular_object['tue']).map((item,index) =>newNextRender(tabular_object["tue"][item],"tue",index)):""
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
           <TableRow>
            <TableCell>Wednesday</TableCell>
            { 
                Object.keys(tabular_object['wed']).length>0?
                Object.keys(tabular_object['wed']).map((item,index) =>newNextRender(tabular_object["wed"][item],"wed",index)):""
                // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
           <TableRow>
            <TableCell>Thrusday</TableCell>
            { 
                Object.keys(tabular_object["thu"]).length>0?
                Object.keys(tabular_object["thu"]).map((item,index) =>newNextRender(tabular_object["thu"][item],"thu",index)):""
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
           <TableRow>
            <TableCell>Friday</TableCell>
            { 
                Object.keys(tabular_object['fri']).length>0?
                Object.keys(tabular_object['fri']).map((item,index) =>newNextRender(tabular_object["fri"][item],"fri",index)):""
               // renderNextKey(tabular_object['fri'][1])
            }
           </TableRow>
          </TableBody>
        </Table>
        </motion.table>
      </TableContainer>
    </Grid>
    </Grid>
  );
};

export default TTeacherRoutine;
