import React from "react";
import {
  Card,
  Typography,
  CardContent,
  Box,
  Grid,
  Button,
  Paper
} from "@mui/material";

const TraditionalCard = (props) => {
  return (
    
    <Card sx={{ minWidth: "100px", minHeight: "100px" ,background:"white",color:"black"}}>
      <CardContent>
        {props ? (
          <Box>
            <Typography>{props.name ? props.name : ""}</Typography>
            <Typography>{props.subject ? props.subject : ""}</Typography>
          </Box>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
   
  );
};

export default TraditionalCard;
