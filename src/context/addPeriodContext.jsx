import {useState,useEffect,createContext,useReducer} from 'react';
import axios from 'axios';

const AddPeriodContext=createContext();

export default AddPeriodContext;

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


export const AddPeriodProvider=({children})=>{
    const [selectedOptions, setSelectedOptions] = useState();
    const [showaddModel,setShowAddModel]=useState(false);
    const [formstate, dispatch] = useReducer(reducerfunction, initialState);
    const [formstate2,dispatch2]=useReducer(reducerfunction2,initialStateGlobal);
    const [error, setError] = useState();
    let addPeriod = async (e) => {
      e.preventDefault();
      const requestData={
        ...formstate,...formstate2,
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/routines/', requestData);
        window.alert("Success:", response.data);
      } catch (err) {
        window.error("Error occurred while making the POST request:", err);
        // setError(err.response.data);
      }
    };

    let contextData={
        formstate,
        formstate2,
        dispatch,
        dispatch2,
        addPeriod,
        showaddModel,
        setShowAddModel,
        error

    }


    return(
        <AddPeriodContext.Provider value={contextData}>
            {children}
        </AddPeriodContext.Provider>
    )

      
}