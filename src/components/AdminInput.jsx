import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'

const itemslist=[{
    id:1,
    name:"Yes",
    url:"1",
},
{
    id:2,
    name:"No",
    url:"0"
},
]

const AdminInput=({value,dispatch})=>{
    const handleChange=(e)=>{
        
        dispatch({type:"UPDATE",payload:{'tc':e.target.value}})

    }    

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Is Admin'
            select
            id='is_admin'
            name="is_admin"
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

export default AdminInput;
