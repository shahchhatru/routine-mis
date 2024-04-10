import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'
import axios from 'axios';

const itemslist=[{
    id:1,
    name:"Yes",
    url:1
},
{
    id:2,
    name:"No",
    url:0
},

]


const AlternateFieldInput =({value,dispatch})=>{
    
    // *const [item,setitem] = useState(''); */
    const handleChange=(e)=>{
        /* setitem(e.target.value);
        console.log(e.target.value);*/
        dispatch({type:"UPDATE",payload:{'alternate_bool':e.target.value}})
    }

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Alternate '
            select
            id='alternate'
            name="alternate"
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

export default AlternateFieldInput;
