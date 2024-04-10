import React,{useContext} from "react";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context";

const TeacherViewRoutine = () => {
  const { id } = useParams();
  const {logoutUser}=useContext(AuthContext);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
      }}
    >
      <div style={{ display: "flex", justifyItems: "space-between",scale:'3' }}>
        <div style={{margin:'4px'}}>
          <Link to={`/view_routine_t/${id}/1`}> 
          <Button variant="contained">1st Part</Button></Link>
        </div>
        <div>
          <Link to={`/view_routine_t/${id}/2`}> <Button variant="contained">2nd Part</Button></Link>
        </div>
      </div>
      
    </div>
  );
};

export default TeacherViewRoutine;
