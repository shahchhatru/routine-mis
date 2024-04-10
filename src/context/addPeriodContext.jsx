import {useState,useEffect,createContext,useReducer} from 'react';
import axios from 'axios';

const AddPeriodContext=createContext();

export default AddPeriodContext;

const initialState = {
    teacher: [],
    subject: "",
    session_type: "",
    starting_period_value: "",
    no_of_period_value: "",
  };
  
  const initialStateGlobal={
    year:"",
    course:"",
    day:"",
    room_number:"",
    year_part:"",
    section:"",
    alternate_bool:false,
    note:""
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
          teacher: [],
          subject: "",
          session_type: "",
          
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
          year_part:"",
          note:"",
          alternate_bool:false,
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
        ...formstate,...formstate2, season:"winter"
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/routines/', requestData);
        window.alert("Success:"+JSON.stringify(response.data));
      } catch (err) {
        window.alert("Error occurred while making the POST request:"+ JSON.stringify(err.response));
         setError(err.response.data);
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