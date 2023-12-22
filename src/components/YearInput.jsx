import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'

const itemslist=[{
    id:1,
    name:"1st Year",
    url:"1st Year",
},
{
    id:2,
    name:"2nd Year",
    url:"2nd Year"
},
{
    id:3,
    name:"3rd Year",
    url:"3rd Year"
},
{
    id: 4,
    url: "4th Year",
   
    name: "4th Year"
},

]

const YearInput=({value,dispatch})=>{
    /* const [item,setitem] = useState('');*/
    const handleChange=(e)=>{
        // setitem(e.target.value);
        // console.log(e.target.value);
        dispatch({type:"UPDATE",payload:{'year':e.target.value}})

    }    

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Year Input'
            select
            id='year'
            name="year_input"
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

export default YearInput;
