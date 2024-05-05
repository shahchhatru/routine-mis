import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, CssBaseline, Box, Card, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Divider } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import AddPeriodCard from "../components/AddPeriodCard";
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
import UpdatertContext from "../context/updatertContext";
import { AddPeriodContext,RefreshPeriodContext ,ZoomContext,TimingContext,ScreenOrientationContext,OutofDepartmentContext} from "../context";
import {motion} from "framer-motion";

const TraditionalRoutine = (props) => {
  const {screenRotate}=useContext(ScreenOrientationContext)
  const {scalesize}=useContext(ZoomContext);
  const {periodlistrefresh}=useContext(RefreshPeriodContext);
  const {isWinTrue,get_summer_timing,get_winter_timing}=useContext(TimingContext)
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
  const tablular_rtine_occupied_alternate = {
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


  
  
  const [freePeriod, setFreePeriod] = useState({ ...tablular_rtine_occupied });
  const [freePeriodalternate, setFreePeriodAlternate] = useState({ ...tablular_rtine_occupied_alternate });
  const { editOpen } = useContext(UpdatertContext);
  const { showaddModel }=useContext(AddPeriodContext);
  const minWidth = "200px";

  const tablular_rtine = {
    sun: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    mon: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    tue: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    wed: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    thu: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    fri: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
  };

  const tablular_rtine_alternate = {
    sun: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    mon: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    tue: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    wed: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    thu: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
    fri: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
  };
  
  let routine_oobj_alternate={
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
  }

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

  const set_routine_oobj = (perArray) => {
    perArray.forEach((period) => {
      const { day, url, starting_period_value } = period;
       if (routine_oobj[day]) {
        const isDuplicate = routine_oobj[day].some((p) => p.url === url);

        if (!isDuplicate) {
          routine_oobj[day].push(period);
          tablular_rtine[day][starting_period_value] = { ...period };
        }
      }
    });
  };
  const set_routine_oobj_alt = (perArray) => {
    perArray.forEach((period) => {
      const { day, url, starting_period_value } = period;
       if (routine_oobj_alternate[day]) {
        const isDuplicate = routine_oobj_alternate[day].some((p) => p.url === url);

        if (!isDuplicate) {
          routine_oobj_alternate[day].push(period);
          tablular_rtine_alternate[day][starting_period_value] = { ...period };
        }
      }
    });
  };

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

  const get_khali_period_alternate = (period_list) => {
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
          tablular_rtine_occupied_alternate[day][i] = true;
        }
      });
    });

    console.log(
      "occupied period from get_khali_period",
      tablular_rtine_occupied_alternate
    );
    setFreePeriodAlternate({ ...tablular_rtine_occupied_alternate });
  };


  //check if any one of the teacher is out of d
  //department.

  

  const id = props.id;
  const section = props.section;
  const year = props.year;
  const year_part = props.year_part;
  const periodsarray = useRef([]);
  const periodsarray_alternate = useRef([]);
  const [tabular_object, set_tO] = useState({ ...tablular_rtine });
  const [tabular_object_alternate, set_tOA] = useState({ ...tablular_rtine });
  const [routine_objt, setROt] = useState({
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thrus: [],
    fri: [],
    sat: [],
  });

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
          `http://127.0.0.1:8000//api/routines/get_alternate_routines_by_year_part_year_id_course_id_and_section/?year_id=${year}&year_part=${year_part}&course_id=${course_id}&section=${section}&alternate=${'False'}`
        );
        console.log( `http://127.0.0.1:8000//api/routines/get_alternate_routines_by_year_part_year_id_course_id_and_section/?year_id=${year}&year_part=${year_part}&course_id=${course_id}&section=${section}&alternate=${'False'}`)

        const response2 = await axios.get(
        `http://127.0.0.1:8000//api/routines/get_alternate_routines_by_year_part_year_id_course_id_and_section/?year_id=${year}&year_part=${year_part}&course_id=${course_id}&section=${section}&alternate=${'True'}`
        );

        // console.log(response.data);
        periodsarray.current = response.data;
        periodsarray_alternate.current = response2.data;
        set_routine_oobj(periodsarray.current);
        set_routine_oobj_alt(periodsarray_alternate.current);
        setRO({ ...routine_oobj });
        setROt({...routine_oobj_alternate})
        get_khali_period(routine_oobj);
        get_khali_period_alternate(routine_oobj_alternate)
        set_tO({ ...tablular_rtine });
        set_tOA({...tablular_rtine_alternate})
      
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoutines();
  }, [editOpen,showaddModel,periodlistrefresh]);

  
  console.log(tablular_rtine_alternate);
  

  const newNextRender = (myObject, day, period_index) => {
    if (myObject == "") {
      if (freePeriod[day][period_index+1] === false) {
        return (
          <TableCell style={{minWidth:minWidth}}>
            <AddPeriodCard
              day={day}
              start_period_index={period_index+1}
              course_id={props.id}
              section={section}
              year={year}
              year_part={year_part}
              alternate={"0"}
              note={""}
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
            note={myObject.note}
          />
        </TableCell>
      );
    }
  };

  const newNextRenderAlternate = (myObject, day, period_index) => {
    if (myObject == "") {
      if (freePeriodalternate[day][period_index+1] === false) {
        return (
          <TableCell style={{minWidth:minWidth}}>
            <AddPeriodCard
              day={day}
              start_period_index={period_index+1}
              course_id={props.id}
              section={section}
              year={year}
              year_part={year_part}
              alternate={"1"}
              note={""}
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
            note={myObject.note}
          />
        </TableCell>
      );
    }
  };


  console.log(tabular_object)
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
        ref={props.targetref}
      >
        
      
        <TableContainer component={motion.div} style={{height:'fit-content'}}>
          <motion.table animate={{scale:scalesize,rotate:screenRotate?'90deg':'0deg',y:screenRotate?'400px':'0px'}} >
           
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
                {Object.keys(tabular_object["sun"]).length > 0
                  ? Object.keys(tabular_object["sun"]).map((item,index) =>
                  newNextRender(tabular_object["sun"][item],"sun",index)
                    )
                  : ""}
              </TableRow>
              <TableRow>
                <TableCell>Sun (alt)</TableCell>
                {Object.keys(tabular_object_alternate["sun"]).length > 0
                  ? Object.keys(tabular_object_alternate["sun"]).map((item,index) =>
                  newNextRenderAlternate(tabular_object_alternate["sun"][item],"sun",index)
                    )
                  : ""}
              </TableRow>
              <TableRow>
                <TableCell>Monday</TableCell>
                {
                  Object.keys(tabular_object["mon"]).length > 0
                    ? Object.keys(tabular_object["mon"]).map((item,index) =>
                    newNextRender(tabular_object["mon"][item],"mon",index)
                  )
                    : ""
                  }
              </TableRow>
              <TableRow>
                <TableCell>Mon (alt)</TableCell>
                {Object.keys(tabular_object_alternate["mon"]).length > 0
                  ? Object.keys(tabular_object_alternate["mon"]).map((item,index) =>
                  newNextRenderAlternate(tabular_object_alternate["mon"][item],"mon",index)
                    )
                  : ""}
              </TableRow>
              <TableRow>
                <TableCell>Tuesday</TableCell>
                {
                  Object.keys(tabular_object["tue"]).length > 0
                    ? Object.keys(tabular_object["tue"]).map((item,index) =>
                    newNextRender(tabular_object["tue"][item],"tue",index)
                  )
                    : ""
                  // renderNextKey(tabular_object['fri'][1])
                }
              </TableRow>
              <TableRow>
                <TableCell>Tues (alt)</TableCell>
                {Object.keys(tabular_object_alternate["tue"]).length > 0
                  ? Object.keys(tabular_object_alternate["tue"]).map((item,index) =>
                  newNextRenderAlternate(tabular_object_alternate["tue"][item],"tue",index)
                    )
                  : ""}
              </TableRow>
              <TableRow>
                <TableCell>Wednesday</TableCell>
                {
                  Object.keys(tabular_object["wed"]).length > 0
                    ? Object.keys(tabular_object["wed"]).map((item,index) =>
                    newNextRender(tabular_object["wed"][item],"wed",index)
                  )
                    : ""
                  // renderNextKey(tabular_object['fri'][1])
                }
              </TableRow>
              <TableRow>
                <TableCell>Wed (alt)</TableCell>
                {Object.keys(tabular_object_alternate["wed"]).length > 0
                  ? Object.keys(tabular_object_alternate["wed"]).map((item,index) =>
                  newNextRenderAlternate(tabular_object_alternate["wed"][item],"wed",index)
                    )
                  : ""}
              </TableRow>
              <TableRow>
                <TableCell>Thrusday</TableCell>
                {
                  Object.keys(tabular_object["thu"]).length > 0
                    ? Object.keys(tabular_object["thu"]).map((item,index) =>
                    newNextRender(tabular_object["thu"][item],"thu",index)
                  )
                    : ""
                  // renderNextKey(tabular_object['fri'][1])
                }
              </TableRow>
              <TableRow>
                <TableCell>Thurs (alt)</TableCell>
                {Object.keys(tabular_object_alternate["thu"]).length > 0
                  ? Object.keys(tabular_object_alternate["thu"]).map((item,index) =>
                  newNextRenderAlternate(tabular_object_alternate["thu"][item],"thu",index)
                    )
                  : ""}
              </TableRow>
              <TableRow>
                <TableCell>Friday</TableCell>
                {
                  Object.keys(tabular_object["fri"]).length > 0
                    ? Object.keys(tabular_object["fri"]).map((item,index) =>
                    newNextRender(tabular_object["fri"][item],"fri",index)
                  )
                    : ""
                  // renderNextKey(tabular_object['fri'][1])
                }
              </TableRow>
              <TableRow>
                <TableCell>Fri (alt)</TableCell>
                {Object.keys(tabular_object_alternate["tue"]).length > 0
                  ? Object.keys(tabular_object_alternate["tue"]).map((item,index) =>
                  newNextRenderAlternate(tabular_object_alternate["tue"][item],"tue",index)
                    )
                  : ""}
              </TableRow>
            </TableBody>
          </motion.table>
        </TableContainer>
       
      </Grid>
      
    </Grid>
    
   
  );
};

export default TraditionalRoutine;
