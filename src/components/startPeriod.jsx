import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'
import axios from 'axios';

const itemslist=[{
    id:1,
    name:"1",
    url:1
},
{
    id:2,
    name:"2",
    url:2
},
{
    id:3,
    name:"3",
    url:3
}
,
{
    id:4,
    name:"4",
    url:4
},

{
    id:5,
    name:"5",
    url:5
},
{
    id:6,
    name:"6",
    url:6
},

{
    id:7,
    name:"7",
    url:7
},
{
    id:8,
    name:"8",
    url:8
}
]


const StartPeriodInput =({value,dispatch})=>{
    
   // const [item,setitem] = useState('');
    const handleChange=(e)=>{
        dispatch({type:'UPDATE',payload:{'starting_period_value':e.target.value}})
    }

    return (
        <Box sx={{mb:2}} style={{background:"#000"}}>
            <TextField
            required
            label='Select Starting Period'
            select
            id='starting_period_no'
            name="starting_period_no"
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

export default  StartPeriodInput;
