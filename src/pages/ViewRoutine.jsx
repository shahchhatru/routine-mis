import React, { useEffect, useState,useRef } from "react";
import { Grid, CssBaseline, Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
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



const ViewRoutine = (props) => {

const routine_oobj = {
  sun: [],
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
};
const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const remove_duplicates=()=>{

}

const set_routine_oobj = (perArray) => {
  perArray.forEach((period) => {
   const { day, url } = period;
   const isDuplicate = routine_oobj[day].some((p) => p.url === url);

    if (!isDuplicate) {
      routine_oobj[day].push(period);
    }
  });
};

  const { height, width } = useWindowDimensions();
  const slide_per_view =useRef(1);
  console.log({height:height,width:width});
  useEffect(()=>{
    if(width<500){
      slide_per_view.current=1;
    }else if(width<1500){
      slide_per_view.current=2
    }else{
      slide_per_view.current=3
    }
  },[width])
  
  const ele=useRef();
  //const { id } = useParams();
  const id = props.id;
  const periodsarray=useRef([])
  //const [periodsarray, setPeriodsArray] = useState([]);
  const [routine_obj,setRO]=useState({
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  })
  useEffect(() => {
    const fetchRoutines = async () => {
      const teacher_id = id;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/routines/get_routines_by_teacher/?teacher_id=${teacher_id}`
        );

        console.log(response.data);
        //setPeriodsArray(response.data);
        periodsarray.current=response.data;
        set_routine_oobj(periodsarray.current);
        setRO({...routine_oobj});
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoutines();
    console.log("rooutine_obj:", routine_oobj);
  },[ele]);

  return (
    <>
      <CssBaseline />
      <Typography>

      </Typography>
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
        
        
        { routine_obj["sun"].length > 0 ? (
            <Grid item container p={2} sx={{width:'100%'}}>
              <Typography>Sunday</Typography>
              <Swiper
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  EffectCoverflow,
                ]}
                spaceBetween={25}
                slidesPerView={routine_obj["sun"].length>=slide_per_view.current?slide_per_view.current:routine_obj["sun"].length}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {routine_obj["sun"].map((rtine) => (
                  <SwiperSlide key={rtine.url}>
                    <PeriodCard url={rtine.url} 
                    teacher_list={rtine.teacher} 
                    subject={rtine.subject}
                    start_time={rtine.time_start}
                    end_time={rtine.time_end}
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
          
           { routine_obj["mon"].length > 0 ? (
            <Grid item container p={2} sx={{width:'100%'}}>
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
                slidesPerView={routine_obj["mon"].length>slide_per_view.current?slide_per_view.current:routine_obj["mon"].length}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {routine_obj["mon"].map((rtine) => (
                  <SwiperSlide key={rtine.url}>
                    <PeriodCard url={rtine.url} 
                    teacher_list={rtine.teacher} 
                    subject={rtine.subject}
                    start_time={rtine.time_start}
                    end_time={rtine.time_end}
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


{ routine_obj["tue"].length > 0 ? (
            <Grid item container p={2} sx={{width:'100%'}}>
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
                slidesPerView={routine_obj["tue"].length>slide_per_view.current?slide_per_view.current:routine_obj["tue"].length}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {routine_obj["tue"].map((rtine) => (
                  <SwiperSlide key={rtine.url}>
                    <PeriodCard url={rtine.url} 
                    teacher_list={rtine.teacher} 
                    subject={rtine.subject}
                    start_time={rtine.time_start}
                    end_time={rtine.time_end}
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


{ routine_obj["wed"].length > 0 ? (
            <Grid item container p={2} sx={{width:'100%'}}>
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
                slidesPerView={routine_obj["wed"].length>slide_per_view.current?slide_per_view.current:routine_obj["wed"].length}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {routine_obj["wed"].map((rtine) => (
                  <SwiperSlide key={rtine.url}>
                    <PeriodCard url={rtine.url} 
                    teacher_list={rtine.teacher} 
                    subject={rtine.subject}
                    start_time={rtine.time_start}
                    end_time={rtine.time_end}
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


           { routine_obj["thu"].length > 0 ? (
            <Grid item container p={2} sx={{width:'100%'}}>
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
                slidesPerView={routine_obj["thu"].length>slide_per_view.current?slide_per_view.current:routine_obj["thu"].length}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {routine_obj["thu"].map((rtine) => (
                  <SwiperSlide key={rtine.url}>
                    <PeriodCard url={rtine.url} 
                    teacher_list={rtine.teacher} 
                    subject={rtine.subject}
                    start_time={rtine.time_start}
                    end_time={rtine.time_end}
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
           { routine_obj["fri"].length > 0 ? (
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
                slidesPerView={routine_obj["fri"].length>slide_per_view.current?slide_per_view.current:routine_obj["fri"].length}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {routine_obj["fri"].map((rtine) => (
                  <SwiperSlide key={rtine.url}>
                    <PeriodCard url={rtine.url} 
                      teacher_list={rtine.teacher} 
                      subject={rtine.subject}
                      start_time={rtine.time_start}
                      end_time={rtine.time_end}
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
    </>
  );
};

export default ViewRoutine;
