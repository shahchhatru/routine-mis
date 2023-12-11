import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MuiTable from "../components/MuiTable";
import AuthContext from "../context/authContext";
import { Button, CssBaseline, Grid } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  let { tokendata, user, logoutUser } = useContext(AuthContext);
  console.log("user:=", user);

  useEffect(() => {
    if ((user == undefined) | (user == null)) {
      if (!localStorage.getItem("authTokens")) {
        return navigate("/login");
      }
    }
  });
  return(

    <>
    <CssBaseline/>
      <Grid container spacing={4}>
        <Grid item sx={3}>
          <Link to="/add_period">ADD PERIOD</Link>
        </Grid>
        <Grid item sx={3}>
          <Link to="/add_subject">ADD SUBJECT</Link>
        </Grid>
      </Grid>
      <MuiTable />
      <Button onClick={logoutUser}>Logout</Button>
    </>
  ) 
  ;
};

export default Home;
