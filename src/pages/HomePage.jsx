import React, { useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom";
import MuiTable from "../components/MuiTable";
import AuthContext from "../context/authContext";
import {CssBaseline} from "@mui/material";
import NavBar from "../components/Navbar";
import {ScreenOrientationContext } from "../context";
import {motion} from 'framer-motion';

const Home = () => {
  
  const navigate = useNavigate();
  let { tokendata, user, logoutUser,updateToken } = useContext(AuthContext);
  console.log("user:=", user);

  useEffect(() => {
    if ((user === undefined) | (user === null)) {
      if (!localStorage.getItem("authTokens")) {
        return navigate("/login");
      }
    }
    
    else{
      if(user){
        if(user.tc==false){
          return navigate(`/view_routine_t/${user.user_id}`)
        }
      }
    }
  },[user]);

  
  return(

    <>
    
    <NavBar/>
    <CssBaseline/>
     
      
      <MuiTable />
      
    </>
  ) 
  ;
};

export default Home;
