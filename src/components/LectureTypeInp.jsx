import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'

const itemslist=[{
    id:1,
    name:"Lecture",
    url:"Lecture"
},
{
    id:2,
    name:"Lab",
    url:"Lab"
},
{
    id:3,
    name:"Tutorial",
    url:"Tutorial"
}

]

const LectureTypeInp =()=>{
    const [item,setitem] = useState('');
    const handleChange=(e)=>{
        setitem(e.target.value);
        console.log(e.target.value);
    }    

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Session Type'
            select
            id='session_type'
            name="session_type"
            value={item}
            onChange={handleChange}
            fullWidth
            > 
            { 
            (itemslist.length>0?itemslist.map((item) => (
              <MenuItem key={item.id} value={item.url}>
                {item.name}
              </MenuItem>
            )):null)
          }
         

        </TextField>
        </Box>
    )

}

export default LectureTypeInp;
