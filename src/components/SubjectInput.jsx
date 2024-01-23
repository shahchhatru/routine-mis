import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'
import axios from 'axios';


const SubjectInput =({value,dispatch})=>{
    const [itemslist, setitemslist] = useState([]);
    /*
    const [item,setitem] = useState(props.value);
    */
    useEffect(()=>{
        const fetchitemList = async () => {
      
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/subjects/');
            setitemslist(response.data);
            // console.log(itemslist);
          } catch (error) {
            console.error('Error fetching item list:', error);
          }
        }
  
        fetchitemList();
      },[]);
    const handleChange=(e)=>{
       
        dispatch({type:"UPDATE",payload:{subject:e.target.value}})
    }

    return (
        <Box sx={{mb:2,background:"black"}}>
            <TextField
            required
            label='Select Subject'
            select
            id='select_item'
            name="subject"
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

export default SubjectInput;
