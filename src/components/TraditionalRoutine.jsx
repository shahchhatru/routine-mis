import React,{useEffect} from 'react'
import { TableRow,TableCell } from '@mui/material';

const TraditionalRoutine = (props) => {
    const tablular_rtine = {
        sun: {
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7:{},
          8:{}
        },
        mon: {
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7:{},
          8:{},
        },
        tue: {
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7:{},
          8:{}
        },
        wed: {
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7:{},
          8:{}
        },
        thu: {
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7:{},
          8:{}
        },
        fri: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},  7:{},
        8:{} },
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

      console.log("routine_oobj from TraditionalRoutine",routine_oobj);
      console.log("tabular_routine from traditionalRoutine",tablular_rtine);
      const course_id=props.classid;
      useEffect(() => {
        const fetchRoutines = async () => {
         
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/api/routines/get_routines_by_course_and_year/?course_id=${course_id}&year=4`
            );
    
            set_routine_oobj(response.data);
           
          } catch (err) {
            console.log(err);
          }
        };
        fetchRoutines();
        console.log("routine_oobj from TraditionalRoutine:", routine_oobj);
        console.log("tabular_routine from traditionalRoutine",tablular_rtine);
      }, []);

  return (
    <TableRow>
        <TableCell/>
    </TableRow>
  )
}

export default TraditionalRoutine