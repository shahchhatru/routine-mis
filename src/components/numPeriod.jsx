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



]


const NumPeriodINput =({value,dispatch})=>{
    
    //const [item,setitem] = useState('');
    const handleChange=(e)=>{
        // setitem(e.target.value);
        // console.log(e.target.value);
        dispatch({type:"UPDATE",payload:{no_of_period_value:e.target.value}})
    }

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Select Number of Period'
            select
            id='num_periods'
            name="num_periods"
            value={value}
            onChange={handleChange}
            fullWidth
            style={{background:"#000"}}
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

export default  NumPeriodINput;
