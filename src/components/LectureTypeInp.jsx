import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'

const itemslist=[{
    id:1,
    name:"Lecture",
    url:"lecture"
},
{
    id:2,
    name:"Lab",
    url:"lab"
},
{
    id:3,
    name:"Tutorial",
    url:"tutorial"
},
{
    id:3,
    name:"Lecture+Tutorial",
    url:"lecture and tutorial"
},


]

const LectureTypeInp =({value,dispatch})=>{

    
    /* const [item,setitem] = useState('');*/
    const handleChange=(e)=>{
        // setitem(e.target.value);
        // console.log(e.target.value);
        dispatch({type:"UPDATE",payload:{'session_type':e.target.value}})

    }    

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Session Type'
            select
            id='session_type'
            name="session_type"
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

export default LectureTypeInp;
