import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'
import axios from 'axios';

const CourseInput =({value,dispatch})=>{
  
    const [itemslist, setitemslist] = useState([]);
    /*const [item,setitem] = useState('');*/
    
    useEffect(()=>{
        const fetchitemList = async () => {
      
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/courses/');
            setitemslist(response.data);
            // console.log(itemslist);
          } catch (error) {
            console.error('Error fetching item list:', error);
          }
        }
  
        fetchitemList();
      },[]);
    const handleChange=(e)=>{
        // setitem(e.target.value);
        // console.log(e.target.value);
        dispatch({type:"UPDATE",payload:{'course':e.target.value}})
    }

    return (
        <Box sx={{mb:2}}>
            <TextField
            label='Select Stream and Batch'
            required
            select
            id='select_course'
            name="course"
            value={value}
            onChange={handleChange}
            fullWidth
            >
          
          { 
            (itemslist.length>0?itemslist.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            )):null)
          }

        </TextField>
        </Box>
    )

}

export default CourseInput;
