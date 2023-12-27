import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'
import axios from 'axios';

const itemslist=[{
    id:1,
    name:"sunday",
    url:"sun"
},
{
    id:2,
    name:"monday",
    url:"mon"
},
{
    id:3,
    name:"tueday",
    url:"tue"
}
,
{
    id:4,
    name:"wednesday",
    url:"wed"
},

{
    id:5,
    name:"thrusday",
    url:"thu"
},
{
    id:6,
    name:"friday",
    url:"fri"
},

{
    id:7,
    name:"saturday",
    url:"sat"
}
]


const DayInput =({value,dispatch})=>{
    
    // *const [item,setitem] = useState(''); */
    const handleChange=(e)=>{
        /* setitem(e.target.value);
        console.log(e.target.value);*/
        dispatch({type:"UPDATE",payload:{'day':e.target.value}})
    }

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Select Day'
            select
            id='day'
            name="day"
            value={value}
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

export default DayInput;
