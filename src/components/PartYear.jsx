import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'

const itemslist=[{
    id:1,
    name:"1st Part",
    url:"1",
},
{
    id:2,
    name:"2nd Part",
    url:"2"
},
]

const YearPartInput=({value,dispatch})=>{
    /* const [item,setitem] = useState('');*/
    const handleChange=(e)=>{
        // setitem(e.target.value);
        // console.log(e.target.value);
        dispatch({type:"UPDATE",payload:{'year_part':e.target.value}})

    }    

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Year Part Input'
            select
            id='year_part'
            name="Part"
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

export default YearPartInput;
