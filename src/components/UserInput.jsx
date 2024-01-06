import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'
import axios from 'axios';

const UserInput =({value,dispatch})=>{
  
    const [itemslist, setitemslist] = useState([]);
   
    useEffect(()=>{
        const fetchitemList = async () => {
      
          try {
            const response = await axios.get('http://127.0.0.1:8000/user/getuser/');
            setitemslist(response.data);
            console.log(itemslist);
          } catch (error) {
            console.error('Error fetching item list:', error);
          }
        }
  
        fetchitemList();
      },[]);
    const handleChange=(e)=>{
        // setitem(e.target.value);
        console.log(e.target.value);
        dispatch({type:"UPDATE",payload:{'user':e.target.value}})
    }

    return (
        <Box sx={{mb:2}}>
            <TextField
            label='Assign User'
            required
            select
            id='select_user'
            name="User"
            value={value}
            onChange={handleChange}
            fullWidth
            >
          
          { 
            (itemslist.length>0?itemslist.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            )):null)
          }

        </TextField>
        </Box>
    )

}

export default UserInput;
