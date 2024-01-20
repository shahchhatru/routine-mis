import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button } from '@mui/material';
import Routine from './Routine';
import TraditionalRoutine from './TraditionalRoutine';
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion'
import EditRoutine from './EditRoutine';
import UpdatertContext from '../context/updatertContext';
import { UpdatertProvider } from '../context/updatertContext';
import  TimingContext from '../context/winSumTimingContext';
export default function ClassRoutine() {
  const {ToggleTiming,isWinTrue} = React.useContext(TimingContext)
  const {editOpen} =React.useContext(UpdatertContext);
  console.log({editOpen})
  const { id ,section,year,year_part} = useParams();
  const [value, setValue] = React.useState('1');
  console.log(`id ${id} ,section ${section},year ${year} ,year_part ${year_part}`);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  
  <div style={{position:'relative',width:'100vw',height:'100vh',background:'linear-gradient(to right, #8e2de2, #4a00e0)'}}>
  <motion.div style={{position:'absolute',top:0,left:0,width:editOpen?'80vw':'100vw',background:'linear-gradient(to right, #8e2de2, #4a00e0)'}}
    animate={{width:editOpen?'80vw':'100vw'}}
  transition={{duration:0.5}}
  >
    <Box sx={{width:'100%',}}>
    <Button variant='contained' onClick={()=>ToggleTiming()} style={{float:'right',marginRight:8}}>
      {isWinTrue?'summer':'winter'}
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
    <motion.div style={{position:'fixed',left:editOpen?`${'80vw'}`:'100vw',top:'2vh',background:'linear-gradient(to right, #8e2de2, #4a00e0)'}}
      animate={{left:editOpen?'80vw':'100vw'}}
      transition={{duration:'0.5'}}
    >
      <EditRoutine/>
    </motion.div>
    </div>
   
  );
}
