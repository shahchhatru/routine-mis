import React ,{useState,useEffect} from 'react';
import {Box,TextField, MenuItem} from '@mui/material'
import axios from 'axios';


const TeacherInput =({value,dispatch})=>{
    const [teacherslist, setTeacherslist] = useState([]);
    //* const [teacher,setTeacher] = useState('');*/
    useEffect(()=>{
        const fetchTeacherList = async () => {
      
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/teachers/');
            setTeacherslist(response.data);
            // console.log(teacherslist);
          } catch (error) {
            console.error('Error fetching teacher list:', error);
          }
        }
  
        fetchTeacherList();
      },[]);
    const handleChange=(e)=>{
        // setTeacher(e.target.value);
        // console.log(e.target.value);
        dispatch({type:"UPDATE",payload:{"teacher":e.target.value}})
    }

    return (
        <Box sx={{mb:2}}>
            <TextField
            label='Select Teacher'
            select
            id='select_teacher'
            name="teacher"
            value={value}
            onChange={handleChange}
            fullWidth
            > 
          { 
            (teacherslist.length>0?teacherslist.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.name}>
                {teacher.name}
              </MenuItem>
            )):null)
          }

        </TextField>
        </Box>
    )

}

export default TeacherInput;
