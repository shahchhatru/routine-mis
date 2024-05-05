import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { useParams } from "react-router-dom";
import TTeacherRoutine from "./TTeacherRoutine";
import AddPeriodTab from '../components/AddPeriodTab';
import EditRoutine from './EditRoutine';
import ViewRoutine from "./ViewRoutine";
import AuthContext from "../context/authContext";
import { Grid ,Button} from "@mui/material";
import { AddPeriodContext,TimingContext ,UpdatertContext,ZoomContext,ScreenOrientationContext, GetTeacherContext} from '../context';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import {motion} from 'framer-motion'


export default function ViewTeacherRoutine() {
  const { togglescreenRotate}=useContext(ScreenOrientationContext);
  const {ToggleTiming,isWinTrue} = useContext(TimingContext)
  const {showaddModel}=useContext(AddPeriodContext)
  const {mapTeacherIdToName}=useContext(GetTeacherContext);
  const {editOpen} =useContext(UpdatertContext);
  const {zoomOut,zoomIn}=useContext(ZoomContext);
  const navigate=useNavigate();
  const [teacher,setTeacher]=React.useState();
  const {user,logoutUser}=useContext(AuthContext);
  const {id,part}=useParams();
  const [iId,setId]=React.useState();

  
  const handleDownload = async () => {
    try {
      const filename=mapTeacherIdToName(iId) +"_routine_"+part;
      const response = await axios.get('http://localhost:3001/teachers/download/', {
        params: {
          teacher_id:parseInt(iId),
          part:part

        },
        responseType: 'blob', // Set the response type to 'blob' to handle binary data
      });

      // Create a temporary link to trigger the file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'routine.pdf');
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary link
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  React.useEffect(()=>{

  const func = async()=>{
        if(user){
            if(user.tc==false){
                const response = await axios.get(`http://127.0.0.1:8000/user/getteacher/${id}`)
                console.log(response);
                setId(response.data.id);
            }
            else{
                setId(id);
            }
    }
   
}
   func() ;
},[user])

  const [value, setValue] = React.useState("1");
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    iId?
  <div style={{position:'relative',width:'100vw',height:'100vh',background:'linear-gradient(to right, #8e2de2, #4a00e0)',padding:8}}>
   {
        id!==iId?(
          <Grid container style={{width:'100vw',display:'flex',paddding:4,}} spacing={4}>
          <Grid item sx={12}>
            <Button onClick={()=>navigate('/changepassword')}>Change password</Button>
          </Grid>
          <Grid item sx={12} >
            <Button variant="contained" onClick={()=>logoutUser()}>Logout</Button>
          </Grid>
        </Grid>
        ):<></>

        // <Grid container style={{width:'100vw',display:'flex',paddding:4,}} spacing={4}>
        //    <Grid item sx={12}>
        //     <Button onClick={()=>navigate('/changepassword')}>Change password</Button>
        //    </Grid>
        //   <Grid item sx={12} >
        //      <Button variant="contained" onClick={()=>logoutUser()}>Logout</Button>
        //   </Grid>
        //  </Grid>
        
      }
  <motion.div style={{position:'absolute',top:0,left:0,width:editOpen||showaddModel?'80vw':'100vw',background:'linear-gradient(to right, #8e2de2, #4a00e0)'}}
    animate={{width:editOpen || showaddModel?'80vw':'100vw'}}
  transition={{duration:0.5}}
  >
    <Box sx={{width:'100%',paddingRight:"10px"}}>
    <Button variant='contained' onClick={()=>ToggleTiming()} style={{float:'right',marginRight:8}}>
      {isWinTrue?'summer':'winter'}
    </Button >
    </Box>
    <Box sx={{width:'100%', paddingRight:"10px"}}>
    <button className="button-33" role="button" onClick={()=>zoomIn()}>
      <ZoomInIcon/>
    </button>
    <button className="button-33" role="button" onClick={()=>zoomOut()}>
      <ZoomOutIcon/>
    </button>
    <Button variant="contained" onClick={()=>logoutUser()}>Logout</Button>
    <Button className="button-56" role="button" onClick={()=>togglescreenRotate()}>
    
    <ScreenRotationIcon />
  </Button>
  <Button className="button-56" role="button" onClick={()=>handleDownload()} >Download pdf</Button>

    </Box>
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <Box sx={{width:'100%',display:'flex', justifyContent:'center' , textTransform:'uppercase',fontSize:'2rem'}}>
        {`${ mapTeacherIdToName(iId)} `}
      </Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Normal" value="1" />
            <Tab label="Swippable" value="2" />
           
          </TabList>
        </Box>
       
        <TabPanel value="1"> <TTeacherRoutine id={iId} part={part} /></TabPanel>
       <TabPanel value="2"> <ViewRoutine id={iId} /></TabPanel>
      
      </TabContext>
    </Box>
    </motion.div>
  
    <motion.div style={{position:"fixed",left:(editOpen || showaddModel)?`${'80vw'}`:`100vw`,top:'2vh',background:'linear-gradient(to right, #8e2de2, #4a00e0)'}}
    animate={{left:(editOpen ||showaddModel)?'80vw':'100vw'}}
    transition={{duration:'0.5'}}
  >
    <motion.div style={{position:'relative',width:'100%',height:'100%'}}>
      <motion.div style={{position:'absolute',top:'0',left:'0',width:'100%',visibility:(editOpen && !showaddModel)?'visible':'hidden'}} animate={{zIndex:editOpen?'10':'-10'}} transition={{duration:'0.5'}}>
        {
          user.tc?
          <EditRoutine/>:<></>
        }
        
      </motion.div>
      <motion.div style={{position:'absolute',top:'0',left:'0',width:'100s%',visibility:showaddModel?'visible':'hidden'}} animate={{zIndex:showaddModel?'10':'-10'}} transition={{duration:'0.5'}}>
      
      {
         user.tc?
         <AddPeriodTab/>:<></>

      }
      </motion.div>
    </motion.div>

  </motion.div>:
  <></>


  
  
  </div>:
  <></>
   
  );
}

/**
 *  iId?
    
    <Box sx={{ width: "100%",height:'100%', typography: "body1" }}>
      {
        id!=iId?(
          <Grid container style={{width:'100vw',display:'flex',paddding:4}} spacing={4}>
          <Grid item sx={12}>
            <Button onClick={()=>navigate('/changepassword')}>Change password</Button>
          </Grid>
          <Grid item sx={12} >
            <Button variant="contained" onClick={()=>logoutUser()}>Logout</Button>
          </Grid>
        </Grid>
        ):<></>
      }
       <Box sx={{width:'100%',}}>
    <Button variant='contained' onClick={()=>ToggleTiming()} style={{float:'right',marginRight:8}}>
      {isWinTrue?'summer':'winter'}
    </Button>
    </Box>
     
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
 */