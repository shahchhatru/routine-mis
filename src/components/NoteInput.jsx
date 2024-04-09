import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'




const NoteINput =({value,dispatch})=>{
    
    //const [item,setitem] = useState('');
    const handleChange=(e)=>{
        // setitem(e.target.value);
        // console.log(e.target.value);
        dispatch({type:"UPDATE",payload:{note:e.target.value}})
    }

    return (
        <Box sx={{mb:2}}>
            <TextField
            required
            label='Note'
            id='note'
            name="note"
            value={value}
            onChange={handleChange}
            fullWidth
            style={{background:"#000"}}
            >

        </TextField>
        </Box>
    )

}

export default  NoteINput;
