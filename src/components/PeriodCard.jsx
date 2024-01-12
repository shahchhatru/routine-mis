import {
  Card,
  Typography,
  CardContent,
  Box,
  Grid,
  Button,
} from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import EditNoteIcon from "@mui/icons-material/EditNote";
import UpdatertContext from "../context/updatertContext";
import { useContext } from "react";
export default function PeriodCard(props) {
  const {setRoutineId,toggleEditOpen,editOpen}=useContext(UpdatertContext);

  function initialsAfterSpace(inputString) {
    // Split the input string into words
    const words = inputString.split(" ");

    // Use map to get the first letter of each word
    const initials = words.map((word) => word.charAt(0).toUpperCase());

    // Join the initials to form the result
    const result = initials.join("");

    return result;
  }

  const url = props.url;
  function getId(url) {
    var urlParts = url.split("/");

    // Remove empty elements from the array
    urlParts = urlParts.filter(function (part) {
      return part !== "";
    });
    console.log(urlParts);
    return urlParts[urlParts.length - 1];
  }

  const handleEditButton=()=>{
   
    if(editOpen){
      setRoutineId('');
      toggleEditOpen();
    }else{
      toggleEditOpen();
      setRoutineId(getId(url))
    }
    
 }

  return (
    <Card sx={{ width: "300px", background: "white" }}>
      <CardContent>
        <Grid
          container
          fullWidth
          mb={1}
          style={{ justifyContent: "space-between" }}
        >
          <Grid item sx={2}>
            <Box
              sx={{
                background: "#f1eeff",
                textTransform: "capitalize",
                border: "2px solid #6558d3",
                borderRadius: 1,
                fontWeight: 600,
                fontSize: "0.875rem",
                padding: "0.5em 0.75em",
                lineHeight: 1,
              }}
            >
              <Typography variant="h7" color="#6558d3">
                {props.session_type + " " + props.room_number}
              </Typography>
            </Box>
          </Grid>
          <Grid item sx={4}>
            <Button onClick={()=>handleEditButton()}>
              <EditNoteIcon />
              Edit
            </Button>
          </Grid>
        </Grid>
        <Grid container fullWidth>
          <Grid item sx={6} p={1}>
            <Typography
              variant="h7"
              color="#000"
              sx={{ fontFamily: "Poppins", fontWeight: "300" }}
              gutterBottom
            >
              {props.subject}
            </Typography>
          </Grid>
        </Grid>
        <Grid container fullWidth>
          <Grid item sx={1} p={1} color="lightgreen">
            <EngineeringIcon />
          </Grid>
          <Grid item sx={3} p={1} color="lightgreen">
            <Typography
              variant="body2"
              color="#000"
              sx={{ fontFamily: "Spline Sans", fontWeight: "300" }}
              gutterBottom
            >
              {props.teacher_list?.map((t) => (
                <span>{initialsAfterSpace(t) + " "}</span>
              ))}
            </Typography>
          </Grid>
        </Grid>
        <Grid container fullWidth>
          <Grid item sx={2} p={1} color="lightgreen">
            <AccessAlarmIcon />
          </Grid>
          <Grid item sx={2} p={1} color="lightgreen">
            <Typography>{props.start_time}</Typography>
          </Grid>
          <Grid item sx={2} p={1} color="red">
            <TimerOffIcon />
          </Grid>
          <Grid item sx={2} p={1} color="red">
            <Typography>{props.end_time}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
