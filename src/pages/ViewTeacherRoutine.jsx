import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { redirect, useParams } from "react-router-dom";
import TTeacherRoutine from "./TTeacherRoutine";
import ViewRoutine from "./ViewRoutine";
import AuthContext from "../context/authContext";

export default function ViewTeacherRoutine() {
  const navigate=useNavigate();
  const [teacher,setTeacher]=React.useState();
  const {user}=useContext(AuthContext);
  const {id}=useParams();
  const [iId,setId]=React.useState();
  React.useEffect(()=>{

    const func = async()=>{
        if(user){
            if(user.tc==false){
                const response = await axios(`http://127.0.0.1:8000/user/getteacher/${user.user_id}`)
                console.log(response);
                setId(response.data.id);
            }
            else{
                setId(id);
            }
    }
    else{
       return navigate('/login')
    }
}
   func() ;
  },[])
  const [value, setValue] = React.useState("1");
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    iId?
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Normal" value="1" />
            <Tab label="Swippable" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TTeacherRoutine id={iId} />
        </TabPanel>
        <TabPanel value="2">
          <ViewRoutine id={iId} />
        </TabPanel>
      </TabContext>
    </Box>:
    <></>
  );
}
