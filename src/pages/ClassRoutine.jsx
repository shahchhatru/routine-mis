import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Routine from './Routine';
import TraditionalRoutine from './TraditionalRoutine';
import { useParams } from 'react-router-dom';
export default function ClassRoutine() {
  const { id ,section,year,year_part} = useParams();
  /*const {section}=useParams(); */
  const [value, setValue] = React.useState('1');
  console.log(`id ${id} ,section ${section},year ${year} ,year_part ${year_part}`);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
  );
}
