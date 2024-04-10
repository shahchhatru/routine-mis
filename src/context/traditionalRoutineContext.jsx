import React ,{useState,useContext,useEffect,createContext} from 'react';
import axios from "axios";
import RefreshPeriodContext from './refreshPeriodContext';
import UpdatertContext from './updatertContext';
import AddPeriodContext from './addPeriodContext';

const GetTraditionalRoutineContext=createContext()
export default GetTraditionalRoutineContext;


export const GetTraditionalRoutineProvider=({children})=>{
    const {periodlistrefresh}=useContext(RefreshPeriodContext);
    const { editOpen } = useContext(UpdatertContext);
    const { showaddModel }=useContext(AddPeriodContext);
    const [id,setCourseId]=useState()
    const [section,setSection]=useState()
    const [year,setYear]=useState()
    const [year_part,setYearPart]=useState()
    const periodsarray=[]
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
    const [freePeriod, setFreePeriod] = useState({ ...tablular_rtine_occupied });

    const tablular_rtine = {
        sun: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
        mon: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
        tue: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
        wed: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
        thu: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
        fri: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
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
           if (routine_oobj[day]) {
            const isDuplicate = routine_oobj[day].some((p) => p.url === url);
    
            if (!isDuplicate) {
              routine_oobj[day].push(period);
              tablular_rtine[day][starting_period_value] = { ...period };
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
        const [tabular_object, set_tO] = useState({ ...tablular_rtine });
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
                  `http://127.0.0.1:8000/api/routines/get_routines_by_course_and_year_section_part/?course_id=${course_id}&year=${year}&year_part=${year_part}&section=${section}`
                );
        
                // console.log(response.data);
                periodsarray.current = response.data;
        
                set_routine_oobj(periodsarray.current);
                setRO({ ...routine_oobj });
                get_khali_period(routine_oobj);
                set_tO({ ...tablular_rtine });
              } catch (err) {
                console.log(err);
              }
            };
            fetchRoutines();
          }, [editOpen,showaddModel,periodlistrefresh]);
    
    const contextData={}

    return(
        <GetTraditionalRoutineContext.Provider value={contextData}>
            {children}
        </GetTraditionalRoutineContext.Provider>
    )
}