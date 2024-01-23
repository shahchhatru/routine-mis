import React ,{useState,createContext,useReducer} from 'react';
import axios from 'axios';
const EditPeriodContext =createContext();

export default EditPeriodContext;

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


export const EditPeriodProvider=({children})=>{
    // const [periodId,setPeriodId]=useState();
    const [formstate, dispatch] = useReducer(reducerfunction, initialState);
    const [formstate2,dispatch2]=useReducer(reducerfunction2,initialStateGlobal);

    const fetchPeriodData= (Id)=>{
        const getData= async ()=>{
            try{
                const response= await axios.get(`http://127.0.0.1:8000/api/routines/${Id}/`);
                const ndata=response.data;
                dispatch({type:"UPDATE",payload:{teacher:ndata.teacher[0],subject:ndata.subject,session_type:ndata.session_type,starting_period_value:ndata.starting_period_value,no_of_period_value:ndata.no_of_period_value}})
                dispatch2({type:"UPDATE",payload:{year:ndata.year,course:ndata.course,day:ndata.day,room_number:ndata.room_number,year_part:ndata.year_part}})
     
            }catch(err){
                console.log(err);
            }
            }
        getData();
    }

    const updateData= async (e,routine_id)=>{
         e.preventDefault();
         const requestData={
            ...formstate,...formstate2
        }
        try {
        const response = await axios.put(`http://127.0.0.1:8000/api/routines/${routine_id}/`, requestData);
        window.alert("Success:", response.data);
        } catch (error) {
        console.error("Error occurred while making the POST request:", error.response.data);
        setError(error.response.data);
        }


    }

    let contextData={formstate,formstate2,dispatch,dispatch2,fetchPeriodData,updateData}
    return(
        <EditPeriodContext.Provider value={contextData}>
           {children}
        </EditPeriodContext.Provider>
    )
}