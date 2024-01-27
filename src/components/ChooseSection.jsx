import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'
import axios from 'axios';

const itemslist=[{
    id:1,
    name:"AB",
    url:"AB"
},
{
    id:2,
    name:"CD",
    url:"CD"
},
{
    id:3,
    name:"EF",
    url:"EF"
}
,
{
    id:4,
    name:"GH",
    url:"GH"
},
]


const ChooseSectionInput =({value,dispatch})=>{
    
    // *const [item,setitem] = useState(''); */
    const handleChange=(e)=>{
        /* setitem(e.target.value);
        console.log(e.target.value);*/
        dispatch({type:"UPDATE",payload:{'section':e.target.value}})
    }

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Section'
            select
            id='section'
            name="section"
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

export default ChooseSectionInput;
