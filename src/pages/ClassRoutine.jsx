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
  const { id } = useParams()
  const [value, setValue] = React.useState('1');

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
        <TabPanel value="1"><TraditionalRoutine id={id}/></TabPanel>
       <TabPanel value="2"><Routine id={id}/></TabPanel>
       
      </TabContext>
    </Box>
  );
}
