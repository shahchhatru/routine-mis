import React,{useContext,useState} from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';

import { GetTeacherContext } from '../context';
import { Box, Button, Typography } from '@mui/material';



const SearchableTeacherRedirect = () => {
    const navigate =useNavigate();
    const {teacherOptionsarray,setTeacherId,teacherId}=useContext(GetTeacherContext);
    const [selectedOption, setSelectedOption] = useState({value:0,label:""});
    console.log({teacherOptionsarray,setTeacherId,teacherId})
   
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background:'rgba(0,0,0,0)',
          color:"white",
          
          minWidth:"1000px",
          width:"100%",
          height: '56px', // Adjust the height as needed
          minHeight: '56px',
          borderRadius: '4px', // Match MUI Select border-radius
          boxShadow: 'none', // Remove the default box-shadow
          border: '1px solid #ced4da', // Match MUI Select border color
          '&:hover': {
            border: '1px solid #ced4da', // Match MUI Select border color on hover
          },
        }),
        menu: (provided, state) => ({
          ...provided,
        
          background: 'white', // Match MUI Select dropdown background color
        }),
        option: (provided, state) => ({
          ...provided,
          color: 'black', // Match MUI Select option text color
          '&:hover': {
            background: '#f8f9fa',
            marginLeft:"100px", // Match MUI Select option background color on hover
          },
          placeholder: (provided, state) => ({
            ...provided,
            color: 'white', // Set placeholder text color to white
          }),
        //   singleValue: (provided, state) => ({
        //     ...provided,
        //     color: 'white', // Set selected value text color to white
        //   }),
        }),
      };

      const handleChange = (option) => {
         setSelectedOption(option);
         
      };
  return (
    <Box style={{display:"flex" , flexDirection:"row",justifyContent:"space-around",marginTop:"50px",}}>
        <Box style={{display:"flex" , flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
        <Typography style={{fontSize:"1.2rem"}}>
            Search Teacher
        </Typography>
    <Select
    styles={customStyles}
      value={selectedOption}
      onChange={ handleChange}
      options={teacherOptionsarray}
      placeholder={"Search Teacher"}
    />
        </Box>
       
    <Button  variant="contained" onClick={()=>navigate('/view_routine_t/'+selectedOption.value+"/1")}>1st Part</Button>
    <Button variant="contained" onClick={()=>navigate('/view_routine_t/'+selectedOption.value+"/2")}>2nd Part</Button>
  </Box>
  )
}

export default SearchableTeacherRedirect