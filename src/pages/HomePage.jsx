import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MuiTable from "../components/MuiTable";
import AuthContext from "../context/authContext";
import { Button, CssBaseline, Grid } from "@mui/material";
import NavBar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  let { tokendata, user, logoutUser,updateToken } = useContext(AuthContext);
  console.log("user:=", user);

  useEffect(() => {
    if ((user == undefined) | (user == null)) {
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
  });

  
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
