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
import UpdatertContext from "../context/updatertContext";
import TimingContext from "../context/winSumTimingContext"; 
import { ZoomContext } from "../context";
import {motion} from 'framer-motion';
const Routine = (props) => {
  const {scalesize}=useContext(ZoomContext);
  const {editOpen}=useContext(UpdatertContext);
  const {isWinTrue,get_summer_timing,get_winter_timing}=useContext(TimingContext)
  const tablular_rtine = {
    sun: {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
    },
    mon: {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
    },
    tue: {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
    },
    wed: {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
    },
    thu: {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
    },
    fri: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {} },
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

  const { height, width } = useWindowDimensions();
  const slide_per_view = useRef(1);
  console.log({ height: height, width: width });
  console.log("routine_oobj", routine_oobj);
  console.log("tabular_routine", tablular_rtine);
  // slide_per_view.current=1;
  useEffect(() => {
    if (width < 500) {
      slide_per_view.current = 1;
    } else if (width > 500 && width < 1500) {
      slide_per_view.current = 2;
    } else {
      slide_per_view.current = 3;
    }
  }, [width]);

  const ele = useRef();
  //const { id } = useParams();
  const id=props.id;
  const section=props.section;
  const year=props.year;
  const year_part=props.year_part;
  const periodsarray = useRef([]);

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
      const course_id = id;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/routines/get_routines_by_course_and_year_section_part/?course_id=${course_id}&year=${year}&year_part=${year_part}&section=${section}`
        );

        // console.log(response.data);
        //setPeriodsArray(response.data);
        periodsarray.current = response.data;
        set_routine_oobj(periodsarray.current);
        setRO({ ...routine_oobj });
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoutines();
    console.log("rooutine_obj:", routine_oobj);
  }, [ele,editOpen]);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
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
          sx={12}
        >
          <Grid
            item
            container
            style={{
              background: colors["white-purple"],
              width: "80vw",
              height: "fit-content",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
            ref={ele}
          >
          
            {routine_obj["sun"].length > 0 ? (
              <Grid item container p={2}>
                <Typography>Sunday</Typography>
                <Swiper
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    EffectCoverflow,
                  ]}
                  spaceBetween={50}
                  slidesPerView={
                    routine_obj["sun"].length > slide_per_view.current
                      ? slide_per_view.current
                      : routine_obj["sun"].length
                  }
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {/* {console.log({"sundayrt":routine_obj["sun"]},parseInt(routine_obj["sun"][0].starting_period_value))
                  } */}
                  {routine_obj["sun"].map((rtine) => (
                    <SwiperSlide key={rtine.url}>
                      <PeriodCard
                        url={rtine.url}
                        teacher_list={rtine.teacher}
                        subject={rtine.subject}
                        start_time={isWinTrue?`${get_winter_timing(parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.starting_period_value)-1)}`}
                        end_time={isWinTrue?`${get_winter_timing(parseInt(rtine.no_of_period_value)+parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.no_of_period_value)-1+parseInt(rtine.starting_period_value))}`}
                        session_type={rtine.session_type}
                        room_number={rtine.room_number}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            ) : (
              <></>
            )}

            {routine_obj["mon"].length > 0 ? (
              <Grid item container p={2} sx={{ width: "100%" }}>
                <Typography>Monday</Typography>
                <Swiper
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    EffectCoverflow,
                  ]}
                  spaceBetween={25}
                  slidesPerView={
                    routine_obj["mon"].length > slide_per_view.current
                      ? slide_per_view.current
                      : routine_obj["mon"].length
                  }
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {routine_obj["mon"].map((rtine) => (
                    <SwiperSlide key={rtine.url}>
                      <PeriodCard
                        url={rtine.url}
                        teacher_list={rtine.teacher}
                        subject={rtine.subject}
                        start_time={isWinTrue?`${get_winter_timing(parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.starting_period_value)-1)}`}
                        end_time={isWinTrue?`${get_winter_timing(parseInt(rtine.no_of_period_value)+parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.no_of_period_value)-1+parseInt(rtine.starting_period_value))}`}
                       session_type={rtine.session_type}
                        room_number={rtine.room_number}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            ) : (
              <></>
            )}

            {routine_obj["tue"].length > 0 ? (
              <Grid item container p={2} sx={{ width: "100%" }}>
                <Typography>Tuesday</Typography>
                <Swiper
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    EffectCoverflow,
                  ]}
                  spaceBetween={25}
                  slidesPerView={
                    routine_obj["tue"].length > slide_per_view.current
                      ? slide_per_view.current
                      : routine_obj["tue"].length
                  }
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {routine_obj["tue"].map((rtine) => (
                    <SwiperSlide key={rtine.url}>
                      <PeriodCard
                        url={rtine.url}
                        teacher_list={rtine.teacher}
                        subject={rtine.subject}
                        start_time={isWinTrue?`${get_winter_timing(parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.starting_period_value)-1)}`}
                        end_time={isWinTrue?`${get_winter_timing(parseInt(rtine.no_of_period_value)+parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.no_of_period_value)-1+parseInt(rtine.starting_period_value))}`}
                       
                        session_type={rtine.session_type}
                        room_number={rtine.room_number}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            ) : (
              <></>
            )}

            {routine_obj["wed"].length > 0 ? (
              <Grid item container p={2} sx={{ width: "100%" }}>
                <Typography>Wednesday</Typography>
                <Swiper
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    EffectCoverflow,
                  ]}
                  spaceBetween={25}
                  slidesPerView={
                    routine_obj["wed"].length > slide_per_view.current
                      ? slide_per_view.current
                      : routine_obj["wed"].length
                  }
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {routine_obj["wed"].map((rtine) => (
                    <SwiperSlide key={rtine.url}>
                      <PeriodCard
                        url={rtine.url}
                        teacher_list={rtine.teacher}
                        subject={rtine.subject}
                        start_time={isWinTrue?`${get_winter_timing(parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.starting_period_value)-1)}`}
                        end_time={isWinTrue?`${get_winter_timing(parseInt(rtine.no_of_period_value)+parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.no_of_period_value)-1+parseInt(rtine.starting_period_value))}`}
                       
                        session_type={rtine.session_type}
                        room_number={rtine.room_number}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            ) : (
              <></>
            )}

            {routine_obj["thu"].length > 0 ? (
              <Grid item container p={2} sx={{ width: "100%" }}>
                <Typography>Thrusday</Typography>
                <Swiper
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    EffectCoverflow,
                  ]}
                  spaceBetween={25}
                  slidesPerView={
                    routine_obj["thu"].length > slide_per_view.current
                      ? slide_per_view.current
                      : routine_obj["thu"].length
                  }
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {routine_obj["thu"].map((rtine) => (
                    <SwiperSlide key={rtine.url}>
                      <PeriodCard
                        url={rtine.url}
                        teacher_list={rtine.teacher}
                        subject={rtine.subject}
                        start_time={isWinTrue?`${get_winter_timing(parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.starting_period_value)-1)}`}
                        end_time={isWinTrue?`${get_winter_timing(parseInt(rtine.no_of_period_value)+parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.no_of_period_value)-1+parseInt(rtine.starting_period_value))}`}
                       
                        session_type={rtine.session_type}
                        room_number={rtine.room_number}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            ) : (
              <></>
            )}
            {routine_obj["fri"].length > 0 ? (
              <Grid item container p={2}>
                <Typography>Friday</Typography>
                <Swiper
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    EffectCoverflow,
                  ]}
                  spaceBetween={25}
                  slidesPerView={
                    routine_obj["fri"].length > slide_per_view.current
                      ? slide_per_view.current
                      : routine_obj["fri"].length
                  }
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {routine_obj["fri"].map((rtine) => (
                    <SwiperSlide key={rtine.url}>
                      <PeriodCard
                        url={rtine.url}
                        teacher_list={rtine.teacher}
                        subject={rtine.subject}
                        start_time={isWinTrue?`${get_winter_timing(parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.starting_period_value)-1)}`}
                        end_time={isWinTrue?`${get_winter_timing(parseInt(rtine.no_of_period_value)+parseInt(rtine.starting_period_value)-1)}`:`${get_summer_timing(parseInt(rtine.no_of_period_value)-1+parseInt(rtine.starting_period_value))}`}
                       
                        session_type={rtine.session_type}
                        room_number={rtine.room_number}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
               
              </Grid>
            ) : (
              <></>
            )}
           
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Routine;

/**
 *  <Grid item sx={1}></Grid>
              <Grid item sx={1}></Grid>
              <Grid item sx={1}></Grid>
              <Grid item sx={1}></Grid>
              <Grid item sx={1}></Grid>
    </Grid>
 */
