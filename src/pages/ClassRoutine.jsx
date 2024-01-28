import  React,{useContext,useState} from 'react';
import { Box,Tab ,Button } from '@mui/material';
import {TabContext,TabList,TabPanel} from '@mui/lab'
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import AddPeriodTab from '../components/AddPeriodTab';
import EditRoutine from './EditRoutine';
import Routine from './Routine';
import TraditionalRoutine from './TraditionalRoutine';
import { AddPeriodContext,TimingContext ,UpdatertContext,ZoomContext,ScreenOrientationContext} from '../context';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';


export default function ClassRoutine() {
  const { togglescreenRotate}=useContext(ScreenOrientationContext);
  const {ToggleTiming,isWinTrue} = useContext(TimingContext)
  const {editOpen} =useContext(UpdatertContext);
  const {zoomOut,zoomIn}=useContext(ZoomContext);
  const { id ,section,year,year_part} = useParams();
  const {showaddModel}=useContext(AddPeriodContext)

  const [value, setValue] = useState('1');
  console.log(`id ${id} ,section ${section},year ${year} ,year_part ${year_part}`);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  
  <div style={{position:'relative',width:'100vw',height:'100vh',background:'linear-gradient(to right, #8e2de2, #4a00e0)'}}>
  
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
    <Button className="button-56" role="button" onClick={()=>togglescreenRotate()}>
    <ScreenRotationIcon />
  </Button>

    </Box>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Normal" value="1" />
            <Tab label="Swippable" value="2" />
           
          </TabList>
        </Box>
       
        <TabPanel value="1"><TraditionalRoutine id={id} section={section} year={year} year_part={year_part}/></TabPanel>
       <TabPanel value="2"><Routine id={id} section={section} year={year} year_part={year_part}/></TabPanel>
      
      </TabContext>
    </Box>
    </motion.div>
  <motion.div style={{position:"fixed",left:(editOpen || showaddModel)?`${'80vw'}`:`100vw`,top:'2vh',background:'linear-gradient(to right, #8e2de2, #4a00e0)'}}
    animate={{left:(editOpen ||showaddModel)?'80vw':'100vw'}}
    transition={{duration:'0.5'}}
  >
    <motion.div style={{position:'relative',width:'100%',height:'100%'}}>
      <motion.div style={{position:'absolute',top:'0',left:'0',width:'100%',visibility:(editOpen && !showaddModel)?'visible':'hidden'}} animate={{zIndex:editOpen?'10':'-10'}} transition={{duration:'0.5'}}>
        <EditRoutine/>
      </motion.div>
      <motion.div style={{position:'absolute',top:'0',left:'0',width:'100s%',visibility:showaddModel?'visible':'hidden'}} animate={{zIndex:showaddModel?'10':'-10'}} transition={{duration:'0.5'}}>
      <AddPeriodTab/>
      </motion.div>
    </motion.div>

  </motion.div>
  </div>
   
  );
}
